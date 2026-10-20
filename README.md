# Abdelrahman Mosad portfolio

An English-language portfolio focused on Java and Spring Boot backend projects, including REST APIs, microservices, and real-time applications. Built as a static site with Astro.

## What's in the site

- A homepage with About, experience, education, projects, and contact sections.
- Five project detail pages with summaries, technology lists, architecture diagrams, and source repository links.
- A dark theme by default, a light theme switch, and a downloadable CV.
- Contact links, including [GitHub](https://github.com/bedo-morad) and [LinkedIn](https://www.linkedin.com/in/abdelrahman-mosad).

The listed projects do not have public live demos.

## Projects

| Project | Focus |
| --- | --- |
| [BookVerse](https://github.com/bedo-morad/BookVerse) | A book-sharing prototype with borrowing, returns, reader feedback, and email account activation. Spring Boot backend and Angular interface. |
| [Easy-Buy](https://github.com/bedo-morad/Easy-Buy) | An e-commerce backend using Spring Cloud microservices, Kafka messaging, and Keycloak authentication. |
| [SwiftChat](https://github.com/bedo-morad/SwiftChat) | A chat application for local development, with Spring Boot, Angular, and STOMP over WebSockets. |
| [Masa2o-Ta7ady](https://github.com/bedo-morad/Masa2o-Ta7ady) | A referee-led football game-night application with a Spring Boot backend, Angular interface, and question imports. |
| [Heimdall](https://github.com/bedo-morad/Heimdall-RaspberryPi) | A team smart door-lock graduation project. The portfolio contribution covers the Raspberry Pi side using Python, connected hardware, and Firebase. |

## Site stack

- Astro 7.4.1 with static output.
- TypeScript, HTML, and CSS, with browser-side scripts for navigation, theme switching, and interactions.
- Local fonts through Fontsource: Space Grotesk and IBM Plex Mono.

Java, Spring Boot, Angular, and the other technologies listed on the project pages describe the projects, not the portfolio site's runtime.

## Prerequisites

- Node.js >=22.22.0
- npm >=9.6.5

## Local development

Clone the repository and start the development server:

```sh
git clone https://github.com/bedo-morad/portfolio.git
cd portfolio
npm install
npm run dev
```

Open the local URL printed by Astro.

## Checks and production build

```sh
npm run check
npm run build
```

`npm run check` runs Astro's diagnostics. `npm run build` generates the static site in `dist/`.

## Browser regression tests

```sh
npm ci
npx playwright install --with-deps chromium
npm run build
npm test
```

Playwright starts the production preview automatically. Tests exercise all six routes, navigation and section anchors, theme persistence, gallery controls, and clipboard success and failure through the public UI on desktop and mobile Chromium. Clipboard-denial cases simulate browser API failures; application internals are not mocked. Run `npm run test:ui` to debug interactively.

GitHub Actions runs a clean install, diagnostics, a production build, and the browser suite. Failed runs retain the HTML report and traces for seven days. These are regression tests for existing behavior, not a replacement for cross-browser or visual review.

To preview the production build locally:

```sh
npm run preview
```

## Editing the site

- `src/pages/index.astro`: homepage content and sections.
- `src/projects.ts`: project descriptions, technologies, and repository links.
- `src/pages/projects/[slug].astro`: shared project detail page template.
- `src/layouts/Layout.astro`: shared layout, navigation, and theme behavior.
- `src/styles/`: site and project page styles.
- `public/`: static assets, including the CV and project screenshots.

## Source formatting

Run `npm run format` to format source files with Prettier and its Astro plugin, or `npm run format:check` to check without writing changes. Shared theme tokens live in `src/styles/global.css`; project-detail styles consume those same tokens.
