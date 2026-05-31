'use client';

import { technologies } from "@/public/constants/data";

const TechView = () => {
  return (
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
  )
}

export default TechView;