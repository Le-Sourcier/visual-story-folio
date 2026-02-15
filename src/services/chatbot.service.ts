import { ChatMessage, MessageType } from '../types/entities.types.js';
import { generateId } from '../utils/helpers.js';
import projectService from './project.service.js';
import experienceService from './experience.service.js';
import blogService from './blog.service.js';
import { settingsService } from './settings.service.js';

// Fallback personal info (used when settings API has no data)
const DEFAULT_INFO = {
  name: 'Yao David Logan',
  title: 'Developpeur Fullstack & Software Engineer',
  location: 'Lome - TOGO',
  email: 'yaodavidlogan02@gmail.com',
  phone: '+228 91680967 / 96690680',
  github: 'https://github.com/Le-Sourcier',
  linkedin: 'https://linkedin.com/in/yao-logan',
};

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Flutter'],
  backend: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Python'],
  tools: ['Git', 'Docker', 'AWS', 'Firebase', 'Figma'],
};

interface QuickAction {
  id: string;
  label: string;
  prompt: string;
}

class ChatbotService {
  private quickActions: QuickAction[] = [
    { id: '1', label: 'Mes Projets', prompt: 'Montre-moi tes projets' },
    { id: '2', label: 'Rendez-vous', prompt: 'Je veux prendre rendez-vous' },
    { id: '3', label: 'Mon Profil', prompt: 'Qui est David Logan ?' },
    { id: '4', label: 'Competences', prompt: 'Quelles sont tes competences ?' },
    { id: '5', label: 'Lire le Blog', prompt: 'Montre-moi le blog' },
    { id: '6', label: 'Contact', prompt: 'Comment te contacter ?' },
  ];

  private async getPersonalInfo() {
    try {
      const profile = await settingsService.getByKey('profile');
      if (profile && profile.name) return { ...DEFAULT_INFO, ...profile };
    } catch { /* fallback */ }
    return DEFAULT_INFO;
  }

