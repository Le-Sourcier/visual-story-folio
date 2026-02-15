import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Newspaper,
  MessageSquare,
  CalendarDays,
  Mail,
  Star,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { useLogout } from '@/hooks/queries';
import { cn } from '@/lib/utils';
import { envConfig } from '@/config/env';

const navSections = [
  {
    label: 'Principal',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'projects', label: 'Projets', icon: FolderKanban },
      { id: 'experiences', label: 'Experiences', icon: Briefcase },
      { id: 'blog', label: 'Blog', icon: Newspaper },
    ],
  },
  {
    label: 'Communication',
    items: [
      { id: 'contacts', label: 'Messages', icon: MessageSquare },
      { id: 'appointments', label: 'Rendez-vous', icon: CalendarDays },
      { id: 'testimonials', label: 'Temoignages', icon: Star },
      { id: 'newsletter', label: 'Newsletter', icon: Mail },
    ],
  },
  {
    label: 'Systeme',
    items: [
      { id: 'settings', label: 'Parametres', icon: Settings },
    ],
  },
];

interface AdminSidebarProps {
  unreadCount?: number;
}

export function AdminSidebar({ unreadCount = 0 }: AdminSidebarProps) {
  const { activeTab, setActiveTab, sidebarCollapsed, toggleSidebarCollapse } = useUIStore();
  const { user } = useAuthStore();
  const { profile } = useSettingsStore();
  const logoutMutation = useLogout();

  return (
    <aside
      className={cn(
        'flex flex-col h-screen sticky top-0 overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out',
        'bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-400',
        sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Header */}
      <div className={cn(
        'flex items-center h-16 shrink-0 border-b border-white/[0.06]',
        sidebarCollapsed ? 'justify-center px-3' : 'justify-between px-5'
      )}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
            <span className="text-zinc-950 font-black text-sm">{envConfig.appBrand.charAt(0)}</span>
          </div>
          {!sidebarCollapsed && (
            <span className="text-[15px] font-semibold text-white tracking-tight">
              {envConfig.appBrand.toLowerCase()}<span className="text-zinc-500">admin</span>
            </span>
          )}
        </div>
        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebarCollapse}
            className="p-1.5 rounded-md hover:bg-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Collapsed toggle */}
      {sidebarCollapsed && (
        <button
          onClick={toggleSidebarCollapse}
          className="mx-auto mt-3 p-1.5 rounded-md hover:bg-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <PanelLeft className="w-4 h-4" />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            {!sidebarCollapsed && (
              <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-600">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = activeTab === item.id;
                const badge = item.id === 'contacts' && unreadCount > 0 ? unreadCount : null;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={cn(
                      'w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-all duration-150',
                      sidebarCollapsed ? 'justify-center p-2.5' : 'px-2.5 py-2',
                      isActive
                        ? 'bg-white/[0.08] text-white'
                        : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'
                    )}
                  >
                    <item.icon className={cn('w-[18px] h-[18px] shrink-0', isActive && 'text-white')} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {badge && (
                          <span className="ml-auto bg-blue-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                            {badge > 99 ? '99+' : badge}
                          </span>
                        )}
                      </>
                    )}
                    {sidebarCollapsed && badge && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="shrink-0 border-t border-white/[0.06] p-3">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition-colors mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 overflow-hidden shrink-0 ring-1 ring-white/10">
              <img
                src={profile.avatar}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-zinc-200 truncate">
                {profile.name || user?.name || 'Admin'}
              </p>
              <p className="text-[11px] text-zinc-600 truncate">
                {profile.email || user?.email || envConfig.owner.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 overflow-hidden ring-1 ring-white/10">
              <img
                src={profile.avatar}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <button
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className={cn(
            'w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium text-zinc-600 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-150',
            sidebarCollapsed ? 'justify-center p-2.5' : 'px-2.5 py-2'
          )}
          title={sidebarCollapsed ? 'Deconnexion' : undefined}
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          {!sidebarCollapsed && <span>Deconnexion</span>}
        </button>
      </div>
    </aside>
  );
}
