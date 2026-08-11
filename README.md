# Abhishek Sharma — Portfolio

Modern responsive portfolio built with:
- HTML5
- Modern CSS3
- Vanilla JavaScript
- No framework required

## Live

Deployed via GitHub Pages:  
**https://abhishek3758sharma.github.io/**

## Setup

1. Open the project folder in VS Code.
2. Put your real photo at:
   `assets/profile.jpg`
3. Put your resume PDF at:
   `assets/Abhishek-Sharma-Resume.pdf`
4. Open `index.html` with Live Server.

## CI/CD

GitHub Actions pipeline (`.github/workflows/deploy.yml`):

- **Push to `main`** → Validate assets → Deploy to GitHub Pages
- **Pull requests** → Validate only (no deploy)
- **Manual trigger** → `workflow_dispatch` supported

### Validated files
- `index.html`, `style.css`, `script.js`
- `assets/profile.jpg`, `assets/Abhishek-Sharma-Resume.pdf`
- HTML structure and local asset references

## Features

- Dark futuristic theme with purple/cyan accents
- Glassmorphism profile card with floating tech cards
- Animated technology marquee
- Orbit ring animations
- Cursor-glow effect (desktop)
- Scroll-reveal section entrances with staggered timing
- Active navigation indicator on scroll
- Magnetic button hover effects
- Card tilt interaction on ongoing projects
- Gradient border animations
- Timeline with animated dots
- Full `prefers-reduced-motion` support
- Skip-to-content accessibility link
- Focus-visible keyboard navigation styles
- SEO: Open Graph, canonical, theme-color
- Responsive: 1920px → 375px — zero horizontal scrollbar

## Sections

1. Hero — profile card, floating Azure/Terraform/CI-CD cards, Open to Work badge
2. About — summary + stats grid
3. Technical Skills — 7 cards including Prompt Engineering
4. Ongoing Projects — AI-Powered Azure Infrastructure, Sanshri Consumer Products
5. Projects — Terraform CI/CD Pipeline, Green Eco Drycleaners
6. Experience — DevOps Intern, Club Head, B.Tech CSE
7. Certifications — Git, SQL, DSA, Azure (AZ-900)
8. Contact — Email, Phone, WhatsApp, LinkedIn, GitHub, Resume download

## Tech Stack

The portfolio intentionally uses no React/Tailwind because the requirement is HTML5 + modern CSS + vanilla JavaScript, optimized for GitHub Pages.
