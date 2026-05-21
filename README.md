# Saurabh Salve Portfolio

A modern personal portfolio website built with React and Vite. The project includes a multi-section landing page, blog pages, skill and project showcases, theme toggling, custom cursor styling, and contact integration with EmailJS.

## Features

- React + Vite single-page application
- Responsive portfolio sections: Hero, About, Projects, Experience, Education, Certifications, Achievements
- Blog listing and individual blog post pages
- Theme toggle (light/dark)
- Custom animated cursor
- Contact form integration with EmailJS
- Smooth scroll/reveal animations
- Modular component structure

## Tech Stack

- React
- Vite
- React Router DOM
- EmailJS Browser SDK

## Project Structure

- `src/App.jsx` — main application entry and router setup
- `src/main.jsx` — app bootstrap
- `src/index.css` — global styles
- `src/components/` — reusable UI components
- `src/pages/` — blog listing and blog post pages
- `src/context/ThemeContext.jsx` — theme provider
- `src/data/` — static portfolio, skills, projects, and blog data
- `src/hooks/` — custom hooks for cursor and scroll reveal logic

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or yarn installed

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal to preview the portfolio.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Notes

- Make sure EmailJS is configured correctly if you want the contact form to send messages.
- The repository is currently configured as a private portfolio project.

## License

This project does not include a license file by default. Add one if you want to make the project open source.
