import React from "react"
import { motion } from "framer-motion";
import { connect } from "@/public/constants/data";

interface SpotHeaderInterface {
  activeView: string | null;
}

const SpotHeader = ({ activeView }: SpotHeaderInterface) => {

  return(
    <motion.div
        animate={{ opacity: activeView ? 0.5 : 1, scale: activeView ? 0.95 : 1 }}
        className="text-center mb-8 space-y-2"
      >
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Viplao Itankar
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
          Software Developer <span className="text-zinc-300 dark:text-zinc-700 mx-2">|</span> SAP FICO Certified
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
  )
}

export default SpotHeader