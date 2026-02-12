import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './index.js';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API backend pour le portfolio de Yao David Logan',
      contact: {
        name: 'Yao David Logan',
        email: 'yaodavidlogan02@gmail.com',
        url: 'https://github.com/Le-Sourcier',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' },
            meta: {
              type: 'object',
              properties: {
                timestamp: { type: 'string', format: 'date-time' },
                requestId: { type: 'string' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                details: { type: 'string' },
              },
            },
          },
        },
        Project: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            category: { type: 'string' },
            image: { type: 'string' },
            description: { type: 'string' },
            problem: { type: 'string' },
            solution: { type: 'string' },
            results: { type: 'array', items: { type: 'string' } },
            metrics: { type: 'array' },
            url: { type: 'string' },
          },
        },
        Experience: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            company: { type: 'string' },
            location: { type: 'string' },
            dates: { type: 'string' },
            description: { type: 'string' },
            stack: { type: 'array', items: { type: 'string' } },
          },
        },
        BlogPost: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            excerpt: { type: 'string' },
            content: { type: 'string' },
            category: { type: 'string' },
            imageUrl: { type: 'string' },
            readTime: { type: 'string' },
            author: { type: 'string' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Projects', description: 'Projects management' },
      { name: 'Experiences', description: 'Work experiences management' },
      { name: 'Blog', description: 'Blog posts management' },
      { name: 'Contact', description: 'Contact messages' },
      { name: 'Appointments', description: 'Appointment booking' },
      { name: 'Newsletter', description: 'Newsletter subscriptions' },
      { name: 'Testimonials', description: 'Testimonials management' },
      { name: 'Chatbot', description: 'AI Chatbot assistant' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
