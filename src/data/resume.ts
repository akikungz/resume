export interface SocialLink {
  platform: "github" | "linkedin" | "twitter" | "website" | "email" | string;
  url: string;
  label: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description?: string;
}

export interface ProjectItem {
  title: string;
  role?: string;
  description: string;
  period: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
}

export interface ResumeData {
  name: string;
  title: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
  socials: SocialLink[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: SkillCategory[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}

export const resumeData: ResumeData = {
  name: "Thitipong Tapianthong",
  title: "Programmer / Network Engineer",
  avatarUrl: "./profile.jpg",
  email: "thitipong.t@proton.me",
  phone: "(+66) 098-372-1725",
  location: "Prachinburi, Thailand",
  website: "https://resume.akikungz.uk",
  summary:
    "Recent graduate in Network Engineering with expertise spanning programming, network administration, and virtualization. Characterized by a strong ability to adapt to new technologies, I am committed to contributing to robust and efficient IT infrastructure solutions.",
  socials: [
    {
      platform: "github",
      url: "https://github.com/akikungz",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/thitipong-tapianthong-67b168265",
      label: "LinkedIn",
    },
  ],
  experience: [
    {
      company: "IT Green Public Company Limited",
      role: "Security Engineer (Intern)",
      period: "Apr - May 2025",
      location: "Bangkok, Thailand",
      description: [
        "Support client's network devices such as Firewall.",
        "Troubleshooting client's network issues.",
      ],
      technologies: [
        "Forcepoint",
        "Sophos",
        "PaloAlto",
        "TCP/IP",
        "Troubleshooting",
        "SD-WAN",
        "Firewall",
        "Data Loss Prevention",
      ],
    },
    {
      company: "FITM Elite (Group Work in University)",
      role: "Frontend Developer",
      period: "2023 - 2024",
      location: "Prachinburi, Thailand",
      description: [
        "Create a frontend for HAI Dashboard for analyzing detailed information about hospitals.",
        "Create a frontend for HA-PE for analyzing detailed data on satisfaction and trust in hospitals.",
      ],
      technologies: ["React", "Tailwind CSS", "TypeScript"],
    },
  ],
  education: [
    {
      institution: "King Mongkut's University of Technology North Bangkok",
      degree: "Bachelor of Engineering in Information and Network Engineering",
      period: "2022 - 2026",
      location: "Prachinburi, Thailand",
    },
  ],
  projects: [
    {
      title: "Portfolio & Resume Website",
      period: "2026",
      description:
        "A highly optimized, responsive portfolio and resume web application featuring smooth theme toggling and print-ready stylesheets. Architected with type-safe JSON data binding to ensure maintainability and compiled for edge delivery.",
      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Biome",
        "Cloudflare Pages",
      ],
      githubUrl: "https://github.com/akikungz/resume",
      liveUrl: "https://resume.akikungz.uk",
    },
    {
      title:
        "Cluster-Based Platform for Supporting Teaching and Academic Activities in the Department of Information Technology",
      period: "2025",
      description:
        "A virtual cluster platform designed to simplify and automate Linux VM provisioning for academic coursework and projects. It features an RBAC-enabled web interface for students and faculty, an API service for user and virtual machine orchestration, and a VM management backend interfacing with Proxmox to optimize server resource utilization.",
      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "Bun",
        "ElysiaJS",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Kubernetes",
        "Proxmox",
        "Nginx",
      ],
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "HTML & CSS"],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "ElysiaJS",
        "Tailwind CSS",
        "Prisma",
        "Bun",
      ],
    },
    {
      category: "Infrastructure & Tools",
      skills: [
        "PostgreSQL",
        "Redis",
        "Docker",
        "Git",
        "GitHub Actions",
        "Proxmox",
        "Linux",
        "Kubernetes",
        "VMware ESXi",
        "Nginx",
      ],
    },
    {
      category: "Network",
      skills: [
        "TCP/IP",
        "VLAN",
        "Subnetting",
        "DHCP",
        "DNS",
        "Routing",
        "Troubleshooting",
        "Wireless",
        "Firewall",
        "SD-WAN",
        "VPN",
        "Data Loss Prevention",
        "Cisco",
        "Forcepoint",
        "Sophos",
        "PaloAlto",
      ],
    },
  ],
  certifications: [],
  languages: [
    {
      language: "Thai",
      proficiency: "Native",
    },
    {
      language: "English",
      proficiency: "Basic",
    },
  ],
};
