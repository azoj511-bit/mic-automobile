import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { VehicleComparisonModal } from './components/VehicleComparisonModal';
import { InquiryModal } from './components/InquiryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { CustomVanPage } from './pages/CustomVanPage';
import { RecommendationPage } from './pages/RecommendationPage';
import { WorkshopPage } from './pages/WorkshopPage';
import { AboutPage } from './pages/AboutPage';
import { FinancingPage } from './pages/FinancingPage';
import { ProSolutionsPage } from './pages/ProSolutionsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  // Simple client-side router
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname.replace(/^\//, '') || 'home';
  });
  const [currentQuery, setCurrentQuery] = useState<string>(() => window.location.search);
  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState<string | null>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/vehicule/')) {
      return path.replace('/vehicule/', '');
    }
    return null;
  });

  const navigate = (route: string) => {
    let cleanRoute = route;
    let query = '';
    if (route.includes('?')) {
      const parts = route.split('?');
      cleanRoute = parts[0];
      query = '?' + parts[1];
    }

    if (cleanRoute.startsWith('vehicule/')) {
      const slug = cleanRoute.replace('vehicule/', '');
      setSelectedVehicleSlug(slug);
      setCurrentPath('vehicule');
      window.history.pushState({}, '', `/vehicule/${slug}`);
    } else {
      setSelectedVehicleSlug(null);
      setCurrentPath(cleanRoute);
      setCurrentQuery(query);
      const url = cleanRoute === 'home' ? '/' : `/${cleanRoute}${query}`;
      window.history.pushState({}, '', url);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '') || 'home';
      if (path.startsWith('vehicule/')) {
        setSelectedVehicleSlug(path.replace('vehicule/', ''));
        setCurrentPath('vehicule');
      } else {
        setSelectedVehicleSlug(null);
        setCurrentPath(path);
      }
      setCurrentQuery(window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectVehicle = (slug: string) => {
    navigate(`vehicule/${slug}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Sticky Header */}
      <Header currentRoute={currentPath} navigate={navigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedVehicleSlug ? (
          <VehicleDetailPage
            slug={selectedVehicleSlug}
            onBack={() => navigate('stock')}
            onSelectVehicle={handleSelectVehicle}
          />
        ) : currentPath === 'stock' || currentPath === 'catalogue' ? (
          <CatalogPage 
            onSelectVehicle={handleSelectVehicle} 
            initialQuery={currentQuery}
          />
        ) : currentPath === 'sur-mesure' || currentPath === 'vans' ? (
          <CustomVanPage />
        ) : currentPath === 'recommandation' || currentPath === 'survey' ? (
          <RecommendationPage 
            onSelectVehicle={handleSelectVehicle}
            navigate={navigate}
          />
        ) : currentPath === 'atelier' || currentPath === 'workshop' ? (
          <WorkshopPage />
        ) : currentPath === 'a-propos' || currentPath === 'about' ? (
          <AboutPage navigate={navigate} />
        ) : currentPath === 'financement' ? (
          <FinancingPage />
        ) : currentPath === 'professionnels' || currentPath === 'pro' ? (
          <ProSolutionsPage />
        ) : currentPath === 'ressources' || currentPath === 'guides' ? (
          <ResourcesPage />
        ) : currentPath === 'contact' ? (
          <ContactPage />
        ) : currentPath === 'legal' ? (
          <LegalPage />
        ) : currentPath === 'admin' ? (
          <AdminPage />
        ) : (
          <HomePage 
            navigate={navigate} 
            onSelectVehicle={handleSelectVehicle} 
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer navigate={navigate} />

      {/* Global Modals */}
      <VehicleComparisonModal onSelectVehicle={handleSelectVehicle} />
      <InquiryModal />
      <CookieBanner />
    </div>
  );
};
