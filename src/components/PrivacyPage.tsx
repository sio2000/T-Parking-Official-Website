import { motion } from 'framer-motion';
import { translations, Language } from '../data/translations';

interface PrivacyPageProps {
  language: Language;
  onBack: () => void;
}

const PrivacyPage = ({ language, onBack }: PrivacyPageProps) => {
  const t = translations[language]?.terms?.privacy;
  console.log('PrivacyPage: language', language);
  console.log('PrivacyPage: t', t);

  if (!t) {
    return <div style={{ color: 'red', padding: 40 }}>Σφάλμα: Δεν βρέθηκαν μεταφράσεις privacy για τη γλώσσα: {language}</div>;
  }

  // Αν υπάρχει fullContent, το χρησιμοποιούμε (νέα δομή)
  if (t.fullContent && t.fullContent[language]) {
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
              dangerouslySetInnerHTML={{ __html: t.fullContent[language] }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // Παλιά δομή (backward compatibility)
  const requiredFields = [
    'title', 'intro', 'collectTitle', 'collect', 'usageTitle', 'usage', 'shareTitle', 'share',
    'securityTitle', 'security', 'rightsTitle', 'rights', 'rightsContact', 'retentionTitle',
    'retention', 'changesTitle', 'changes', 'contactTitle', 'contact'
  ];
  for (const field of requiredFields) {
    if (!(field in t)) {
      return <div style={{ color: 'red', padding: 40 }}>Σφάλμα: Λείπει το πεδίο <b>{field}</b> από το privacy object!</div>;
    }
  }

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
          <p className="text-gray-600 mb-8">{t.intro[language]}</p>
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.collectTitle[language]}</h2>
              <ul className="list-disc list-inside space-y-2">
                {t.collect[language].map((item: string, idx: number) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.usageTitle[language]}</h2>
              <ul className="list-disc list-inside space-y-2">
                {t.usage[language].map((item: string, idx: number) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.shareTitle[language]}</h2>
              <ul className="list-disc list-inside space-y-2">
                {t.share[language].map((item: string, idx: number) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.securityTitle[language]}</h2>
              <p>{t.security[language]}</p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.rightsTitle[language]}</h2>
              <ul className="list-disc list-inside space-y-2">
                {t.rights[language].map((item: string, idx: number) => <li key={idx}>{item}</li>)}
              </ul>
              <p className="mt-2">{t.rightsContact[language]}</p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.retentionTitle[language]}</h2>
              <p>{t.retention[language]}</p>
            </section>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.changesTitle[language]}</h2>
              <p>{t.changes[language]}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{t.contactTitle[language]}</h2>
              <p>{t.contact[language]}</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage; 