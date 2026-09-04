import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { LoadingSpinner, Alert } from '../components/UI.js';
import { messagesAPI, projectAPI } from '../services/adminAPI.js';
import { Project, Message } from '../types/index.js';
import { useAdmin } from '../hooks/useAdmin.js';
import { MessageSquare, Folder, TrendingUp } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { logout } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch projects and messages in parallel
      const [projectsRes, messagesRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/user/projects`),
        messagesAPI.getAll(),
      ]);

      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setProjects(projectsData.projects || []);
      }

      if (messagesRes.success) {
        setMessages(messagesRes.messages || []);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="flex min-h-screen bg-bg-deep">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Dashboard" onLogout={logout} />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {error && <Alert type="error" message={error} />}

          {loading ? (
            <div className="flex items-center justify-center h-96">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Projects */}
                <div className="liquid-glass rounded-lg p-6 border border-accent-red/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-light text-sm">Total Projects</p>
                      <h3 className="text-3xl font-bold text-text-lightest mt-2">
                        {projects.length}
                      </h3>
                    </div>
                    <div className="p-3 bg-accent-red/20 rounded-lg">
                      <Folder className="text-accent-red" size={24} />
                    </div>
                  </div>
                </div>

                {/* Total Messages */}
                <div className="liquid-glass rounded-lg p-6 border border-accent-red/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-light text-sm">Total Messages</p>
                      <h3 className="text-3xl font-bold text-text-lightest mt-2">
                        {messages.length}
                      </h3>
                    </div>
                    <div className="p-3 bg-accent-red/20 rounded-lg">
                      <MessageSquare className="text-accent-red" size={24} />
                    </div>
                  </div>
                </div>

                {/* Unread Messages */}
                <div className="liquid-glass rounded-lg p-6 border border-accent-red/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-light text-sm">Unread Messages</p>
                      <h3 className="text-3xl font-bold text-text-lightest mt-2">
                        {unreadCount}
                      </h3>
                    </div>
                    <div className="p-3 bg-accent-red/20 rounded-lg">
                      <TrendingUp className="text-accent-red" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-text-lightest mb-4">Recent Projects</h2>
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.slice(0, 4).map((project) => (
                      <div
                        key={project._id}
                        className="liquid-glass rounded-lg p-4 border border-accent-red/20 hover:border-accent-red/40 transition-colors"
                      >
                        <h3 className="font-bold text-text-lightest mb-2">{project.title}</h3>
                        <p className="text-text-light text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-accent-red/20 text-accent-red text-xs rounded">
                            {project.domain}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-light">No projects yet</p>
                )}
              </div>

              {/* Recent Messages */}
              <div>
                <h2 className="text-2xl font-bold text-text-lightest mb-4">Recent Messages</h2>
                {messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.slice(0, 3).map((message) => (
                      <div
                        key={message._id}
                        className={`liquid-glass rounded-lg p-4 border ${
                          message.isRead
                            ? 'border-accent-red/20'
                            : 'border-accent-red/40 bg-accent-red/5'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-bold text-text-lightest">{message.name}</p>
                            <p className="text-text-light text-sm">{message.email}</p>
                          </div>
                          {!message.isRead && (
                            <span className="px-2 py-1 bg-accent-red/20 text-accent-red text-xs rounded">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-text-light text-sm line-clamp-2">{message.message}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-text-light">No messages yet</p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
