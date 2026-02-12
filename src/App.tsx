import { useState } from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from './data/translations';
import { appData } from './data/appData';
import FeatureCard from './components/FeatureCard';
import StepCard from './components/StepCard';
import PricingCard from './components/PricingCard';
import TermsPage from './components/TermsPage';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import logoSidebar from './assets/images/logosidebar.png';
import parkImage from './assets/images/park.jpg';
import fuelscoreImg from './assets/images/fuelscore.png';
import timescoreImg from './assets/images/timescore.png';
import menuImg from './assets/images/menu.png';
import mapImg from './assets/images/map.png';
import bonusunparkImg from './assets/images/bonusunpark.png';
import historyImg from './assets/images/history.png';
import profileImg from './assets/images/profile.png';
import CookiesPage from './components/CookiesPage';
import PrivacyPage from './components/PrivacyPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

interface Feature {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  key: string;
  icon: React.ReactNode;
}

function MainPage({ language, setLanguage }: { language: Language, setLanguage: (lang: Language) => void }) {
  const t = translations[language];
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col" style={{ WebkitOverflowScrolling: 'touch', overflow: 'auto' }}>
      {/* Language Toggle Button - Desktop Only */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 hidden sm:flex gap-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white text-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
        >
          {language === 'el' ? 'EN' : 'EL'}
        </motion.button>
      </div>

      {/* Language Toggle Button - Mobile Only */}
      <div className="fixed top-2 right-2 z-50 flex sm:hidden gap-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white text-blue-600 px-3 py-1.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
        >
          {language === 'el' ? 'EN' : 'EL'}
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="absolute inset-0">
          <img 
            src={parkImage} 
            alt="Parking Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <img src={logoSidebar} alt="T-Parking Logo" className="w-40 h-40 mx-auto mb-4 rounded-full shadow-2xl" />
            <div className="text-3xl font-bold text-white drop-shadow-lg">T-Parking</div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full text-4xl md:text-6xl font-bold mb-8 py-6 px-4 rounded-none shadow-xl border-0 text-white drop-shadow-lg"
          >
            {t.hero.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 w-full px-4 sm:px-0"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.a 
                href="https://apps.apple.com/us/app/t-parking/id6756634872"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-20 w-full sm:w-56 flex items-center justify-center flex-shrink-0"
              >
                <div className="h-full w-full flex items-center justify-center overflow-hidden px-2">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on App Store" 
                    className="h-full object-contain block mx-auto p-2 scale-110"
                  />
                </div>
              </motion.a>
              <motion.a 
                href="https://play.google.com/store/apps/details?id=com.tparking.app&hl=en-US&ah=pD_WYmdyMOmmgUMM47rfiftyZlo&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-20 w-full sm:w-56 flex items-center justify-center flex-shrink-0"
              >
                <div className="h-full w-full flex items-center justify-center overflow-hidden px-2">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Google Play" 
                    className="h-full object-contain block mx-auto p-2 scale-150"
                  />
                </div>
              </motion.a>
            </div>
          </motion.div>
          {/* Animated Down Arrow */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="flex justify-center mt-10"
          >
            <a href="#how-it-works" aria-label="Scroll to How It Works">
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7V25M16 25L7 16M16 25L25 16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-blue-900 drop-shadow-lg tracking-tight">
            {t.sections.howItWorks}
          </h2>
          <div className="flex flex-col items-center justify-center p-0 md:p-0 max-w-sm mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center mb-6 animate-fade-in-up">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg mb-2 animate-bounce-slow">
                {appData.steps[0].icon}
              </span>
              <span className="text-2xl font-extrabold text-blue-700 mb-1 animate-pop">1</span>
              <span className="text-lg font-bold text-blue-900 mb-1">{typeof t.steps.openApp.title === 'object' ? t.steps.openApp.title[language] : t.steps.openApp.title}</span>
              <span className="text-sm text-gray-700 text-center" dangerouslySetInnerHTML={{ __html: typeof t.steps.openApp.description === 'object' ? t.steps.openApp.description[language] : t.steps.openApp.description }}></span>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-6 animate-arrow-flow">
              <svg width="36" height="60" viewBox="0 0 36 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 10v40" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
                <polygon points="18,50 28,40 8,40" fill="#3B82F6" />
              </svg>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center mb-6 animate-fade-in-up delay-100">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg mb-2 animate-bounce-slow">
                {appData.steps[1].icon}
              </span>
              <span className="text-2xl font-extrabold text-blue-700 mb-1 animate-pop">2</span>
              <span className="text-lg font-bold text-blue-900 mb-1">{typeof t.steps.findSpot.title === 'object' ? t.steps.findSpot.title[language] : t.steps.findSpot.title}</span>
              <span className="text-sm text-gray-700 text-center">{typeof t.steps.findSpot.description === 'object' ? t.steps.findSpot.description[language] : t.steps.findSpot.description}</span>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center mb-6 animate-arrow-flow delay-100">
              <svg width="36" height="60" viewBox="0 0 36 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 10v40" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round"/>
                <polygon points="18,50 28,40 8,40" fill="#FBBF24" />
              </svg>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center mb-2 animate-fade-in-up delay-200">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg mb-2 animate-bounce-slow">
                {appData.steps[2].icon}
              </span>
              <span className="text-2xl font-extrabold text-blue-700 mb-1 animate-pop">3</span>
              <span className="text-lg font-bold text-blue-900 mb-1">{typeof t.steps.reserveOrShare.title === 'object' ? t.steps.reserveOrShare.title[language] : t.steps.reserveOrShare.title}</span>
              <span className="text-sm text-gray-700 text-center">{typeof t.steps.reserveOrShare.description === 'object' ? t.steps.reserveOrShare.description[language] : t.steps.reserveOrShare.description}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 mb-10">
            <div className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 text-white text-2xl md:text-3xl font-bold py-5 px-4 w-full shadow-xl border-0 flex items-center justify-center">
              <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
              {t.sections.interactiveMap}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img src={menuImg} alt="Menu" className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-2xl shadow-2xl bg-white p-2 border border-gray-100" />
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-start border border-blue-100 hover:shadow-blue-200 transition-all duration-300 max-w-xl w-full"
            >
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{t.map.description}</p>
              <ul className="space-y-4 w-full">
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm">
                  <span className="w-8 h-8 flex items-center justify-center bg-red-400 text-white rounded-full font-bold mr-4">S</span>
                  <span className="text-gray-700 font-medium">{t.map.smallSpots}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm">
                  <span className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-white rounded-full font-bold mr-4">M</span>
                  <span className="text-gray-700 font-medium">{t.map.mediumSpots}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm">
                  <span className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-full font-bold mr-4">L</span>
                  <span className="text-gray-700 font-medium">{t.map.largeSpots}</span>
                </li>
              </ul>
            </motion.div>
            <img src={mapImg} alt="Map" className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-2xl shadow-2xl bg-white p-2 border border-gray-100" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white via-blue-50 to-white overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-10">
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg">
              {t.sections.features}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center bg-white/90 rounded-3xl shadow-2xl p-6 md:p-10 max-w-md mx-auto animate-fade-in-up">
            {appData.features.map((feature: Feature, index: number) => (
              <div key={index} className="flex flex-row items-center gap-4 mb-6 last:mb-0">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
                  {feature.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-blue-800 mb-1">{t.features[feature.key as keyof typeof t.features].title}</span>
                  <span className="text-sm text-gray-700">{t.features[feature.key as keyof typeof t.features].description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Impact Section */}
      <section id="impact" className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">{t.stats.title}</h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.stats.items && t.stats.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-blue-700 rounded-xl p-8 shadow-lg text-center hover:bg-blue-600 transform hover:scale-105 transition-all">
                <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-3">{item.number}</div>
                <div className="text-lg text-blue-50 font-semibold">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points & Rewards Section */}
      <section id="points-rewards" className="py-20 bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-800 tracking-tight">
            {t.sections.pointsRewards}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-start border border-blue-100 hover:shadow-blue-200 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {t.points.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{t.points.description}</p>
              <ul className="space-y-4 w-full mb-8">
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">+</span>
                  <span className="text-gray-700 font-medium">{t.points.pointPerRelease}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">🎁</span>
                  <span className="text-gray-700 font-medium">{t.points.freeReservation}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">🏆</span>
                  <span className="text-gray-700 font-medium">{t.points.globalRanking}</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 flex items-center justify-center shadow-lg min-h-[320px] w-full"
            >
              <img src={bonusunparkImg} alt="Bonus Unpark" className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notifications & Settings Section (Merged) */}
      <section id="settings" className="py-20 bg-gradient-to-b from-white via-blue-50 to-white overflow-x-hidden">
        <div className="w-full mb-8">
          <div className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-white text-3xl md:text-4xl font-extrabold py-6 px-4 w-full shadow-xl border-0 flex items-center justify-center rounded-none">
            <span>{language === 'el' ? t.sections.settings + ' & ' + t.sections.notifications : 'Settings & Notifications'}</span>
          </div>
        </div>
        <div className="w-full mb-8">
          <div className="bg-gradient-to-r from-blue-200 via-blue-50 to-blue-200 text-blue-900 text-lg font-bold py-4 px-4 w-full shadow-md border-0 flex items-center justify-center rounded-none">
            <span>{language === 'el' ? 'Διαχειρίσου τις ρυθμίσεις και τις ειδοποιήσεις σου εύκολα!' : 'Manage your settings and notifications easily!'}</span>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-start border border-blue-100 hover:shadow-blue-200 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                {t.settings.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{t.settings.description}</p>
              <ul className="space-y-4 w-full mb-8">
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">🌐</span>
                  <span className="text-gray-700 font-medium">{t.settings.language}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">🔔</span>
                  <span className="text-gray-700 font-medium">{t.settings.notifications}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">📊</span>
                  <span className="text-gray-700 font-medium">{t.settings.history}</span>
                </li>
              </ul>
              <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2 mt-8">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                {t.notifications.title}
              </h3>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{t.notifications.description}</p>
              <ul className="space-y-4 w-full">
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">🔔</span>
                  <span className="text-gray-700 font-medium">{t.notifications.instantAlerts}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">🧭</span>
                  <span className="text-gray-700 font-medium">{t.notifications.oneTapNav}</span>
                </li>
                <li className="flex items-center bg-blue-50 rounded-xl px-4 py-3 shadow-sm hover:bg-blue-100 transition-colors">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-200 text-blue-700 rounded-full font-bold mr-4">⚙️</span>
                  <span className="text-gray-700 font-medium">{t.notifications.customPrefs}</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 flex items-center justify-center shadow-lg min-h-[320px] w-full"
            >
              <img src={historyImg} alt="History" className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Parking Solution Section */}
      {/* Playful Break Element */}
      <div className="w-full flex justify-center items-center py-8">
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 128 128" className="w-full h-full">
            <circle cx="64" cy="64" r="60" fill="#FBBF24" stroke="#3B82F6" strokeWidth="6" />
          </svg>
          <div className="absolute left-0 w-full flex items-center justify-center pointer-events-none" style={{top: '48px'}}>
            <span className="text-3xl font-extrabold text-blue-700 animate-bounce text-center">Parking Fun!!</span>
          </div>
        </div>
      </div>
      <section className="py-20 bg-gradient-to-br from-yellow-50 via-blue-50 to-white overflow-x-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-800 tracking-tight">
            {language === 'el' ? t.smartSection.elTitle : t.smartSection.title}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <img src={fuelscoreImg} alt="Fuel Score" className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-2xl shadow-2xl bg-white p-2 border border-gray-100" />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 shadow-xl border border-blue-100 hover:shadow-blue-200 transition-all duration-300 max-w-2xl mx-auto w-full"
            >
              {(language === 'el' ? t.smartSection.el : t.smartSection.en).map((line, idx) => (
                <p key={idx} className={`text-lg ${idx === 0 ? 'md:text-2xl text-blue-900 font-semibold mb-6' : idx === 4 ? 'text-blue-800 font-bold' : 'text-gray-700'} mb-4 text-center`}>
                  {line}
                </p>
              ))}
            </motion.div>
            <img src={timescoreImg} alt="Time Score" className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-2xl shadow-2xl bg-white p-2 border border-gray-100" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 mb-8">
            <div className="bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 text-white text-2xl md:text-3xl font-bold py-5 px-4 w-full shadow-xl border-0 flex items-center justify-center">
              {t.testimonials.title}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-black font-bold text-lg">{t.testimonials.subtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100"
            >
              <div className="flex items-center mb-4">
                <img src={t.testimonials.user1.image || profileImg} alt={t.testimonials.user1.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <div className="font-bold text-gray-900">{t.testimonials.user1.name}</div>
                  <div className="text-sm text-gray-500">{t.testimonials.user1.location}</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">"{t.testimonials.user1.text}"</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100"
            >
              <div className="flex items-center mb-4">
                <img src={t.testimonials.user2.image || profileImg} alt={t.testimonials.user2.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <div className="font-bold text-gray-900">{t.testimonials.user2.name}</div>
                  <div className="text-sm text-gray-500">{t.testimonials.user2.location}</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">"{t.testimonials.user2.text}"</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow border border-blue-100"
            >
              <div className="flex items-center mb-4">
                <img src={t.testimonials.user3.image || profileImg} alt={t.testimonials.user3.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <div className="font-bold text-gray-900">{t.testimonials.user3.name}</div>
                  <div className="text-sm text-gray-500">{t.testimonials.user3.location}</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">"{t.testimonials.user3.text}"</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">{t.support.title}</h2>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-4">
            {t.support.faq && t.support.faq.map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-blue-100 transition-colors"
                >
                  <h3 className="text-xl font-bold text-blue-900 pr-4">{item.question}</h3>
                  <svg
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${openFAQ === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFAQ === idx ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">{t.cta.ctaTitle}</h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10">{t.cta.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <motion.a
                href="https://apps.apple.com/us/app/t-parking/id6756634872"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 w-64 flex items-center justify-center bg-black rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="h-full w-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on App Store"
                    className="h-full w-full object-contain block mx-auto p-2 scale-110"
                  />
                </div>
              </motion.a>
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.tparking.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 w-64 flex items-center justify-center bg-black rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                <div className="h-full w-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-full w-full object-contain block mx-auto p-2 scale-150"
                  />
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <img src={logoSidebar} alt="T-Parking Logo" className="w-24 h-24 mb-2 rounded-full" />
              <div className="text-white text-xl font-bold text-center">T-Parking</div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t.footer.home}</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">{t.sections.howItWorks}</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">{t.sections.features}</a></li>
                <li><a href="#points-rewards" className="text-gray-400 hover:text-white transition-colors">{t.sections.pointsRewards}</a></li>
                <li><a href="#settings" className="text-gray-400 hover:text-white transition-colors">{t.sections.settings}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/terms-conditions')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t.footer.terms}
                  </button>
                </li>
                <li><button onClick={() => navigate('/privacy-policy')} className="text-gray-400 hover:text-white transition-colors">{t.footer.privacy[language]}</button></li>
                <li><button onClick={() => navigate('/cookies')} className="text-gray-400 hover:text-white transition-colors">{t.footer.cookies[language]}</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:devtaskhub@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors underline-offset-2 hover:underline flex items-center gap-2"
                  >
                    <span>📧</span>
                    {t.footer.email}
                  </a>
                </li>
              </ul>
              
              {/* Social Media Icons */}
              <div className="mt-6 flex gap-4">
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/tparking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors transform hover:scale-110"
                  title="Follow us on Facebook"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/tparking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 rounded-full flex items-center justify-center transition-colors transform hover:scale-110"
                  title="Follow us on Instagram"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110 2.881 1.44 1.44 0 010-2.881z"/>
                  </svg>
                </a>
                
                {/* TikTok */}
                <a 
                  href="https://www.tiktok.com/@tparking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors transform hover:scale-110 border border-gray-600 hover:border-white"
                  title="Follow us on TikTok"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.44-.05z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('el');
  return (
    <Routes>
      <Route path="/" element={<MainPage language={language} setLanguage={setLanguage} />} />
      <Route path="/terms" element={<TermsPage language={language} onBack={() => window.history.back()} />} />
      <Route path="/cookies" element={<CookiesPage language={language} onBack={() => window.history.back()} />} />
      <Route path="/privacy" element={<PrivacyPage language={language} onBack={() => window.history.back()} />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage language={language} setLanguage={setLanguage} onBack={() => window.history.back()} />} />
      <Route path="/terms-conditions" element={<TermsConditionsPage language={language} setLanguage={setLanguage} onBack={() => window.history.back()} />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default App;