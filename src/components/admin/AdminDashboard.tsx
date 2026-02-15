import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  Settings, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Users, 
  TrendingUp,
  MessageSquare,
  Newspaper
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { Experience } from '@/data/cvData';
import { Project } from '@/data/mockData';
import { ProjectForm, ExperienceForm, BlogPostForm } from './AdminForms';
import { envConfig } from '@/config/env';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [modalType, setModalType] = useState<"project" | "experience" | "blog">("project");

  const fetchData = async () => {
    try {
      const [expData, projData, blogData] = await Promise.all([
        api.get("/experiences"),
        api.get("/projects"),
        api.get("/blog")
      ]);
      setExperiences(expData);
      setProjects(projData);
      setBlogPosts(blogData);
    } catch (error) {
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.info("Déconnexion réussie");
    navigate("/admin/login");
  };

  const handleCreate = (type: "project" | "experience" | "blog") => {
    setModalType(type);
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: any, type: "project" | "experience" | "blog") => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id: string, type: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
    
    try {
      const endpoint = type === "project" ? `/projects/${id}` : type === "experience" ? `/experiences/${id}` : `/blog/${id}`;
      await api.delete(endpoint);
      toast.success("Supprimé avec succès");
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const endpoint = modalType === "project" ? "/projects" : modalType === "experience" ? "/experiences" : "/blog";
      
      if (editingItem) {
        await api.put(`${endpoint}/${editingItem.id}`, data);
        toast.success("Mis à jour avec succès");
      } else {
        await api.post(endpoint, data);
        toast.success("Créé avec succès");
      }
      
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const stats = [
    { label: "Projets", value: projects.length.toString(), icon: FolderKanban, color: "text-blue-500" },
    { label: "Expériences", value: experiences.length.toString(), icon: Briefcase, color: "text-primary" },
    { label: "Articles", value: blogPosts.length.toString(), icon: Newspaper, color: "text-emerald-500" },
    { label: "Messages", value: "12", icon: MessageSquare, color: "text-orange-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-80 bg-card border-r border-border p-8 flex flex-col h-screen sticky top-0 overflow-y-auto z-20">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-xl">L</div>
          <span className="text-2xl font-black tracking-tighter uppercase">Admin<span className="text-primary">.</span></span>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "experiences", label: "Expériences", icon: Briefcase },
            { id: "projects", label: "Projets", icon: FolderKanban },
            { id: "blog", label: "Blog", icon: Newspaper },
            { id: "users", label: "Utilisateurs", icon: Users },
            { id: "settings", label: "Paramètres", icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="capitalize">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-border">
          <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-2xl mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden">
              <img src={envConfig.owner.avatar} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tight">{envConfig.owner.name || 'Admin'}</p>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Administrateur</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-grow p-8 md:p-12 lg:p-16 overflow-y-auto h-screen">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">
              {activeTab === "dashboard" && "Tableau de Bord"}
              {activeTab === "experiences" && "Gestion des Expériences"}
              {activeTab === "projects" && "Gestion des Projets"}
              {activeTab === "blog" && "Gestion du Blog"}
              {activeTab === "settings" && "Paramètres"}
              {activeTab === "users" && "Utilisateurs"}
            </h2>
            <p className="text-muted-foreground font-medium italic">Bienvenue dans votre espace de pilotage.</p>
          </div>
          {activeTab !== "dashboard" && activeTab !== "settings" && activeTab !== "users" && (
            <Button 
              onClick={() => handleCreate(activeTab as any)}
              className="h-14 px-8 rounded-2xl font-black uppercase tracking-widest gap-2 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
            >
              <Plus className="w-5 h-5" />
              Nouveau
            </Button>
          )}
        </header>

        {activeTab === "dashboard" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-card border border-border rounded-[2.5rem] shadow-sm"
              >
                <div className={`w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-[3rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Titre / Détails</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Statut / Date</th>
                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(activeTab === "experiences" ? experiences : activeTab === "projects" ? projects : blogPosts).map((item: any, i) => (
                    <tr key={i} className="hover:bg-secondary/20 transition-colors">
                      <td className="px-8 py-6">
                        <p className="font-black uppercase tracking-tight mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground italic font-bold">{item.company || item.category}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
                          {item.dates || item.date || "N/A"}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleEdit(item, activeTab as any)}
                            className="p-3 bg-secondary rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id, activeTab)}
                            className="p-3 bg-secondary rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(activeTab === "experiences" ? experiences : activeTab === "projects" ? projects : blogPosts).length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-8 py-12 text-center text-muted-foreground font-bold italic">
                        Aucun élément trouvé. Cliquez sur "Nouveau" pour commencer.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 shadow-2xl"
            >
              {modalType === "project" && (
                <ProjectForm 
                  title={editingItem ? "Modifier le Projet" : "Nouveau Projet"}
                  initialData={editingItem}
                  onSubmit={handleSubmit}
                  onCancel={() => setShowModal(false)}
                />
              )}
              {modalType === "experience" && (
                <ExperienceForm 
                  title={editingItem ? "Modifier l'Expérience" : "Nouvelle Expérience"}
                  initialData={editingItem}
                  onSubmit={handleSubmit}
                  onCancel={() => setShowModal(false)}
                />
              )}
              {modalType === "blog" && (
                <BlogPostForm 
                  title={editingItem ? "Modifier l'Article" : "Nouvel Article"}
                  initialData={editingItem}
                  onSubmit={handleSubmit}
                  onCancel={() => setShowModal(false)}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}