import Appointment from '../models/Appointment.js';
import { IAppointment, AppointmentStatus } from '../types/entities.types.js';
import { AppError } from '../middlewares/error.middleware.js';
import { ErrorCode, HttpStatus } from '../types/response.types.js';
import { sendEmail } from '../helpers/mailer.js';
import { appointmentConfirmationTemplate } from '../views/emails/appointment.template.js';
import { Op } from 'sequelize';

class AppointmentService {
  private availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  async findAll(): Promise<IAppointment[]> {
    const appointments = await Appointment.findAll({
      order: [['date', 'ASC'], ['time', 'ASC']],
    });
    return appointments;
  }

  async findById(id: string): Promise<IAppointment> {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      throw new AppError('Appointment not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }
    return appointment;
  }

  async create(data: Omit<IAppointment, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<IAppointment> {
    // Check if slot is available
    const existing = await Appointment.findOne({
      where: {
        date: data.date,
        time: data.time,
        status: { [Op.ne]: 'cancelled' },
      },
    });

    if (existing) {
      throw new AppError('This time slot is already booked', HttpStatus.CONFLICT, ErrorCode.CONFLICT);
    }

    const appointment = await Appointment.create({
      ...data,
      status: 'pending',
    });

    // Send confirmation email
    try {
      await sendEmail({
        to: data.email,
        subject: 'Confirmation de votre rendez-vous',
        html: appointmentConfirmationTemplate({
          name: data.name,
          date: new Date(data.date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          time: data.time,
          subject: data.subject,
        }),
      });
    } catch {
      // Don't fail if email sending fails
    }

    return appointment;
  }

  async updateStatus(id: string, status: AppointmentStatus): Promise<IAppointment> {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      throw new AppError('Appointment not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    await appointment.update({ status });
    return appointment;
  }

  async delete(id: string): Promise<void> {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      throw new AppError('Appointment not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    await appointment.destroy();
  }

  async getAvailableSlots(date: Date): Promise<string[]> {
    const bookedSlots = await Appointment.findAll({
      where: {
        date,
        status: { [Op.ne]: 'cancelled' },
      },
      attributes: ['time'],
    });

    const bookedTimes = bookedSlots.map((a) => a.time);
    return this.availableTimes.filter((time) => !bookedTimes.includes(time));
  }

  async findUpcoming(): Promise<IAppointment[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.findAll({
      where: {
        date: { [Op.gte]: today },
        status: { [Op.in]: ['pending', 'confirmed'] },
      },
      order: [['date', 'ASC'], ['time', 'ASC']],
    });
    return appointments;
  }
}

export const appointmentService = new AppointmentService();
export default appointmentService;
