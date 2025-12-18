import { motion } from 'framer-motion';
import { translations, Language } from '../data/translations';

interface PrivacyPolicyPageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onBack: () => void;
}

const PrivacyPolicyPage = ({ language, setLanguage, onBack }: PrivacyPolicyPageProps) => {
  const t = translations[language].privacyPolicy;

  if (!t) {
    return <div style={{ color: 'red', padding: 40 }}>Error: Privacy policy translations not found for language: {language}</div>;
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

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900">{t.title[language]}</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
              className="ml-4 bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200 hover:border-blue-400 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {language === 'el' ? 'EN' : 'EL'}
            </motion.button>
          </div>
          <p className="text-gray-600 mb-8">{t.lastUpdated[language]}</p>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 mb-6">{t.introduction[language]}</p>
            </section>

            {/* Data Controller */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.dataController.title[language]}</h2>
              <p className="text-gray-700 mb-2">
                <strong>{t.dataController.controller[language]}</strong> {t.dataController.company[language]}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>{t.dataController.email[language]}</strong> {t.dataController.emailValue[language]}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>{t.dataController.support[language]}</strong> {t.dataController.emailValue[language]}
              </p>
              <p className="text-gray-700 mt-4">{t.dataController.contact[language]}</p>
            </section>

            {/* Personal Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.personalData.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.personalData.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.registrationTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.registration[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.locationTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
                {t.personalData.location[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-600 italic mb-6">{t.personalData.locationNote[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.usageTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.usage[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.deviceTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.device[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.cookiesTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.cookies[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.notificationsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.notifications[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.contactsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.contacts[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="font-semibold text-gray-800 mb-2">Σημαντικά Σημειώματα / Important Notes:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {t.personalData.importantNotes[language].map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.legalBasis.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.legalBasis.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.legalBasis.contractTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.legalBasis.contract[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.legalBasis.consentTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.legalBasis.consent[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.legalBasis.legitimateTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.legalBasis.legitimate[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.legalBasis.legalTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.legalBasis.legal[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Processing Purpose */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.processingPurpose.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.processingPurpose.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.processingPurpose.servicesTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.processingPurpose.services[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.processingPurpose.communicationTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.processingPurpose.communication[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.processingPurpose.analysisTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.processingPurpose.analysis[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.processingPurpose.securityTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.processingPurpose.security[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.processingPurpose.complianceTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.processingPurpose.compliance[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.processingPurpose.realTimeTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.processingPurpose.realTime[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.userRights.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.userRights.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.accessTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.userRights.access[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.rectificationTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.userRights.rectification[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.erasureTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.userRights.erasure[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.userRights.erasureConditions[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.restrictionTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.userRights.restriction[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.portabilityTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.userRights.portability[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.objectTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.userRights.object[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.withdrawTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.userRights.withdraw[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.userRights.howToExerciseTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.userRights.howToExercise[language]}</p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.dataRetention.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.dataRetention.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.dataRetention.policyTitle[language]}</h3>
              <p className="text-gray-700 mb-2"><strong>• {t.dataRetention.accountData[language]}</strong></p>
              <p className="text-gray-700 mb-2"><strong>• {t.dataRetention.historyData[language]}</strong></p>
              <p className="text-gray-700 mb-2"><strong>• {t.dataRetention.locationData[language]}</strong></p>
              <p className="text-gray-700 mb-2"><strong>• {t.dataRetention.analyticsData[language]}</strong></p>
              <p className="text-gray-700 mb-2"><strong>• {t.dataRetention.paymentData[language]}</strong></p>
              <p className="text-gray-700 mb-2"><strong>• {t.dataRetention.cookiesData[language]}</strong></p>
              <p className="text-gray-700 mb-6"><strong>• {t.dataRetention.contactsData[language]}</strong></p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.dataRetention.afterDeletionTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.dataRetention.afterDeletion[language]}</p>
            </section>

            {/* Third Parties */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.thirdParties.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.thirdParties.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.thirdParties.supabaseTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.thirdParties.supabase[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.thirdParties.googleMapsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.thirdParties.googleMaps[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.thirdParties.cloudHostingTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.thirdParties.cloudHosting[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.thirdParties.analyticsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.thirdParties.analytics[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="font-semibold text-gray-800 mb-2">Σημαντικό / Important:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {t.thirdParties.important[language].map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Data Transfer */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.dataTransfer.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.dataTransfer.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.dataTransfer.safeguards[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700">{t.dataTransfer.processors[language]}</p>
            </section>

            {/* Security Measures */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.securityMeasures.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.securityMeasures.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.securityMeasures.encryptionTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.securityMeasures.encryption[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.securityMeasures.rlsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.securityMeasures.rls[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.securityMeasures.authTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.securityMeasures.auth[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.securityMeasures.auditsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.securityMeasures.audits[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.securityMeasures.accessControlsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.securityMeasures.accessControls[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.securityMeasures.backupTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.securityMeasures.backup[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.securityMeasures.incidentTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.securityMeasures.incident[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.cookies.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.cookies.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.cookies.typesTitle[language]}</h3>
              <p className="text-gray-700 font-semibold mb-2">Απαραίτητα Cookies / Necessary Cookies:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                {t.cookies.necessaryCookies[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 font-semibold mb-2">Analytics Cookies:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.cookies.analyticsCookies[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.cookies.managementTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.cookies.management[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Notifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.notifications.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.notifications.locationUsageTitle[language]}</h3>
              <p className="text-gray-700 mb-3">Η εφαρμογή χρησιμοποιεί δεδομένα τοποθεσίας (GPS) σε <strong>πραγματικό χρόνο χωρίς καθυστερήσεις</strong> για:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.notifications.locationUsage[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.notifications.locationRetentionTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.notifications.locationRetention[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.notifications.disableLocationTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.notifications.disableLocation[language]}</p>
            </section>

            {/* Data Breaches */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.dataBreaches.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.dataBreaches.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.dataBreaches.authorityTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.dataBreaches.authority[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.dataBreaches.userTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.dataBreaches.user[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Consent */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.consent.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.consent.characteristicsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.consent.characteristics[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.consent.withdrawTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.consent.withdraw[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.consent.refusalTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.consent.refusal[language]}</p>
            </section>

            {/* Privacy by Design */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.privacyByDesign.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.privacyByDesign.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.privacyByDesign.designTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.privacyByDesign.design[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.privacyByDesign.defaultTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.privacyByDesign.default[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Processing Records */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.processingRecords.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.processingRecords.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.processingRecords.records[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700">{t.processingRecords.authority[language]}</p>
            </section>

            {/* Automated Decision Making */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.automatedDecisionMaking.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.automatedDecisionMaking.intro[language]}</p>
              <p className="text-gray-700 mb-4">{t.automatedDecisionMaking.pointsSystem[language]}</p>
              <p className="text-gray-700 mb-6">{t.automatedDecisionMaking.future[language]}</p>
            </section>

            {/* Children Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.childrenData.title[language]}</h2>
              <p className="text-gray-700 mb-4 font-semibold">{t.childrenData.ageRestriction[language]}</p>
              <p className="text-gray-700 mb-4">{t.childrenData.noCollection[language]}</p>
              <p className="text-gray-700 mb-4">{t.childrenData.deletion[language]}</p>
              <p className="text-gray-700 mb-6">{t.childrenData.parentContact[language]}</p>
            </section>

            {/* Special Categories */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.specialCategories.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.specialCategories.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.specialCategories.categories[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.modifications.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.modifications.intro[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.modifications.notificationTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.modifications.notification[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.modifications.continuedUseTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.modifications.continuedUse[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Jurisdiction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.jurisdiction.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.jurisdiction.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.jurisdiction.laws[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 mb-4">{t.jurisdiction.disputes[language]}</p>
              <p className="text-gray-700 mb-4">{t.jurisdiction.adr[language]}</p>
              <p className="text-gray-700 mb-6">{t.jurisdiction.authority[language]}</p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.contact.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.contact.intro[language]}</p>
              <p className="text-gray-700 mb-2">
                <strong>{t.contact.email[language]}</strong> {t.contact.emailValue[language]}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>{t.contact.support[language]}</strong> {t.contact.emailValue[language]}
              </p>
              <p className="text-gray-700 mb-6">{t.contact.response[language]}</p>
              <div className="border-t border-gray-300 pt-6 mt-6">
                <p className="text-gray-600 mb-2">{t.contact.lastUpdate[language]}</p>
                <p className="text-gray-600">{t.contact.copyright[language]}</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
