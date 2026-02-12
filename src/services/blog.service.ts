import BlogPost, { Comment } from '../models/BlogPost.js';
import { IBlogPost, IBlogComment } from '../types/entities.types.js';
import { AppError } from '../middlewares/error.middleware.js';
import { ErrorCode, HttpStatus } from '../types/response.types.js';
import { generateSlug, calculateReadTime } from '../utils/helpers.js';

class BlogService {
  async findAll(published?: boolean): Promise<IBlogPost[]> {
    const where = published !== undefined ? { published } : {};
    const posts = await BlogPost.findAll({
      where,
      include: [{ model: Comment, as: 'comments' }],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  }

  async findById(id: string): Promise<IBlogPost> {
    const post = await BlogPost.findByPk(id, {
      include: [{ model: Comment, as: 'comments' }],
    });
    if (!post) {
      throw new AppError('Blog post not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }
    return post;
  }

  async findBySlug(slug: string): Promise<IBlogPost> {
    const post = await BlogPost.findOne({
      where: { slug },
      include: [{ model: Comment, as: 'comments' }],
    });
    if (!post) {
      throw new AppError('Blog post not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }
    return post;
  }

  async create(data: Omit<IBlogPost, 'id' | 'slug' | 'readTime' | 'createdAt' | 'updatedAt'>): Promise<IBlogPost> {
    const slug = generateSlug(data.title);
    const readTime = calculateReadTime(data.content);

    // Check for slug collision
    const existing = await BlogPost.findOne({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const post = await BlogPost.create({
      ...data,
      slug: finalSlug,
      readTime,
    });
    return post;
  }

  async update(id: string, data: Partial<IBlogPost>): Promise<IBlogPost> {
    const post = await BlogPost.findByPk(id);
    if (!post) {
      throw new AppError('Blog post not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    // Update slug if title changes
    const updateData: Partial<IBlogPost> = { ...data };
    if (data.title && data.title !== post.title) {
      updateData.slug = generateSlug(data.title);
    }

    // Update read time if content changes
    if (data.content) {
      updateData.readTime = calculateReadTime(data.content);
    }

    await post.update(updateData);
    return post;
  }

  async delete(id: string): Promise<void> {
    const post = await BlogPost.findByPk(id);
    if (!post) {
      throw new AppError('Blog post not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    await post.destroy();
  }

  async addComment(postId: string, data: Omit<IBlogComment, 'id' | 'postId' | 'createdAt'>): Promise<IBlogComment> {
    const post = await BlogPost.findByPk(postId);
    if (!post) {
      throw new AppError('Blog post not found', HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND);
    }

    const comment = await Comment.create({
      ...data,
      postId,
    });

    return comment;
  }

  async findByCategory(category: string): Promise<IBlogPost[]> {
    const posts = await BlogPost.findAll({
      where: { category, published: true },
      include: [{ model: Comment, as: 'comments' }],
      order: [['createdAt', 'DESC']],
    });
    return posts;
  }
}

export const blogService = new BlogService();
export default blogService;
