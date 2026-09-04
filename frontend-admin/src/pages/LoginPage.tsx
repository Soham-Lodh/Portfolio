import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, LoadingSpinner } from '../components/UI.js';
import { useAdmin } from '../hooks/useAdmin.js';
import { Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAdmin();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-bg-deep flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-lightest mb-2">Admin Panel</h1>
          <p className="text-text-light">Manage your portfolio</p>
        </div>

        {/* Login Card */}
        <div className="liquid-glass rounded-lg p-8 border border-accent-red/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-text-light mb-2">
                <Mail size={18} className="text-accent-red" />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-4 py-2 text-text-lightest placeholder-text-light/50 focus:outline-none focus:border-accent-red transition-colors"
                placeholder="admin@example.com"
                disabled={loading}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-text-light mb-2">
                <Lock size={18} className="text-accent-red" />
                <span>Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-deep border border-accent-red/20 rounded-lg px-4 py-2 text-text-lightest placeholder-text-light/50 focus:outline-none focus:border-accent-red transition-colors"
                placeholder="••••••••"
                disabled={loading}
                required
              />
            </div>

            {/* Error Alert */}
            {error && (
              <Alert type="error" message={error} />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-red/20 hover:bg-accent-red/30 disabled:opacity-50 text-accent-red font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span>Logging in...</span>
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-text-light text-sm mt-6">
          © 2024 Portfolio Admin. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
