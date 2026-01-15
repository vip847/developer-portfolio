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
// Import your data
import { projects, experiences, technologies, connect, services } from "@/public/constants/data";
import { Command } from "./uiComponents/Command";
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
  const [queryFocused, setQueryFocused] = useState(true);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Filter commands based on typing
  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleCommand = (id: string) => {
    setActiveView(id);
    setQuery(""); // Clear search after selection
    setQueryFocused(false); // Manually set focus to false
    inputRef.current?.blur(); // Manually remove focus from input
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Handle ESC Key (Close everything)
      if (e.key === "Escape") {
        setQuery("");
        setActiveView(null);
        // Optional: Blur input so you can use other shortcuts freely
        inputRef.current?.blur();
      }

      // 2. Handle CMD + Key or CTRL + Key shortcuts
      if (e.metaKey || e.ctrlKey) {
        // e.key returns 'a', 'b', etc. We convert to uppercase to match our config
        const pressedKey = e.key.toUpperCase();

        // Special case: CMD + K focuses the input
        if (pressedKey === "K") {
          e.preventDefault();
          inputRef.current?.focus();
          return;
        }

        // Find if any command matches this shortcut
        const command = COMMANDS.find((c) => c.shortcut === pressedKey);

        if (command) {
          e.preventDefault(); // CRITICAL: This stops the browser default (e.g., CMD+P = Print)
          handleCommand(command.id);
        }
      }
    };

    // Attach the listener to the window
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-[15vh] px-4 font-mono bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">

      {/* 1. The "Spotlight" Input Area */}
      <motion.div
        // layout
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative z-20"
      >
        <div className="flex items-center px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command (e.g., 'projects')..."
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
            {!queryFocused && (<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 dark:bg-zinc-800 dark:text-zinc-400">
              <Command value={"K"} />
            </kbd>)}
            {!!query && (<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-zinc-500 opacity-100 dark:bg-zinc-800 dark:text-zinc-400">
              ESC to Clear
            </kbd>)}
          </div>
        </div>

        {/* 2. Command List (Shows when typing or no view active) */}
        {/* {(!activeView || queryFocused) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-2">
              <div className="text-xs font-semibold text-zinc-400 px-2 mb-2 uppercase tracking-wider">Available Commands</div>
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => handleCommand(cmd.id)}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-white dark:group-hover:bg-zinc-700 rounded-md transition-colors">
                      <cmd.icon size={18} />
                    </div>
                    <span className="font-medium">{cmd.label}</span>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono hidden sm:block">CMD + {cmd.shortcut}</span>
                </button>
              ))}

              {filteredCommands.length === 0 && (
                <div className="p-4 text-center text-zinc-500 text-sm">
                  No commands found for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        )} */}
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
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleCommand(cmd.id)}
                  className="flex flex-col items-start p-4 rounded-lg border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-all group text-left"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="p-2 bg-white dark:bg-zinc-900 rounded-md shadow-sm group-hover:text-blue-500 transition-colors">
                      <cmd.icon size={20} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-400 font-mono hidden sm:block"><Command value={cmd.shortcut} /></span>
                      <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                    </div>
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

      {/* 3. The Content "ViewPort" */}
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
            {/* Back Button / Breadcrumb */}
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Terminal size={14} />
                <span onClick={() => { setActiveView(null); setQuery("") }} className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer underline decoration-dotted">vip847</span>
                <ChevronRight size={14} />
                <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{activeView}</span>
              </div>
              <button
                onClick={() => { setActiveView(null); setQuery("") }}
                className="text-xs text-zinc-400 hover:text-red-500 flex items-center gap-1"
              >
                Close <span className="hidden sm:block">[ESC]</span>
              </button>
            </div>

            {/* Render Content Based on Command */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 p-1 md:p-6 backdrop-blur-sm">

              {activeView === "about" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">VI</div>
                    <div>
                      <h2 className="text-xl font-bold">Viplove Itankar</h2>
                      <p className="text-zinc-500">Software Developer & Network Admin</p>
                    </div>
                  </div>
                  <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
                    I am a developer with a unique background in Ethical Hacking and Network Administration.
                    I build secure, scalable web applications using the MERN stack and Next.js.
                    Currently exploring AI integration and advanced React patterns.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map((s, i) => (
                      <div key={i} className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm font-medium">
                        {s.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeView === "projects" && (
                <div className="grid grid-cols-1 gap-4">
                  {projects.map((project) => (
                    <div key={project.name} className="group p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all bg-zinc-50 dark:bg-zinc-900/50">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{project.name}</h3>
                        <a href={project.source_code_link} target="_blank" className="text-zinc-500 hover:text-blue-500 text-xs flex items-center gap-1 hover:underline">
                          View Code <ExternalLink size={12} />
                        </a>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag.name} className="text-[10px] px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-300">
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "experience" && (
                <div className="space-y-8 pl-2">
                  {experiences.map((exp, i) => (
                    <div key={i} className="relative border-l-2 border-zinc-200 dark:border-zinc-700 pl-6 pb-2">
                      <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-white dark:bg-zinc-900 border-2 border-blue-500">
                        
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <Image src={exp.icon} alt={exp.company_name} className={`w-13 h-13 object-contain border-zinc-800 dark:border-zinc-800/50 border-2 p-2 rounded-2xl`} style={{ backgroundColor: exp.iconBg }} />
                        <div>
                          <h3 className="font-bold text-lg">{exp.title}</h3>
                          <div className="text-blue-500 text-sm font-medium mb-1">{exp.company_name}</div>
                          <div className="text-xs text-zinc-400">{exp.date}</div>
                        </div>
                      </div>
                      <ul className="list-disc list-outside ml-4 space-y-1">
                        {exp.points.map((point, idx) => (
                          <li key={idx} className="text-sm text-zinc-600 dark:text-zinc-300 pl-1">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "tech" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {technologies.map((tech) => (
                    <div key={tech.name} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                      {/* You can use the tech.icon here if it was an import, for now we simulate */}
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="font-medium text-sm">{tech.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "contact" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {connect.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      target="_blank"
                      className="flex items-center gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <ExternalLink size={20} className="text-zinc-400" />
                      <div>
                        <div className="font-bold text-sm">{item.title}</div>
                        <div className="text-xs text-zinc-500 truncate max-w-37.5">{item.url}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}