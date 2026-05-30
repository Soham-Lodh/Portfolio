export interface Project {
  _id: string;
  title: string;
  description: string;
  domain: 'Web Development' | 'AI/ML';
  technologies: string[];
  githubLink: string;
  liveLink: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
