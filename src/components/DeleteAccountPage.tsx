import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import logoSidebar from '../assets/images/logosidebar.png';

type Language = 'el' | 'en';

const translations = {
  el: {
    title: 'Διαγραφή Λογαριασμού',
    subtitle: 'T-Parking',
    description: 'Αυτή η σελίδα σας επιτρέπει να διαγράψετε μόνιμα τον λογαριασμό σας από την εφαρμογή T-Parking.',
    warning: 'Προσοχή: Η διαγραφή του λογαριασμού σας είναι μόνιμη και δεν μπορεί να αναιρεθεί.',
    whatDeleted: 'Τι θα διαγραφεί:',
    deletedItems: [
      'Τα προσωπικά σας στοιχεία (email, όνομα)',
      'Το ιστορικό στάθμευσης',
      'Οι πόντοι και οι ανταμοιβές σας',
      'Οι αποθηκευμένες θέσεις parking',
      'Όλες οι κρατήσεις σας'
    ],
    loginTitle: 'Σύνδεση στον λογαριασμό σας',
    email: 'Email',
    password: 'Κωδικός πρόσβασης',
    loginButton: 'Σύνδεση',
    loggingIn: 'Σύνδεση...',
    deleteTitle: 'Επιβεβαίωση διαγραφής',
    loggedAs: 'Συνδεδεμένος ως:',
    confirmText: 'Πληκτρολογήστε "ΔΙΑΓΡΑΦΗ" για επιβεβαίωση:',
    confirmPlaceholder: 'ΔΙΑΓΡΑΦΗ',
    confirmWord: 'ΔΙΑΓΡΑΦΗ',
    deleteButton: 'Διαγραφή λογαριασμού μόνιμα',
    deleting: 'Διαγραφή...',
    cancelButton: 'Ακύρωση',
    successTitle: 'Ο λογαριασμός διαγράφηκε',
    successMessage: 'Ο λογαριασμός σας και όλα τα δεδομένα σας έχουν διαγραφεί επιτυχώς.',
    backHome: 'Επιστροφή στην αρχική',
    errorLogin: 'Σφάλμα σύνδεσης. Ελέγξτε τα στοιχεία σας.',
    errorDelete: 'Σφάλμα κατά τη διαγραφή. Παρακαλώ δοκιμάστε ξανά.',
    logout: 'Αποσύνδεση'
  },
  en: {
    title: 'Delete Account',
    subtitle: 'T-Parking',
    description: 'This page allows you to permanently delete your account from the T-Parking app.',
    warning: 'Warning: Deleting your account is permanent and cannot be undone.',
    whatDeleted: 'What will be deleted:',
    deletedItems: [
      'Your personal information (email, name)',
      'Parking history',
      'Your points and rewards',
      'Saved parking spots',
      'All your reservations'
    ],
    loginTitle: 'Login to your account',
    email: 'Email',
    password: 'Password',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    deleteTitle: 'Confirm deletion',
    loggedAs: 'Logged in as:',
    confirmText: 'Type "DELETE" to confirm:',
    confirmPlaceholder: 'DELETE',
    confirmWord: 'DELETE',
    deleteButton: 'Delete account permanently',
    deleting: 'Deleting...',
    cancelButton: 'Cancel',
    successTitle: 'Account deleted',
    successMessage: 'Your account and all your data have been successfully deleted.',
    backHome: 'Back to home',
    errorLogin: 'Login error. Please check your credentials.',
    errorDelete: 'Error during deletion. Please try again.',
    logout: 'Logout'
  }
};

export default function DeleteAccountPage() {
  const [language, setLanguage] = useState<Language>('el');
  const [step, setStep] = useState<'info' | 'login' | 'confirm' | 'success'>('info');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const t = translations[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      if (data.user && data.session) {
        setUserId(data.user.id);
        setUserEmail(data.user.email || email);
        setAccessToken(data.session.access_token);
        setStep('confirm');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(t.errorLogin);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmWord = language === 'el' ? 'ΔΙΑΓΡΑΦΗ' : 'DELETE';
    if (confirmText !== confirmWord || !userId || !accessToken) return;

    setLoading(true);
    setError('');

    try {
      console.log('[DeleteAccount] Starting account deletion for user:', userId);

      // Call the Netlify function for secure server-side deletion
      const response = await fetch('/.netlify/functions/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          accessToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete account');
      }

      console.log('[DeleteAccount] Account deletion completed via server');
      
      // Sign out locally
      await supabase.auth.signOut();
      
      setStep('success');
    } catch (err: any) {
      console.error('[DeleteAccount] Error:', err);
      setError(t.errorDelete + ' ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setStep('info');
    setUserId(null);
    setUserEmail(null);
    setAccessToken(null);
    setEmail('');
    setPassword('');
    setConfirmText('');
  };

  const confirmWord = language === 'el' ? 'ΔΙΑΓΡΑΦΗ' : 'DELETE';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 flex flex-col">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white text-gray-800 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
        >
          {language === 'el' ? 'EN' : 'EL'}
        </motion.button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <img 
              src={logoSidebar} 
              alt="T-Parking Logo" 
              className="w-20 h-20 mx-auto mb-4 rounded-full shadow-xl"
            />
            <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
            <p className="text-gray-300">{t.subtitle}</p>
          </div>

          {/* Info Step */}
          {step === 'info' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <p className="text-gray-700 mb-4">{t.description}</p>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700 font-semibold">{t.warning}</p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.whatDeleted}</h3>
              <ul className="space-y-2 mb-6">
                {t.deletedItems.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setStep('login')}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg"
              >
                {t.loginTitle}
              </button>
            </motion.div>
          )}

          {/* Login Step */}
          {step === 'login' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t.loginTitle}</h2>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.password}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('info')}
                    className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {t.cancelButton}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t.loggingIn : t.loginButton}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Confirm Step */}
          {step === 'confirm' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">{t.deleteTitle}</h2>
              
              <div className="bg-blue-50 p-4 rounded-xl mb-6">
                <p className="text-sm text-gray-600">{t.loggedAs}</p>
                <p className="text-lg font-semibold text-blue-700">{userEmail}</p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700 font-semibold">{t.warning}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.confirmText}
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-center font-mono text-lg tracking-wider"
                  placeholder={t.confirmPlaceholder}
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  {t.logout}
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={loading || confirmText !== confirmWord}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t.deleting : t.deleteButton}
                </button>
              </div>
            </motion.div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.successTitle}</h2>
              <p className="text-gray-600 mb-8">{t.successMessage}</p>

              <a
                href="/"
                className="inline-block py-3 px-8 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg"
              >
                {t.backHome}
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        © 2025 T-Parking. All rights reserved.
      </footer>
    </div>
  );
}

