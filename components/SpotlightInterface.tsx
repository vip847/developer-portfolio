"use client";

import { useState, FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  ChevronRight,
} from "lucide-react";
import SpotHeader from "./SpotLight/SpotHeader";
import SpotMain from "./SpotLight/SpotMain";
import AboutView from "./SpotLight/AboutView";
import ProjectsView from "./SpotLight/ProjectsView";
import ExperienceView from "./SpotLight/ExperienceView";
import TechView from "./SpotLight/TechView";
import ContactView from "./SpotLight/ContactView";
import ResumeView from "./SpotLight/ResumeView";

type ViewKey = 'about' | 'projects' | 'experience' | 'tech' | 'contact' | 'resume' | null;

const ViewComponents: Record<Exclude<ViewKey, null>, FC> = {
  about: AboutView,
  projects: ProjectsView,
  experience: ExperienceView,
  tech: TechView,
  contact: ContactView,
  resume: ResumeView
};

export function SpotlightInterface() {
  const [activeView, setActiveView] = useState<ViewKey>(null);
  const ActiveComponent = activeView ? ViewComponents[activeView] : null;
  const [query, setQuery] = useState("");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-[12vh] px-4 font-sans bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-blue-100 dark:selection:bg-blue-900">

      {/* 1. Enhanced Header: Always visible, fades out when view is active to reduce noise */}
      <SpotHeader activeView={activeView} />

      {/* 2. Main Card */}
      <SpotMain
        activeView={activeView}
        query={query}
        setActiveView={setActiveView}
        setQuery={setQuery}
      />

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
              {ActiveComponent && <ActiveComponent />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}