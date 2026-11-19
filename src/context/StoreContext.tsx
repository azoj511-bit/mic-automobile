import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, WorkshopBooking, ContactInquiry, CustomVanConfig } from '../types/vehicle';
import { VEHICLES_DATA } from '../data/vehicles';

interface StoreContextType {
  favorites: string[]; // vehicle IDs
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  comparisonList: string[]; // vehicle IDs
  addToComparison: (id: string) => boolean;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
  
  isCompareModalOpen: boolean;
  openCompareModal: () => void;
  closeCompareModal: () => void;
  
  // Inquiry Modal
  inquiryModalState: {
    isOpen: boolean;
    vehicle?: Vehicle;
    type: 'information' | 'essai' | 'financement' | 'contact' | 'reprise' | 'sur-mesure';
  };
  openInquiryModal: (type?: 'information' | 'essai' | 'financement' | 'contact' | 'reprise' | 'sur-mesure', vehicle?: Vehicle) => void;
  closeInquiryModal: () => void;
  
  // Inquiries and Bookings
  inquiries: ContactInquiry[];
  addInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>) => void;
  
  bookings: WorkshopBooking[];
  addBooking: (booking: Omit<WorkshopBooking, 'id' | 'createdAt'>) => string;
  
  customConfigs: CustomVanConfig[];
  saveCustomConfig: (config: CustomVanConfig) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mic_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('mic_favorites', JSON.stringify(updated));
      showToast(exists ? 'Véhicule retiré de vos favoris' : 'Véhicule ajouté à vos favoris ❤️');
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // Comparison
  const [comparisonList, setComparisonList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mic_comparison');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const addToComparison = (id: string): boolean => {
    if (comparisonList.includes(id)) {
      removeFromComparison(id);
      return false;
    }
    if (comparisonList.length >= 4) {
      showToast('Vous pouvez comparer jusqu à 4 véhicules simultanément');
      return false;
    }
    const updated = [...comparisonList, id];
    setComparisonList(updated);
    localStorage.setItem('mic_comparison', JSON.stringify(updated));
    showToast('Véhicule ajouté au comparateur');
    return true;
  };

  const removeFromComparison = (id: string) => {
    const updated = comparisonList.filter(item => item !== id);
    setComparisonList(updated);
    localStorage.setItem('mic_comparison', JSON.stringify(updated));
    showToast('Véhicule retiré du comparateur');
  };

  const clearComparison = () => {
    setComparisonList([]);
    localStorage.removeItem('mic_comparison');
  };

  const isInComparison = (id: string) => comparisonList.includes(id);

  // Inquiry Modal
  const [inquiryModalState, setInquiryModalState] = useState<{
    isOpen: boolean;
    vehicle?: Vehicle;
    type: 'information' | 'essai' | 'financement' | 'contact' | 'reprise' | 'sur-mesure';
  }>({
    isOpen: false,
    type: 'information'
  });

  const openInquiryModal = (
    type: 'information' | 'essai' | 'financement' | 'contact' | 'reprise' | 'sur-mesure' = 'information',
    vehicle?: Vehicle
  ) => {
    setInquiryModalState({
      isOpen: true,
      type,
      vehicle
    });
  };

  const closeInquiryModal = () => {
    setInquiryModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Inquiries
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('mic_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('mic_inquiries', JSON.stringify(updated));
    showToast('Votre demande a été transmise avec succès à nos conseillers');
  };

  // Bookings
  const [bookings, setBookings] = useState<WorkshopBooking[]>(() => {
    try {
      const saved = localStorage.getItem('mic_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addBooking = (booking: Omit<WorkshopBooking, 'id' | 'createdAt'>): string => {
    const refId = `RDV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: WorkshopBooking = {
      ...booking,
      id: refId,
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('mic_bookings', JSON.stringify(updated));
    showToast(`Rendez-vous confirmé ! Référence : ${refId}`);
    return refId;
  };

  // Custom Van configs
  const [customConfigs, setCustomConfigs] = useState<CustomVanConfig[]>(() => {
    try {
      const saved = localStorage.getItem('mic_custom_configs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveCustomConfig = (config: CustomVanConfig) => {
    const updated = [config, ...customConfigs];
    setCustomConfigs(updated);
    localStorage.setItem('mic_custom_configs', JSON.stringify(updated));
    showToast('Votre projet sur mesure a été transmis à notre bureau d étude');
  };

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3800);
  };

  return (
    <StoreContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        isCompareModalOpen,
        openCompareModal: () => setIsCompareModalOpen(true),
        closeCompareModal: () => setIsCompareModalOpen(false),
        inquiryModalState,
        openInquiryModal,
        closeInquiryModal,
        inquiries,
        addInquiry,
        bookings,
        addBooking,
        customConfigs,
        saveCustomConfig,
        toastMessage,
        showToast
      }}
    >
      {children}
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-900 border border-neutral-700 text-white px-5 py-3.5 rounded-xl shadow-2xl animate-fade-in text-sm backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <p className="font-medium">{toastMessage}</p>
        </div>
      )}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
