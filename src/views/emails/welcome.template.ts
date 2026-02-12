import { baseEmailTemplate } from './base.template.js';

interface WelcomeTemplateOptions {
  email: string;
}

export const welcomeTemplate = ({ email }: WelcomeTemplateOptions): string => {
  const content = `
    <div class="greeting">
      Bonjour et bienvenue !
    </div>
    <div class="content">
      <p>Merci de vous etre inscrit a ma newsletter avec l'adresse <span class="highlight">${email}</span>.</p>

      <p>Vous recevrez desormais mes dernieres reflexions sur :</p>

      <div class="info-box">
        <ul style="list-style: none; padding: 0;">
          <li style="margin-bottom: 8px;">
            <strong>Le developpement web & mobile</strong> - Tendances, bonnes pratiques et tutoriels
          </li>
          <li style="margin-bottom: 8px;">
            <strong>L'architecture logicielle</strong> - Patterns, microservices et scalabilite
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Mes projets</strong> - Nouveautes, behind the scenes et retours d'experience
          </li>
        </ul>
      </div>

      <p>Je m'engage a vous envoyer uniquement du contenu de qualite, pas de spam !</p>

      <p>A tres bientot,<br><span class="highlight">Yao David Logan</span></p>
    </div>
  `;

  return baseEmailTemplate({
    title: 'Bienvenue dans ma newsletter !',
    previewText: 'Merci de vous etre inscrit a la newsletter de Yao David Logan',
    content,
  });
};

export default welcomeTemplate;
