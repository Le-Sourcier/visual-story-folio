# Backend Portfolio - Documentation de Développement

## Vue d'ensemble

Backend Node.js/TypeScript robuste pour le portfolio de Yao David Logan. Architecture inspirée du projet Nexus Corporation avec une structure modulaire et maintenable.

---

## Checklist de Développement

### Phase 1: Configuration de Base
- [x] Créer la structure des dossiers
- [x] Configurer package.json avec les dépendances
- [x] Configurer TypeScript (tsconfig.json)
- [x] Configurer ESLint
- [x] Créer le fichier .env.example
- [x] Créer le fichier .gitignore

### Phase 2: Configuration Core
- [x] Configuration de l'application (src/config/)
- [x] Configuration de la base de données
- [x] Configuration Swagger/OpenAPI
- [x] Configuration des variables d'environnement

### Phase 3: Types et Interfaces
- [x] Types pour les réponses API (src/types/response.types.ts)
- [x] Types pour les entités (Project, Experience, Blog, etc.)
- [x] Types pour l'authentification

### Phase 4: Utilitaires et Helpers
- [x] Format de réponse standardisé (src/utils/response.util.ts)
- [x] Logger personnalisé
- [x] Mailer helper (src/helpers/mailer.ts)
- [x] Générateur d'ID unique

### Phase 5: Modèles de Données
- [x] Model Project
- [x] Model Experience
- [x] Model BlogPost
- [x] Model Contact (messages)
- [x] Model Appointment
- [x] Model Newsletter
- [x] Model Testimonial
- [x] Model Admin/User
- [x] Index des modèles avec associations

### Phase 6: Services (Business Logic)
- [x] AuthService
- [x] ProjectService
- [x] ExperienceService
- [x] BlogService
- [x] ContactService
- [x] AppointmentService
- [x] NewsletterService
- [x] TestimonialService
- [x] ChatbotService

### Phase 7: Middlewares
- [x] Middleware d'authentification JWT
- [x] Middleware de validation
- [x] Middleware de rate limiting
- [x] Middleware de gestion d'erreurs
- [x] Middleware de logging

### Phase 8: Validators
- [x] Validators pour Projects
- [x] Validators pour Experiences
- [x] Validators pour Blog
- [x] Validators pour Contact
- [x] Validators pour Appointments
- [x] Validators pour Newsletter

### Phase 9: Controllers
- [x] AuthController
- [x] ProjectController
- [x] ExperienceController
- [x] BlogController
- [x] ContactController
- [x] AppointmentController
- [x] NewsletterController
- [x] TestimonialController
- [x] ChatbotController

### Phase 10: Routes
- [x] Routes Auth (/api/auth)
- [x] Routes Projects (/api/projects)
- [x] Routes Experiences (/api/experiences)
- [x] Routes Blog (/api/blog)
- [x] Routes Contact (/api/contact)
- [x] Routes Appointments (/api/appointments)
- [x] Routes Newsletter (/api/newsletter)
- [x] Routes Testimonials (/api/testimonials)
- [x] Routes Chatbot (/api/chatbot)

### Phase 11: Templates Email (Views)
- [x] Template de bienvenue newsletter
- [x] Template de confirmation de rendez-vous
- [x] Template de nouveau message contact
- [x] Template de réinitialisation mot de passe
- [x] Layout email de base

### Phase 12: Serveur Principal
- [x] Configuration Express
- [x] Intégration Socket.io
- [x] Documentation Swagger
- [x] Point d'entrée (server.ts)

### Phase 13: Scripts et Migrations
- [ ] Script de seed pour données initiales
- [ ] Script de migration
- [ ] Script de backup

### Phase 14: Tests et Documentation
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Documentation API complète

---

## Structure du Projet

```
backend/
├── src/
│   ├── config/
│   │   ├── index.ts           # Configuration principale
│   │   ├── database.ts        # Config PostgreSQL/Sequelize
│   │   └── swagger.ts         # Config Swagger
│   ├── types/
│   │   ├── response.types.ts  # Types de réponse API
│   │   ├── entities.types.ts  # Types des entités
│   │   └── auth.types.ts      # Types authentification
│   ├── utils/
│   │   ├── response.util.ts   # Format de réponse standardisé
│   │   ├── logger.ts          # Logger Winston
│   │   └── helpers.ts         # Fonctions utilitaires
│   ├── helpers/
│   │   └── mailer.ts          # Service d'envoi d'emails
│   ├── models/
│   │   ├── index.ts           # Index et associations
│   │   ├── Project.ts
│   │   ├── Experience.ts
│   │   ├── BlogPost.ts
│   │   ├── Contact.ts
│   │   ├── Appointment.ts
│   │   ├── Newsletter.ts
│   │   ├── Testimonial.ts
│   │   └── Admin.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── project.service.ts
│   │   ├── experience.service.ts
│   │   ├── blog.service.ts
│   │   ├── contact.service.ts
│   │   ├── appointment.service.ts
│   │   ├── newsletter.service.ts
│   │   ├── testimonial.service.ts
│   │   └── chatbot.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   ├── rateLimit.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── logger.middleware.ts
│   ├── validators/
│   │   ├── project.validator.ts
│   │   ├── experience.validator.ts
│   │   ├── blog.validator.ts
│   │   ├── contact.validator.ts
│   │   ├── appointment.validator.ts
│   │   └── newsletter.validator.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   ├── experience.controller.ts
│   │   ├── blog.controller.ts
│   │   ├── contact.controller.ts
│   │   ├── appointment.controller.ts
│   │   ├── newsletter.controller.ts
│   │   ├── testimonial.controller.ts
│   │   └── chatbot.controller.ts
│   ├── routes/
│   │   ├── index.ts           # Index des routes
│   │   ├── auth.routes.ts
│   │   ├── project.routes.ts
│   │   ├── experience.routes.ts
│   │   ├── blog.routes.ts
│   │   ├── contact.routes.ts
│   │   ├── appointment.routes.ts
│   │   ├── newsletter.routes.ts
│   │   ├── testimonial.routes.ts
│   │   └── chatbot.routes.ts
│   ├── views/
│   │   └── emails/
│   │       ├── base.template.ts
│   │       ├── welcome.template.ts
│   │       ├── appointment.template.ts
│   │       ├── contact.template.ts
│   │       └── passwordReset.template.ts
│   └── server.ts              # Point d'entrée
├── scripts/
│   └── seed.ts                # Données initiales
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── BACKEND_DEVELOPMENT.md
```

