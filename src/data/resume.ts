export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'website' | 'email' | string;
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
  title: "Network Engineer",
  avatarUrl: "https://scontent.fbkk13-1.fna.fbcdn.net/v/t39.30808-6/277530061_1651949845153059_1882076327746208940_n.jpg?stp=dst-jpg_tt6&cstp=mx960x948&ctp=s960x948&_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LRAl6BMbA5sQ7kNvwHHkKmX&_nc_oc=Ado1O2pwD3c_DMtqnJLfEDsGaO_3rLSmDRBqbBWX07vSehy0wulThURgtXehoU5IC99ff4Dy2FZlu0oRf75-bCep&_nc_zt=23&_nc_ht=scontent.fbkk13-1.fna&_nc_gid=KQpE88TVGjmLvlOsFraGTQ&_nc_ss=7b2a8&oh=00_Af-XT53nmK4vqmiEfX9TSEk2tkrE9Lrdom4DzThKCxjt3Q&oe=6A43A73B",
  email: "thitipong.t@proton.me",
  phone: "(+66) 098-372-1725",
  location: "Prachinburi, Thailand",
  summary: "Recent graduate in Network Engineering with expertise spanning programming, network administration, and virtualization. Characterized by a strong ability to adapt to new technologies, I am committed to contributing to robust and efficient IT infrastructure solutions.",
  socials: [
    {
      platform: "github",
      url: "https://github.com/akikungz",
      label: "GitHub"
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
      technologies: [
        "React",
        "Tailwind CSS",
        "TypeScript",
      ]
    }
  ],
  education: [
    {
      institution: "King Mongkut's University of Technology North Bangkok",
      degree: "Bachelor of Engineering in Information and Network Engineering",
      period: "2022 - 2025",
      location: "Prachinburi, Thailand"
    }
  ],
  projects: [
    {
      title: "Cluster-Based Platform for Supporting Teaching and Academic Activities in the Department of Information Technology",
      period: "2025",
      description: "Create a frontend for Cloud-Based Platform analyzing detailed data on satisfaction and trust in hospitals.",
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Bun", "ElysiaJS", "PostgreSQL", "Redis", "Docker", "Kubernetes", "Proxmox", "Nginx"],
    }
  ],
  skills: [
    {
      category: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "HTML & CSS"]
    },
    {
      category: "Frameworks & Libraries",
      skills: ["React", "Next.js (App Router)", "Node.js", "Express", "ElysiaJS", "Tailwind CSS", "Prisma", "Bun"]
    },
    {
      category: "Infrastructure & Tools",
      skills: ["PostgreSQL", "Redis", "Docker", "Git", "GitHub Actions", "Proxmox", "Linux", "Kubernetes", "VMware ESXi", "Nginx"]
    },
    {
      category: "Network",
      skills: ["TCP/IP", "VLAN", "Subnetting", "DHCP", "DNS", "Routing", "Troubleshooting", "Wireless", "Firewall", "SD-WAN", "VPN", "Cisco", "Forcepoint", "Sophos", "PaloAlto"]
    },
  ],
  certifications: [

  ],
  languages: [
    {
      language: "Thai",
      proficiency: "Native Proficiency"
    },
    {
      language: "English",
      proficiency: "Conversational"
    }
  ]
};
