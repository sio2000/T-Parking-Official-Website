import { motion } from 'framer-motion';
import { translations, Language } from '../data/translations';

interface TermsOfServicePageProps {
  language: Language;
  onBack: () => void;
}

const TermsOfServicePage = ({ language, onBack }: TermsOfServicePageProps) => {
  const t = translations[language]?.termsConditions;

  if (!t) {
    return (
      <div style={{ color: 'red', padding: 40 }}>
        Σφάλμα: Δεν βρέθηκαν μεταφράσεις terms of service για τη γλώσσα: {language}
      </div>
    );
  }
  
  // Check if fullContent exists (legacy support)
  if ('fullContent' in t && t.fullContent && (t.fullContent as any)[language]) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 relative"
          >
            <button
              onClick={onBack}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div 
              className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:font-bold prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-blue-800 prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2 prose-strong:text-blue-900 prose-a:text-blue-600 prose-a:underline"
              dangerouslySetInnerHTML={{ __html: (t.fullContent as any)[language] }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
  
  // Fallback to structured content if fullContent doesn't exist
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 relative"
        >
          <button
            onClick={onBack}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{t.title[language]}</h1>
          <p className="text-gray-600 mb-8">{t.lastUpdated[language]}</p>
          <p className="text-gray-700 mb-8">{t.introduction[language]}</p>
          <p className="text-gray-600">Πλήρες περιεχόμενο Terms and Conditions</p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;

