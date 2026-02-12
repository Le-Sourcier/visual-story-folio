import { apiClient } from './client';
import type { Testimonial, TestimonialFormData } from '@/types/admin.types';

export const testimonialsApi = {
  async getAll(): Promise<Testimonial[]> {
    return apiClient.get<Testimonial[]>('/testimonials/all');
  },

  async getVisible(): Promise<Testimonial[]> {
    return apiClient.get<Testimonial[]>('/testimonials');
  },

  async getById(id: string): Promise<Testimonial> {
    return apiClient.get<Testimonial>(`/testimonials/${id}`);
  },

  async create(data: TestimonialFormData): Promise<Testimonial> {
    return apiClient.post<Testimonial>('/testimonials', data);
  },

  async update(id: string, data: Partial<TestimonialFormData>): Promise<Testimonial> {
    return apiClient.put<Testimonial>(`/testimonials/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/testimonials/${id}`);
  },

  async toggleVisibility(id: string): Promise<Testimonial> {
    return apiClient.patch<Testimonial>(`/testimonials/${id}/visibility`);
  },
};

export default testimonialsApi;
