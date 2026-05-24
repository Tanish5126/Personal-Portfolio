# Tanish Gawade — Personal Portfolio

A clean, minimal single-page portfolio website built with **React**, featuring smooth scroll navigation, a sticky navbar with scroll-spy, and fully responsive layout.

Deployed link :- https://personal-portfolio-gules-seven.vercel.app/

---

## Preview

> Live sections: Home · About · Skills · Portfolio · Contact

---

## Tech Stack

- **React** (Vite or Create React App)
- **Plain CSS** (no frameworks)
- **Google Fonts** — Cormorant Garamond + DM Sans
- **Inline SVG icons**

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Sticky navbar with scroll-spy & mobile menu
│   ├── Navbar.css       # Navbar styles + CSS variables + Google Fonts import
│   ├── Portfolio.jsx    # All 5 page sections + profile data
│   └── Portfolio.css    # All section styles
└── App.jsx              # Root — just renders <Portfolio />
```

---

## Getting Started

### 1. Create a React app (if you haven't already)

```bash
npm create vite@latest my-portfolio -- --template react
cd my-portfolio
```

### 2. Drop in the files

Copy the 4 files into `src/components/`:

```
Navbar.jsx
Navbar.css
Portfolio.jsx
Portfolio.css
```

### 3. Update App.jsx

```jsx
import Portfolio from './components/Portfolio';

export default function App() {
  return <Portfolio />;
}
```

### 4. Run the dev server

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Customisation

All personal data lives in the `profile` object at the top of `Portfolio.jsx`. Edit it to make the site yours.

### Your info

```js
const profile = {
  name:     "Your Name",
  initials: "YN",              // shown in the avatar circle
  role:     "Your Role",
  location: "Your City, India",
  email:    "you@example.com",
  github:   "github.com/yourusername",       // no https://
  linkedin: "linkedin.com/in/yourusername",  // no https://
  bio1:     "First paragraph...",
  bio2:     "Second paragraph...",
  ...
}
```

### Skills

Each skill has a `name` and a `pct` (0–100) that controls the progress bar width:

```js
{ name: "React", pct: 55 }
```

### Projects

```js
{
  id: 1,
  name: "Project Name",
  category: "Web",          // used by the filter buttons
  year: "2025",
  description: "What it does...",
  stack: ["HTML", "CSS"],
  status: "Live",           // "Live" | "Open Source" | "Beta"
  link: "https://github.com/yourusername/repo",
}
```

### Changing the font

Open `Navbar.css` and replace the `@import` line at the top. Then update the two CSS variables:

```css
--font-display: 'Your Display Font', serif;
--font-body:    'Your Body Font', sans-serif;
```

**Recommended pairings (copy-paste ready):**

```css
/* Sharp & Modern */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

/* Minimal & Technical */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
```

### Changing the accent colour

Find `--terra` in `Navbar.css` and update it:

```css
--terra: #c0614a;  /* default terracotta — change to anything */
```

---

## Features

| Feature | Details |
|---|---|
| Sticky navbar | Frosted glass effect, border appears on scroll |
| Scroll-spy | Active nav link updates as you scroll |
| Smooth scroll | Clicking any nav link scrolls to that section |
| Mobile menu | Hamburger that animates open/close |
| Project filter | Filter cards by category (Web, C++, etc.) |
| Contact form | Shows a success state on submit |
| Responsive | Works on mobile, tablet, and desktop |

---

## Navbar Links

The navbar uses `IntersectionObserver` to detect which section is in view and highlights the matching link automatically. Clicking any link calls `scrollIntoView` with `behavior: "smooth"`.

Sections must have these exact IDs for it to work:

```
id="home"
id="about"
id="skills"
id="portfolio"
id="contact"
```

---

## Deployment

### Deploy to GitHub Pages (free)

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:

```json
"homepage": "https://yourusername.github.io/my-portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Then run:

```bash
npm run deploy
```

### Deploy to Vercel (even easier)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy — done

---

## License

Feel free to use this as a base for your own portfolio. If you found it helpful, a ⭐ on GitHub is always appreciated!

---

*Built by Tanish Gawade — 1st Year B.Tech CS, ITM Skills University, Navi Mumbai*
