"use client";

import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  GraduationCap,
  Briefcase,
  Code,
  Moon,
  Sun,
  Printer,
  ExternalLink,
  X,
  FileJson,
  FileText,
} from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData.name.replace(/\s+/g, "_")}_Resume.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadTXT = () => {
    let txt = `${resumeData.name.toUpperCase()}\n`;
    txt += `${resumeData.title}\n`;
    txt += `${resumeData.location} | ${resumeData.phone} | ${resumeData.email}\n`;
    if (resumeData.website) {
      txt += `Website: ${resumeData.website}\n`;
    }
    txt += `\n${"=".repeat(80)}\n\n`;

    if (resumeData.summary) {
      txt += `PROFESSIONAL SUMMARY\n`;
      txt += `${"-".repeat(20)}\n`;
      txt += `${resumeData.summary}\n\n`;
    }

    txt += `WORK EXPERIENCE\n`;
    txt += `${"-".repeat(15)}\n`;
    for (const exp of resumeData.experience) {
      txt += `${exp.role} | ${exp.company}\n`;
      txt += `${exp.period} | ${exp.location}\n`;
      for (const bullet of exp.description) {
        txt += `- ${bullet}\n`;
      }
      txt += `Technologies: ${exp.technologies.join(", ")}\n\n`;
    }

    if (resumeData.projects && resumeData.projects.length > 0) {
      txt += `PROJECTS SHOWCASE\n`;
      txt += `${"-".repeat(17)}\n`;
      for (const proj of resumeData.projects) {
        txt += `${proj.title}${proj.role ? ` - ${proj.role}` : ""}\n`;
        txt += `${proj.period}\n`;
        txt += `${proj.description}\n`;
        txt += `Technologies: ${proj.technologies.join(", ")}\n`;
        if (proj.githubUrl) txt += `GitHub: ${proj.githubUrl}\n`;
        if (proj.liveUrl) txt += `Live Demo: ${proj.liveUrl}\n`;
        txt += `\n`;
      }
    }

    txt += `EDUCATION\n`;
    txt += `${"-".repeat(9)}\n`;
    for (const edu of resumeData.education) {
      txt += `${edu.degree}\n`;
      txt += `${edu.institution} | ${edu.period} | ${edu.location}\n`;
      if (edu.description) {
        txt += `${edu.description}\n`;
      }
      txt += `\n`;
    }

    txt += `SKILLS\n`;
    txt += `${"-".repeat(6)}\n`;
    for (const cat of resumeData.skills) {
      txt += `${cat.category}: ${cat.skills.join(", ")}\n`;
    }
    txt += `\n`;

    if (resumeData.certifications && resumeData.certifications.length > 0) {
      txt += `CERTIFICATIONS\n`;
      txt += `${"-".repeat(14)}\n`;
      for (const cert of resumeData.certifications) {
        txt += `${cert.title} - ${cert.issuer} (${cert.date})\n`;
        if (cert.url) txt += `Credential: ${cert.url}\n`;
      }
      txt += `\n`;
    }

    if (resumeData.languages && resumeData.languages.length > 0) {
      txt += `LANGUAGES\n`;
      txt += `${"-".repeat(9)}\n`;
      for (const lang of resumeData.languages) {
        txt += `${lang.language} (${lang.proficiency})\n`;
      }
      txt += `\n`;
    }

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <Github className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      case "twitter":
      case "x":
        return <Twitter className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  // Get initials for avatar if no URL is provided
  const initials = resumeData.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Filter projects by selected technology
  const filteredProjects = selectedTech
    ? resumeData.projects.filter((p) => p.technologies.includes(selectedTech))
    : resumeData.projects;

  // Render check for mounting to prevent hydration issues
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Control Panel (Web Only) */}
      <div className="no-print sticky top-0 z-50 border-b border-border bg-card-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-500"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted select-none">
              Interactive Resume
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card-bg text-foreground transition-all hover:bg-border/30 hover:scale-105 active:scale-95"
              aria-label="Toggle Dark Mode"
              title="Toggle Dark Mode"
            >
              {theme === "light" ? (
                <Moon className="h-4.5 w-4.5" />
              ) : (
                <Sun className="h-4.5 w-4.5" />
              )}
            </button>
            <button
              onClick={handlePrint}
              className="flex h-9 gap-2 items-center justify-center rounded-lg border border-border bg-accent text-white px-3 text-sm font-medium transition-all hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-xs"
              title="Print Resume (PDF)"
            >
              <Printer className="h-4.5 w-4.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={handleDownloadJSON}
              className="flex h-9 gap-2 items-center justify-center rounded-lg border border-border bg-card-bg text-foreground px-3 text-sm font-medium transition-all hover:bg-border/30 hover:scale-105 active:scale-95 shadow-xs"
              title="Download JSON (Machine Readable)"
            >
              <FileJson className="h-4.5 w-4.5 text-accent" />
              <span className="hidden md:inline">JSON</span>
            </button>
            <button
              onClick={handleDownloadTXT}
              className="flex h-9 gap-2 items-center justify-center rounded-lg border border-border bg-card-bg text-foreground px-3 text-sm font-medium transition-all hover:bg-border/30 hover:scale-105 active:scale-95 shadow-xs"
              title="Download TXT (Plain Text)"
            >
              <FileText className="h-4.5 w-4.5 text-accent" />
              <span className="hidden md:inline">TXT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Resume Container */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16 print:py-0 print:px-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 print:grid-cols-12 print:gap-6">
          {/* LEFT COLUMN: Sidebar (Bio, Info, Skills, Languages, Certs) */}
          <div className="lg:col-span-4 print:col-span-4 space-y-8 print:space-y-6">
            {/* Profile Intro Card */}
            <div className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left print:items-start print:text-left">
                {resumeData.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resumeData.avatarUrl}
                    alt={resumeData.name}
                    className="h-32 w-32 rounded-full object-cover border-2 border-accent shadow-md print:h-16 print:w-16 print:shadow-none"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl font-bold text-white shadow-md sm:h-24 sm:w-24 print:h-16 print:w-16 print:shadow-none select-none">
                    {initials}
                  </div>
                )}

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl print:text-xl">
                  {resumeData.name}
                </h1>
                <p className="mt-1.5 text-md font-semibold text-accent print:text-sm">
                  {resumeData.title}
                </p>

                {/* Contact List */}
                <div className="mt-6 w-full space-y-3 border-t border-border pt-6 text-sm text-muted print:mt-4 print:pt-4 print:space-y-2">
                  <div className="flex items-center gap-3 justify-center lg:justify-start print:justify-start">
                    <Mail className="h-4 w-4 shrink-0 text-accent print:text-black" />
                    <a
                      href={`mailto:${resumeData.email}`}
                      className="hover:text-accent transition-colors break-all"
                    >
                      {resumeData.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start print:justify-start">
                    <Phone className="h-4 w-4 shrink-0 text-accent print:text-black" />
                    <a
                      href={`tel:${resumeData.phone}`}
                      className="hover:text-accent transition-colors"
                    >
                      {resumeData.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start print:justify-start">
                    <MapPin className="h-4 w-4 shrink-0 text-accent print:text-black" />
                    <span>{resumeData.location}</span>
                  </div>
                  {resumeData.website && (
                    <div className="flex items-center gap-3 justify-center lg:justify-start print:justify-start">
                      <Globe className="h-4 w-4 shrink-0 text-accent print:text-black" />
                      <a
                        href={resumeData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors flex items-center gap-1 group print-no-link-attr"
                      >
                        {resumeData.website.replace(/^https?:\/\//, "")}
                        <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity no-print" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Badges */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start print:mt-4 print:gap-1.5 no-print">
                  {resumeData.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="print-no-link-attr inline-flex items-center gap-1.5 rounded-lg border border-border bg-card-bg/50 px-2.5 py-1.5 text-xs font-medium text-muted transition-all hover:border-accent hover:text-accent hover:scale-[1.03] print:border-none print:p-0 print:text-black print:font-normal"
                      title={social.label}
                    >
                      {getSocialIcon(social.platform)}
                      <span className="print:text-xs">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border print-avoid-break">
              <h2 className="flex items-center gap-2 border-b border-border pb-3 text-lg font-bold tracking-tight print:text-sm print:pb-1">
                <Code className="h-5 w-5 text-accent print:text-black print:h-4 print:w-4" />
                Skills
              </h2>
              <div className="mt-4 space-y-4 print:mt-2.5 print:space-y-3">
                {resumeData.skills.map((category) => (
                  <div
                    key={category.category}
                    className="space-y-2 print:space-y-1"
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted print:text-[10px]">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => {
                        const isSelected = selectedTech === skill;
                        return (
                          <button
                            key={skill}
                            onClick={() =>
                              setSelectedTech(isSelected ? null : skill)
                            }
                            className={`rounded-md px-2 py-1 text-xs font-medium transition-all no-print select-none cursor-pointer hover:scale-105 ${
                              isSelected
                                ? "bg-accent text-white shadow-xs"
                                : "bg-border/40 text-foreground hover:bg-border/80"
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                      {/* Separate simpler representation for print */}
                      <p className="hidden print:block text-xs text-foreground">
                        {category.skills.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            {resumeData.certifications &&
              resumeData.certifications.length > 0 && (
                <div className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border print-avoid-break">
                  <h2 className="flex items-center gap-2 border-b border-border pb-3 text-lg font-bold tracking-tight print:text-sm print:pb-1">
                    <Award className="h-5 w-5 text-accent print:text-black print:h-4 print:w-4" />
                    Certifications
                  </h2>
                  <div className="mt-4 space-y-4 print:mt-2.5 print:space-y-2">
                    {resumeData.certifications.map((cert) => (
                      <div key={cert.title} className="text-sm">
                        <h3 className="font-semibold text-foreground print:text-xs">
                          {cert.url ? (
                            <a
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent transition-colors inline-flex items-center gap-1 group print-no-link-attr"
                            >
                              {cert.title}
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity no-print" />
                            </a>
                          ) : (
                            cert.title
                          )}
                        </h3>
                        <div className="flex justify-between text-xs text-muted mt-0.5 print:text-[10px]">
                          <span>{cert.issuer}</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Languages Card */}
            {resumeData.languages && resumeData.languages.length > 0 && (
              <div className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border print-avoid-break">
                <h2 className="flex items-center gap-2 border-b border-border pb-3 text-lg font-bold tracking-tight print:text-sm print:pb-1">
                  <Globe className="h-5 w-5 text-accent print:text-black print:h-4 print:w-4" />
                  Languages
                </h2>
                <div className="mt-4 space-y-3 print:mt-2.5 print:space-y-1.5">
                  {resumeData.languages.map((lang) => (
                    <div
                      key={lang.language}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium text-foreground print:text-xs">
                        {lang.language}
                      </span>
                      <span className="text-xs text-muted print:text-[10px]">
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Profile, Experience, Projects, Education */}
          <div className="lg:col-span-8 print:col-span-8 space-y-8 print:space-y-6">
            {/* About / Summary Section */}
            {resumeData.summary && (
              <section className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border">
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl print:text-md">
                  Professional Summary
                </h2>
                <p className="mt-4 text-md leading-relaxed text-muted print:mt-2 print:text-xs">
                  {resumeData.summary}
                </p>
              </section>
            )}

            {/* Experience Section */}
            <section className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border">
              <h2 className="flex items-center gap-2 border-b border-border pb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl print:text-md print:pb-1.5">
                <Briefcase className="h-5 w-5 text-accent print:text-black print:h-4 print:w-4" />
                Work Experience
              </h2>

              <div className="relative mt-6 border-l border-border pl-6 space-y-8 print:mt-4 print:pl-4 print:space-y-5">
                {resumeData.experience.map((exp, idx) => (
                  <div
                    key={`${exp.company}-${idx}`}
                    className="relative print-avoid-break"
                  >
                    {/* Timeline Node */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 border-accent bg-background print:-left-[23px] print:h-3 print:w-3 print:border-black">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent print:bg-black print:h-1 print:w-1"></span>
                    </span>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-md font-bold text-foreground print:text-xs">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-accent print:text-xs print:text-muted mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-xs text-muted text-left sm:text-right print:text-[10px] print:text-right shrink-0 mt-0.5 sm:mt-0">
                        <div className="font-medium">{exp.period}</div>
                        <div>{exp.location}</div>
                      </div>
                    </div>

                    <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-muted print:mt-2 print:space-y-1 print:text-[11px]">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies Tagline */}
                    <div className="mt-4 flex flex-wrap gap-1.5 print:mt-2">
                      {exp.technologies.map((tech) => {
                        const isSelected = selectedTech === tech;
                        return (
                          <button
                            key={tech}
                            onClick={() =>
                              setSelectedTech(isSelected ? null : tech)
                            }
                            className={`rounded-md px-2 py-0.5 text-xs transition-all no-print select-none cursor-pointer ${
                              isSelected
                                ? "bg-accent text-white font-medium shadow-xs"
                                : "bg-border/30 text-muted hover:bg-border/60"
                            }`}
                          >
                            {tech}
                          </button>
                        );
                      })}
                      <span className="hidden print:inline text-xs text-muted font-medium">
                        Technologies: {exp.technologies.join(", ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            {resumeData.projects && resumeData.projects.length > 0 && (
              <section className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4 print:pb-1.5">
                  <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl print:text-md">
                    <Code className="h-5 w-5 text-accent print:text-black print:h-4 print:w-4" />
                    Projects Showcase
                  </h2>

                  {/* Active Filter Indicator */}
                  {selectedTech && (
                    <div className="no-print flex items-center gap-2 rounded-full bg-accent-muted px-3 py-1 text-xs font-semibold text-accent">
                      <span>Filtering: {selectedTech}</span>
                      <button
                        onClick={() => setSelectedTech(null)}
                        className="rounded-full hover:bg-accent/20 p-0.5 transition-colors cursor-pointer"
                        title="Clear Filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 print:grid-cols-1 print:gap-4">
                  {filteredProjects.map((project, idx) => (
                    <div
                      key={`${project.title}-${idx}`}
                      className="flex flex-col justify-between rounded-lg border border-card-border bg-background p-5 shadow-xs transition-all hover:border-accent hover:scale-[1.01] print:p-0 print:border-none print:bg-transparent print-avoid-break print-col-span-full"
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <h3 className="text-md font-bold text-foreground print:text-xs">
                            {project.title}
                            {project.featured && (
                              <span className="no-print ml-2 inline-flex items-center rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                                Featured
                              </span>
                            )}
                          </h3>

                          {/* Links (Web Only) */}
                          <div className="no-print flex items-center gap-2">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-accent transition-colors"
                                title="Source Code"
                              >
                                <Github className="h-4 w-4" />
                              </a>
                            )}
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted hover:text-accent transition-colors"
                                title="Live Demo"
                              >
                                <Globe className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        {project.role && (
                          <p className="mt-1 text-xs font-semibold text-accent print:text-xs print:text-muted">
                            {project.role}
                          </p>
                        )}

                        <p className="mt-3 text-sm text-muted leading-relaxed print:mt-1.5 print:text-[11px]">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-border/50 pt-4 print:mt-2 print:border-none print:pt-0">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => {
                            const isSelected = selectedTech === tech;
                            return (
                              <button
                                key={tech}
                                onClick={() =>
                                  setSelectedTech(isSelected ? null : tech)
                                }
                                className={`rounded-md px-1.5 py-0.5 text-[11px] transition-all no-print select-none cursor-pointer ${
                                  isSelected
                                    ? "bg-accent text-white font-medium shadow-xs"
                                    : "bg-border/30 text-muted hover:bg-border/60"
                                }`}
                              >
                                {tech}
                              </button>
                            );
                          })}
                          <span className="hidden print:inline text-xs text-muted">
                            Technologies: {project.technologies.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredProjects.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-lg no-print">
                      <p className="text-sm text-muted">
                        No projects found matching the filter.
                      </p>
                      <button
                        onClick={() => setSelectedTech(null)}
                        className="mt-3 text-sm font-semibold text-accent hover:underline cursor-pointer"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Education Section */}
            <section className="rounded-xl border border-card-border bg-card-bg p-6 print:p-0 print:border-none print:bg-transparent shadow-xs print-no-shadow print-no-border print-avoid-break">
              <h2 className="flex items-center gap-2 border-b border-border pb-4 text-xl font-bold tracking-tight text-foreground sm:text-2xl print:text-md print:pb-1.5">
                <GraduationCap className="h-5 w-5 text-accent print:text-black print:h-4 print:w-4" />
                Education
              </h2>

              <div className="mt-6 space-y-6 print:mt-3 print:space-y-4">
                {resumeData.education.map((edu, idx) => (
                  <div key={`${edu.institution}-${idx}`} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-md font-bold text-foreground print:text-xs">
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-semibold text-accent print:text-xs print:text-muted mt-0.5">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-xs text-muted text-left sm:text-right print:text-[10px] print:text-right shrink-0 mt-0.5 sm:mt-0">
                        <div className="font-medium">{edu.period}</div>
                        <div>{edu.location}</div>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-sm text-muted leading-relaxed print:text-[11px]">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer (Web Only) */}
      <footer className="no-print border-t border-border py-8 text-center text-xs text-muted bg-card-bg/30">
        <div className="mx-auto max-w-5xl px-4">
          <p>
            © {new Date().getFullYear()} {resumeData.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Built with Next.js, Tailwind CSS and Lucide Icons. Print this page
            or click Ctrl+P to export as PDF.
          </p>
        </div>
      </footer>
    </div>
  );
}
