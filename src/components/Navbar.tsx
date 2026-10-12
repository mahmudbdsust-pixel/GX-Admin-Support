import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  UploadCloud, 
  LayoutDashboard, 
  FileText, 
  Plane, 
  Menu, 
  X, 
  ShieldCheck, 
  ExternalLink,
  Globe
} from 'lucide-react';
import { OFFICE_LOCATIONS } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  activeCasesCount: number;
  unreadMessagesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  activeCasesCount,
  unreadMessagesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isBn } = useLanguage();

  const navItems = [
    { id: 'home', label: t.nav.home[language] },
    { id: 'services', label: t.nav.services[language] },
    { id: 'pricing', label: t.nav.pricing[language] },
    { id: 'decoder', label: t.nav.decoder[language] },
    { id: 'travel', label: t.nav.travel[language] },
    { id: 'booking', label: t.nav.booking[language] },
    { id: 'upload', label: t.nav.upload[language] },
    { id: 'contact', label: t.nav.contact[language] },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
      {/* Top corporate info bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              gxtrade.co.uk
            </span>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.topBar.headOfficeLabel[language]}</span>
              <a 
                href={`tel:${OFFICE_LOCATIONS.headOffice.phone}`} 
                className="font-medium text-white hover:text-amber-300 transition-colors"
              >
                {OFFICE_LOCATIONS.headOffice.formattedPhone}
              </a>
            </div>
            <span className="hidden md:inline text-slate-600" aria-hidden="true">|</span>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.topBar.londonOfficeLabel[language]}</span>
              <a 
                href={`tel:${OFFICE_LOCATIONS.londonOffice.phone}`} 
                className="font-medium text-white hover:text-amber-300 transition-colors"
              >
                {OFFICE_LOCATIONS.londonOffice.formattedPhone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${OFFICE_LOCATIONS.headOffice.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{OFFICE_LOCATIONS.headOffice.email}</span>
            </a>
            <span className="hidden sm:inline text-slate-600" aria-hidden="true">|</span>
            <div className="hidden sm:flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.topBar.gdprNotice[language]}</span>
            </div>

            {/* Language Pill Switcher in Top Bar for quick access */}
            <div className="flex items-center bg-slate-800 rounded-md p-0.5 border border-slate-700 ml-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors ${
                  language === 'en' 
                    ? 'bg-amber-400 text-slate-950 shadow-2xs font-bold' 
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Switch website to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded transition-colors ${
                  language === 'bn' 
                    ? 'bg-emerald-500 text-white shadow-2xs font-bold' 
                    : 'text-slate-300 hover:text-white'
                }`}
                title="ওয়েবসাইটটি বাংলায় পরিবর্তন করুন"
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-11 h-11 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl tracking-wider shadow-sm group-hover:bg-slate-800 transition-colors border border-slate-700">
              <span className="text-amber-400">GX</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">GX TRADE</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">UK</span>
                {isBn && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    বাংলা
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {t.nav.tagline[language]}
              </p>
            </div>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-slate-950 font-semibold bg-slate-100' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Button */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-1.5" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch language to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'bn'
                    ? 'bg-emerald-600 text-white shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ওয়েবসাইটটি বাংলায় পরিবর্তন করুন"
              >
                বাংলা
              </button>
            </div>

            <button
              onClick={() => handleNavClick('upload')}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-slate-500" />
              <span>{t.nav.uploadDocCta[language]}</span>
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-xs cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t.nav.dashboard[language]}</span>
              {(activeCasesCount > 0 || unreadMessagesCount > 0) && (
                <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-amber-400 text-slate-950">
                  {activeCasesCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Quick mobile language toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50 text-slate-800 flex items-center gap-1"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg"
              title={t.nav.dashboard[language]}
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile Language Selector */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{isBn ? 'ভাষা নির্বাচন করুন:' : 'Select Language:'}</span>
            </div>
            <div className="flex items-center bg-white rounded-md p-0.5 border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  language === 'en' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                  language === 'bn' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleNavClick('booking')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-slate-900 rounded-lg shadow-xs"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              {t.nav.booking[language]}
            </button>
            <button
              onClick={() => handleNavClick('upload')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg border border-slate-200"
            >
              <UploadCloud className="w-4 h-4 text-slate-600" />
              {t.nav.upload[language]}
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  currentTab === item.id 
                    ? 'bg-slate-100 text-slate-950 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('dashboard')}
              className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-md transition-colors flex items-center justify-between ${
                currentTab === 'dashboard'
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-amber-600" />
                {t.nav.dashboard[language]}
              </span>
              {(activeCasesCount > 0 || unreadMessagesCount > 0) && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white">
                  {activeCasesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
