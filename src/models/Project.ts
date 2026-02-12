import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database.js';
import {
  IProject,
  ProjectCategory,
  ProjectMetric,
  ChartData,
  SolutionDiagram,
  ImpactData,
} from '../types/entities.types.js';

interface ProjectCreationAttributes extends Optional<IProject, 'id' | 'createdAt' | 'updatedAt'> {}

class Project extends Model<IProject, ProjectCreationAttributes> implements IProject {
  declare id: string;
  declare title: string;
  declare category: ProjectCategory;
  declare image: string;
  declare description: string;
  declare problem: string;
  declare solution: string;
  declare results: string[];
  declare metrics: ProjectMetric[];
  declare chartData: ChartData[];
  declare url?: string;
  declare solutionDiagram?: SolutionDiagram;
  declare impactGraph?: ImpactData[];
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('UI/UX', 'Branding', 'Web', 'Art', 'Photo', 'Fullstack', 'Software'),
      allowNull: false,
      defaultValue: 'Fullstack',
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    problem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    results: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    metrics: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    chartData: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    solutionDiagram: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    impactGraph: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
  }
);

export default Project;
