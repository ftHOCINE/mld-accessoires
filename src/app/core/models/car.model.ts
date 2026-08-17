export type Transmission = 'Manuelle' | 'Automatique';
export type Fuel = 'Essence' | 'Diesel' | 'Hybride' | 'Électrique';
export type CarCategory = 'Citadine' | 'Berline' | 'SUV' | 'Utilitaire' | 'Luxe';

export interface Car {
  id: number;
  brand: string;
  model: string;
  category: CarCategory;
  pricePerDay: number;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  imageUrl: string;
  available: boolean;
  description?: string;
}
