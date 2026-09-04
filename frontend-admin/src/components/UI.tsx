import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const bgColor = {
    success: 'bg-green-500/10 border-green-500/20 text-green-400',
    error: 'bg-red-500/10 border-red-500/20 text-red-400',
    info: 'bg-accent-red/10 border-accent-red/20 text-accent-red',
  };

  const Icon = type === 'success' ? CheckCircle : AlertCircle;

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColor[type]}`}
    >
      <Icon size={20} />
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-accent-red/20"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent-red animate-spin"></div>
      </div>
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-bg-mid liquid-glass rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold text-text-lightest mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-bg-deep hover:bg-bg-deep/70 text-text-light rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-accent-red/20 hover:bg-accent-red/30 text-accent-red rounded-lg transition-colors"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
