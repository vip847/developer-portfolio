'use client';

import { experiences } from "@/public/constants/data";

const ExperienceView = () => {
  return (
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
  )
}

export default ExperienceView;