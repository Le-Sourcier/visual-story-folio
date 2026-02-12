import { baseEmailTemplate } from './base.template.js';

interface ContactTemplateOptions {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactReceivedTemplate = ({
  name,
  email,
  subject,
  message,
}: ContactTemplateOptions): string => {
  const content = `
    <div class="greeting">
      Nouveau message recu !
    </div>
    <div class="content">
      <p>Vous avez recu un nouveau message via votre portfolio.</p>

      <div class="info-box">
        <p style="margin-bottom: 12px;"><strong>Details du message :</strong></p>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 8px;">
            <strong>De :</strong> ${name}
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Email :</strong> <a href="mailto:${email}" style="color: #0a7aff;">${email}</a>
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Sujet :</strong> ${subject}
          </li>
        </ul>
      </div>

      <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="margin-bottom: 8px; font-weight: 600; color: #e9f1ff;">Message :</p>
        <p style="white-space: pre-wrap; color: #b4c6e0;">${message}</p>
      </div>

      <p style="text-align: center;">
        <a href="mailto:${email}?subject=Re: ${subject}" class="button">Repondre</a>
      </p>
    </div>
  `;

  return baseEmailTemplate({
    title: `Nouveau message de ${name}`,
    previewText: `${name} vous a envoye un message: ${subject}`,
    content,
  });
};

export default { contactReceivedTemplate };
