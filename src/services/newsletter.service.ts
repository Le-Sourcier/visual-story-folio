import Newsletter from '../models/Newsletter.js';
import { INewsletter } from '../types/entities.types.js';
import { AppError } from '../middlewares/error.middleware.js';
import { ErrorCode, HttpStatus } from '../types/response.types.js';
import { sendEmail } from '../helpers/mailer.js';
import { welcomeTemplate } from '../views/emails/welcome.template.js';

class NewsletterService {
  async findAll(): Promise<INewsletter[]> {
    const subscribers = await Newsletter.findAll({
      order: [['subscribedAt', 'DESC']],
    });
    return subscribers;
  }

  async findActive(): Promise<INewsletter[]> {
    const subscribers = await Newsletter.findAll({
      where: { active: true },
      order: [['subscribedAt', 'DESC']],
    });
    return subscribers;
  }

  async subscribe(email: string): Promise<INewsletter> {
    // Check if already subscribed
    const existing = await Newsletter.findOne({ where: { email } });

    if (existing) {
      if (existing.active) {
        throw new AppError('Already subscribed to newsletter', HttpStatus.CONFLICT, ErrorCode.ALREADY_EXISTS);
      }
      // Reactivate subscription
      await existing.update({
        active: true,
        subscribedAt: new Date(),
        unsubscribedAt: undefined,
      });

      return existing;
    }

    const subscriber = await Newsletter.create({ email });

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: 'Bienvenue dans ma newsletter !',
        html: welcomeTemplate({ email }),
      });
    } catch {
      // Don't fail if email sending fails
    }

    return subscriber;
  }

  async unsubscribe(email: string): Promise<void> {
    const subscriber = await Newsletter.findOne({ where: { email } });

    if (!subscriber) {
      throw new AppError('Email not found in newsletter', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    await subscriber.update({
      active: false,
      unsubscribedAt: new Date(),
    });
  }

  async getCount(): Promise<{ total: number; active: number }> {
    const total = await Newsletter.count();
    const active = await Newsletter.count({ where: { active: true } });
    return { total, active };
  }
}

export const newsletterService = new NewsletterService();
export default newsletterService;
