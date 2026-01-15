"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Terminal,
  Code2,
  Briefcase,
  User,
  Mail,
  ChevronRight,
  ExternalLink,
  Cpu,
  ArrowRight,
  MapPin,
  Globe
} from "lucide-react";
import { projects, experiences, technologies, connect, services } from "@/public/constants/data";
import { Command } from "./uiComponents/Command"; // Assuming this is your Key component
import Image from "next/image";

// Define the available commands
const COMMANDS = [
  { id: "about", label: "About Me", description: "My background & bio", icon: User, shortcut: "A" },
  { id: "projects", label: "Projects", description: "Recent work & code", icon: Code2, shortcut: "P" },
  { id: "experience", label: "Experience", description: "Career timeline", icon: Briefcase, shortcut: "E" },
  { id: "tech", label: "Tech Stack", description: "Tools & frameworks", icon: Cpu, shortcut: "S" },
  { id: "contact", label: "Contact", description: "Email & socials", icon: Mail, shortcut: "M" },
];

export function SpotlightInterface() {
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [queryFocused, setQueryFocused] = useState(false); // Default to false to show "Portfolio Mode" on load

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleCommand = (id: string) => {
    setActiveView(id);
    setQuery("");
    setQueryFocused(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        setActiveView(null);
        inputRef.current?.blur();
      }
      if (e.metaKey || e.ctrlKey) {
        const pressedKey = e.key.toUpperCase();
        if (pressedKey === "K") {
          e.preventDefault();
          inputRef.current?.focus();
          return;
        }
        const command = COMMANDS.find((c) => c.shortcut === pressedKey);
        if (command) {
          e.preventDefault();
          handleCommand(command.id);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-[12vh] px-4 font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-blue-100 dark:selection:bg-blue-900">

      {/* 1. Enhanced Header: Always visible, fades out when view is active to reduce noise */}
      <motion.div
        animate={{ opacity: activeView ? 0.5 : 1, scale: activeView ? 0.95 : 1 }}
        className="text-center mb-8 space-y-2"
      >
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Viplove Itankar
          </h1>
          {/* Status Badge */}
          <div className="absolute -top-4 -right-8 md:-right-12 rotate-12">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Open to Work</span>
            </div>
          </div>
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          Software Developer <span className="text-zinc-300 dark:text-zinc-700 mx-2">|</span> Network Administrator
        </p>

        {/* Quick Social Links (Visible when idle) */}
        {!activeView && (
          <div className="flex justify-center gap-4 pt-2">
            {connect.slice(0, 3).map((social) => (
              <a
                key={social.title}
                href={social.url}
                target="_blank"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                title={social.title}
              >
                {/* Fallback to text if icon not available, or use specific icons */}
                <span className="text-xs font-semibold underline decoration-dotted">{social.title}</span>
              </a>
            ))}
          </div>
        )}
      </motion.div>

      {/* 2. Main Card */}
      <motion.div
        // layout
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative z-20"
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <Search className={`w-5 h-5 mr-3 transition-colors ${queryFocused ? 'text-blue-500' : 'text-zinc-400'}`} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setQueryFocused(true)}
            onBlur={() => setQueryFocused(false)}
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
          <div className="hidden md:flex gap-2 text-[10px] font-medium text-zinc-400">
            {!activeView && <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">CMD + K</span>}
            {activeView && <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">ESC</span>}
          </div>
        </div>

        {/* 3. Empty State / Dashboard */}
        {(!activeView || queryFocused) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-zinc-50/30 dark:bg-zinc-900/30"
          >
            {/* Quick Stats Banner */}
            {!query && !activeView && (
              <div className="grid grid-cols-3 border-b border-zinc-100 dark:border-zinc-800 divide-x divide-zinc-100 dark:divide-zinc-800">
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">3+</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Years Exp</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">{projects.length}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Projects</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">{technologies.length}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Tech Stack</div>
                </div>
              </div>
            )}

            {/* Navigation Grid */}
            <div className="p-4">
              <div className="text-xs font-semibold text-zinc-400 mb-3 px-1 uppercase tracking-wider">
                {query ? 'Search Results' : 'Explore'}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredCommands.map((cmd) => (
                  <button
                    key={cmd.id}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleCommand(cmd.id)}
                    className="flex items-center gap-4 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group text-left relative overflow-hidden"
                  >
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <cmd.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{cmd.label}</span>
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                          <ArrowRight size={14} className="text-blue-500" />
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 line-clamp-1">{cmd.description}</span>
                    </div>
                    {/* Shortcut Hint */}
                    <div className="hidden sm:block absolute top-3 right-3 transition-opacity">
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                        <Command value={cmd.shortcut} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {filteredCommands.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-zinc-500">No matching commands found.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 4. Active Content View */}
      <AnimatePresence mode="wait">
        {activeView && (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mt-6 pb-20"
          >
            {/* Breadcrumb Navigation */}
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Terminal size={14} />
                <span onClick={() => { setActiveView(null); setQuery("") }} className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer underline decoration-dotted">vip847</span>
                <ChevronRight size={14} />
                <span className="text-zinc-900 dark:text-zinc-100 font-semibold capitalize">{activeView}</span>
              </div>
              <button
                onClick={() => { setActiveView(null); setQuery("") }}
                className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-red-500 transition-colors hover:underline decoration-dotted"
              >
                Close <span className="font-mono text-[10px] ml-1">[ESC]</span>
              </button>
            </div>

            {/* Content Container - Reusing your existing structure */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 shadow-xl">

              {activeView === "about" && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-24 h-24 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-4 border-white dark:border-zinc-700 shadow-lg">
                      {/* Placeholder for Profile Image */}
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-tr from-blue-500 to-purple-600 text-white text-3xl font-bold">VI</div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Viplove Itankar</h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">Software Developer</span>
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">SAP FICO Consultant</span>
                        <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs rounded-full flex items-center gap-1">
                          <MapPin size={10} /> India
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        I am a developer with a unique background in Ethical Hacking and Network Administration.
                        I build secure, scalable web applications using the MERN stack and Next.js.
                        Currently exploring AI integration and advanced React patterns.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">What I do</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {services.map((s, i) => (
                        <div key={i} className="p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <div className="font-medium text-sm">{s.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeView === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Featured Projects</h3>
                    <a href="https://github.com/vip847" target="_blank" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                      View all on GitHub <ArrowRight size={12} />
                    </a>
                  </div>
                  {projects.map((project) => (
                    <div key={project.name} className="group relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-zinc-900 dark:text-white">{project.name}</h4>
                        <a href={project.source_code_link} target="_blank" className="transition-opacity p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full">
                          <ExternalLink size={16} className="text-zinc-500" />
                        </a>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 max-w-lg">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag.name} className="text-[10px] font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "experience" && (
                <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 space-y-8 py-2">
                  {experiences.map((exp, i) => (
                    <div key={i} className="relative pl-8">
                      {/* Timeline Dot */}
                      <div className="absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-blue-500 transition-colors" />

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-bold text-zinc-900 dark:text-white">{exp.title}</h3>
                        <span className="text-xs font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded">{exp.date}</span>
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3 flex items-center gap-2">
                        {exp.company_name}
                      </div>
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {exp.points.map((point, idx) => (
                          <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-400 pl-1">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "tech" && (
                <div>
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-4">Tech Ecosystem</h3>
                    <p className="text-sm text-zinc-500 mb-6">Tools and frameworks I use to build robust applications.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {technologies.map((tech) => (
                        <div key={tech.name} className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all bg-white dark:bg-zinc-900">
                          {/* Dot indicator */}
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-green-300" />
                          <span className="font-medium text-sm text-zinc-900 dark:text-zinc-400">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeView === "contact" && (
                <div className="space-y-6">
                  <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-center">
                    <h3 className="text-lg font-bold mb-2">Let's work together</h3>
                    <p className="text-zinc-500 text-sm mb-6">I am currently available for freelance work and full-time positions.</p>
                    <a href="mailto:viplaoitankar26@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      <Mail size={18} /> Send an Email
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {connect.map((item) => (
                      <a
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-900 transition-colors">
                            <Globe size={18} className="text-zinc-600 dark:text-zinc-400" />
                          </div>
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</span>
                        </div>
                        <ExternalLink size={16} className="text-zinc-400 group-hover:text-blue-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}