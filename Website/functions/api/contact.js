// Cloudflare Pages Function: handles form submissions and sends email via Resend.
//
// SETUP:
// 1. Sign up at resend.com (free tier: 3,000 emails/month)
// 2. Create an API key at resend.com/api-keys
// 3. Verify your domain at resend.com/domains (or use onboarding@resend.dev for testing)
// 4. In Cloudflare dashboard: Pages > your project > Settings > Environment Variables, add:
//      RESEND_API_KEY = re_your_api_key_here
//      CONTACT_EMAIL  = john@apolloadvancement.com
//      FROM_EMAIL     = contact@apolloadvancement.com  (must be from a verified domain in Resend)

export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const name = formData.get("name") || "Unknown";
    const email = formData.get("email") || "No email provided";
    const organization = formData.get("organization") || "Not specified";
    const message = formData.get("message") || "No message";
    const subject = formData.get("subject") || "New Contact Form Submission";
    const formName = formData.get("form-name") || "contact";

    // Honeypot spam check: if bot-field is filled, silently reject
    if (formData.get("bot-field")) {
      return Response.redirect(`${new URL(context.request.url).origin}/contact-success.html`, 303);
    }

    // Basic validation
    if (!email || !email.includes("@")) {
      return new Response("Invalid email address.", { status: 400 });
    }

    const RESEND_API_KEY = context.env.RESEND_API_KEY;
    const CONTACT_EMAIL = context.env.CONTACT_EMAIL || "john@apolloadvancement.com";
    const FROM_EMAIL = context.env.FROM_EMAIL || "contact@apolloadvancement.com";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response("Server configuration error.", { status: 500 });
    }

    // Send email via Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Apollo Advancement <${FROM_EMAIL}>`,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `${subject} - ${name}`,
        html: `
          <h2>${subject}</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          <hr>
          <p style="color:#888;font-size:12px;">Submitted via ${escapeHtml(formName)} form on apolloadvancement.com</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error("Resend API error:", error);
      return new Response("Failed to send message. Please try again or email directly.", { status: 500 });
    }

    // Redirect to success page
    return Response.redirect(`${new URL(context.request.url).origin}/contact-success.html`, 303);

  } catch (err) {
    console.error("Form handler error:", err);
    return new Response("Something went wrong. Please email john@apolloadvancement.com directly.", { status: 500 });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
