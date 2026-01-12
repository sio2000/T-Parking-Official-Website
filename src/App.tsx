import { useState } from 'react';
import { motion } from 'framer-motion';
import { translations, Language } from './data/translations';
import { appData } from './data/appData';
import FeatureCard from './components/FeatureCard';
import StepCard from './components/StepCard';
import PricingCard from './components/PricingCard';
import TermsPage from './components/TermsPage';
import logoSidebar from './assets/images/logosidebar.png';
import parkImage from './assets/images/park.jpg';
import fuelscoreImg from './assets/images/fuelscore.png';
import timescoreImg from './assets/images/timescore.png';
import menuImg from './assets/images/menu.png';
import mapImg from './assets/images/map.png';
import bonusunparkImg from './assets/images/bonusunpark.png';
import historyImg from './assets/images/history.png';
import CookiesPage from './components/CookiesPage';
import PrivacyPage from './components/PrivacyPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsConditionsPage from './components/TermsConditionsPage';
import DeleteAccountPage from './components/DeleteAccountPage';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ImageModal from './components/ImageModal';
import ClickableImage from './components/ClickableImage';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Language Toggle Button */}
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50 flex gap-2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white text-blue-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => setLanguage(language === 'el' ? 'en' : 'el')}
        >
          {language === 'el' ? 'EN' : 'EL'}
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            <img src={logoSidebar} alt="T-Parking Logo" className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full shadow-2xl" />
            <div className="text-3xl font-bold text-white drop-shadow-lg">T-Parking</div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-white"
          >
            {t.hero.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8"
          >
            <div className="flex flex-row items-center gap-6">
              <motion.a 
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-20 w-56 flex items-center justify-center bg-black rounded-xl shadow-lg"
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
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-20 w-56 flex items-center justify-center bg-black rounded-xl shadow-lg"
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
          {/* Animated Down Arrow */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="flex justify-center mt-16"
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
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200 opacity-30 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 text-blue-900 drop-shadow-lg tracking-tight">
            {t.sections.howItWorks}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {appData.steps.map((step: Step, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 60 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.18, type: 'spring', bounce: 0.5 }}
                viewport={{ once: true }}
                className="relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl hover:shadow-blue-300 hover:-translate-y-4 transition-all duration-300 p-10 flex flex-col items-center border border-blue-100 hover:border-blue-400 group min-h-[420px]"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl border-4 border-white group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <div className="mt-16 text-4xl font-extrabold text-blue-700 mb-2 drop-shadow-sm">{step.number}</div>
                <div className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-700 transition-colors duration-300">
                  {typeof t.steps[step.key as keyof typeof t.steps].title === 'object'
                    ? (t.steps[step.key as keyof typeof t.steps].title as any)[language]
                    : t.steps[step.key as keyof typeof t.steps].title}
                </div>
                {step.key === 'openApp' && language === 'el' ? (
                  <div className="text-gray-600 text-lg text-center leading-relaxed group-hover:text-blue-900 transition-colors duration-300" dangerouslySetInnerHTML={{ __html: (t.steps.openApp.description as any).el }} />
                ) : (
                  <div className="text-gray-600 text-lg text-center leading-relaxed group-hover:text-blue-900 transition-colors duration-300">
                    {typeof t.steps[step.key as keyof typeof t.steps].description === 'object'
                      ? (t.steps[step.key as keyof typeof t.steps].description as any)[language]
                      : t.steps[step.key as keyof typeof t.steps].description}
                  </div>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-300 rounded-full opacity-60 group-hover:opacity-100 transition-all"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-blue-800 tracking-tight">
            {t.sections.interactiveMap}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <ClickableImage
              src={menuImg}
              alt="Menu"
              onClick={() => setModalImage({ src: menuImg, alt: 'Menu' })}
            />
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 md:p-10 flex flex-col items-start border border-blue-100 hover:shadow-blue-200 transition-all duration-300 max-w-xl w-full"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center gap-2">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
                {t.map.title}
              </h3>
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
            <ClickableImage
              src={mapImg}
              alt="Map"
              onClick={() => setModalImage({ src: mapImg, alt: 'Map' })}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="features" className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">{t.stats.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.users}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.usersLabel}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.spots}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.spotsLabel}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.cities}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.citiesLabel}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.savings}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.savingsLabel}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Points & Rewards Section */}
      <section id="points-rewards" className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-blue-800 tracking-tight">
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
              className="bg-white md:bg-gradient-to-br md:from-blue-100 md:to-blue-200 rounded-2xl md:rounded-3xl p-2 sm:p-4 md:p-8 flex items-center justify-center shadow-none md:shadow-lg"
            >
              <ClickableImage
                src={bonusunparkImg}
                alt="Bonus Unpark"
                onClick={() => setModalImage({ src: bonusunparkImg, alt: 'Bonus Unpark' })}
                variant="no-border"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notifications & Settings Section (Merged) */}
      <section id="settings" className="py-12 md:py-20 bg-gradient-to-b from-white via-blue-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-blue-800 tracking-tight">
            {t.sections.settings} & {t.sections.notifications}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 md:p-10 flex flex-col items-start border border-blue-100 hover:shadow-blue-200 transition-all duration-300"
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
              className="bg-white md:bg-gradient-to-br md:from-blue-100 md:to-blue-200 rounded-2xl md:rounded-3xl p-2 sm:p-4 md:p-8 flex items-center justify-center shadow-none md:shadow-lg"
            >
              <ClickableImage
                src={historyImg}
                alt="History"
                onClick={() => setModalImage({ src: historyImg, alt: 'History' })}
                variant="no-border"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Parking Solution Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-blue-800 tracking-tight">
            {language === 'el' ? t.smartSection.elTitle : t.smartSection.title}
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <ClickableImage
              src={fuelscoreImg}
              alt="Fuel Score"
              onClick={() => setModalImage({ src: fuelscoreImg, alt: 'Fuel Score' })}
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
              viewport={{ once: true }}
              className="bg-white md:bg-gradient-to-br md:from-blue-50 md:to-blue-100 rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg md:shadow-xl border border-blue-100 hover:shadow-blue-200 transition-all duration-300 max-w-2xl mx-auto w-full"
            >
              {(language === 'el' ? t.smartSection.el : t.smartSection.en).map((line, idx) => (
                <p key={idx} className={`text-lg ${idx === 0 ? 'md:text-2xl text-blue-900 font-semibold mb-6' : idx === 4 ? 'text-blue-800 font-bold' : 'text-gray-700'} mb-4 text-center`}>
                  {line}
                </p>
              ))}
            </motion.div>
            <ClickableImage
              src={timescoreImg}
              alt="Time Score"
              onClick={() => setModalImage({ src: timescoreImg, alt: 'Time Score' })}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">{t.stats.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.users}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.usersLabel}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.spots}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.spotsLabel}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.cities}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.citiesLabel}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{t.stats.savings}</div>
              <div className="text-blue-100 text-sm md:text-base">{t.stats.savingsLabel}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">{t.testimonials.title}</h2>
            <p className="text-gray-600 text-lg">{t.testimonials.subtitle}</p>
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
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg mr-4">
                  {t.testimonials.user1.name.charAt(0)}
                </div>
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
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg mr-4">
                  {t.testimonials.user2.name.charAt(0)}
                </div>
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
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg mr-4">
                  {t.testimonials.user3.name.charAt(0)}
                </div>
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
            {/* FAQ Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === 0 ? null : 0)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-blue-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-blue-900 pr-4">{t.support.howToEarn}</h3>
                <svg
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${openFAQ === 0 ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFAQ === 0 ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="text-gray-700">{t.support.earnAnswer}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-blue-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-blue-900 pr-4">{t.support.premiumBenefits}</h3>
                <svg
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${openFAQ === 1 ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFAQ === 1 ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="text-gray-700">{t.support.premiumAnswer}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left hover:bg-blue-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-blue-900 pr-4">{t.support.contactSupport}</h3>
                <svg
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${openFAQ === 2 ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openFAQ === 2 ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="text-gray-700">{t.support.contactAnswer}</p>
                </div>
              </motion.div>
            </motion.div>
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
                href="#"
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
                href="#"
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
      <footer className="bg-gray-900 text-white py-12">
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
              <ul className="space-y-2">
                <li>
                  <a 
                    href="mailto:devtaskhub@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    {t.footer.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>{t.footer.rights}</p>
          </div>
        </div>
      </footer>

      <ImageModal
        isOpen={modalImage !== null}
        onClose={() => setModalImage(null)}
        imageSrc={modalImage?.src || ''}
        imageAlt={modalImage?.alt || ''}
      />
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
      <Route path="/delete-account" element={<DeleteAccountPage />} />
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