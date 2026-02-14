import Settings from '../models/Settings.js';

class SettingsService {
  async getAll(): Promise<Record<string, Record<string, unknown>>> {
    const rows = await Settings.findAll();
    const result: Record<string, Record<string, unknown>> = {};
    for (const row of rows) {
      result[row.key] = row.value;
    }
    return result;
  }

  async getByKey(key: string): Promise<Record<string, unknown> | null> {
    const row = await Settings.findOne({ where: { key } });
    return row ? row.value : null;
  }

  async upsert(key: string, value: Record<string, unknown>): Promise<Record<string, unknown>> {
    const [row] = await Settings.upsert({ key, value } as any);
    return row.value;
  }

  async upsertAll(data: Record<string, Record<string, unknown>>): Promise<void> {
    for (const [key, value] of Object.entries(data)) {
      await Settings.upsert({ key, value } as any);
    }
  }
}

export const settingsService = new SettingsService();
export default settingsService;
