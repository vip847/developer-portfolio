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
  Globe,
  Loader2,
  Send,
  Github,
  Instagram,
  Linkedin,
  Phone
} from "lucide-react";
import { projects, experiences, technologies, connect, services } from "@/public/constants/data";
import { Command } from "./uiComponents/Command"; // Assuming this is your Key component

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
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
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

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    try {
      // 1. Send data to FormSubmit
      const response = await fetch("https://formsubmit.co/ajax/viplaoitankar26@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: (formRef.current.elements.namedItem('from_name') as HTMLInputElement).value,
          email: (formRef.current.elements.namedItem('from_email') as HTMLInputElement).value,
          message: (formRef.current.elements.namedItem('message') as HTMLTextAreaElement).value,
          _subject: "New Portfolio Contact Request!", // Subject line customization
          _template: "table", // Makes the email look nice
        })
      });

      const result = await response.json();

      if (result.success === "true" || response.ok) {
        setEmailStatus("success");
        setIsSending(false);
        setTimeout(() => setEmailStatus("idle"), 5000);
        formRef.current.reset();
      } else {
        throw new Error("Failed to send");
      }

    } catch (error) {
      console.error(error);
      setEmailStatus("error");
      setIsSending(false);
    }
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

              {/* --- VIEW: CONTACT --- */}
              {activeView === "contact" && (
                <div className="flex flex-col gap-6">

                  {/* Header Section */}
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-1">Get in Touch</h3>
                    <p className="text-zinc-500 text-sm">Have a project in mind or just want to say hi?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* LEFT COLUMN: Social Links */}
                    <div className="space-y-3 order-2 md:order-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Connect</h4>
                      {connect.map((item) => {
                        const Icon = getSocialIcon(item.title);
                        return (
                          <a
                            key={item.title}
                            href={item.url}
                            target="_blank"
                            className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-900 transition-colors">
                                <Icon size={18} className="text-zinc-600 dark:text-zinc-400" />
                              </div>
                              <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.title}</span>
                            </div>
                            <ExternalLink size={16} className="text-zinc-400 group-hover:text-blue-500" />
                          </a>
                        )
                      })}
                    </div>

                    {/* RIGHT COLUMN: Contact Form */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-5 border border-zinc-100 dark:border-zinc-800 order-1 md:order-2">
                      {emailStatus === "success" ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-10">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-3">
                            <Send size={24} />
                          </div>
                          <h4 className="font-bold text-lg text-green-600 dark:text-green-400">Message Sent!</h4>
                          <p className="text-sm text-zinc-500">I'll get back to you as soon as possible.</p>
                        </div>
                      ) : (
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1">Name</label>
                            <input
                              type="text"
                              name="from_name" // Must match EmailJS template variable
                              required
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1">Email</label>
                            <input
                              type="email"
                              name="from_email" // Must match EmailJS template variable
                              required
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                              placeholder="john@example.com"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-zinc-500 mb-1">Message</label>
                            <textarea
                              name="message" // Must match EmailJS template variable
                              required
                              rows={4}
                              className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                              placeholder="Tell me about your project..."
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSending}
                            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSending ? (
                              <>
                                <Loader2 size={16} className="animate-spin" /> Sending...
                              </>
                            ) : (
                              <>Send Message <Send size={16} /></>
                            )}
                          </button>

                          {emailStatus === "error" && (
                            <p className="text-xs text-red-500 text-center">Failed to send. Please try again.</p>
                          )}
                        </form>
                      )}
                    </div>

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

// Helper function to map your data titles to Lucide Icons
function getSocialIcon(title: string) {
  const lower = title.toLowerCase();
  if (lower.includes("github")) return Github;
  if (lower.includes("instagram")) return Instagram;
  if (lower.includes("linkedin")) return Linkedin;
  if (lower.includes("mail") || lower.includes("gmail")) return Mail;
  if (lower.includes("contact") || lower.includes("phone")) return Phone;
  return function WhatsAppIcon({ size = 18, className }: { size?: number, className?: string }) {
    return (

      <svg fill="currentColor" width={size} height={size} viewBox="0 0 32 32" className={className} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <title>whatsapp</title>
        <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>
      </svg>
    );
  };
}