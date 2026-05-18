
export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  organization: string;
  program?: string;
  duration: string;
  focusAreas: string[];
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  status: string;
  description?: string;
  focusAreas?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  status: string;
  description?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  demoLink?: string;
  image?: string;
  isLocal?: boolean;
  content?: string;
  date?: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
  topics: string[];
}

export interface BlogPost {
  title: string;
  date: string;
  summary: string;
  url: string;
  tags: string[];
  image?: string;
}
