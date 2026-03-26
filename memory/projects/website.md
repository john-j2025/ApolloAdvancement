# Apollo Advancement Website

**URL:** apolloadvancement.com
**Status:** Live
**Deploy:** Cloudflare Pages via GitHub
**Publish directory:** Website/ (updated March 2026 during folder reorganization)

## Structure
Six main HTML pages:
- index.html (homepage)
- services.html (overview)
- about.html
- results.html
- contact.html (with contact-success.html)
- resources.html (scalable resource library)

Subpages:
- services/ (individual service pages: fractional-development-leadership, fundraising-audit, campaign-development, board-staff-training, content-communications-strategy, website-strategy-seo)
- blog/ (blog index + individual posts)

## Current Blog Posts
- "Everything You Believe About Fundraising is Wrong" (series landing page)
- "Fundraising is Embarrassing" (Post #1)

## Lead Magnet
- Annual Fund Checklist PDF (Mailchimp-integrated, on resources page)

## Technical
- Static HTML (no framework, no CMS; blog posts are manually added HTML files)
- Cloudflare Pages functions/ for serverless API
- _redirects file for routing
- Google Fonts CDN for Playfair Display and DM Sans
- Brand fonts stored locally in Fonts/ folder for image generation only
- web_fetch can access the homepage but cannot follow internal links; subpage URLs must be pasted directly
- Mailchimp integration on resources page for email capture

## Notes
- The blog series will eventually be compiled into a PDF booklet as a lead magnet
- Resources page designed to be scalable (add more lead magnets over time)
- Building blog/CMS integration is a medium-term priority (currently no publishing workflow)
- The site doubles as a portfolio piece for any future institutional roles
