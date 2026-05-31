'use client';

import { projects } from "@/public/constants/data";
import { ArrowRight, ExternalLink } from "lucide-react";

const ProjectsView = () => {
  return (
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
  )
}

export default ProjectsView;