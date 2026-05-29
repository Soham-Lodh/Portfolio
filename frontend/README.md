# Portfolio Frontend

A professional portfolio website built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v3** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D particle effects
- **Lucide React** - Icons
- **Axios** - HTTP client

## Features

- Responsive design (mobile-first, 375px to 1920px)
- Dark theme with custom color system
- Liquid glass effect components
- 3D particle background animation
- Project filtering by domain (Web Development, AI/ML)
- Contact form with validation
- Smooth scroll animations
- Timeline visualizations
- SEO optimized

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
VITE_API_BASE_URL=http://localhost:4000/api
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## API Integration

The frontend connects to the backend API for:
- **GET /api/user/projects** - Fetch all projects
- **GET /api/user/projects?domain=Web%20Development** - Filter by domain
- **POST /api/user/contact** - Send contact messages

## Sections

- **Navbar** - Fixed navigation with smooth scroll
- **Hero** - Full viewport with 3D particle animation
- **About** - Biography and stats
- **Skills** - Categorized technical skills
- **Projects** - Portfolio grid with domain filtering
- **Experience** - Timeline of work experience
- **Education** - Academic journey with light effect
- **Certifications** - Credentials grid
- **Contact** - Contact form and details
- **Footer** - Site information and links

## Color Palette

- `--bg-deep`: #361d32 (Primary background)
- `--bg-mid`: #543c52 (Cards, surfaces)
- `--accent-red`: #f55951 (CTAs, highlights)
- `--text-light`: #edd2cb (Body text)
- `--text-lightest`: #f1e8e6 (Headings)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
