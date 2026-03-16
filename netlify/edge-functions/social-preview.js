/**
 * Netlify Edge Function: social-preview
 *
 * Intercepts requests from social media crawlers (Facebook, Twitter, LinkedIn, etc.)
 * and returns a lightweight HTML stub containing only the Open Graph / meta tags
 * needed to generate link previews. This bypasses any CDN-level bot filtering
 * that would otherwise return a 403 to these crawlers.
 */

const SOCIAL_CRAWLER_RE = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|Discordbot|TelegramBot|Pinterest|Googlebot|bingbot/i;

// Minimal HTML template for social preview responses
function buildPreviewHTML(tags) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
${tags}
</head>
<body></body>
</html>`;
}

// OG/meta tags keyed by canonical path (with trailing slash)
const PAGES = {
  "/blog/fundraising-is-embarrassing/": buildPreviewHTML(`
  <title>Fallacy #1: Fundraising is Embarrassing | Apollo Advancement</title>
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Apollo Advancement">
  <meta property="og:title" content="Fundraising is Embarrassing: The Original Sin That Poisons Everything Else">
  <meta property="og:description" content="If you believe fundraising is embarrassing, you won't get good at it. Full stop. Here's how to root out the belief that poisons nonprofit fundraising.">
  <meta property="og:image" content="https://apolloadvancement.com/blog/blog-fundraising-is-embarrassing.jpg">
  <meta property="og:image:width" content="1840">
  <meta property="og:image:height" content="966">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:alt" content="Fallacy #1: Fundraising is Embarrassing — blog post from the series Everything You Believe About Fundraising is Wrong">
  <meta property="og:url" content="https://apolloadvancement.com/blog/fundraising-is-embarrassing/">
  <meta property="article:author" content="John Jalsevac, PhD">
  <meta property="article:published_time" content="2026-03-13T00:00:00Z">
  <meta property="article:section" content="Fundraising">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Fundraising is Embarrassing: The Original Sin That Poisons Everything Else">
  <meta name="twitter:description" content="If you believe fundraising is embarrassing, you won't get good at it. Full stop. Here's how to root out the belief that poisons nonprofit fundraising.">
  <meta name="twitter:image" content="https://apolloadvancement.com/blog/blog-fundraising-is-embarrassing.jpg">
  <link rel="canonical" href="https://apolloadvancement.com/blog/fundraising-is-embarrassing/">`),

  "/blog/everything-you-believe-about-fundraising-is-wrong/": buildPreviewHTML(`
  <title>Everything You Believe About Fundraising is Wrong | Apollo Advancement</title>
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Apollo Advancement">
  <meta property="og:title" content="Everything You Believe About Fundraising is Wrong: 9 Mistakes Killing Your Results">
  <meta property="og:description" content="A nine-part series on the beliefs quietly destroying your nonprofit's fundraising — and what to do instead. By John Jalsevac, PhD.">
  <meta property="og:image" content="https://apolloadvancement.com/blog/blog-fundraising-beliefs-wrong.jpg">
  <meta property="og:image:width" content="1840">
  <meta property="og:image:height" content="966">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:url" content="https://apolloadvancement.com/blog/everything-you-believe-about-fundraising-is-wrong/">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Everything You Believe About Fundraising is Wrong: 9 Mistakes Killing Your Results">
  <meta name="twitter:description" content="A nine-part series on the beliefs quietly destroying your nonprofit's fundraising — and what to do instead. By John Jalsevac, PhD.">
  <meta name="twitter:image" content="https://apolloadvancement.com/blog/blog-fundraising-beliefs-wrong.jpg">
  <link rel="canonical" href="https://apolloadvancement.com/blog/everything-you-believe-about-fundraising-is-wrong/">`),

  "/blog/": buildPreviewHTML(`
  <title>Blog | Apollo Advancement</title>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Apollo Advancement">
  <meta property="og:title" content="Blog | Apollo Advancement">
  <meta property="og:description" content="Insights on nonprofit fundraising, donor development, and building a culture of generosity. By John Jalsevac, PhD.">
  <meta property="og:image" content="https://apolloadvancement.com/og-image.jpg">
  <meta property="og:url" content="https://apolloadvancement.com/blog/">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://apolloadvancement.com/blog/">`),
};

export default async function handler(request, context) {
  const userAgent = request.headers.get("user-agent") || "";

  if (!SOCIAL_CRAWLER_RE.test(userAgent)) {
    // Not a social crawler — serve normally
    return context.next();
  }

  const url = new URL(request.url);
  // Normalize path: ensure trailing slash for lookup
  let path = url.pathname;
  if (!path.endsWith("/")) path = path + "/";

  const html = PAGES[path];

  if (html) {
    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=3600",
        "x-social-preview": "1",
      },
    });
  }

  // Path not in our map — pass through
  return context.next();
}
