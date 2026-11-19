import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Settings2 } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mic_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('mic_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleRefuseAll = () => {
    localStorage.setItem('mic_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('mic_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 md:p-6 bg-gradient-to-t from-black via-neutral-950/95 to-neutral-950/90 backdrop-blur-md border-t border-neutral-800 shadow-2xl animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Shield className="w-4 h-4 text-neutral-300" />
            <span>Gestion de vos données personnelles & Cookies</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            MIC AUTOMOBILE utilise des cookies techniques nécessaires au bon fonctionnement de la plateforme (sauvegarde de vos filtres, favoris et comparateur). Des cookies de mesure d audience anonyme nous permettent d optimiser votre confort de navigation. Vous pouvez configurer ou modifier vos choix à tout moment.
          </p>
        </div>

        {showPreferences ? (
          <div className="w-full lg:w-auto flex flex-col gap-3 bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-xs">
            <div className="flex items-center justify-between gap-6">
              <div>
                <span className="font-semibold text-white">Cookies Nécessaires</span>
                <p className="text-[10px] text-neutral-400">Navigation, sécurité et sessions</p>
              </div>
              <span className="text-emerald-400 font-bold text-[10px]">Toujours actif</span>
            </div>

            <div className="flex items-center justify-between gap-6">
              <div>
                <span className="font-semibold text-white">Mesure d audience (Google Analytics)</span>
                <p className="text-[10px] text-neutral-400">Statistiques anonymisées de fréquentation</p>
              </div>
              <input 
                type="checkbox"
                checked={analyticsAllowed}
                onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                className="rounded bg-neutral-800 border-neutral-700 text-neutral-200"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 bg-neutral-200 hover:bg-white text-black font-semibold rounded-lg text-xs transition-colors"
              >
                Enregistrer mes choix
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="px-3 py-2 text-neutral-400 hover:text-white text-xs"
              >
                Retour
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setShowPreferences(true)}
              className="px-3 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Personnaliser</span>
            </button>
            <button
              onClick={handleRefuseAll}
              className="px-4 py-2 text-xs text-neutral-300 hover:text-white rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-colors"
            >
              Continuer sans accepter
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-5 py-2 text-xs font-semibold text-black bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-300 hover:from-white hover:to-neutral-200 rounded-lg shadow-lg transition-all"
            >
              Tout accepter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
