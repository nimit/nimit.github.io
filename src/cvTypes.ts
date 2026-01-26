type Bullets = Array<string>;
// type Stack = Record<string, string>;
type DateStr = "Present" | `${string}-${string}` | `${string}-${string}-${string}`;
type Tech = keyof typeof TECH;

export interface CV {
  basics: Basics;
  skills: Array<Skill>;
  work?: Array<Work>;
  education?: Array<Education>;
  publications?: Array<Publication>;
  interests?: Array<Interests>;
  projects?: Array<Project>;
  references?: Array<Reference>;
  certificates?: Array<Certificate>;
  languages?: Array<Language>;
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone?: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Array<Profile>;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  address?: string;
  postalCode?: string;
}

export interface Profile {
  icon: string;
  network: string;
  username: string;
  url: string;
}

export interface Work {
  name: string;
  url: string;
  startDate: DateStr;
  endDate: DateStr;
  position: string;
  location: Location;
  highlight: string; // Succinct summary/highlight to display in a collapsed format
  responsibilities: Bullets;
  additionalResponsibilities?: Bullets; // Display only if necessary,
  stack: Array<Tech>;
}

export interface Skill {
  name: Tech,
  level: string;
  keywords: Array<string>;
}

export interface Certificate {
  name: string;
  date: DateStr;
  issuer: string;
  url: string;
}

export interface Publication {
  name: string;
  publisher: string;
  releaseDate: DateStr;
  url: string;
  summary: string;
}

export interface Education {
  institution: string;
  college: string;
  url?: string;
  level: "undergraduate" | "graduate";
  degree: string;
  studyType: "full-time" | "part-time";
  startDate: DateStr;
  endDate: DateStr;
  gpa: number;
  courses?: Array<string>;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Project {
  name: string;
  isActive: boolean;
  type: "personal" | "research" | "opensource" | "course";
  stack: Array<Tech>;
  description: string;
  highlights: Bullets;
  url?: string;
  github?: string;
  startDate: DateStr;
  endDate: DateStr;
}

export interface Interests {
  name: string;
  keywords: Array<string>;
}

export interface Reference {
  name: string;
  reference: string;
}

const TECH = {
  // Languages
  "Java": "simple-icons:java",
  "Python": "mdi:language-python",
  "JavaScript": "mdi:language-javascript",
  "SQL": "mdi:database",
  "HTML": "mdi:language-html5",
  "CSS": "mdi:language-css3",
  "Rust": "simple-icons:rust",
  "Bash": "mdi:console",

  // Technologies
  "MongoDB": "simple-icons:mongodb",
  "Flutter": "simple-icons:flutter",
  "SQLite": "simple-icons:sqlite",
  "TFLite": "simple-icons:tensorflow",
  "Node.js": "simple-icons:nodedotjs",
  "PostgreSQL": "simple-icons:postgresql",
  "Redis": "simple-icons:redis",
  "Spring Boot": "simple-icons:spring",
  "PyTorch": "simple-icons:pytorch",
  "Pandas": "simple-icons:pandas",
  "NumPy": "simple-icons:numpy",
  "Kafka": "simple-icons:apachekafka",
  "Distributed Systems": "mdi:server-network",
  "Express.js": "simple-icons:express",
  "Vector Database": "mdi:vector-point",
  "DeepSpeed": "mdi:lightning-bolt",
  "Bootstrap": "simple-icons:bootstrap",
  "NLP": "mdi:chat-processing",
  "Flask": "simple-icons:flask",
  "Hugging Face": "simple-icons:huggingface",
  "BERT": "mdi:robot-outline",
  "Mamba": "mdi:snake",

  // Dev Tools
  "Git": "mdi:git",
  "Docker": "simple-icons:docker",
  "Firebase": "simple-icons:firebase",
  "Google Cloud Platform (GCP)": "simple-icons:googlecloud",
  "Amazon Web Services (AWS)": "simple-icons:amazonaws",
  "Linux": "simple-icons:linux",

  // Other
  "Networks": "mdi:network",
  "Raspberry Pi": "simple-icons:raspberrypi",
  "Regular Expressions": "mdi:regex",
  "Hashcat": "mdi:lock-pattern",
  "Security": "mdi:security",
  "Provisioning": "mdi:cogs",
  "Orchestration": "mdi:cloud-sync",
} as const;