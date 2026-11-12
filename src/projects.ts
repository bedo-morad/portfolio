import type { Project } from './types/project';

export const projects: readonly Project[] = [
  {
    slug: 'bookverse',
    diagram: 'bookverse',
    name: 'BookVerse',
    category: 'Book sharing',
    summary:
      "A social library. Members share their shelves, borrow each other's books, and return them once the owner approves.",
    tech: ['Spring Boot', 'Angular', 'PostgreSQL', 'Spring Security', 'JWT'],
    role: 'Solo project',
    scope: 'Backend and Angular interface',
    status: 'Prototype. No public demo.',
    intro:
      "BookVerse is a social library. Members mark the books they are willing to lend, and other members borrow them. Once a book is out it leaves the owner's collection and stays out until the owner approves the return. Signing up sends an activation email, and nothing on the site works until that link is opened.",
    features: [
      [
        'Accounts with email activation',
        'Registration sends a link. The account cannot sign in until it is opened.',
      ],
      [
        'Lending and borrowing',
        'A member marks a book as shared, and it shows up in the collection other members can borrow from.',
      ],
      [
        'Returns need approval',
        'The reader marks the book as returned, and the owner approves before it becomes available again.',
      ],
      [
        'Feedback on shared books',
        'Members can leave feedback on books that have been shared.',
      ],
    ],
    architecture:
      'The Angular app talks to a Spring Boot REST API. The API issues its own JWTs, and Spring Security checks one on every request. JPA maps the entities to PostgreSQL. Docker Compose brings up the database and MailDev, which catches the activation emails while you develop.',
    repos: [
      {
        label: 'BookVerse repository',
        url: 'https://github.com/bedo-morad/BookVerse',
      },
    ],
    screenshot: null,
  },
  {
    slug: 'easy-buy',
    diagram: 'easy-buy',
    name: 'Easy-Buy',
    category: 'E-commerce backend',
    summary:
      'An e-commerce backend split into microservices, with Kafka passing events between them and Keycloak handling login.',
    tech: [
      'Java',
      'Spring Boot',
      'Spring Cloud',
      'Kafka',
      'Keycloak',
      'PostgreSQL',
      'MongoDB',
    ],
    role: 'Solo project',
    scope: 'Backend microservices',
    status: 'Backend project. No public demo.',
    intro:
      'Easy-Buy is an e-commerce backend split into eight services. A customer sends an order to the gateway. The order service checks that the customer exists, asks the product service to take the stock out, records the order lines, requests payment, and publishes a confirmation. The notification service picks that up and emails the customer. Keycloak handles login, and the services keep their data in PostgreSQL and MongoDB.',
    features: [
      [
        'Checkout across services',
        'Creating an order calls the customer and product services, saves the order lines, requests payment, then publishes a Kafka event.',
      ],
      [
        'Stock checked during the purchase',
        'The product service refuses the order when the quantity is not available, so stock cannot go negative.',
      ],
      [
        'Emails from events',
        'The notification service consumes order and payment events and sends the matching email template.',
      ],
      [
        'Configuration and discovery',
        'A config server holds the shared settings and Eureka registers each service, so URLs and ports live in one place.',
      ],
    ],
    architecture:
      'Requests go through the API gateway, where the Keycloak token check starts. Behind it, each service registers with Eureka and reads its settings from the config server; an order is put together with OpenFeign for the customer lookup and RestTemplate for the product purchase. Payment and order events both go to Kafka, and the notification service turns them into email.',
    repos: [
      {
        label: 'Easy-Buy repository',
        url: 'https://github.com/bedo-morad/Easy-Buy',
      },
    ],
    screenshot: null,
  },
  {
    slug: 'swiftchat',
    diagram: 'swiftchat',
    name: 'SwiftChat',
    category: 'Real-time messaging',
    summary:
      'One-to-one chat with real-time messages, image attachments, and emoji over WebSockets.',
    tech: [
      'Spring Boot',
      'Angular',
      'PostgreSQL',
      'Keycloak',
      'STOMP',
      'WebSockets',
    ],
    role: 'Solo project',
    scope: 'Backend and Angular interface',
    status: 'Designed for local development. No public demo.',
    intro:
      'SwiftChat is a one-to-one messaging app. You sign in through Keycloak, pick a conversation from the sidebar, and messages arrive without a refresh. Images upload to the backend and are served back in the thread.',
    features: [
      [
        'Per-user message delivery',
        'Each signed-in user keeps a STOMP subscription open, so a message lands in the open thread and in the sidebar preview at once.',
      ],
      [
        'Presence and read state',
        'The conversation list shows who is online and how many messages are unread. A message shows as sent, then seen, once the other person opens the thread.',
      ],
      [
        'Images and emoji',
        'Attach an image to a message; the API stores the file and serves it back. The composer has an emoji picker.',
      ],
      [
        'Accounts through Keycloak',
        'Keycloak owns the accounts and issues the tokens. The API creates its local user record on first login.',
      ],
    ],
    architecture:
      "Keycloak authenticates the browser, and the backend syncs the user on first login. The client keeps a STOMP subscription over SockJS for notifications and uses bearer-token REST for everything else. Messages live in PostgreSQL and attachments are written to local storage. The Angular services and models are generated from the API's OpenAPI document with ng-openapi-gen.",
    repos: [
      {
        label: 'SwiftChat repository',
        url: 'https://github.com/bedo-morad/SwiftChat',
      },
    ],
    screenshot: {
      src: '/images/swiftchat-workspace.png',
      alt: 'SwiftChat workspace with a conversation list and welcome screen.',
      source:
        'https://github.com/bedo-morad/SwiftChat/blob/master/docs/screenshots/workspace.png',
    },
  },
  {
    slug: 'masa2o-ta7ady',
    diagram: 'masa2o-ta7ady',
    name: 'Masa2o-Ta7ady',
    category: 'Football game night',
    summary:
      'An Arabic football game night: get your friends together, split into two teams, and find out who actually remembers all that football trivia.',
    tech: [
      'Java 17',
      'Spring Boot',
      'Angular',
      'PostgreSQL',
      'JPA',
      'Flyway',
      'Docker',
    ],
    role: 'Solo project',
    scope: 'Backend, Angular interface, and question imports',
    status: 'Live at ta7ady.abdalrahman.tech.',
    intro:
      'Masa2o Ta7ady is a football game-night app for a room full of friends, in Arabic. One person runs it as referee on a phone and everyone else plays in the room without an account. Ten games cover different kinds of arguing, from Password and Acting to Risk and Ana Meen, and the referee holds the answers, the timers, and the scores.',
    features: [
      [
        'Ten games in one flow',
        'Pick a challenge, name the teams, play, award points. Password uses a one-word hint, Acting has no words at all, Offside asks for a name nobody else picked, and Risk lets a team bet points on a category.',
      ],
      [
        'Referee controls',
        'The referee sees the answers, runs the timers, awards points, and can correct the score mid-game.',
      ],
      [
        'Arabic, right to left',
        'The interface is Arabic and RTL, with light and dark themes.',
      ],
      [
        'Question management',
        'Add questions by hand or import a JSON pack. The importer previews the rows and lets you fix or drop bad entries before saving, and admin mode unlocks editing and deleting.',
      ],
    ],
    architecture:
      'The referee screen is Angular, calling a Spring Boot API. Each game sits behind its own controller and service, reading questions from PostgreSQL through JPA, with Flyway applying the schema on startup. Scores, the picked list, and the wheel state live in the browser, so the server only serves questions.',
    repos: [
      {
        label: 'Masa2o-Ta7ady repository',
        url: 'https://github.com/bedo-morad/Masa2o-Ta7ady',
      },
    ],
    demo: {
      label: 'Play Masa2o-Ta7ady',
      url: 'https://ta7ady.abdalrahman.tech',
    },
    screenshot: {
      src: '/images/masa2o-main-menu.png',
      alt: 'Masa2o-Ta7ady main menu from the football game-night application.',
      source:
        'https://github.com/bedo-morad/Masa2o-Ta7ady/blob/master/docs/screenshots/main-menu.png',
    },
  },
  {
    slug: 'heimdall',
    diagram: 'heimdall',
    name: 'Heimdall',
    category: 'Smart door lock',
    summary:
      'A smart door lock built by our graduation team. My part was the Python running on the Raspberry Pi.',
    tech: ['Python', 'Raspberry Pi', 'Keypad', 'Sensors', 'Camera', 'Firebase'],
    role: 'Team graduation project',
    scope: 'Raspberry Pi side only',
    status: 'Team project. My part was the Raspberry Pi side.',
    intro:
      'Heimdall was our graduation project: a smart door lock. I wrote the Python that runs on the Raspberry Pi, and the Flutter app belonged to the rest of the team. The Pi reads a keypad for the code, watches for anyone standing at the door, takes photos, and drives the lock, the LEDs, and the buzzer.',
    features: [
      [
        'Keypad entry',
        'The Pi scans a 4x4 keypad, compares what was typed against the password stored in Firebase, and opens the magnetic lock when it matches. A wrong code gets three short buzzes.',
      ],
      [
        'Control from the app',
        'The Pi subscribes to its node in the Firebase Realtime Database, so the app can open or close the lock, change the password, or move the camera line while the program is running.',
      ],
      [
        'Motion and photo capture',
        'Motion at the PIR sensor, the IR sensor, or the ultrasonic sensor within a metre starts a capture. Up to thirty frames containing a face go to Firebase Storage, and a push notification follows with the image links.',
      ],
      [
        'The camera line',
        'The app places a line on the camera frame. When a detected face crosses it, the buzzer sounds and a capture is uploaded.',
      ],
    ],
    architecture:
      "The Pi script is the whole device side. It signs into Firebase Auth with the lock's own account, then streams its node in the Realtime Database and acts on whatever changes. GPIO drives the keypad grid, the lock, the buzzer, the LEDs, and the sensors; Picamera2 feeds frames to OpenCV's Haar cascade for face detection. Alerts go to Firestore and out through an FCM topic named after the lock.",
    repos: [
      {
        label: 'Heimdall-RaspberryPi',
        url: 'https://github.com/bedo-morad/Heimdall-RaspberryPi',
      },
      {
        label: 'Heimdall-Raspberry-Pi',
        url: 'https://github.com/bedo-morad/Heimdall-Raspberry-Pi',
      },
      {
        label: 'Heimdall-App (team context)',
        url: 'https://github.com/bedo-morad/Heimdall-App',
      },
    ],
    screenshot: null,
  },
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
