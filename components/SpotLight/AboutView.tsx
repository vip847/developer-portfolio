'use client';

import { services } from '@/public/constants/data';
import { MapPin } from 'lucide-react';

const AboutView = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-4 border-white dark:border-zinc-700 shadow-lg">
          {/* Placeholder for Profile Image */}
          <div className="w-full h-full flex items-center justify-center bg-linear-to-tr from-blue-500 to-purple-600 text-white text-3xl font-bold">VI</div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Viplao Itankar</h2>
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
  )
}

export default AboutView;