import { baseEmailTemplate } from './base.template.js';

interface PasswordResetTemplateOptions {
  name: string;
  resetLink: string;
  expiresIn: string;
}

export const passwordResetTemplate = ({
  name,
  resetLink,
  expiresIn,
}: PasswordResetTemplateOptions): string => {
  const content = `
    <div class="greeting">
      Bonjour <span class="highlight">${name}</span>,
    </div>
    <div class="content">
      <p>Vous avez demande la reinitialisation de votre mot de passe.</p>

      <p>Cliquez sur le bouton ci-dessous pour creer un nouveau mot de passe :</p>

      <p style="text-align: center;">
        <a href="${resetLink}" class="button">Reinitialiser mon mot de passe</a>
      </p>

      <div class="info-box">
        <p><strong>Important :</strong></p>
        <ul style="padding-left: 20px; margin: 10px 0;">
          <li>Ce lien expire dans <strong>${expiresIn}</strong></li>
          <li>Si vous n'avez pas fait cette demande, ignorez cet email</li>
          <li>Ne partagez jamais ce lien avec quelqu'un d'autre</li>
        </ul>
      </div>

      <p style="font-size: 13px; color: #6b7c93;">
        Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :<br>
        <span style="word-break: break-all; color: #0a7aff;">${resetLink}</span>
      </p>

      <p>Cordialement,<br><span class="highlight">L'equipe technique</span></p>
    </div>
  `;

  return baseEmailTemplate({
    title: 'Reinitialisation de votre mot de passe',
    previewText: 'Cliquez pour reinitialiser votre mot de passe',
    content,
  });
};

export default { passwordResetTemplate };
