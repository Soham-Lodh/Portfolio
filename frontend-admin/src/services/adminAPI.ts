import axios from 'axios';
import { Project, Message, AdminLoginResponse } from '../types/index.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const adminClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
adminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await adminClient.post<AdminLoginResponse>('/admin/login', {
      email,
      password,
    });
    return response.data;
  },
};

// User Projects API (for fetching all projects)
export const userProjectAPI = {
  getAll: async (domain?: string) => {
    const params = domain ? { domain } : {};
    const response = await adminClient.get<{ success: boolean; projects: Project[] }>(
      '/user/projects',
      { params }
    );
    return response.data;
  },
};

// Projects API (admin operations)
export const projectAPI = {
  add: async (projectData: Omit<Project, '_id'>) => {
    const response = await adminClient.post('/admin/add-project', projectData);
    return response.data;
  },
  edit: async (id: string, projectData: Partial<Project>) => {
    const response = await adminClient.put(`/admin/edit-project/${id}`, projectData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await adminClient.delete(`/admin/delete-project/${id}`);
    return response.data;
  },
};

// Messages API
export const messagesAPI = {
  getAll: async () => {
    const response = await adminClient.get<{ success: boolean; count: number; messages: Message[] }>(
      '/admin/messages'
    );
    return response.data;
  },
  getById: async (id: string) => {
    const response = await adminClient.get<{ success: boolean; message: Message }>(
      `/admin/messages/${id}`
    );
    return response.data;
  },
  markAsRead: async (id: string) => {
    const response = await adminClient.put(`/admin/messages/${id}/read`);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await adminClient.delete(`/admin/messages/${id}`);
    return response.data;
  },
};

export default adminClient;
