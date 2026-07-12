import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { resumeData } from "@/data/resume";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${resumeData.name} | ${resumeData.title}`,
  description: resumeData.summary,
  keywords: [
    resumeData.name,
    resumeData.title,
    "Resume",
    "Portfolio",
    "Network Engineer",
    "Programmer",
    "Software Engineer",
    ...resumeData.skills.flatMap((s) => s.skills),
  ].slice(0, 20),
  authors: [{ name: resumeData.name }],
  creator: resumeData.name,
  openGraph: {
    title: `${resumeData.name} | ${resumeData.title}`,
    description: resumeData.summary,
    type: "profile",
    firstName: "Thitipong",
    lastName: "Tapianthong",
    username: "akikungz",
    emails: [resumeData.email],
    phoneNumbers: [resumeData.phone],
  },
  twitter: {
    card: "summary",
    title: `${resumeData.name} | ${resumeData.title}`,
    description: resumeData.summary,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
