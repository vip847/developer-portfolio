'use client';

const ResumeView = () => {
  return (
    <div className="flex flex-col h-[85vh] max-h-svh w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Curriculum Vitae</h3>
        <a
          href="/resume.pdf"
          download="Viplao_Itankar_Resume.pdf"
          className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-all"
        >
          Download PDF
        </a>
      </div>

      {/* PDF Embed */}
      <div className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-100">
        <iframe
          src="/resume.pdf#toolbar=0"
          className="w-full h-full"
          title="Resume Preview"
        />
      </div>
    </div>
  )
}

export default ResumeView;