export type VehicleCategory = 'Van / Utilitaire' | 'Berline' | 'SUV / 4x4' | 'Sportive / Coupé' | 'Break' | 'Citadine';

export type FuelType = 'Diesel' | 'Essence' | 'Hybride' | 'Électrique';

export type TransmissionType = 'Automatique' | 'Manuelle';

export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number; // in km
  price: number; // in EUR (0 if on demand)
  priceFormatted: string;
  category: VehicleCategory;
  fuel: FuelType;
  transmission: TransmissionType;
  powerCh: number;
  doors?: number;
  seats: number;
  color: string;
  interiorColor?: string;
  warranty: string;
  origin: string;
  status: 'Disponible' | 'Réservé' | 'Vendu' | 'En arrivage' | 'Sur commande';
  isVan: boolean;
  featured?: boolean;
  isNewArrival?: boolean;
  description: string;
  images: string[];
  specs: {
    engineCode?: string;
    displacement?: string;
    powerKw?: number;
    torqueNm?: number;
    topSpeedKmh?: number;
    acceleration0100?: string;
    combinedConsumption?: string;
    co2Emissions?: string;
    emissionStandard?: string;
    dimensions?: string;
    emptyWeightKg?: number;
    payloadKg?: number;
    ptacKg?: number;
  };
  features: string[];
  vanAmenities?: {
    hasBed?: boolean;
    hasKitchen?: boolean;
    hasVipLounge?: boolean;
    hasPartition?: boolean;
    hasTvAudio?: boolean;
    hasMinibar?: boolean;
    hasStarlightCeiling?: boolean;
    hasPopUpRoof?: boolean;
    hasWifi?: boolean;
    hasSolarOrLithium?: boolean;
  };
}

export interface CustomVanConfig {
  chassis: string;
  finishType: 'VIP Executive Lounge' | 'Bureau Mobile 5G' | 'Camper Évasion de Luxe' | 'Navette Prestige 8 Places';
  leatherColor: string;
  woodTrim: string;
  features: string[];
  multimedia: string[];
  exteriorColor: string;
  estimatedPrice: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  message?: string;
}

export interface WorkshopBooking {
  id: string;
  service: string;
  vehicleMakeModel: string;
  licensePlate: string;
  preferredDate: string;
  preferredTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  type: 'information' | 'essai' | 'financement' | 'contact' | 'reprise' | 'sur-mesure';
  vehicleId?: string;
  vehicleTitle?: string;
  name: string;
  email: string;
  phone: string;
  budget?: string;
  message: string;
  createdAt: string;
}
