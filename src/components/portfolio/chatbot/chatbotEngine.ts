import { PROJECTS } from '../../../data/mockData';
import { blogPosts } from '../../../data/blogMockData';
import { cvData } from '../../../data/cvData';
import { Message } from './types';

export const getInitialMessage = (): Message => ({
  id: '1',
  role: 'assistant',
  content: `Bonjour ! Je suis l'assistant virtuel de ${cvData.personalInformation.name}. Je peux vous parler de son parcours de ${cvData.personalInformation.title}, de ses compétences techniques, de ses projets ou vous aider à prendre rendez-vous avec lui. Comment puis-je vous aider ?`,
  timestamp: new Date(),
  type: 'text'
});

export const processUserMessage = async (content: string): Promise<Partial<Message>> => {
  const input = content.toLowerCase().trim();
  const NL = String.fromCharCode(10);
  
  await new Promise(resolve => setTimeout(resolve, 800));

  if (
    input.includes('qui es-tu') || 
    input.includes('qui est david') || 
    input.includes('présente-toi') || 
    input.includes('parle-moi de toi') ||
    input.includes('ton profil') ||
    input.includes('mon profil') ||
    input.includes('identité')
  ) {
    return {
      content: `${cvData.personalInformation.name} est un ${cvData.personalInformation.title} basé à ${cvData.personalInformation.location}. ${cvData.profile.summary}`,
      type: 'text'
    };
  }

  if (
    input.includes('expérience') || 
    input.includes('parcours') || 
    input.includes('travaillé') || 
    input.includes('job') ||
    input.includes('carrière') ||
    input.includes('entreprise')
  ) {
    const latestExp = cvData.experience[0];
    const expSummary = cvData.experience.map(exp => `- ${exp.company} : ${exp.title} (${exp.dates})`).join(NL);
    return {
      content: `David a une solide expérience en ingénierie logicielle. Son poste actuel est ${latestExp.title} chez ${latestExp.company}.${NL}${NL}Voici son parcours :${NL}${expSummary}`,
      type: 'text'
    };
  }

  if (
    input.includes('compétence') || 
    input.includes('stack') || 
    input.includes('techno') || 
    input.includes('langage') ||
    input.includes('sais-tu faire') ||
    input.includes('expertise') ||
    input.includes('domaine')
  ) {
    const { frontend, backend, tools } = cvData.skills;
    return {
      content: `David possède une expertise variée en tant que ${cvData.personalInformation.title} :${NL}${NL}- **Frontend**: ${frontend.join(', ')}${NL}- **Backend**: ${backend.join(', ')}${NL}- **Outils & DevOps**: ${tools.join(', ')}`,
      type: 'text'
    };
  }

  if (
    input.includes('contact') || 
    input.includes('email') || 
    input.includes('téléphone') || 
    input.includes('joindre') ||
    input.includes('linkedin') ||
    input.includes('github') ||
    input.includes('écrire')
  ) {
    const { email, phone, linkedin, github, location } = cvData.personalInformation;
    return {
      content: `Vous pouvez contacter David par les moyens suivants :${NL}- **Email**: ${email}${NL}- **Téléphone**: ${phone}${NL}- **Localisation**: ${location}${NL}- **LinkedIn**: ${linkedin}${NL}- **GitHub**: ${github}`,
      type: 'text'
    };
  }

  if (
    input.includes('rendez-vous') || 
    input.includes('disponibilité') || 
    input.includes('réserver') || 
    input.includes('rdv') ||
    input.includes('rencontrer')
  ) {
    return {
      content: "David serait ravi d'échanger avec vous sur vos besoins. Voici les créneaux disponibles prochainement :",
      type: 'appointment_picker',
      metadata: {
        availableTimes: ["09:00", "11:00", "14:00", "16:00"],
        date: new Date().toISOString()
      }
    };
  }

  if (
    input.includes('projet') || 
    input.includes('travaux') || 
    input.includes('réalisations') || 
    input.includes('portfolio') ||
    input.includes('fait quoi') ||
    input.includes('mes projets')
  ) {
    const projectNames = PROJECTS.map(p => p.title).join(', ');
    return {
      content: `David a travaillé sur plusieurs projets d'envergure, notamment : ${projectNames}. Vous pouvez voir les détails dans la section Projets.`,
      type: 'text'
    };
  }

  for (const project of PROJECTS) {
    if (input.includes(project.title.toLowerCase()) || input.includes(project.id.toLowerCase())) {
      return {
        content: `Le projet ${project.title} est une réalisation en ${project.category}. ${project.description}`,
        type: 'project_link',
        metadata: { projectId: project.id, projectTitle: project.title }
      };
    }
  }

  if (input.includes('où est') || input.includes('où vit') || input.includes('habite') || input.includes('ville')) {
    return {
      content: `David est basé à ${cvData.personalInformation.location}. Il est disponible pour des missions en présentiel ou en remote.`,
      type: 'text'
    };
  }

  if (input.includes('blog') || input.includes('articles') || input.includes('lire le blog')) {
    return {
      content: `David partage aussi ses connaissances sur son blog. Voici les articles récents : ${blogPosts.slice(0, 2).map(b => b.title).join(' et ')}.`,
      type: 'text'
    };
  }

  return {
    content: `Je peux vous renseigner sur le parcours de David (expérience, compétences), ses projets récents, ou vous aider à le contacter via son email (${cvData.personalInformation.email}) ou en prenant rendez-vous.`,
    type: 'text'
  };
};