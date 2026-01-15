"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  Terminal 
} from "lucide-react";
// Import data from your file
import { projects, experiences, technologies, connect } from "@/public/constants/data"; // Adjust path if needed

export function BentoGrid() {
  return (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[180px]">
        
        {/* 1. Intro / About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between group hover:shadow-lg transition-all"
        >
          <div>
             <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">Viplove Itankar</h2>
             <p className="text-zinc-500 dark:text-zinc-400 mt-2">
               Network Administrator & Full Stack Developer. Passionate about Cyber Security, AI, and building secure web architectures.
             </p>
          </div>
          <div className="flex gap-4">
             {connect.map((social) => (
                <a 
                  key={social.title} 
                  href={social.url} 
                  target="_blank"
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                >
                  {/* Using Lucide icons as fallback, or map your image icons here */}
                  <span className="text-xs font-bold">{social.title[0]}</span>
                </a>
             ))}
          </div>
        </motion.div>

        {/* 2. Tech Stack Marquee (Static for now) */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="col-span-1 md:col-span-2 row-span-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="text-blue-500" />
            <h3 className="font-bold text-zinc-700 dark:text-zinc-200">Tech Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech.name} className="px-3 py-1 text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md">
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3. Latest Experience */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           className="col-span-1 md:col-span-1 row-span-2 rounded-xl bg-zinc-950 text-white p-6 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase size={80} />
           </div>
           <h3 className="font-bold text-xl mb-4">Experience</h3>
           <div className="space-y-4">
              {experiences.slice(0, 2).map((exp, i) => (
                <div key={i} className="border-l-2 border-zinc-700 pl-3">
                   <p className="text-sm font-semibold">{exp.title}</p>
                   <p className="text-xs text-zinc-400">{exp.company_name}</p>
                </div>
              ))}
           </div>
        </motion.div>

        {/* 4. Projects Mapping */}
        {projects.slice(0, 3).map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "col-span-1 row-span-1 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between hover:border-blue-500/50 transition-colors group",
              i === 0 ? "md:col-span-2" : "" // Make the first project wider
            )}
          >
             <div>
               <div className="flex justify-between items-start">
                 <h3 className="font-bold text-zinc-800 dark:text-zinc-100">{project.name}</h3>
                 <a href={project.source_code_link} target="_blank" className="text-zinc-400 hover:text-zinc-800 dark:hover:text-white">
                   <Github size={16} />
                 </a>
               </div>
               <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-3">
                 {project.description}
               </p>
             </div>
             
             <div className="flex gap-1 mt-3">
               {project.tags.slice(0, 3).map((tag) => (
                 <span key={tag.name} className={`text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500`}>
                   #{tag.name}
                 </span>
               ))}
             </div>
          </motion.div>
        ))}

        {/* 5. Terminal / Command Box (Decor) */}
        <div className="col-span-1 row-span-1 rounded-xl bg-black border border-zinc-800 p-4 font-mono text-xs text-green-400 flex flex-col justify-center">
           <p>$ npm install portfolio</p>
           <p className="text-white/50">Installing dependencies...</p>
           <p className="mt-2 text-blue-400">Done in 1.2s</p>
        </div>

      </div>
    </div>
  );
}