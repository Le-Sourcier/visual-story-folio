import { DataTypes, Model, Optional, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../config/database.js';
import { IBlogPost, IBlogComment } from '../types/entities.types.js';

// Comment model
interface CommentCreationAttributes extends Optional<IBlogComment, 'id' | 'createdAt'> {}

export class Comment extends Model<IBlogComment, CommentCreationAttributes> implements IBlogComment {
  declare id: string;
  declare author: string;
  declare email: string;
  declare content: string;
  declare postId: string;
  declare readonly createdAt: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: { isEmail: true },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    updatedAt: false,
  }
);

// BlogPost model
interface BlogPostCreationAttributes extends Optional<IBlogPost, 'id' | 'viewCount' | 'shareCount' | 'createdAt' | 'updatedAt' | 'comments'> {}

class BlogPost extends Model<IBlogPost, BlogPostCreationAttributes> implements IBlogPost {
  declare id: string;
  declare title: string;
  declare slug: string;
  declare excerpt: string;
  declare content: string;
  declare category: string;
  declare imageUrl: string;
  declare readTime: string;
  declare author: string;
  declare published: boolean;
  declare viewCount: number;
  declare shareCount: number;
  declare comments?: IBlogComment[];
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getComments: HasManyGetAssociationsMixin<Comment>;
}

BlogPost.init(
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
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readTime: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'Yao David Logan',
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    shareCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BlogPost',
    tableName: 'blog_posts',
  }
);

// Associations
BlogPost.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(BlogPost, { foreignKey: 'postId' });

export default BlogPost;
