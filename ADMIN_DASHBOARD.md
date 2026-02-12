# Admin Dashboard - Documentation

## Vue d'ensemble

Dashboard d'administration complet pour gerer le portfolio. Interface moderne avec React 19, TypeScript, Tailwind CSS, Zustand (state management) et TanStack Query (server state).

---

## Checklist de Developpement

### Phase 1: Infrastructure & Services
- [x] Service API de base (api.ts)
- [x] Service API refactorise avec types (client.ts + modules)
- [x] Service d'authentification complet (auth.api.ts)
- [x] Hooks TanStack Query (queries/)
- [x] Gestion du state global (Zustand stores)

### Phase 2: Types & Interfaces
- [x] Types pour les entites (Project, Experience, Blog, etc.)
- [x] Types pour les reponses API (ApiResponse, ApiError)
- [x] Types pour les formulaires (FormData types)

### Phase 3: Composants UI Admin
- [x] AdminLogin (page de connexion - refactorise avec useLogin)
- [x] ProtectedRoute (garde de route - refactorise avec Zustand)
- [x] AdminSidebar (composant separe avec collapse, badges)
- [x] AdminHeader (composant separe avec breadcrumb, actions)
- [x] AdminLayout (layout principal orchestrant sidebar + pages)
- [x] StatsCard (carte de statistiques avec animation)
- [x] DataTable (tableau de donnees generique avec actions)
- [x] AdminModal (modal generique pilotee par uiStore)
- [x] ConfirmDialog (confirmation de suppression)
- [x] EmptyState (etat vide avec action)
- [x] StatusBadge (badge de statut colore)

### Phase 4: Pages Admin
- [x] DashboardPage (stats + activite recente)
- [x] ProjectsPage (liste + CRUD)
- [x] ExperiencesPage (liste + CRUD)
- [x] BlogPage (liste + CRUD)
- [x] ContactsPage (messages + lecture + detail)
- [x] AppointmentsPage (RDV + changement statut)
- [x] NewsletterPage (stats + liste abonnes)
- [x] TestimonialsPage (CRUD + visibilite)
- [x] SettingsPage (profil, securite, apparence, SEO)

### Phase 5: Formulaires
- [x] ProjectForm (avec types, categories, metriques, technologies)
- [x] ExperienceForm (avec stack technique, defis)
- [x] BlogPostForm (avec tags, brouillon/publier, Markdown)
- [x] TestimonialForm (avec note, avatar, entreprise)
- [ ] Validation avec Zod/react-hook-form
- [ ] Upload d'images
- [ ] Editeur Markdown riche

### Phase 6: Stores Zustand
- [x] authStore (user, token, refreshToken, isAuthenticated)
- [x] uiStore (sidebar, modal, activeTab, globalLoading)

### Phase 7: TanStack Query Hooks
- [x] useAuthQueries (login, logout, refresh, profile)
- [x] useProjectQueries (CRUD complet)
- [x] useExperienceQueries (CRUD complet)
- [x] useBlogQueries (CRUD + commentaires)
- [x] useContactQueries (CRUD + markAsRead + unreadCount)
- [x] useAppointmentQueries (CRUD + slots + statut)
- [x] useNewsletterQueries (subscribe/unsubscribe + stats)
- [x] useTestimonialQueries (CRUD + toggleVisibility)

### Phase 8: API Services Frontend
- [x] client.ts (HTTP client avec auth, refresh, timeout)
- [x] auth.api.ts
- [x] projects.api.ts
- [x] experiences.api.ts
- [x] blog.api.ts
- [x] contacts.api.ts
- [x] appointments.api.ts
- [x] newsletter.api.ts
- [x] testimonials.api.ts

### Phase 9: Fonctionnalites Avancees
- [ ] Recherche et filtrage dans DataTable
- [ ] Pagination server-side
- [ ] Tri des colonnes
- [ ] Export CSV/PDF
- [ ] Notifications temps reel (WebSocket)
- [ ] Dark/Light mode toggle dans Settings
- [ ] Dashboard analytics avec graphiques (Recharts)

---

## Architecture

