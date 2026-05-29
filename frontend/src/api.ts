import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Project {
  _id: string;
  title: string;
  description: string;
  domain: 'Web Development' | 'AI/ML';
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const projectAPI = {
  getAll: async (domain?: string) => {
    const params = domain ? { domain } : {};
    return apiClient.get<{ success: boolean; projects: Project[] }>('/user/projects', { params });
  },
  getById: async (id: string) => {
    return apiClient.get<{ success: boolean; project: Project }>(`/user/projects/${id}`);
  },
};

export const contactAPI = {
  send: async (data: ContactFormData) => {
    return apiClient.post('/user/contact', data);
  },
};

export default apiClient;
