import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { LoadingSpinner, Alert, Modal } from '../components/UI.js';
import { projectAPI } from '../services/adminAPI.js';
import { Project } from '../types/index.js';
import { useAdmin } from '../hooks/useAdmin.js';
import { Edit2, Trash2, Plus } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { logout } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/projects`);
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err: any) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await projectAPI.delete(id);
      setProjects(projects.filter((p) => p._id !== id));
      setSuccess('Project deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedProject(null);
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-bg-deep">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Projects" onLogout={logout} />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Alerts */}
          <div className="space-y-3 mb-6">
            {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
            {success && (
              <Alert type="success" message={success} onClose={() => setSuccess(null)} />
            )}
          </div>

          {/* Header with Add Button */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-text-lightest">All Projects</h2>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-accent-red/20 hover:bg-accent-red/30 text-accent-red rounded-lg transition-colors"
            >
              <Plus size={18} />
              <span>Add Project</span>
            </button>
          </div>

          {/* Projects List */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <LoadingSpinner />
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="liquid-glass rounded-lg p-6 border border-accent-red/20 hover:border-accent-red/40 transition-all"
                >
                  <h3 className="text-lg font-bold text-text-lightest mb-2">{project.title}</h3>
                  <p className="text-text-light text-sm mb-3 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="px-2 py-1 bg-accent-red/20 text-accent-red text-xs rounded">
                      {project.domain}
                    </span>
                    {project.technologies.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-bg-mid text-text-light text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="px-2 py-1 bg-bg-mid text-text-light text-xs rounded">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-red hover:underline text-sm"
                    >
                      GitHub
                    </a>
                    <span className="text-text-light">•</span>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-red hover:underline text-sm"
                    >
                      Live
                    </a>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-light mb-4">No projects yet. Add one to get started!</p>
              <button
                onClick={handleAddNew}
                className="px-6 py-2 bg-accent-red/20 hover:bg-accent-red/30 text-accent-red rounded-lg transition-colors"
              >
                Create First Project
              </button>
            </div>
          )}

          {/* Project Form Modal */}
          <ProjectFormModal
            isOpen={showModal}
            project={selectedProject}
            isEditing={isEditing}
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              loadProjects();
              setShowModal(false);
              setSuccess(isEditing ? 'Project updated successfully' : 'Project added successfully');
              setTimeout(() => setSuccess(null), 3000);
            }}
            onError={(err) => {
              setError(err.message);
              setTimeout(() => setError(null), 5000);
            }}
          />
        </main>
      </div>
    </div>
  );
};

interface ProjectFormModalProps {
  isOpen: boolean;
  project: Project | null;
  isEditing: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: any) => void;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  project,
  isEditing,
  onClose,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: 'Web Development',
    technologies: '',
    githubLink: '',
    liveLink: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && project) {
      setFormData({
        title: project.title,
        description: project.description,
        domain: project.domain,
        technologies: project.technologies.join(', '),
        githubLink: project.githubLink,
        liveLink: project.liveLink,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        domain: 'Web Development',
        technologies: '',
        githubLink: '',
        liveLink: '',
      });
    }
  }, [isEditing, project, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        ...formData,
        technologies: formData.technologies.split(',').map((t) => t.trim()),
      };

      if (isEditing && project) {
        await projectAPI.edit(project._id, data);
      } else {
        await projectAPI.add(data as any);
      }

      onSuccess();
    } catch (err: any) {
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      title={isEditing ? 'Edit Project' : 'Add New Project'}
      onClose={onClose}
      onConfirm={() => handleSubmit({ preventDefault: () => {} } as any)}
    >
      <form className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <label className="block text-text-light mb-2 text-sm">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-3 py-2 text-text-lightest text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-text-light mb-2 text-sm">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-3 py-2 text-text-lightest text-sm h-20 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-text-light mb-2 text-sm">Domain</label>
          <select
            value={formData.domain}
            onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
            className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-3 py-2 text-text-lightest text-sm"
          >
            <option>Web Development</option>
            <option>AI/ML</option>
          </select>
        </div>

        <div>
          <label className="block text-text-light mb-2 text-sm">Technologies (comma separated)</label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
            className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-3 py-2 text-text-lightest text-sm"
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        <div>
          <label className="block text-text-light mb-2 text-sm">GitHub Link</label>
          <input
            type="url"
            value={formData.githubLink}
            onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
            className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-3 py-2 text-text-lightest text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-text-light mb-2 text-sm">Live Link</label>
          <input
            type="url"
            value={formData.liveLink}
            onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
            className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-3 py-2 text-text-lightest text-sm"
            required
          />
        </div>

        {loading && <LoadingSpinner />}
      </form>
    </Modal>
  );
};

export default ProjectsPage;
