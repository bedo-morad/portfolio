export type ProjectFeature = readonly [title: string, body: string];

export interface ProjectRepository {
  readonly label: string;
  readonly url: `https://${string}`;
}

/** Identifiers supported by the architecture component, independent of route slugs. */
export type ArchitectureDiagram =
  | 'bookverse'
  | 'easy-buy'
  | 'swiftchat'
  | 'masa2o-ta7ady'
  | 'heimdall';

export interface ProjectScreenshot {
  readonly src: `/images/${string}`;
  readonly alt: string;
  readonly source: `https://${string}`;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly category: string;
  readonly summary: string;
  readonly tech: readonly string[];
  readonly role: string;
  readonly scope: string;
  readonly status: string;
  readonly intro: string;
  readonly features: readonly ProjectFeature[];
  readonly architecture: string;
  readonly diagram: ArchitectureDiagram;
  readonly repos: readonly ProjectRepository[];
  readonly screenshot: ProjectScreenshot | null;
}
