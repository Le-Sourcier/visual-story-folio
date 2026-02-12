import { Plus, Menu, Bell, Search, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/uiStore';

interface AdminHeaderProps {
  unreadCount?: number;
  onSearchClick?: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Vue d\'ensemble' },
  projects: { title: 'Projets', subtitle: 'Gestion des projets' },
  experiences: { title: 'Experiences', subtitle: 'Parcours professionnel' },
  blog: { title: 'Blog', subtitle: 'Articles & publications' },
  contacts: { title: 'Messages', subtitle: 'Boite de reception' },
  appointments: { title: 'Rendez-vous', subtitle: 'Planning' },
  testimonials: { title: 'Temoignages', subtitle: 'Avis clients' },
  newsletter: { title: 'Newsletter', subtitle: 'Abonnes' },
  settings: { title: 'Parametres', subtitle: 'Configuration' },
};

const pagesWithCreateButton = ['projects', 'experiences', 'blog', 'testimonials'];

export function AdminHeader({ unreadCount = 0, onSearchClick }: AdminHeaderProps) {
  const { activeTab, openModal, setSidebarOpen } = useUIStore();
  const pageInfo = pageTitles[activeTab] || { title: 'Dashboard', subtitle: '' };
  const showCreate = pagesWithCreateButton.includes(activeTab);

  const handleCreate = () => {
    const map: Record<string, string> = {
      projects: 'project',
      experiences: 'experience',
      blog: 'blog',
      testimonials: 'testimonial',
    };
    const type = map[activeTab];
    if (type) openModal(type as any);
  };

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().includes('MAC');

  return (
    <header className="flex items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground truncate">
            {pageInfo.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Search trigger */}
        <button
          onClick={onSearchClick}
          className="group flex items-center gap-2.5 h-9 pl-3 pr-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-500 transition-all"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[12px]">Rechercher...</span>
          <div className="hidden sm:flex items-center gap-0.5 ml-3">
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors">
              {isMac ? '⌘' : 'Ctrl'}
            </kbd>
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-400 group-hover:border-zinc-300 dark:group-hover:border-zinc-600 transition-colors">
              K
            </kbd>
          </div>
        </button>

        {/* Notifications */}
        <button
          onClick={() => useUIStore.getState().setActiveTab('contacts')}
          className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Bell className="w-[18px] h-[18px] text-zinc-400" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-zinc-50 dark:ring-zinc-950" />
          )}
        </button>

        {/* Create */}
        {showCreate && (
          <Button
            onClick={handleCreate}
            size="sm"
            className="h-9 px-4 rounded-lg text-xs font-semibold gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Nouveau
          </Button>
        )}
      </div>
    </header>
  );
}
