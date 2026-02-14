import { baseEmailTemplate } from './base.template.js';

interface NewsletterArticleOptions {
  title: string;
  excerpt: string;
  articleUrl: string;
  imageUrl?: string;
  category: string;
  readTime: string;
  unsubscribeUrl: string;
  subscriberEmail: string;
}

export const newsletterArticleTemplate = ({
  title,
  excerpt,
  articleUrl,
  imageUrl,
  category,
  readTime,
  unsubscribeUrl,
  subscriberEmail,
}: NewsletterArticleOptions): string => {
  const content = `
    <div class="greeting">
      Nouvel article publie !
    </div>
    <div class="content">
      ${imageUrl ? `<div style="margin-bottom: 24px; border-radius: 16px; overflow: hidden;"><img src="${imageUrl}" alt="${title}" style="width: 100%; height: auto; display: block;" /></div>` : ''}

      <div style="margin-bottom: 8px;">
        <span style="display: inline-block; padding: 4px 12px; background: rgba(10, 122, 255, 0.15); color: #0a7aff; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${category}</span>
        <span style="color: #6b7c93; font-size: 12px; margin-left: 8px;">${readTime}</span>
      </div>

      <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 12px; line-height: 1.3;">${title}</h2>

      <p style="color: #b4c6e0; line-height: 1.7; margin-bottom: 24px;">${excerpt}</p>

      <p style="text-align: center;">
        <a href="${articleUrl}" class="button">Lire l'article</a>
      </p>

      <p style="margin-top: 24px;">Bonne lecture,<br><span class="highlight">Yao David Logan</span></p>
    </div>
  `;

  return baseEmailTemplate({
    title: `Nouvel article : ${title}`,
    previewText: excerpt.slice(0, 100),
    content,
    unsubscribeEmail: subscriberEmail,
    unsubscribeUrl,
  });
};
