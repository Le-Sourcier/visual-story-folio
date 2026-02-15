import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ProfileData {
  name: string;
  email: string;
  title: string;
  location: string;
  bio: string;
  avatar: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface SeoData {
  siteTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  ogTitle: string;
  ogType: string;
}

export interface DisplayPreferences {
  animations: boolean;
  sidebarCompact: boolean;
  denseMode: boolean;
}

export interface ChatbotQuickAction {
  id: string;
  label: string;
  prompt: string;
}

export interface ChatbotSettings {
  enabled: boolean;
  welcomeMessage: string;
  quickActions: ChatbotQuickAction[];
}

interface SettingsState {
  profile: ProfileData;
  socialLinks: SocialLinks;
  seo: SeoData;
  theme: ThemeMode;
  display: DisplayPreferences;
  chatbot: ChatbotSettings;
  lastSaved: string | null;
}

interface SettingsActions {
  updateProfile: (data: Partial<ProfileData>) => void;
  updateSocialLinks: (data: Partial<SocialLinks>) => void;
  updateSeo: (data: Partial<SeoData>) => void;
  setTheme: (theme: ThemeMode) => void;
  updateDisplay: (data: Partial<DisplayPreferences>) => void;
  updateChatbot: (data: Partial<ChatbotSettings>) => void;
  resetSettings: () => void;
}

type SettingsStore = SettingsState & SettingsActions;

const defaultProfile: ProfileData = {
  name: 'Yao David Logan',
  email: 'admin@logan.dev',
  title: 'Developpeur Fullstack & Software Engineer',
  location: 'Lome, TOGO',
  bio: 'Passionne par le developpement web et mobile, je cree des experiences numeriques performantes et elegantes.',
  avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/profile-picture-4826774e-1770728429712.webp',
};

const defaultSocialLinks: SocialLinks = {
  github: 'https://github.com/yaologan',
  linkedin: 'https://linkedin.com/in/yaologan',
  twitter: '',
  website: '',
};

const defaultSeo: SeoData = {
  siteTitle: 'Yao David Logan | Portfolio',
  metaDescription: 'Developpeur Fullstack & Software Engineer base a Lome. Specialise en React, Node.js et TypeScript.',
  keywords: 'developpeur, fullstack, react, node, typescript, portfolio',
  ogImage: '',
  ogTitle: 'Yao David Logan - Portfolio',
  ogType: 'website',
};

const defaultDisplay: DisplayPreferences = {
  animations: true,
  sidebarCompact: false,
  denseMode: false,
};

const defaultChatbot: ChatbotSettings = {
  enabled: true,
  welcomeMessage: "Bonjour ! 👋 Je suis l'assistant de **Yao David Logan**.\n\nJe peux vous parler de son parcours, ses competences, ses projets ou vous aider a prendre rendez-vous. Comment puis-je vous aider ?",
  quickActions: [
    { id: '1', label: 'Mes Projets', prompt: 'Montre-moi tes projets' },
    { id: '2', label: 'Rendez-vous', prompt: 'Je veux prendre rendez-vous' },
    { id: '3', label: 'Mon Profil', prompt: 'Qui est David Logan ?' },
    { id: '4', label: 'Competences', prompt: 'Quelles sont tes competences ?' },
    { id: '5', label: 'Lire le Blog', prompt: 'Montre-moi le blog' },
    { id: '6', label: 'Contact', prompt: 'Comment te contacter ?' },
  ],
};

const initialState: SettingsState = {
  profile: defaultProfile,
  socialLinks: defaultSocialLinks,
  seo: defaultSeo,
  theme: 'system',
  display: defaultDisplay,
  chatbot: defaultChatbot,
  lastSaved: null,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialState,

      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
          lastSaved: new Date().toISOString(),
        })),

      updateSocialLinks: (data) =>
        set((state) => ({
          socialLinks: { ...state.socialLinks, ...data },
          lastSaved: new Date().toISOString(),
        })),

      updateSeo: (data) =>
        set((state) => ({
          seo: { ...state.seo, ...data },
          lastSaved: new Date().toISOString(),
        })),

      setTheme: (theme) =>
        set({ theme, lastSaved: new Date().toISOString() }),

      updateDisplay: (data) =>
        set((state) => ({
          display: { ...state.display, ...data },
          lastSaved: new Date().toISOString(),
        })),

      updateChatbot: (data) =>
        set((state) => ({
          chatbot: { ...state.chatbot, ...data },
          lastSaved: new Date().toISOString(),
        })),

      resetSettings: () => set(initialState),
    }),
    {
      name: 'admin-settings',
    }
  )
);

// Apply theme to document
export function applyTheme(mode: ThemeMode) {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  if (mode === 'system') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.add(systemDark ? 'dark' : 'light');
    localStorage.setItem('theme', systemDark ? 'dark' : 'light');
  } else {
    root.classList.add(mode);
    localStorage.setItem('theme', mode);
  }
}
