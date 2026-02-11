import { useState } from 'react';
import { motion } from 'framer-motion';
import { loginAdmin } from '../../lib/adminAuth';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('[AdminLoginPage] Attempting login with password length:', password.length);
    
    const isValid = loginAdmin(password);
    console.log('[AdminLoginPage] Password check result:', isValid);
    
    if (isValid) {
      setPassword('');
      // Reload to show the admin dashboard
      window.location.reload();
    } else {
      console.error('[AdminLoginPage] Login failed - incorrect password');
      setError('Λάθος κωδικός πρόσβασης');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Εισάγετε τον κωδικό πρόσβασης για να συνδεθείτε</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Κωδικός Πρόσβασης
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                const newPassword = e.target.value;
                console.log('[AdminLoginPage] Password changed, length:', newPassword.length);
                setPassword(newPassword);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Εισάγετε τον κωδικό πρόσβασης"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            disabled={loading || !password}
          >
            {loading ? 'Σύνδεση...' : 'Σύνδεση'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

