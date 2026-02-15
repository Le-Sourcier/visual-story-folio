import { Request, Response, NextFunction } from 'express';
import { settingsService } from '../services/settings.service.js';
import { sendSuccess } from '../utils/response.util.js';

export const getAllSettings = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const settings = await settingsService.getAll();
    sendSuccess(res, settings, 'Settings retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = req.body as Record<string, Record<string, unknown>>;
    await settingsService.upsertAll(data);
    const updated = await settingsService.getAll();
    sendSuccess(res, updated, 'Settings updated successfully');
  } catch (error) {
    next(error);
  }
};
