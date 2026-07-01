# BlitzAI Solutions — Website

Marketing site for **BlitzAI Solutions LLC** — B2B sales infrastructure (inbound, outbound, AI agents, CRM, and nurture automations).

Static HTML / CSS / JS. No build step, no framework. Fully self-hostable.

## Structure

```
.
├── index.html            # Home
├── services.html         # Services
├── how-we-work.html      # Process
├── case-studies.html     # Case studies
├── css/style.css         # All styles (single light theme)
├── js/main.js            # Nav, reveal, counters, FAQ
└── vercel.json           # Clean URLs config
```

## Run locally

Any static server works. For example:

```bash
python3 -m http.server 3000
# then open http://localhost:3000
```

## Deploy

Hosted on **Vercel** as a static site — every push to `main` deploys automatically.

## Primary CTA

All "Book a Call" buttons point to the GoHighLevel booking widget.

---

© BlitzAI Solutions LLC — Registered in Delaware.
