import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Heart, SlidersHorizontal, Menu, X, 
  ChevronDown, ShieldCheck, Wrench, Sparkles, Car, Globe
} from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';
import { VEHICLES_DATA } from '../data/vehicles';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { favorites, comparisonList, openCompareModal, openInquiryModal } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'nl', label: 'Nederlands', flag: '🇧🇪' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full z-40 sticky top-0 transition-all duration-300">
      {/* Top Bar - Contact & Language */}
      <div className="bg-neutral-950 border-b border-neutral-900 text-xs text-neutral-400 py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a 
              href="tel:+3228997450" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-300" />
              <span>+32 2 899 74 50</span>
            </a>
            <a 
              href="mailto:contact@mic-automobile.be" 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-neutral-300" />
              <span>contact@mic-automobile.be</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-neutral-300" />
              <span>Avenue Louise 475, 1050 Bruxelles, Belgique</span>
            </div>
            <div className="hidden xl:flex items-center gap-1.5 text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              <span>Lun - Sam : 09h00 - 19h00</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Guarantee Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-neutral-300 bg-neutral-900/80 px-2.5 py-0.5 rounded-full border border-neutral-800">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] font-medium tracking-wide">Garantie 24 Mois · Car-Pass Certifié</span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-2.5 py-1 rounded-md text-white font-medium hover:bg-neutral-800 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span className="uppercase">{language}</span>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isLangDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1.5 w-36 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl py-1 z-50 animate-fade-in"
                  onMouseLeave={() => setIsLangDropdownOpen(false)}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-800 transition-colors ${
                        language === l.code ? 'text-amber-300 font-semibold bg-neutral-800/50' : 'text-neutral-300'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-2xl py-3 border-b border-neutral-800/80' 
          : 'bg-black py-4 border-b border-neutral-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-neutral-700 flex items-center justify-center p-2 shadow-inner group-hover:border-neutral-500 transition-all">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20 75 L20 25 L45 55 L70 25 L70 75" stroke="#D9D9D9" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="85" cy="30" r="7" fill="#C5A880" />
              </svg>
            </div>
            <div>
              <div className="font-display font-extrabold text-lg md:text-xl tracking-widest text-white flex items-center gap-1.5">
                <span>MIC</span>
                <span className="text-neutral-400 font-light">AUTOMOBILE</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase">
                {t('tagline')}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            <button 
              onClick={() => handleNav('home')}
              className={`hover:text-white transition-colors py-1 ${
                currentRoute === 'home' ? 'text-white border-b-2 border-neutral-300 font-semibold' : 'text-neutral-400'
              }`}
            >
              {t('navHome')}
            </button>

            <button 
              onClick={() => handleNav('stock')}
              className={`flex items-center gap-1.5 hover:text-white transition-colors py-1 ${
                currentRoute === 'stock' ? 'text-white border-b-2 border-neutral-300 font-semibold' : 'text-neutral-400'
              }`}
            >
              <span>{t('navStock')}</span>
              <span className="bg-neutral-800 text-neutral-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {VEHICLES_DATA.length}
              </span>
            </button>

            <button 
              onClick={() => handleNav('sur-mesure')}
              className={`flex items-center gap-1.5 hover:text-white transition-colors py-1 ${
                currentRoute === 'sur-mesure' ? 'text-white border-b-2 border-neutral-300 font-semibold' : 'text-neutral-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('navSurMesure')}</span>
            </button>

            <button 
              onClick={() => handleNav('recommandation')}
              className={`hover:text-white transition-colors py-1 ${
                currentRoute === 'recommandation' ? 'text-white border-b-2 border-neutral-300 font-semibold' : 'text-neutral-400'
              }`}
            >
              {t('navSurvey')}
            </button>

            <button 
              onClick={() => handleNav('atelier')}
              className={`flex items-center gap-1 hover:text-white transition-colors py-1 ${
                currentRoute === 'atelier' ? 'text-white border-b-2 border-neutral-300 font-semibold' : 'text-neutral-400'
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{t('navWorkshop')}</span>
            </button>

            <button 
              onClick={() => handleNav('a-propos')}
              className={`hover:text-white transition-colors py-1 ${
                currentRoute === 'a-propos' ? 'text-white border-b-2 border-neutral-300 font-semibold' : 'text-neutral-400'
              }`}
            >
              {t('navAbout')}
            </button>

            <button 
              onClick={() => handleNav('contact')}
              className={`hover:text-white transition-colors py-1 ${
                currentRoute === 'contact' ? 'text-white border-b-2 border-neutral-300 font-semibold' : 'text-neutral-400'
              }`}
            >
              {t('navContact')}
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Comparison Button */}
            <button
              onClick={openCompareModal}
              title="Comparer des véhicules"
              className="relative p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors border border-transparent hover:border-neutral-800"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {comparisonList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-200 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Favorites Button */}
            <button
              onClick={() => handleNav('stock?favoris=1')}
              title="Mes Favoris"
              className="relative p-2 text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 rounded-lg transition-colors border border-transparent hover:border-neutral-800"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Quick Contact Modal CTA */}
            <button
              onClick={() => openInquiryModal('contact')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-300 hover:from-white hover:to-neutral-200 rounded-lg shadow-lg hover:shadow-glow-silver transition-all transform active:scale-95"
            >
              Devis & Essai
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-900"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
            <div className="flex flex-col space-y-3 text-base">
              <button 
                onClick={() => handleNav('home')} 
                className={`text-left py-2 border-b border-neutral-900 ${currentRoute === 'home' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                {t('navHome')}
              </button>
              <button 
                onClick={() => handleNav('stock')} 
                className={`text-left py-2 border-b border-neutral-900 flex justify-between items-center ${currentRoute === 'stock' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                <span>{t('navStock')}</span>
                <span className="bg-neutral-800 text-neutral-300 text-xs px-2 py-0.5 rounded-full">{VEHICLES_DATA.length}</span>
              </button>
              <button 
                onClick={() => handleNav('sur-mesure')} 
                className={`text-left py-2 border-b border-neutral-900 flex items-center gap-2 ${currentRoute === 'sur-mesure' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{t('navSurMesure')}</span>
              </button>
              <button 
                onClick={() => handleNav('recommandation')} 
                className={`text-left py-2 border-b border-neutral-900 ${currentRoute === 'recommandation' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                {t('navSurvey')}
              </button>
              <button 
                onClick={() => handleNav('atelier')} 
                className={`text-left py-2 border-b border-neutral-900 flex items-center gap-2 ${currentRoute === 'atelier' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                <Wrench className="w-4 h-4" />
                <span>{t('navWorkshop')}</span>
              </button>
              <button 
                onClick={() => handleNav('financement')} 
                className={`text-left py-2 border-b border-neutral-900 ${currentRoute === 'financement' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                {t('navFinancing')}
              </button>
              <button 
                onClick={() => handleNav('a-propos')} 
                className={`text-left py-2 border-b border-neutral-900 ${currentRoute === 'a-propos' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                {t('navAbout')}
              </button>
              <button 
                onClick={() => handleNav('ressources')} 
                className={`text-left py-2 border-b border-neutral-900 ${currentRoute === 'ressources' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                {t('navResources')}
              </button>
              <button 
                onClick={() => handleNav('contact')} 
                className={`text-left py-2 border-b border-neutral-900 ${currentRoute === 'contact' ? 'text-white font-bold' : 'text-neutral-400'}`}
              >
                {t('navContact')}
              </button>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  handleNav('atelier');
                }}
                className="w-full py-3 bg-neutral-900 border border-neutral-700 text-white rounded-lg text-sm font-semibold text-center"
              >
                Prendre Rendez-vous Atelier
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openInquiryModal('essai');
                }}
                className="w-full py-3 bg-gradient-to-r from-neutral-200 to-neutral-400 text-black rounded-lg text-sm font-bold text-center uppercase tracking-wider"
              >
                Réserver un Essai
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