  async processMessage(content: string): Promise<Partial<ChatMessage>> {
    const input = content.toLowerCase().trim();
    const info = await this.getPersonalInfo();

    // Greetings
    if (this.matchesIntent(input, ['bonjour', 'salut', 'hello', 'hey', 'bonsoir', 'coucou'])) {
      return {
        content: `Bonjour ! Je suis l'assistant de **${info.name}**. Comment puis-je vous aider ?\n\nJe peux vous parler de son parcours, ses competences, ses projets ou vous aider a prendre rendez-vous.`,
        type: 'text' as MessageType,
      };
    }

    // Identity
    if (this.matchesIntent(input, ['qui es-tu', 'qui est david', 'presente-toi', 'parle-moi de toi', 'ton profil', 'identite', 'mon profil'])) {
      return {
        content: `**${info.name}** est un **${info.title}** base a **${info.location}**.\n\nPassionne par la creation de solutions logicielles robustes et evolutives, il met en oeuvre des technologies modernes pour concevoir des applications performantes.`,
        type: 'text' as MessageType,
      };
    }

    // Experience
    if (this.matchesIntent(input, ['experience', 'parcours', 'travaille', 'job', 'carriere', 'entreprise'])) {
      const experiences = await experienceService.findAll();
      if (experiences.length === 0) {
        return { content: 'Aucune experience enregistree pour le moment.', type: 'text' as MessageType };
      }
      const expList = experiences.slice(0, 4).map(exp =>
        `- **${exp.company}** : ${exp.title} (${exp.dates})`
      ).join('\n');
      return {
        content: `Voici le parcours professionnel :\n\n${expList}\n\nCliquez sur une experience pour en savoir plus.`,
        type: 'experience_link' as MessageType,
        metadata: {
          experienceId: experiences[0].id,
          experienceTitle: `${experiences[0].title} - ${experiences[0].company}`,
        },
      };
    }

    // Skills
    if (this.matchesIntent(input, ['competence', 'stack', 'techno', 'langage', 'sais-tu faire', 'expertise', 'domaine'])) {
      return {
        content: `Expertise technique :\n\n- **Frontend** : ${skills.frontend.join(', ')}\n- **Backend** : ${skills.backend.join(', ')}\n- **Outils & DevOps** : ${skills.tools.join(', ')}`,
        type: 'text' as MessageType,
      };
    }

    // Contact - propose inline form
    if (this.matchesIntent(input, ['contact', 'email', 'telephone', 'joindre', 'linkedin', 'github', 'ecrire', 'message'])) {
      return {
        content: `Coordonnees de ${info.name} :\n- **Email** : ${info.email}\n- **Telephone** : ${info.phone}\n- **LinkedIn** : ${info.linkedin}\n- **GitHub** : ${info.github}\n\nOu envoyez un message rapide ci-dessous :`,
        type: 'contact_form' as MessageType,
      };
    }

    // Appointment
    if (this.matchesIntent(input, ['rendez-vous', 'disponibilite', 'reserver', 'rdv', 'rencontrer'])) {
      return {
        content: `${info.name} serait ravi d'echanger avec vous. Voici les creneaux disponibles :`,
        type: 'appointment_picker' as MessageType,
        metadata: {
          availableTimes: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          date: new Date().toISOString(),
        },
      };
    }

    // Projects
    if (this.matchesIntent(input, ['projet', 'portfolio', 'realisation', 'travaux', 'creation', 'mes projets'])) {
      const projects = await projectService.findAll();
      if (projects.length === 0) {
        return { content: 'Aucun projet enregistre pour le moment.', type: 'text' as MessageType };
      }
      const list = projects.slice(0, 3).map(p => `- **${p.title}** (${p.category})`).join('\n');
      return {
        content: `Projets recents :\n\n${list}`,
        type: 'project_link' as MessageType,
        metadata: { projectId: projects[0].id, projectTitle: projects[0].title },
      };
    }

    // Blog
    if (this.matchesIntent(input, ['blog', 'article', 'lire', 'publication', 'newsletter'])) {
      const posts = await blogService.findAll(true);
      if (posts.length === 0) {
        return { content: 'Aucun article publie pour le moment. Revenez bientot !', type: 'text' as MessageType };
      }
      return {
        content: `Voici les derniers articles du blog :`,
        type: 'blog_link' as MessageType,
        metadata: {
          posts: posts.slice(0, 3).map(p => ({ id: p.id, title: p.title, slug: (p as any).slug })),
        },
      };
    }

    // Location
    if (this.matchesIntent(input, ['ou est', 'ou vit', 'habite', 'ville', 'localisation', 'pays'])) {
      return {
        content: `${info.name} est base a **${info.location}**. Il est disponible pour des missions en presentiel ou en remote.`,
        type: 'text' as MessageType,
      };
    }

    // Thanks
    if (this.matchesIntent(input, ['merci', 'thanks', 'super', 'genial', 'parfait', 'cool'])) {
      return {
        content: `Avec plaisir ! N'hesitez pas si vous avez d'autres questions. 😊`,
        type: 'text' as MessageType,
      };
    }

    // Default
    return {
      content: `Je peux vous renseigner sur :\n\n- **Parcours** professionnel\n- **Competences** techniques\n- **Projets** realises\n- **Blog** et articles\n- **Contact** et coordonnees\n- **Rendez-vous** pour discuter\n\nQue souhaitez-vous savoir ?`,
      type: 'text' as MessageType,
    };
  }

  private matchesIntent(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword));
  }

  getInitialMessage(): ChatMessage {
    return {
      id: generateId(),
      role: 'assistant',
      content: `Bonjour ! 👋 Je suis l'assistant de **Yao David Logan**.\n\nJe peux vous parler de son parcours, ses competences, ses projets ou vous aider a prendre rendez-vous. Comment puis-je vous aider ?`,
      type: 'text',
      timestamp: new Date(),
    };
  }

  getQuickActions(): QuickAction[] {
    return this.quickActions;
  }
}

export const chatbotService = new ChatbotService();
export default chatbotService;
