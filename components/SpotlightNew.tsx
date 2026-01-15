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
  Github,
  ExternalLink,
  Cpu,
  ArrowRight
} from "lucide-react";
import { projects, experiences, technologies, connect, services } from "@/public/constants/data";

const COMMANDS = [
  { id: "about", label: "About Me", description: "My background & bio", icon: User, shortcut: "A" },
  { id: "projects", label: "Projects", description: "Recent work & code", icon: Code2, shortcut: "P" },
  { id: "experience", label: "Experience", description: "Career timeline", icon: Briefcase, shortcut: "E" },
  { id: "tech", label: "Tech Stack", description: "Tools & frameworks", icon: Cpu, shortcut: "S" },
  { id: "contact", label: "Contact", description: "Email & socials", icon: Mail, shortcut: "M" },
];

export function SpotlightNew() {
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [queryFocused, setQueryFocused] = useState(true);

  console.log("Active View:", activeView, " | Query Focused:", queryFocused, " | Query:", query);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcuts listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        setActiveView(null);
        inputRef.current?.blur();
      }
      if ((e.metaKey || e.ctrlKey || e.altKey)) {
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

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleCommand = (id: string) => {
    console.log("Handling command:", id);
    setActiveView(id);
    setQuery("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-[10vh] px-4 font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">

      {/* 1. Header: Makes it obvious this is a portfolio */}
      <motion.div
        // layout
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">Viplove Itankar</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Software Developer & Network Admin</p>
      </motion.div>

      {/* 2. Main Interface */}
      <motion.div
        layout
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative z-20"
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onFocus={() => {
              setQueryFocused(true);
            }}
            onBlur={() => {
              setQueryFocused(false);
            }}
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
          <div className="hidden md:flex gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 dark:bg-zinc-800 dark:text-zinc-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* 3. The "Welcome Menu" - Visible when NO view is active */}
        {(!activeView || queryFocused) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-2"
          >
            {/* If user is typing, show filtered list. If empty, show ALL as cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => handleCommand(cmd.id)}
                  className="flex flex-col items-start p-4 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-all group text-left"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="p-2 bg-white dark:bg-zinc-900 rounded-md shadow-sm group-hover:text-blue-500 transition-colors">
                      <cmd.icon size={20} />
                    </div>
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                  </div>
                  <span className="font-bold text-sm">{cmd.label}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{cmd.description}</span>
                </button>
              ))}
            </div>

            {filteredCommands.length === 0 && (
              <div className="p-8 text-center text-zinc-500">
                No results found.
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* 4. Active Content View (Projects, Experience, etc.) */}
      {/* <AnimatePresence mode="popLayout"> */}
      {activeView && (
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl mt-4"
        >
          {/* Breadcrumb Navigation */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span onClick={() => { setActiveView(null); setQuery("") }} className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer underline decoration-dotted">Home</span>
              <ChevronRight size={14} />
              <span className="text-zinc-900 dark:text-zinc-100 font-semibold capitalize">{activeView}</span>
            </div>
            <button
              onClick={() => { setActiveView(null); setQuery("") }}
              className="text-xs text-zinc-400 hover:text-red-500 flex items-center gap-1"
            >
              Close [ESC]
            </button>
          </div>

          {/* Content Container */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">

            {/* --- VIEW: ABOUT --- */}
            {activeView === "about" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl font-bold">VI</div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold">Viplove Itankar</h2>
                    <p className="text-zinc-500">Network Admin & Full Stack Developer</p>
                  </div>
                </div>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                  I bridge the gap between secure network architecture and modern web development.
                  With a background in Ethical Hacking, I ensure that the applications I build are not just beautiful, but secure by design.
                </p>
              </div>
            )}

            {/* --- VIEW: PROJECTS --- */}
            {activeView === "projects" && (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.name} className="flex flex-col p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold">{project.name}</h3>
                      <a href={project.source_code_link} target="_blank" className="text-blue-500 text-xs flex items-center gap-1 hover:underline">
                        View Code <ExternalLink size={12} />
                      </a>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{project.description}</p>
                    <div className="flex gap-2">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag.name} className="text-[10px] px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- VIEW: EXPERIENCE --- */}
            {activeView === "experience" && (
              <div className="space-y-8 pl-4">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative border-l-2 border-zinc-200 dark:border-zinc-700 pl-6">
                    <div className="absolute -left-2 top-0 w-3.5 h-3.5 rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-500" />
                    <h3 className="font-bold">{exp.title}</h3>
                    <p className="text-sm text-blue-500 mb-1">{exp.company_name}</p>
                    <p className="text-xs text-zinc-400 mb-3">{exp.date}</p>
                  </div>
                ))}
              </div>
            )}

            {/* --- VIEW: TECH STACK --- */}
            {activeView === "tech" && (
              <div>
                <h3 className="font-bold mb-4">My Arsenal</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <div key={tech.name} className="px-3 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm font-medium">
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- VIEW: CONTACT --- */}
            {activeView === "contact" && (
              <div className="grid grid-cols-1 gap-3">
                {connect.map((c) => (
                  <a key={c.title} href={c.url} target="_blank" className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 transition-colors">
                    <ExternalLink size={18} />
                    <span className="font-medium">{c.title}</span>
                  </a>
                ))}
              </div>
            )}

          </div>
        </motion.div>
      )}
      {/* </AnimatePresence> */}
    </div>
  );
}