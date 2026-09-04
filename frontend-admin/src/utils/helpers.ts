export const isTokenValid = (): boolean => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const getToken = (): string | null => {
  return localStorage.getItem('adminToken');
};

export const clearToken = (): void => {
  localStorage.removeItem('adminToken');
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};
