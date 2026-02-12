import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';
import { IAdmin, AdminRole } from '../types/entities.types.js';
import bcrypt from 'bcryptjs';

interface AdminCreationAttributes extends Optional<IAdmin, 'id' | 'lastLogin' | 'createdAt' | 'updatedAt'> {}

class Admin extends Model<IAdmin, AdminCreationAttributes> implements IAdmin {
  declare id: string;
  declare email: string;
  declare password: string;
  declare name: string;
  declare role: AdminRole;
  declare lastLogin?: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Instance method to verify password
  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Hide password in JSON output
  toJSON(): Omit<IAdmin, 'password'> {
    const values = { ...this.get() };
    delete (values as Partial<IAdmin>).password;
    return values as Omit<IAdmin, 'password'>;
  }
}

Admin.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'super_admin'),
      defaultValue: 'admin',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    hooks: {
      beforeCreate: async (admin) => {
        admin.password = await bcrypt.hash(admin.password, 12);
      },
      beforeUpdate: async (admin) => {
        if (admin.changed('password')) {
          admin.password = await bcrypt.hash(admin.password, 12);
        }
      },
    },
  }
);

export default Admin;
