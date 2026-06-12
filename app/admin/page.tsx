"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, FolderGit2, Cpu, LogOut, Plus, Trash2, Edit3, X } from "lucide-react";
import { useRouter } from "next/navigation";

// --- TYPES ---
interface ProjectItem {
  _id: string; name: string; description: string; image: string; source_code_link: string; live_demo_link?: string; tags: { name: string; color: string }[];
}
interface ExperienceItem {
  _id: string; title: string; company_name: string; icon: string; date: string; points: string[];
}
interface TechItem {
  _id: string; name: string; icon: string; category: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"projects" | "experience" | "tech">("projects");
  
  // Data States
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  
  // Shared Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Fetch Data on Load or Tab Change
  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const fetchData = async (tab: string) => {
    const res = await fetch(`/api/admin/${tab}`);
    if (res.ok) {
      const data = await res.json();
      if (tab === "projects") setProjects(data);
      if (tab === "experience") setExperiences(data);
      if (tab === "tech") setTechStack(data);
    }
  };

  // --- FORM HANDLING ---
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let payload = { ...formData };

    // Format specific fields before sending
    if (activeTab === "projects" && payload.tagsString) {
      payload.tags = payload.tagsString.split(",").map((t: string) => ({ name: t.trim(), color: "blue-text-gradient" })).filter((t: any) => t.name);
      delete payload.tagsString;
    }
    if (activeTab === "experience" && payload.pointsString) {
      payload.points = payload.pointsString.split("\n").map((p: string) => p.trim()).filter((p: string) => p);
      delete payload.pointsString;
    }

    // Default Images if empty
    if (!payload.image && activeTab === "projects") payload.image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c";
    if (!payload.icon && (activeTab === "experience" || activeTab === "tech")) payload.icon = "https://cdn-icons-png.flaticon.com/512/25/25231.png"; // Fallback generic icon

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { id: editingId, ...payload } : payload;

    const res = await fetch(`/api/admin/${activeTab}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      closeAndResetModal();
      fetchData(activeTab);
    }
  };

  const openEditModal = (item: any) => {
    setEditingId(item._id);
    let prefilledData = { ...item };
    
    // Reverse format for inputs
    if (activeTab === "projects") prefilledData.tagsString = item.tags.map((t: any) => t.name).join(", ");
    if (activeTab === "experience") prefilledData.pointsString = item.points.join("\n");

    setFormData(prefilledData);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      const res = await fetch(`/api/admin/${activeTab}?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchData(activeTab);
    }
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({});
  };

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Control Panel
            </h2>
          </div>
          <nav className="space-y-2">
            {[
              { id: "projects", icon: FolderGit2, label: "Projects" },
              { id: "experience", icon: Briefcase, label: "Experience" },
              { id: "tech", icon: Cpu, label: "Tech Stack" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-950/30 rounded-lg transition-all w-full">
          <LogOut size={18} /> Log Out
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold capitalize">{activeTab}</h1>
            <p className="text-zinc-400 text-sm mt-1">Manage your database records dynamically.</p>
          </div>
          <button onClick={() => { setFormData({}); setEditingId(null); setIsModalOpen(true); }} className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-zinc-200 transition-colors">
            <Plus size={16} /> Add New Record
          </button>
        </div>

        {/* DYNAMIC GRIDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Projects View */}
          {activeTab === "projects" && projects.map((project) => (
            <div key={project._id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2">{project.name}</h3>
                <p className="text-zinc-400 text-xs line-clamp-3 mb-4">{project.description}</p>
              </div>
              <div className="flex border-t border-zinc-800 bg-zinc-900/50 p-3 justify-end gap-2">
                <button onClick={() => openEditModal(project)} className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-lg"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(project._id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {/* Experience View */}
          {activeTab === "experience" && experiences.map((exp) => (
            <div key={exp._id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="p-5">
                <div className="text-xs text-blue-400 font-mono mb-1">{exp.date}</div>
                <h3 className="text-lg font-bold">{exp.title}</h3>
                <p className="text-zinc-400 text-sm">{exp.company_name}</p>
              </div>
              <div className="flex border-t border-zinc-800 bg-zinc-900/50 p-3 justify-end gap-2">
                <button onClick={() => openEditModal(exp)} className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-lg"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(exp._id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {/* Tech Stack View */}
          {activeTab === "tech" && techStack.map((tech) => (
            <div key={tech._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between shadow-xl">
              <div>
                <h3 className="font-bold">{tech.name}</h3>
                <p className="text-xs text-zinc-500">{tech.category}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEditModal(tech)} className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-lg"><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(tech._id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

        </div>
      </main>

      {/* DYNAMIC MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-xl rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeAndResetModal} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><X size={20} /></button>
            <h2 className="text-xl font-bold mb-6 capitalize">{editingId ? `Edit ${activeTab}` : `New ${activeTab}`}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* MODAL: PROJECTS */}
              {activeTab === "projects" && (
                <>
                  <input type="text" placeholder="Project Name" required value={formData.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  <textarea placeholder="Description" rows={3} required value={formData.description || ""} onChange={(e) => handleInputChange("description", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  <input type="text" placeholder="Tags (comma separated e.g. React, Node)" value={formData.tagsString || ""} onChange={(e) => handleInputChange("tagsString", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  <input type="url" placeholder="Source Code URL" required value={formData.source_code_link || ""} onChange={(e) => handleInputChange("source_code_link", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  <input type="url" placeholder="Image URL (Cloudinary)" value={formData.image || ""} onChange={(e) => handleInputChange("image", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                </>
              )}

              {/* MODAL: EXPERIENCE */}
              {activeTab === "experience" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Job Title" required value={formData.title || ""} onChange={(e) => handleInputChange("title", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                    <input type="text" placeholder="Company Name" required value={formData.company_name || ""} onChange={(e) => handleInputChange("company_name", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  </div>
                  <input type="text" placeholder="Date (e.g. Jan 2023 - Present)" required value={formData.date || ""} onChange={(e) => handleInputChange("date", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  <textarea placeholder="Bullet Points (Press Enter for new point)" rows={4} value={formData.pointsString || ""} onChange={(e) => handleInputChange("pointsString", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  <input type="url" placeholder="Company Logo URL" value={formData.icon || ""} onChange={(e) => handleInputChange("icon", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                </>
              )}

              {/* MODAL: TECH STACK */}
              {activeTab === "tech" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Tech Name (e.g. React)" required value={formData.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                    <input type="text" placeholder="Category (e.g. Frontend)" value={formData.category || ""} onChange={(e) => handleInputChange("category", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                  </div>
                  <input type="url" placeholder="Tech Icon URL" value={formData.icon || ""} onChange={(e) => handleInputChange("icon", e.target.value)} className="w-full px-3 py-2 text-sm rounded bg-zinc-950 border border-zinc-800 focus:border-blue-500 outline-none" />
                </>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800 mt-6">
                <button type="button" onClick={closeAndResetModal} className="px-4 py-2 text-sm font-medium bg-zinc-800 hover:bg-zinc-700 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-500 rounded-lg">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}