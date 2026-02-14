import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';

export interface ISettings {
  id: string;
  key: string;
  value: Record<string, unknown>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SettingsCreationAttributes extends Optional<ISettings, 'id' | 'createdAt' | 'updatedAt'> {}

class Settings extends Model<ISettings, SettingsCreationAttributes> implements ISettings {
  declare id: string;
  declare key: string;
  declare value: Record<string, unknown>;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Settings.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    key: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    value: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
  },
  { sequelize, modelName: 'Settings', tableName: 'settings' }
);

export default Settings;
