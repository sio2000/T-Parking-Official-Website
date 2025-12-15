import { motion } from 'framer-motion';
import { translations, Language } from '../data/translations';

interface TermsConditionsPageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onBack: () => void;
}

const TermsConditionsPage = ({ language, setLanguage, onBack }: TermsConditionsPageProps) => {
  const t = translations[language].termsConditions;

  if (!t) {
    return <div style={{ color: 'red', padding: 40 }}>Error: Terms and Conditions translations not found for language: {language}</div>;
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
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">1. Εισαγωγή / Introduction</h2>
              <p className="text-gray-700 mb-6">{t.introduction[language]}</p>
            </section>

            {/* Acceptance */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.acceptance.title[language]}</h2>
              
              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.acceptance.acceptanceTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.acceptance.acceptanceContent[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.acceptance.consentTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.acceptance.consentContent[language]}</p>
              <p className="text-gray-700 font-semibold mb-2">Η συναίνεσή σας είναι / Your consent is:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.acceptance.consentCharacteristics[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.acceptance.withdrawTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.acceptance.withdrawContent[language]}</p>
            </section>

            {/* Service Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.serviceDescription.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.serviceDescription.whatIsTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.serviceDescription.whatIsContent[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.serviceDescription.features[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.serviceDescription.functionalityTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.serviceDescription.functionalityContent[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.serviceDescription.characteristicsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.serviceDescription.characteristics[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Registration */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.registration.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.registration.requirementsTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.registration.requirementsIntro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.registration.requirements[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.registration.responsibilityTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.registration.responsibilityContent[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.registration.responsibility[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.registration.securityTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.registration.securityContent[language]}</p>
              <p className="text-gray-700 mb-6">{t.registration.securityDisclaimer[language]}</p>
            </section>

            {/* Use of Service */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.useOfService.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.useOfService.lawfulUseTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.useOfService.lawfulUseContent[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.useOfService.prohibitedTitle[language]}</h3>
              <p className="text-gray-700 mb-4">{t.useOfService.prohibitedIntro[language]}</p>

              <h4 className="text-lg font-semibold text-blue-600 mb-2">{t.useOfService.falseInformationTitle[language]}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                {t.useOfService.falseInformation[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold text-blue-600 mb-2">{t.useOfService.abuseTitle[language]}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                {t.useOfService.abuse[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold text-blue-600 mb-2">{t.useOfService.thirdPartyRightsTitle[language]}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                {t.useOfService.thirdPartyRights[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold text-blue-600 mb-2">{t.useOfService.technicalInterferenceTitle[language]}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
                {t.useOfService.technicalInterference[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h4 className="text-lg font-semibold text-blue-600 mb-2">{t.useOfService.otherProhibitedTitle[language]}</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.useOfService.otherProhibited[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.useOfService.consequencesTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.useOfService.consequences[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Reservations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.reservations.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.reservations.reservationsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.reservations.reservations[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.reservations.pointsTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.reservations.pointsIntro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.reservations.points[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.reservations.rewardsTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.reservations.rewards[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.reservations.availabilityTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.reservations.availability[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Personal Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.personalData.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.collectionTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.personalData.collectionContent[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.personalData.collection[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.legalBasisTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.legalBasis[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.purposeTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.personalData.purpose[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.personalData.policyTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.personalData.policyContent[language]}</p>
            </section>

            {/* User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.userRights.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.userRights.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.userRights.rights[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 mb-6">{t.userRights.contact[language]}</p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.dataRetention.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.dataRetention.policyTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.dataRetention.policy[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.dataRetention.deletionTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.dataRetention.deletion[language]}</p>
            </section>

            {/* Third Parties */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.thirdParties.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.thirdParties.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.thirdParties.parties[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 mb-6">{t.thirdParties.details[language]}</p>
            </section>

            {/* Security Measures */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.securityMeasures.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.securityMeasures.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.securityMeasures.measures[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 mb-6">{t.securityMeasures.details[language]}</p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.cookies.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.cookies.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                {t.cookies.uses[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-gray-700 mb-6">{t.cookies.management[language]}</p>
            </section>

            {/* Notifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.notifications.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.notifications.gpsTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.notifications.gpsContent[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.notifications.gps[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.notifications.retentionTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.notifications.retention[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Data Breaches */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.dataBreaches.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.dataBreaches.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.dataBreaches.notification[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Data Transfer */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.dataTransfer.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.dataTransfer.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.dataTransfer.safeguards[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Contact & Data Controller */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.contactData.title[language]}</h2>
              <p className="text-gray-700 mb-2">
                <strong>{t.contactData.controller[language]}</strong> {t.contactData.company[language]}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>{t.contactData.email[language]}</strong> {t.contactData.emailValue[language]}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>{t.contactData.support[language]}</strong> {t.contactData.emailValue[language]}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>{t.contactData.authority[language]}</strong> {t.contactData.authorityValue[language]}
              </p>
            </section>

            {/* Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.liability.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.liability.asIsTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.liability.asIsContent[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.liability.guarantees[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.liability.limitationTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.liability.limitationContent[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.liability.limitations[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.liability.maximumTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.liability.maximum[language]}</p>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.modifications.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.modifications.rightTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.modifications.rightContent[language]}</p>

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

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.termination.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.termination.byUsTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.termination.byUsContent[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.termination.byUsReasons[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.termination.byYouTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.termination.byYouContent[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.termination.afterTitle[language]}</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.termination.after[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Children Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.childrenData.title[language]}</h2>
              <p className="text-gray-700 mb-4 font-semibold">{t.childrenData.ageRestriction[language]}</p>
              <p className="text-gray-700 mb-4">{t.childrenData.noChildren[language]}</p>
              <p className="text-gray-700 mb-4">{t.childrenData.termination[language]}</p>
              <p className="text-gray-700 mb-6">{t.childrenData.parentContact[language]}</p>
            </section>

            {/* Special Categories */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.specialCategories.title[language]}</h2>
              <p className="text-gray-700 mb-6">{t.specialCategories.content[language]}</p>
            </section>

            {/* Automated Decision */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.automatedDecision.title[language]}</h2>
              <p className="text-gray-700 mb-6">{t.automatedDecision.content[language]}</p>
            </section>

            {/* Privacy by Design */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.privacyByDesign.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.privacyByDesign.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.privacyByDesign.measures[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Processing Records */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.processingRecords.title[language]}</h2>
              <p className="text-gray-700 mb-6">{t.processingRecords.content[language]}</p>
            </section>

            {/* Jurisdiction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.jurisdiction.title[language]}</h2>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.jurisdiction.applicableTitle[language]}</h3>
              <p className="text-gray-700 mb-3">{t.jurisdiction.applicableIntro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
                {t.jurisdiction.applicableLaws[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.jurisdiction.jurisdictionTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.jurisdiction.jurisdictionContent[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.jurisdiction.adrTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.jurisdiction.adrContent[language]}</p>

              <h3 className="text-xl font-semibold text-blue-700 mb-3">{t.jurisdiction.authorityTitle[language]}</h3>
              <p className="text-gray-700 mb-6">{t.jurisdiction.authorityContent[language]}</p>
            </section>

            {/* Severability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.severability.title[language]}</h2>
              <p className="text-gray-700 mb-6">{t.severability.content[language]}</p>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.disclaimer.title[language]}</h2>
              <p className="text-gray-700 mb-4">{t.disclaimer.intro[language]}</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                {t.disclaimer.warranties[language].map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
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
            </section>

            {/* Entire Agreement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">{t.entireAgreement.title[language]}</h2>
              <p className="text-gray-700 mb-6">{t.entireAgreement.content[language]}</p>
            </section>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-6 mt-6">
              <p className="text-gray-600 mb-2">{t.lastUpdate[language]}</p>
              <p className="text-gray-600">{t.copyright[language]}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
