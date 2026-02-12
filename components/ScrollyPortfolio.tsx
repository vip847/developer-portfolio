"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Terminal, 
  User, 
  Github, 
  ExternalLink,
  Code2,
  Cpu,
  Mail
} from "lucide-react";
import Image from "next/image";
// Import your data
import { projects, experiences, services, technologies, connect } from "@/public/constants/data";

// --- 1. CONFIGURATION ---
const STORY_SECTIONS = [
  {
    id: "intro",
    type: "intro",
    title: "Hello, World.",
    content: "I'm Viplove Itankar. I bridge the gap between Network Security and Full Stack Development.",
    color: "bg-blue-500",
  },
  {
    id: "about",
    type: "about",
    title: "The Architect",
    content: "With a background in Ethical Hacking, I don't just build apps; I secure them. My journey started with network packets and evolved into building scalable React ecosystems.",
    color: "bg-purple-500",
  },
  {
    id: "tech",
    type: "tech",
    title: "The Arsenal",
    content: "I choose the right tool for the job. From front-end interactivity to back-end logic, here is my preferred stack.",
    color: "bg-indigo-500",
  },
  ...experiences.map((exp, i) => ({
    id: `exp-${i}`,
    type: "experience",
    data: exp,
    title: exp.title,
    content: exp.company_name, // Used for scrolling narrative text
    color: "bg-emerald-500",
  })),
  ...projects.map((proj, i) => ({
    id: `proj-${i}`,
    type: "project",
    data: proj,
    title: proj.name,
    content: proj.description,
    color: "bg-orange-500",
  })),
  {
    id: "contact",
    type: "contact",
    title: "Let's Connect",
    content: "I'm currently open to new opportunities. Reach out via any platform below.",
    color: "bg-zinc-800",
  }
];

export function ScrollyPortfolio() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors">
      
      {/* Background Dot Pattern */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1.5 bg-blue-600 z-50 origin-left" 
        style={{ scaleX: (activeStep + 1) / STORY_SECTIONS.length }} 
      />

      <div className="flex flex-col md:flex-row relative z-10">
        
        {/* --- LEFT SIDE: NARRATIVE (SCROLLS) --- */}
        <div className="w-full md:w-1/2 relative z-10 pb-20">
          {STORY_SECTIONS.map((step, index) => (
            <Section 
              key={step.id} 
              step={step} 
              index={index} 
              setActiveStep={setActiveStep} 
            />
          ))}
        </div>

        {/* --- RIGHT SIDE: STAGE (FIXED) --- */}
        <div className="hidden md:flex fixed top-0 right-0 w-1/2 h-screen items-center justify-center border-l border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm overflow-hidden z-0">
           <div className="w-full h-full flex items-center justify-center p-10 landscape:scale-75 xl:scale-100">
             <VisualStage activeStep={activeStep} data={STORY_SECTIONS[activeStep]} />
           </div>
        </div>

      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 p-4 z-40 flex justify-between items-center shadow-sm">
         <div>
            <div className="text-[10px] font-bold uppercase text-zinc-500">Current Section</div>
            <div className="font-bold text-sm truncate max-w-[200px]">{STORY_SECTIONS[activeStep].title}</div>
         </div>
         <div className="text-xs font-mono text-zinc-400">
            {activeStep + 1} / {STORY_SECTIONS.length}
         </div>
      </div>

    </div>
  );
}

// --- SUB-COMPONENTS ---

