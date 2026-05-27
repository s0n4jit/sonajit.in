import { SkillCategory, Experience, Education, Certification } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Engineering",
    skills: [
      { name: "Python", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
      { name: "System Automation", level: "Intermediate" }
    ]
  },
  {
    name: "Infrastructure",
    skills: [
      { name: "Unix/Linux Systems", level: "Intermediate" },
      { name: "Network Architecture", level: "Intermediate" }
    ]
  },
  {
    name: "Security Engineering",
    skills: [
      { name: "Traffic Analysis", level: "Intermediate" },
      { name: "Vulnerability Research", level: "Beginner" },
      { name: "Incident Response", level: "Intermediate" },
      { name: "Hardening Protocols", level: "Intermediate" }
    ]
  },
  {
    name: "Networking",
    skills: [
      { name: "L2/L3 Fundamentals", level: "Intermediate" },
      { name: "Protocol Security", level: "Intermediate" }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Cybersecurity Intern",
    organization: "ENCODERSPRO Private Limited",
    program: "ECSIP 2025",
    duration: "June 2025 – July 2025",
    focusAreas: [
      "Digital Forensics & Incident Response",
      "SOC Operations & Monitoring",
      "Open Source Intelligence (OSINT)",
      "Vulnerability Assessment & Penetration Testing",
      "Infrastructure Security Auditing"
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor's in Computer Science",
    institution: "Pandit Deendayal Upadhyaya Adarsha Mahavidyalaya",
    duration: "2024 – 2028",
    status: "Pursuing",
    description: "Focusing on core computer science principles with a growing interest in cybersecurity applications. The curriculum covers a wide range of topics from foundational programming and algorithms to advanced network security and ethical hacking. My coursework is designed to provide a strong theoretical base and practical skills to tackle modern technological challenges. I'm also actively involved in cybersecurity clubs and competitions to further hone my expertise in this specialized field.",
    focusAreas: ["Data Structures", "Algorithms", "Cybersecurity Foundations"]
  },
  {
    degree: "Diploma in Computer Science application",
    institution: "Private Institution",
    duration: "2024 – 2025",
    status: "Completed",
    description: "Supplementary diploma program to enhance practical computer science skills, covering office productivity suites, database management, and basic web development.",
    focusAreas: ["Practical Programming", "System Administration"]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "CCNA (200-301)",
    issuer: "Cisco",
    date: "Expected 2027",
    status: "In Progress",
    description: "Currently preparing for the Cisco Certified Network Associate exam, covering network fundamentals, IP connectivity, security fundamentals, and automation."
  },
  {
    name: "CRTA (Certified Red Team Analyst)",
    issuer: "Altered Security",
    date: "Expected 2027",
    status: "In Progress",
    description: "In-depth training on Active Directory security, focusing on reconnaissance, enumeration, and exploitation within enterprise environments."
  }
];

export const TITLES = [
  "Security Architect",
  "Systems Researcher",
  "Infrastructure Engineer",
  "Cybersecurity Specialist"
];

export const GITHUB_USERNAME = "son4jit";

// Public blog URL used by client components. GitHub repo settings stay server-side in env.
export const BLOG_EXTERNAL_URL = process.env.NEXT_PUBLIC_BLOG_EXTERNAL_URL || "https://blog.sonajit.in";
