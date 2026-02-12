"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Briefcase,
  Terminal,
  Code2,
  Globe
} from "lucide-react";

// Import your data
import { projects, experiences, technologies, connect, services } from "@/public/constants/data";

export function BentoNew() {
  return (
    <div className="max-w-6xl mx-auto p-4 pb-20 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[auto]">

        {/* 1. HERO / INTRO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col justify-between group overflow-hidden relative"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {services.slice(0, 3).map((service) => (
                <span key={service.title} className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  {service.title}
                </span>
              ))}
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
              Viplove Itankar
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-md">
              Combining expertise in <strong>Network Security</strong> with <strong>Full Stack Development</strong>.
              Currently exploring the intersection of Finance (MBA) and Tech.
            </p>
          </div>

          <div className="flex gap-3 mt-8">
            {connect.map((social) => {
              // Helper to pick a Lucide icon based on your title string, or fallback to text
              const Icon = getSocialIcon(social.title);
              return (
                <a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex p-2 w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all border border-zinc-200 dark:border-zinc-700 justify-center items-center"
                  aria-label={social.title}
                >
                  {Icon ? <Icon size={20} /> : <span className="text-[20px]">{social.title[0]}</span>}
                  {/* <Image src={social.icon} alt={social.title} width={25} height={25} className="" /> */}
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* 2. TECH STACK MARQUEE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 md:col-span-2 row-span-1 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="text-blue-500" size={20} />
            <h3 className="font-bold text-zinc-700 dark:text-zinc-200">Technologies</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-300 rounded-lg border border-zinc-100 dark:border-zinc-800"
              >
                {/* Rendering your static image icon */}
                <div className="w-4 h-4 relative overflow-hidden rounded-sm">
                  <Image src={tech.icon} alt={tech.name} fill className="object-cover" />
                </div>
                {tech.name}
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3. EXPERIENCE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 md:col-span-1 row-span-2 rounded-3xl bg-zinc-950 text-white p-6 relative overflow-hidden flex flex-col"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Briefcase size={80} />
          </div>
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            Experience
          </h3>

          <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide">
            {experiences.slice(0, 3).map((exp, i) => (
              <div key={i} className="relative pl-4 border-l-2 border-zinc-800">
                <div className="mb-1">
                  <p className="text-sm font-semibold text-zinc-100">{exp.title}</p>
                  <p className="text-xs text-zinc-400">{exp.company_name}</p>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono">{exp.date}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 4. PROJECTS GRID */}
        {projects.slice(0, 3).map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            className={cn(
              "col-span-1 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between hover:border-blue-500/30 transition-all group",
              i === 0 ? "md:col-span-2" : "md:col-span-1"
            )}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 relative rounded-md overflow-hidden bg-zinc-100">
                    {/* Rendering project image */}
                    <Image src={project.image} alt={project.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-bold text-zinc-800 dark:text-zinc-100 text-sm">{project.name}</h3>
                </div>
                <a href={project.source_code_link} target="_blank" className="text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                  <Github size={18} />
                </a>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span key={tag.name} className={`text-[10px] px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-950 text-zinc-500 border border-zinc-100 dark:border-zinc-800`}>
                  #{tag.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}

        {/* 5. DECORATIVE / EXTRA BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 row-span-1 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white flex flex-col justify-center items-center text-center">
          <Code2 size={32} className="mb-2 opacity-80" />
          <p className="text-xs font-medium opacity-80">Check out more on</p>
          <a href="https://github.com/vip847/" target="_blank" className="font-bold text-lg hover:underline mt-1">GitHub Profile ↗</a>
        </motion.div>

        {/* 6. Terminal / Command Box (Decor) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 row-span-1 rounded-xl bg-black border border-zinc-800 p-4 font-mono text-xs text-green-400 flex flex-col justify-center">
          <p>$ npm install portfolio</p>
          <p className="text-white/50">Installing dependencies...</p>
          <p className="mt-2 text-blue-400">Done in 1.2s</p>
        </motion.div>

      </div>
    </div>
  );
}

// Helper function to map your data titles to Lucide Icons
function getSocialIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("github")) return Github;
  if (lower.includes("instagram")) return Instagram;
  if (lower.includes("linkedin")) return Linkedin;
  if (lower.includes("mail") || lower.includes("gmail")) return Mail;
  if (lower.includes("contact") || lower.includes("phone")) return Phone;
  return null; // Return null to trigger text fallback
}