```
frontend/src/
├── components/
│   └── admin/
│       ├── layout/
│       │   ├── AdminLayout.tsx       # Layout principal (sidebar + content + modal)
│       │   ├── AdminSidebar.tsx      # Navigation collapsible + user info
│       │   ├── AdminHeader.tsx       # Titre page + actions + notifications
│       │   └── index.ts
│       ├── shared/
│       │   ├── StatsCard.tsx         # Carte stat avec trend
│       │   ├── DataTable.tsx         # Tableau generique (columns, actions)
│       │   ├── AdminModal.tsx        # Modal pilotee par uiStore
│       │   ├── ConfirmDialog.tsx     # Dialogue de confirmation
│       │   ├── EmptyState.tsx        # Etat vide avec CTA
│       │   ├── StatusBadge.tsx       # Badge colore (success/warning/danger)
│       │   └── index.ts
│       ├── forms/
│       │   ├── ProjectForm.tsx       # Types + mutations TanStack Query
│       │   ├── ExperienceForm.tsx
│       │   ├── BlogPostForm.tsx
│       │   ├── TestimonialForm.tsx
│       │   └── index.ts
│       ├── pages/
│       │   ├── DashboardPage.tsx     # Stats + activite recente
│       │   ├── ProjectsPage.tsx      # DataTable + CRUD
│       │   ├── ExperiencesPage.tsx   # DataTable + CRUD
│       │   ├── BlogPage.tsx          # DataTable + CRUD + status
│       │   ├── ContactsPage.tsx      # Messages + detail modal
│       │   ├── AppointmentsPage.tsx  # RDV + changement statut inline
│       │   ├── TestimonialsPage.tsx  # CRUD + toggle visibilite
│       │   ├── NewsletterPage.tsx    # Stats + liste abonnes
│       │   ├── SettingsPage.tsx      # Profil/Securite/Apparence/SEO
│       │   └── index.ts
│       ├── AdminLogin.tsx            # Refactorise avec useLogin()
│       └── ProtectedRoute.tsx        # Refactorise avec useAuthStore
├── stores/
│   ├── authStore.ts                  # Zustand persist (user, token)
│   └── uiStore.ts                    # Zustand (sidebar, modal, tab)
├── hooks/
│   └── queries/
│       ├── useAuthQueries.ts         # login, logout, refresh, profile
│       ├── useProjectQueries.ts      # CRUD + optimistic updates
│       ├── useExperienceQueries.ts
│       ├── useBlogQueries.ts         # + commentaires
│       ├── useContactQueries.ts      # + markAsRead + unreadCount
│       ├── useAppointmentQueries.ts  # + available slots + status
│       ├── useNewsletterQueries.ts   # subscribe/unsubscribe + stats
│       ├── useTestimonialQueries.ts  # + toggleVisibility
│       └── index.ts
├── services/
│   └── api/
│       ├── client.ts                 # ApiClient (auth, refresh, timeout)
│       ├── auth.api.ts
│       ├── projects.api.ts
│       ├── experiences.api.ts
│       ├── blog.api.ts
│       ├── contacts.api.ts
│       ├── appointments.api.ts
│       ├── newsletter.api.ts
│       ├── testimonials.api.ts
│       └── index.ts
└── types/
    └── admin.types.ts                # Toutes les interfaces admin
```

---

## Stack Technique

| Outil | Usage |
|-------|-------|
| **React 19** | UI Framework |
| **TypeScript** | Typage strict |
| **Tailwind CSS** | Styles utilitaires |
| **Zustand** | State management (auth, UI) |
| **TanStack Query** | Server state, cache, mutations |
| **Framer Motion** | Animations et transitions |
| **Lucide React** | Icones |
| **shadcn/ui** | Composants de base (Button, Input, etc.) |
| **Sonner** | Notifications toast |

---

## Flux de donnees

```
Page Component
  └─ useQuery (TanStack) ──> API Service ──> Backend
  └─ useMutation ──> API Service ──> Backend
       └─ onSuccess: invalidateQueries / setQueryData (optimistic)
       └─ onError: toast.error
  └─ useUIStore (Zustand) ──> Modal state, Active tab
  └─ useAuthStore (Zustand) ──> User, Token
```

---

## Changelog

### v2.0.0 (2026-02-12)
- Refactorisation complete du dashboard admin
- Architecture modulaire (layout/shared/forms/pages)
- Migration vers Zustand pour le state management
- Migration vers TanStack Query pour le server state
- Service API refactorise avec modules separes
- Types TypeScript stricts pour toutes les entites
- 9 pages admin fonctionnelles
- 4 formulaires types avec mutations
- Composants partages reutilisables (DataTable, StatsCard, etc.)
- ProtectedRoute et AdminLogin refactorises
- QueryClientProvider integre dans App.tsx

### v1.0.0 (2026-02-12)
- Structure initiale du dashboard (monolithique)
- Pages de base (Dashboard, Projets, Experiences, Blog)
- Formulaires CRUD basiques sans types
- Authentification JWT basique avec localStorage
