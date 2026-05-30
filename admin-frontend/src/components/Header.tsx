import React from 'react';
import { LogOut, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 liquid-glass border-b border-accent-red/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-bg-mid rounded-lg transition-colors"
          >
            <Home size={20} className="text-accent-red" />
          </button>
          <h1 className="text-2xl font-bold text-text-lightest">{title}</h1>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 bg-accent-red/10 hover:bg-accent-red/20 text-accent-red rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
