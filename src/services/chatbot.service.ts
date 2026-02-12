import { ChatMessage, MessageType } from '../types/entities.types.js';
import { generateId } from '../utils/helpers.js';
import projectService from './project.service.js';
import experienceService from './experience.service.js';

// Portfolio data (would typically come from database or config)
const personalInfo = {
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
    { id: '1', label: 'Qui est David ?', prompt: 'Qui est David Logan ?' },
    { id: '2', label: 'Competences', prompt: 'Quelles sont tes competences ?' },
    { id: '3', label: 'Projets', prompt: 'Montre-moi tes projets' },
    { id: '4', label: 'Contact', prompt: 'Comment te contacter ?' },
    { id: '5', label: 'Rendez-vous', prompt: 'Je veux prendre rendez-vous' },
  ];

  async processMessage(content: string): Promise<Partial<ChatMessage>> {
    const input = content.toLowerCase().trim();

    // Identity questions
    if (this.matchesIntent(input, ['qui es-tu', 'qui est david', 'presente-toi', 'parle-moi de toi', 'ton profil', 'identite'])) {
      return {
        content: `${personalInfo.name} est un ${personalInfo.title} base a ${personalInfo.location}. Passione par la creation de solutions logicielles robustes et evolutives, il met en oeuvre des technologies modernes pour concevoir des applications performantes et centrees sur l'utilisateur.`,
        type: 'text' as MessageType,
      };
    }

    // Experience questions
    if (this.matchesIntent(input, ['experience', 'parcours', 'travaille', 'job', 'carriere', 'entreprise'])) {
      const experiences = await experienceService.findAll();
      const expSummary = experiences.slice(0, 3).map(exp => `- ${exp.company} : ${exp.title} (${exp.dates})`).join('\n');
      return {
        content: `David a une solide experience en ingenierie logicielle.\n\nVoici son parcours recent :\n${expSummary}`,
        type: 'text' as MessageType,
      };
    }

    // Skills questions
    if (this.matchesIntent(input, ['competence', 'stack', 'techno', 'langage', 'sais-tu faire', 'expertise', 'domaine'])) {
      return {
        content: `David possede une expertise variee :\n\n- **Frontend**: ${skills.frontend.join(', ')}\n- **Backend**: ${skills.backend.join(', ')}\n- **Outils & DevOps**: ${skills.tools.join(', ')}`,
        type: 'text' as MessageType,
      };
    }

    // Contact questions
    if (this.matchesIntent(input, ['contact', 'email', 'telephone', 'joindre', 'linkedin', 'github', 'ecrire'])) {
      return {
        content: `Vous pouvez contacter David par les moyens suivants :\n- **Email**: ${personalInfo.email}\n- **Telephone**: ${personalInfo.phone}\n- **LinkedIn**: ${personalInfo.linkedin}\n- **GitHub**: ${personalInfo.github}`,
        type: 'text' as MessageType,
      };
    }

    // Appointment questions
    if (this.matchesIntent(input, ['rendez-vous', 'disponibilite', 'reserver', 'rdv', 'rencontrer'])) {
      return {
        content: 'David serait ravi d\'echanger avec vous sur vos besoins. Voici les creneaux disponibles prochainement :',
        type: 'appointment_picker' as MessageType,
        metadata: {
          availableTimes: ['09:00', '11:00', '14:00', '16:00'],
          date: new Date().toISOString(),
        },
      };
    }

    // Projects questions
    if (this.matchesIntent(input, ['projet', 'portfolio', 'realisation', 'travaux', 'creation'])) {
      const projects = await projectService.findAll();
      const projectList = projects.slice(0, 3).map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        image: p.image,
      }));
      return {
        content: `Voici quelques projets recents de David :`,
        type: 'project_card' as MessageType,
        metadata: { projects: projectList },
      };
    }

    // Greetings
    if (this.matchesIntent(input, ['bonjour', 'salut', 'hello', 'hey', 'bonsoir', 'coucou'])) {
      return {
        content: `Bonjour ! Je suis l'assistant virtuel de ${personalInfo.name}. Je peux vous parler de son parcours, ses competences, ses projets ou vous aider a prendre rendez-vous. Comment puis-je vous aider ?`,
        type: 'text' as MessageType,
      };
    }

    // Default response
    return {
      content: `Je suis l'assistant de ${personalInfo.name}. Je peux vous renseigner sur :\n- Son parcours professionnel\n- Ses competences techniques\n- Ses projets\n- Ses coordonnees\n- La prise de rendez-vous\n\nQue souhaitez-vous savoir ?`,
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
      content: `Bonjour ! Je suis l'assistant virtuel de ${personalInfo.name}. Je peux vous parler de son parcours de ${personalInfo.title}, de ses competences techniques, de ses projets ou vous aider a prendre rendez-vous avec lui. Comment puis-je vous aider ?`,
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
