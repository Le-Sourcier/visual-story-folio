import { baseEmailTemplate } from './base.template.js';

interface AppointmentTemplateOptions {
  name: string;
  date: string;
  time: string;
  subject: string;
}

export const appointmentConfirmationTemplate = ({
  name,
  date,
  time,
  subject,
}: AppointmentTemplateOptions): string => {
  const content = `
    <div class="greeting">
      Bonjour <span class="highlight">${name}</span>,
    </div>
    <div class="content">
      <p>Votre demande de rendez-vous a bien ete enregistree !</p>

      <div class="info-box">
        <p style="margin-bottom: 12px;"><strong>Details du rendez-vous :</strong></p>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="margin-bottom: 8px;">
            <strong>Date :</strong> ${date}
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Heure :</strong> ${time}
          </li>
          <li style="margin-bottom: 8px;">
            <strong>Sujet :</strong> ${subject}
          </li>
        </ul>
      </div>

      <p>Je vous confirmerai le rendez-vous sous peu. Si vous avez besoin de modifier ou annuler, n'hesitez pas a me contacter.</p>

      <p style="text-align: center;">
        <a href="mailto:yaodavidlogan02@gmail.com" class="button">Me contacter</a>
      </p>

      <p>A bientot,<br><span class="highlight">Yao David Logan</span></p>
    </div>
  `;

  return baseEmailTemplate({
    title: 'Confirmation de votre rendez-vous',
    previewText: `Votre rendez-vous du ${date} a ${time} a ete enregistre`,
    content,
  });
};

export default { appointmentConfirmationTemplate };
