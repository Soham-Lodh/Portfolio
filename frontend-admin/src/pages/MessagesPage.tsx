import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header.js';
import { Sidebar } from '../components/Sidebar.js';
import { LoadingSpinner, Alert, Modal } from '../components/UI.js';
import { messagesAPI } from '../services/adminAPI.js';
import { Message } from '../types/index.js';
import { useAdmin } from '../hooks/useAdmin.js';
import { Trash2, Eye, Mail } from 'lucide-react';
import { formatDate } from '../utils/helpers.js';

export const MessagesPage: React.FC = () => {
  const { logout } = useAdmin();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const result = await messagesAPI.getAll();
      if (result.success) {
        setMessages(result.messages || []);
      }
    } catch (err: any) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessage = async (message: Message) => {
    try {
      await messagesAPI.markAsRead(message._id);
      setSelectedMessage(message);
      setShowModal(true);
      // Update the messages list
      setMessages(
        messages.map((m) =>
          m._id === message._id ? { ...m, isRead: true } : m
        )
      );
    } catch (err: any) {
      setError('Failed to open message');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await messagesAPI.delete(id);
      setMessages(messages.filter((m) => m._id !== id));
      setSuccess('Message deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete message');
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="flex min-h-screen bg-bg-deep">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Messages" onLogout={logout} />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Alerts */}
          <div className="space-y-3 mb-6">
            {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
            {success && (
              <Alert type="success" message={success} onClose={() => setSuccess(null)} />
            )}
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-text-lightest">All Messages</h2>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-accent-red/20 text-accent-red text-sm rounded-full">
                  {unreadCount} Unread
                </span>
              )}
            </div>
          </div>

          {/* Messages List */}
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <LoadingSpinner />
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`liquid-glass rounded-lg p-4 border transition-all ${
                    message.isRead
                      ? 'border-accent-red/20'
                      : 'border-accent-red/40 bg-accent-red/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <Mail size={16} className="text-accent-red flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-text-lightest">{message.name}</p>
                            <p className="text-text-light text-sm truncate">{message.email}</p>
                          </div>
                        </div>
                        {!message.isRead && (
                          <span className="flex-shrink-0 px-2 py-1 bg-accent-red/20 text-accent-red text-xs rounded">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-text-light text-sm line-clamp-2 mb-2">
                        {message.message}
                      </p>
                      <p className="text-text-light/50 text-xs">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleViewMessage(message)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                        title="View message"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(message._id)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        title="Delete message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-light">No messages yet. Check back later!</p>
            </div>
          )}

          {/* Message Detail Modal */}
          <MessageDetailModal
            isOpen={showModal}
            message={selectedMessage}
            onClose={() => setShowModal(false)}
          />
        </main>
      </div>
    </div>
  );
};

interface MessageDetailModalProps {
  isOpen: boolean;
  message: Message | null;
  onClose: () => void;
}

const MessageDetailModal: React.FC<MessageDetailModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg-mid liquid-glass rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-text-lightest mb-4">Message Details</h2>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-text-light text-sm mb-1">From:</p>
            <p className="text-text-lightest font-semibold">{message.name}</p>
            <p className="text-accent-red text-sm">{message.email}</p>
          </div>

          <div>
            <p className="text-text-light text-sm mb-1">Date:</p>
            <p className="text-text-lightest">{formatDate(message.createdAt)}</p>
          </div>

          <div>
            <p className="text-text-light text-sm mb-1">Message:</p>
            <div className="bg-bg-deep rounded-lg p-4 border border-accent-red/20 max-h-48 overflow-y-auto">
              <p className="text-text-lightest whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-accent-red/20 hover:bg-accent-red/30 text-accent-red rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MessagesPage;
