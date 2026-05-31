'use client';

import { ArrowRight, Briefcase, Code2, Cpu, FileText, LucideProps, Mail, Search, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Command } from '../uiComponents/Command';
import { motion } from "framer-motion";
import { projects, technologies } from '@/public/constants/data';

type ViewKey = 'about' | 'projects' | 'experience' | 'tech' | 'contact'| 'resume' | null;

interface CommandItem {
  id: Exclude<ViewKey, null>; // Ensures id must be one of your view keys
  label: string;
  description: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  shortcut: string;
}

// Define the available commands
const COMMANDS: CommandItem[] = [
  { id: "about", label: "About Me", description: "My background & bio", icon: User, shortcut: "A" },
  { id: "projects", label: "Projects", description: "Recent work & code", icon: Code2, shortcut: "P" },
  { id: "experience", label: "Experience", description: "Career timeline", icon: Briefcase, shortcut: "E" },
  { id: "tech", label: "Tech Stack", description: "Tools & frameworks", icon: Cpu, shortcut: "S" },
  { id: "contact", label: "Contact", description: "Email & socials", icon: Mail, shortcut: "M" },
  { id: "resume", label: "Resume", description: "Check my resume", icon: FileText, shortcut: "U" }
];

interface SpotMainInterface {
  activeView: ViewKey;
  query: string;
  setActiveView: React.Dispatch<React.SetStateAction<ViewKey>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const SpotMain = ({ activeView, setActiveView, query, setQuery }: SpotMainInterface) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const [queryFocused, setQueryFocused] = useState(false); // Default to false to show "Portfolio Mode" on load

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleCommand = (id: ViewKey) => {
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
          {!activeView && <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded"><Command value={'K'} /></span>}
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
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">1.5+</div>
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
  )
}

export default SpotMain;