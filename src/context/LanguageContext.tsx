import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'nl' | 'de' | 'es' | 'it';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Navigation
  navHome: { fr: 'Accueil', en: 'Home', nl: 'Home', de: 'Startseite', es: 'Inicio', it: 'Home' },
  navStock: { fr: 'Stock & Catalogue', en: 'Inventory & Stock', nl: 'Voorraad & Catalogus', de: 'Fahrzeugbestand', es: 'Inventario', it: 'Parco Veicoli' },
  navSurMesure: { fr: 'Sur Mesure & Vans VIP', en: 'Bespoke & VIP Vans', nl: 'Op Maat & VIP Vans', de: 'Individuell & VIP Vans', es: 'A Medida & Vans VIP', it: 'Su Misura & Van VIP' },
  navSurvey: { fr: 'Trouver mon véhicule', en: 'Find My Vehicle', nl: 'Vind Mijn Voertuig', de: 'Fahrzeug-Berater', es: 'Encuentra tu vehículo', it: 'Trova il tuo veicolo' },
  navWorkshop: { fr: 'Atelier & Entretien', en: 'Workshop & Service', nl: 'Werkplaats & Service', de: 'Werkstatt & Service', es: 'Taller & Servicio', it: 'Officina & Tagliando' },
  navPro: { fr: 'Flottes & Pro', en: 'Fleet & Business', nl: 'Zakelijk & Vloot', de: 'Flotten & Gewerbe', es: 'Flotas & Empresas', it: 'Flotte & Aziende' },
  navAbout: { fr: 'À Propos & Showroom', en: 'About & Showroom', nl: 'Over Ons & Showroom', de: 'Über Uns & Showroom', es: 'Sobre Nosotros', it: 'Chi Siamo & Showroom' },
  navFinancing: { fr: 'Financement & Reprise', en: 'Financing & Trade-in', nl: 'Financiering & Inruil', de: 'Finanzierung & Inzahlungnahme', es: 'Financiación & Tasación', it: 'Finanziamento & Permuta' },
  navResources: { fr: 'Guides & FAQ', en: 'Guides & FAQ', nl: 'Gidsen & FAQ', de: 'Ratgeber & FAQ', es: 'Guías & FAQ', it: 'Guide & FAQ' },
  navContact: { fr: 'Contact', en: 'Contact', nl: 'Contact', de: 'Kontakt', es: 'Contacto', it: 'Contatto' },
  
  // CTAs
  ctaViewStock: { fr: 'Consulter le stock', en: 'Explore Inventory', nl: 'Bekijk Voorraad', de: 'Bestand Ansehen', es: 'Ver Inventario', it: 'Guarda i Veicoli' },
  ctaBookTestDrive: { fr: 'Réserver un essai', en: 'Book a Test Drive', nl: 'Proefrit Aanvragen', de: 'Probefahrt Buchen', es: 'Reservar Prueba', it: 'Prenota un Test Drive' },
  ctaConfigureVan: { fr: 'Configurer mon Van VIP', en: 'Configure My VIP Van', nl: 'Configureer VIP Van', de: 'VIP Van Konfigurieren', es: 'Configurar Van VIP', it: 'Configura Van VIP' },
  ctaBookService: { fr: 'Rendez-vous Atelier', en: 'Book Workshop Service', nl: 'Werkplaats Afspraak', de: 'Werkstatt-Termin', es: 'Cita en Taller', it: 'Prenota in Officina' },
  ctaContactUs: { fr: 'Nous contacter', en: 'Contact Us', nl: 'Contacteer Ons', de: 'Kontaktieren Sie Uns', es: 'Contactar', it: 'Contattaci' },
  ctaCompare: { fr: 'Comparer', en: 'Compare', nl: 'Vergelijken', de: 'Vergleichen', es: 'Comparar', it: 'Confronta' },
  ctaDetails: { fr: 'Fiche détaillée', en: 'View Details', nl: 'Bekijk Details', de: 'Fahrzeugdetails', es: 'Ver Detalles', it: 'Dettagli Veicolo' },
  
  // Tagline & Value Props
  tagline: { 
    fr: 'Mécanique · Innovation · Confiance', 
    en: 'Engineering · Innovation · Trust', 
    nl: 'Mechaniek · Innovatie · Vertrouwen', 
    de: 'Mechanik · Innovation · Vertrauen',
    es: 'Mecánica · Innovación · Confianza',
    it: 'Meccanica · Innovazione · Fiducia'
  },
  heroTitle: {
    fr: "Véhicules d'Exception, Atelier Certifié & Aménagements VIP Sur Mesure",
    en: "Exceptional Vehicles, Certified Workshop & Bespoke VIP Conversions",
    nl: "Uitzonderlijke Voertuigen, Gecertificeerde Werkplaats & VIP Maatwerk",
    de: "Außergewöhnliche Fahrzeuge, Meisterwerkstatt & Individuelle VIP-Umbauten",
    es: "Vehículos Excepcionales, Taller Certificado & Conversiones VIP a Medida",
    it: "Veicoli d'Eccezione, Officina Certificata & Allestimenti VIP su Misura"
  },
  heroSubtitle: {
    fr: "Spécialiste multimarque haut de gamme à Bruxelles. Contrôle rigoureux 120 points, garantie 24 mois européenne et confection de vans de prestige.",
    en: "Premium multi-brand automotive specialist in Brussels. 120-point mechanical inspection, 24-month European warranty and bespoke VIP luxury van craftsmanship.",
    nl: "Premium multimerken specialist in Brussel. 120-punten inspectie, 24 maanden Europese garantie en luxe VIP van-ombouw op maat.",
    de: "Premium markenübergreifender Spezialist in Brüssel. 120-Punkte-Prüfung, 24 Monate Europa-Garantie und meisterhafte VIP-Vans nach Maß.",
    es: "Especialista multimarca de alta gama en Bruselas. Inspección rigurosa de 120 puntos, 24 meses de garantía europea y diseño de vans VIP.",
    it: "Specialista multimarca di prestigio a Bruxelles. Ispezione rigorosa in 120 punti, 24 mesi di garanzia europea e allestimenti van VIP esclusivi."
  },

  // Stats
  statVehicles: { fr: 'Véhicules en stock', en: 'Vehicles in Stock', nl: 'Voertuigen op voorraad', de: 'Fahrzeuge auf Lager', es: 'Vehículos en stock', it: 'Veicoli disponibili' },
  statWarranty: { fr: 'Jusqu à 24 mois de garantie', en: 'Up to 24 Months Warranty', nl: 'Tot 24 maanden garantie', de: 'Bis zu 24 Monate Garantie', es: 'Hasta 24 meses de garantía', it: 'Fino a 24 mesi di garanzia' },
  statPoints: { fr: 'Points de contrôle certifiés', en: 'Certified Checkpoints', nl: 'Gecertificeerde controlepunten', de: 'Zertifizierte Prüfpunkte', es: 'Puntos de control certificados', it: 'Punti di controllo certificati' },
  statSatisfaction: { fr: 'Satisfaction clients vérifiée', en: 'Verified Client Rating', nl: 'Geverifieerde klantentevredenheid', de: 'Verifizierte Kundenzufriedenheit', es: 'Satisfacción verificada', it: 'Soddisfazione clienti verificata' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mic_language');
    if (saved && ['fr', 'en', 'nl', 'de', 'es', 'it'].includes(saved)) {
      return saved as Language;
    }
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mic_language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
