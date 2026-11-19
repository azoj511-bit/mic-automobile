// Generated vehicles database for MIC AUTOMOBILE
import { Vehicle } from '../types/vehicle';
import vehiclesJson from './vehiclesData.json';

export const VEHICLES_DATA: Vehicle[] = vehiclesJson as Vehicle[];

export const getVehicleBySlug = (slug: string): Vehicle | undefined => {
  return VEHICLES_DATA.find(v => v.slug === slug || v.id === slug);
};

export const getFeaturedVehicles = (): Vehicle[] => {
  return VEHICLES_DATA.filter(v => v.featured);
};

export const getVanVehicles = (): Vehicle[] => {
  return VEHICLES_DATA.filter(v => v.isVan);
};

export const getSimilarVehicles = (current: Vehicle, limit: number = 3): Vehicle[] => {
  return VEHICLES_DATA
    .filter(v => v.id !== current.id && (v.brand === current.brand || v.category === current.category))
    .slice(0, limit);
};