---

## Endpoints API

### Authentification
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | /api/auth/login | Connexion admin | Non |
| POST | /api/auth/logout | Déconnexion | Oui |
| GET | /api/auth/me | Profil connecté | Oui |
| POST | /api/auth/refresh | Rafraîchir token | Oui |

### Projets
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | /api/projects | Liste des projets | Non |
| GET | /api/projects/:id | Détail projet | Non |
| POST | /api/projects | Créer projet | Admin |
| PUT | /api/projects/:id | Modifier projet | Admin |
| DELETE | /api/projects/:id | Supprimer projet | Admin |

### Expériences
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | /api/experiences | Liste expériences | Non |
| GET | /api/experiences/:id | Détail expérience | Non |
| POST | /api/experiences | Créer expérience | Admin |
| PUT | /api/experiences/:id | Modifier expérience | Admin |
| DELETE | /api/experiences/:id | Supprimer expérience | Admin |

### Blog
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | /api/blog | Liste articles | Non |
| GET | /api/blog/:id | Détail article | Non |
| POST | /api/blog | Créer article | Admin |
| PUT | /api/blog/:id | Modifier article | Admin |
| DELETE | /api/blog/:id | Supprimer article | Admin |
| POST | /api/blog/:id/comments | Ajouter commentaire | Non |

### Contact
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | /api/contact | Envoyer message | Non |
| GET | /api/contact | Liste messages | Admin |
| GET | /api/contact/:id | Détail message | Admin |
| PATCH | /api/contact/:id/read | Marquer comme lu | Admin |
| DELETE | /api/contact/:id | Supprimer message | Admin |

### Rendez-vous
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | /api/appointments | Réserver RDV | Non |
| GET | /api/appointments | Liste RDV | Admin |
| GET | /api/appointments/available | Créneaux dispo | Non |
| PATCH | /api/appointments/:id/status | Changer statut | Admin |
| DELETE | /api/appointments/:id | Annuler RDV | Admin |

### Newsletter
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | /api/newsletter/subscribe | S'abonner | Non |
| POST | /api/newsletter/unsubscribe | Se désabonner | Non |
| GET | /api/newsletter/subscribers | Liste abonnés | Admin |

### Témoignages
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | /api/testimonials | Liste témoignages | Non |
| POST | /api/testimonials | Créer témoignage | Admin |
| PUT | /api/testimonials/:id | Modifier | Admin |
| DELETE | /api/testimonials/:id | Supprimer | Admin |

### Chatbot
| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| POST | /api/chatbot/message | Envoyer message | Non |
| GET | /api/chatbot/quick-actions | Actions rapides | Non |

---

## Format de Réponse API Standardisé

### Succès
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "meta": {
    "timestamp": "2026-02-12T10:30:00Z",
    "requestId": "uuid-v4"
  }
}
```

### Erreur
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error description"
  },
  "meta": {
    "timestamp": "2026-02-12T10:30:00Z",
    "requestId": "uuid-v4"
  }
}
```

### Liste paginée
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  },
  "meta": {
    "timestamp": "2026-02-12T10:30:00Z",
    "requestId": "uuid-v4"
  }
}
```

---

## Stack Technique

- **Runtime**: Node.js 20+
- **Language**: TypeScript 5.x
- **Framework**: Express.js 4.x
- **ORM**: Sequelize 6.x
- **Database**: PostgreSQL 15+
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator + Zod
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI 3.0
- **Logging**: Winston
- **Real-time**: Socket.io
- **Security**: Helmet, bcryptjs, rate-limit

---

## Variables d'Environnement

```env
# Server
NODE_ENV=development
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
DB_USERNAME=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Portfolio <noreply@yourdomain.com>"

# Admin
ADMIN_EMAIL=admin@logan.dev
ADMIN_PASSWORD=secure_hashed_password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

---

## Commandes

```bash
# Développement
npm run dev        # Lance le serveur en mode dev avec hot-reload

# Production
npm run build      # Compile TypeScript
npm start          # Lance le serveur compilé

# Base de données
npm run db:migrate # Exécute les migrations
npm run db:seed    # Insère les données initiales

# Qualité
npm run lint       # Vérifie le code
npm run lint:fix   # Corrige automatiquement
npm run typecheck  # Vérifie les types
```

---

## Notes de Sécurité

1. **Mots de passe**: Toujours hashés avec bcrypt (cost factor 12)
2. **JWT**: Tokens courts (24h) + refresh tokens (7j)
3. **Rate Limiting**: 100 req/15min pour les routes publiques
4. **CORS**: Restreint au frontend en production
5. **Helmet**: Headers de sécurité activés
6. **Input Validation**: Toutes les entrées validées et sanitisées
7. **SQL Injection**: Prévenu par Sequelize ORM
8. **XSS**: Headers Content-Security-Policy configurés

---

## Changelog

### v1.0.0 (2026-02-12)
- Initial setup
- Structure complète du projet
- Tous les endpoints implémentés
- Templates email créés
- Documentation Swagger