function Section({ step, index, setActiveStep }: any) {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.6 }} 
      onViewportEnter={() => setActiveStep(index)}
      className="min-h-screen flex flex-col justify-center p-6 md:p-16 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
          0{index + 1}
        </span>
        <span className="text-xs font-bold tracking-wider uppercase text-zinc-400">
          {step.type}
        </span>
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
        {step.title}
      </h2>
      
      {/* Intro text hidden on mobile for Experience type to save space for the card */}
      {step.type !== 'experience' && (
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            {step.content}
        </p>
      )}

      {/* --- MOBILE VISUALS --- */}
      <div className="md:hidden w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-lg">
         
         {/* FIX: EXPANDED MOBILE EXPERIENCE CARD */}
         {step.type === 'experience' && (
           <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-12 h-12 shrink-0 bg-white dark:bg-zinc-900 rounded-lg p-1 border border-zinc-200 dark:border-zinc-600">
                      <Image src={step.data.icon} alt={step.data.company_name} fill className="object-contain p-1" />
                  </div>
                  <div>
                      <div className="font-bold text-lg leading-tight text-zinc-900 dark:text-white">{step.data.title}</div>
                      <div className="text-blue-600 dark:text-blue-400 font-medium text-sm">{step.data.company_name}</div>
                      <div className="text-xs text-zinc-500 mt-1 font-mono bg-zinc-200 dark:bg-zinc-700/50 inline-block px-2 py-0.5 rounded">{step.data.date}</div>
                  </div>
              </div>
              
              {/* Added: Bullet Points for Mobile */}
              <div className="space-y-2 border-t border-zinc-200 dark:border-zinc-700 pt-4">
                {step.data.points.map((point: string, i: number) => (
                    <div key={i} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                        <span className="text-blue-500 mt-1.5 text-[10px]">●</span>
                        <span className="leading-snug">{point}</span>
                    </div>
                ))}
              </div>
           </div>
         )}

         {step.type === 'project' && (
           <div>
              <div className="relative w-full h-48">
                 <Image src={step.data.image} alt={step.data.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                 <div className="flex gap-2 overflow-x-auto pb-2">
                    {step.data.tags.map((t:any) => (
                       <span key={t.name} className="text-[10px] px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded whitespace-nowrap">
                         #{t.name}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
         )}

         {step.type === 'tech' && (
            <div className="p-4 grid grid-cols-3 gap-2">
                {technologies.slice(0, 6).map((tech) => (
                    <div key={tech.name} className="text-[10px] text-center p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                        {tech.name}
                    </div>
                ))}
            </div>
         )}

         {step.type === 'contact' && (
            <div className="p-4 flex flex-col gap-2">
                {connect.map((c) => (
                   <a key={c.title} href={c.url} target="_blank" className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                       <span className="text-sm font-bold">{c.title}</span>
                       <ExternalLink size={14} className="ml-auto text-zinc-400"/>
                   </a>
                ))}
            </div>
         )}

         {(step.type === 'intro' || step.type === 'about') && (
            <div className="p-8 flex justify-center text-zinc-300 dark:text-zinc-600">
               <User size={64} />
            </div>
         )}
      </div>

    </motion.div>
  );
}

function VisualStage({ activeStep, data }: any) {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      <AnimatePresence mode="wait">
        
        {/* CASE: INTRO */}
        {data.type === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
             <div className="w-48 h-48 mx-auto bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-6xl font-bold text-white mb-8 shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                VI
             </div>
             <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
                 {services.slice(0,5).map((s:any, i:number) => (
                    <span key={i} className="px-3 py-1 bg-white dark:bg-zinc-800 rounded-full text-xs font-medium shadow-sm border border-zinc-200 dark:border-zinc-700">
                        {s.title}
                    </span>
                 ))}
             </div>
          </motion.div>
        )}

        {/* CASE: TECH STACK */}
        {data.type === "tech" && (
           <motion.div
             key="tech"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.8 }}
             className="w-full bg-white dark:bg-zinc-800 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-700 shadow-2xl"
           >
              <div className="grid grid-cols-3 gap-4">
                 {technologies.map((tech, i) => (
                    <motion.div 
                        key={tech.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors border border-zinc-100 dark:border-zinc-700"
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500 mb-2 shadow-sm shadow-green-400/50" />
                        <span className="text-xs font-bold text-center">{tech.name}</span>
                    </motion.div>
                 ))}
              </div>
           </motion.div>
        )}

        {/* CASE: EXPERIENCE */}
        {data.type === "experience" && (
          <motion.div
            key={`exp-${data.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-2xl border border-zinc-100 dark:border-zinc-700 relative overflow-hidden"
          >
             <div className={`absolute top-0 left-0 w-2 h-full ${data.color || 'bg-blue-500'}`} />
             <div className="flex justify-between items-start mb-6">
                <div className="relative w-16 h-16 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-700 p-2">
                   <Image src={data.data.icon} alt={data.data.company_name} fill className="object-contain p-2" />
                </div>
                <span className="text-xs font-mono bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">{data.data.date}</span>
             </div>
             <h3 className="text-2xl font-bold mb-1">{data.data.title}</h3>
             <div className="text-blue-500 font-medium mb-6">{data.data.company_name}</div>
             <div className="space-y-3">
                {data.data.points.slice(0, 3).map((point: string, i: number) => (
                    <div key={i} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                        <span className="text-blue-500 mt-1">▹</span>
                        {point}
                    </div>
                ))}
             </div>
          </motion.div>
        )}

        {/* CASE: PROJECT */}
        {data.type === "project" && (
          <motion.div
            key={`proj-${data.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full bg-zinc-900 text-white rounded-xl overflow-hidden shadow-2xl border border-zinc-800 group"
          >
             {/* Fake Browser Header */}
             <div className="h-10 bg-zinc-800 flex items-center px-4 gap-2 border-b border-zinc-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-4 flex-1 text-center">
                    <div className="inline-block px-3 py-1 bg-zinc-900 rounded text-[10px] text-zinc-400 font-mono opacity-50 truncate max-w-[150px]">
                        {data.data.source_code_link.replace('https://github.com/', '')}
                    </div>
                </div>
             </div>

             {/* Project Image Area */}
             <div className="relative h-56 bg-zinc-800 overflow-hidden">
                <Image 
                    src={data.data.image} 
                    alt={data.data.name} 
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                    fill 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-xl text-white mb-1">{data.data.name}</h3>
                </div>
             </div>

             {/* Project Details */}
             <div className="p-6 pt-4">
                 <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{data.data.description}</p>
                 <div className="flex justify-between items-center">
                     <div className="flex flex-wrap gap-1.5">
                        {data.data.tags.slice(0,3).map((tag: any) => (
                            <span key={tag.name} className="text-[10px] px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                            #{tag.name}
                            </span>
                        ))}
                     </div>
                    <a href={data.data.source_code_link} target="_blank" className="p-2 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                        <Github size={18} />
                    </a>
                 </div>
             </div>
          </motion.div>
        )}

        {/* CASE: CONTACT */}
        {data.type === "contact" && (
           <motion.div
             key="contact"
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.8 }}
             className="w-full bg-white dark:bg-zinc-800 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-700 shadow-2xl"
           >
              <h3 className="text-2xl font-bold mb-6 text-center">Get in Touch</h3>
              <div className="grid grid-cols-1 gap-3">
                 {connect.map((item, i) => (
                    <motion.a
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-zinc-100 dark:border-zinc-700 transition-colors group"
                    >
                       <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg group-hover:scale-110 transition-transform">
                          <ExternalLink size={18} className="text-zinc-600 dark:text-zinc-400" />
                       </div>
                       <div>
                          <div className="font-bold text-sm">{item.title}</div>
                          <div className="text-xs text-zinc-500 truncate max-w-[200px]">{item.url}</div>
                       </div>
                    </motion.a>
                 ))}
              </div>
           </motion.div>
        )}

        {/* CASE: ABOUT */}
        {data.type === "about" && (
           <motion.div
             key="about"
             initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
             animate={{ opacity: 1, scale: 1, rotate: 0 }}
             exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
             className="w-80 h-80 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-700 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
           >
              <Terminal size={64} className="text-zinc-400 mb-4" />
              <div className="text-2xl font-bold">About Me</div>
              <div className="text-sm text-zinc-500 mt-2 px-6 text-center">Full Stack Developer & Network Security Enthusiast</div>
           </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
