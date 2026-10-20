import type { Project } from './types/project';

export const projects: readonly Project[] = [
  {
    slug: 'bookverse', diagram: 'bookverse', name: 'BookVerse', category: 'Book sharing',
    summary: 'A book-sharing prototype with borrowing, returns, reader feedback, and email account activation.',
    tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Spring Security', 'JWT'],
    role: 'Solo project', scope: 'Backend and Angular interface', status: 'Prototype. No public demo.',
    intro: 'Members can share books, borrow from other readers, manage returns, and leave feedback. Registration includes email account activation.',
    features: [
      ['Book management', 'Create, update, share, and archive books in a personal collection.'],
      ['Borrowing and returns', 'Check availability, borrow a book, and manage its return with owner approval.'],
      ['Reader feedback', 'Leave feedback on shared books.'],
      ['Account access', 'Activate an account by email, then use JWT authentication secured with Spring Security.']
    ],
    architecture: 'The Angular web interface calls a Spring Boot REST API. Spring Security validates custom JWTs, and Spring Data JPA connects the API to PostgreSQL.',
    repos: [{ label: 'BookVerse repository', url: 'https://github.com/bedo-morad/BookVerse' }],
    screenshot: null
  },
  {
    slug: 'easy-buy', diagram: 'easy-buy', name: 'Easy-Buy', category: 'E-commerce backend',
    summary: 'An e-commerce backend split into Spring Cloud microservices.',
    tech: ['Java', 'Spring Boot', 'Spring Cloud', 'Kafka', 'Keycloak', 'PostgreSQL', 'MongoDB'],
    role: 'Solo project', scope: 'Backend microservices', status: 'Backend project. No public demo.',
    intro: 'An e-commerce backend with gateway routing, service discovery, centralized configuration, and Kafka messaging. Keycloak handles authentication; services use PostgreSQL and MongoDB.',
    features: [
      ['Gateway routing', 'An API gateway routes requests to the backend services.'],
      ['Service infrastructure', 'Spring Cloud provides service discovery and centralized configuration.'],
      ['Event messaging', 'Kafka supports messaging between services.'],
      ['Authentication and storage', 'Keycloak manages authentication. PostgreSQL and MongoDB provide data storage.']
    ],
    architecture: 'The backend combines a gateway, Spring Boot services, and Spring Cloud infrastructure. Kafka provides event messaging; Keycloak handles authentication. PostgreSQL and MongoDB serve the persistence layer.',
    repos: [{ label: 'Easy-Buy repository', url: 'https://github.com/bedo-morad/Easy-Buy' }],
    screenshot: null
  },
  {
    slug: 'swiftchat', diagram: 'swiftchat', name: 'SwiftChat', category: 'Real-time messaging',
    summary: 'A real-time chat application designed for local development.',
    tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Keycloak', 'STOMP', 'WebSockets'],
    role: 'Solo project', scope: 'Backend and Angular interface', status: 'Designed for local development. No public demo.',
    intro: 'An Angular chat interface with a Spring Boot backend. Messages use STOMP over WebSockets, authentication uses Keycloak, and application data is stored in PostgreSQL.',
    features: [
      ['Real-time messaging', 'STOMP over WebSockets supports communication between the client and backend.'],
      ['Authenticated access', 'Keycloak handles authentication for the application.'],
      ['Web interface', 'An Angular frontend provides the chat interface.'],
      ['Local development', 'The project is designed to run in a local development environment.']
    ],
    architecture: 'The Angular client connects to the Spring Boot backend using STOMP over WebSockets for real-time messaging. Keycloak handles authentication and PostgreSQL stores application data.',
    repos: [{ label: 'SwiftChat repository', url: 'https://github.com/bedo-morad/SwiftChat' }],
    screenshot: { src: '/images/swiftchat-workspace.png', alt: 'SwiftChat workspace with a conversation list and welcome screen.', source: 'https://github.com/bedo-morad/SwiftChat/blob/master/docs/screenshots/workspace.png' }
  },
  {
    slug: 'masa2o-ta7ady', diagram: 'masa2o-ta7ady', name: 'Masa2o-Ta7ady', category: 'Football game night',
    summary: 'A football game-night application run by a referee.',
    tech: ['Java 17', 'Spring Boot', 'Angular', 'PostgreSQL', 'JPA', 'Flyway', 'Docker'],
    role: 'Solo project', scope: 'Backend, Angular interface, and question imports', status: 'No public demo or verified live deployment.',
    intro: 'A referee-led football game-night application with game and question management. The project covers the Spring Boot backend, Angular interface, and question imports.',
    features: [
      ['Referee-led games', 'A referee runs the game through the application.'],
      ['Question management', 'Manage questions and import question data.'],
      ['Application storage', 'PostgreSQL stores data, JPA provides persistence, and Flyway manages database migrations.'],
      ['Repository setup', 'Docker and deployment configuration are included in the repository.']
    ],
    architecture: 'The Angular interface connects to the Spring Boot backend. JPA provides access to PostgreSQL, with Flyway managing database migrations. Docker configuration is included for the project environment.',
    repos: [{ label: 'Masa2o-Ta7ady repository', url: 'https://github.com/bedo-morad/Masa2o-Ta7ady' }],
    screenshot: { src: '/images/masa2o-main-menu.png', alt: 'Masa2o-Ta7ady main menu from the football game-night application.', source: 'https://github.com/bedo-morad/Masa2o-Ta7ady/blob/master/docs/screenshots/main-menu.png' }
  },
  {
    slug: 'heimdall', diagram: 'heimdall', name: 'Heimdall', category: 'Smart door lock',
    summary: 'A team-built smart door-lock graduation project, with a focus on the Raspberry Pi side.',
    tech: ['Python', 'Raspberry Pi', 'Keypad', 'Sensors', 'Camera', 'Firebase'],
    role: 'Team graduation project', scope: 'Raspberry Pi side only', status: 'Related repositories grouped below. No public demo.',
    intro: 'A smart door-lock graduation project developed by a team. The Raspberry Pi contribution uses Python with a keypad, sensors, a camera, and Firebase. The companion Flutter app belongs to the wider team project and falls outside this contribution.',
    features: [
      ['Raspberry Pi software', 'Python code for the device side of the smart door lock.'],
      ['Hardware integration', 'Work with the keypad, sensors, and camera connected to the Raspberry Pi.'],
      ['Firebase integration', 'Firebase is included in the Raspberry Pi software.'],
      ['Team boundaries', 'The related app repository is included for project context. The portfolio contribution is limited to the Raspberry Pi side.']
    ],
    architecture: 'The diagram shows the components within the Raspberry Pi contribution. The companion app belongs to the wider team project and is not represented as individual work.',
    repos: [
      { label: 'Heimdall-RaspberryPi', url: 'https://github.com/bedo-morad/Heimdall-RaspberryPi' },
      { label: 'Heimdall-Raspberry-Pi', url: 'https://github.com/bedo-morad/Heimdall-Raspberry-Pi' },
      { label: 'Heimdall-App (team context)', url: 'https://github.com/bedo-morad/Heimdall-App' }
    ],
    screenshot: null
  }
];

// Duplicate routes would silently overwrite a project in the generated site.
const slugs = new Set<string>();
for (const project of projects) {
  if (slugs.has(project.slug)) {
    throw new Error(`Duplicate project slug: ${project.slug}`);
  }
  slugs.add(project.slug);
  if (project.screenshot && !project.screenshot.alt.trim()) {
    throw new Error(`Missing screenshot description: ${project.slug}`);
  }
}
