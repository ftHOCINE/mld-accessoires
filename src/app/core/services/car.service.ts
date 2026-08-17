import { Injectable } from '@angular/core';
import { Car, CarCategory, Transmission } from '../models/car.model';

/**
 * Données fictives — à remplacer par un appel API quand le backend sera prêt.
 * Il suffit de modifier le tableau CARS ci-dessous pour ajouter/retirer des véhicules.
 */
const CARS: Car[] = [
  {
    id: 1,
    brand: 'Renault',
    model: 'Clio 5',
    category: 'Citadine',
    pricePerDay: 4000,
    transmission: 'Manuelle',
    fuel: 'Essence',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    available: true,
    description: 'Compacte économique, idéale pour la ville.',
  },
  {
    id: 2,
    brand: 'Dacia',
    model: 'Duster',
    category: 'SUV',
    pricePerDay: 6500,
    transmission: 'Manuelle',
    fuel: 'Diesel',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80',
    available: true,
    description: 'SUV robuste, parfait pour les routes de montagne.',
  },
  {
    id: 3,
    brand: 'Volkswagen',
    model: 'Golf 8',
    category: 'Berline',
    pricePerDay: 7000,
    transmission: 'Automatique',
    fuel: 'Essence',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    available: true,
    description: 'Confort et style pour vos déplacements professionnels.',
  },
  {
    id: 4,
    brand: 'Peugeot',
    model: '208',
    category: 'Citadine',
    pricePerDay: 4200,
    transmission: 'Manuelle',
    fuel: 'Essence',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
    available: false,
    description: 'Design moderne et faible consommation.',
  },
  {
    id: 5,
    brand: 'Hyundai',
    model: 'Tucson',
    category: 'SUV',
    pricePerDay: 8000,
    transmission: 'Automatique',
    fuel: 'Diesel',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    available: true,
    description: 'Spacieux et puissant, pour les longs trajets en famille.',
  },
  {
    id: 6,
    brand: 'Mercedes',
    model: 'Classe C',
    category: 'Luxe',
    pricePerDay: 15000,
    transmission: 'Automatique',
    fuel: 'Essence',
    seats: 5,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    available: true,
    description: 'Berline haut de gamme pour vos occasions spéciales.',
  },
  {
    id: 7,
    brand: 'Renault',
    model: 'Kangoo',
    category: 'Utilitaire',
    pricePerDay: 5000,
    transmission: 'Manuelle',
    fuel: 'Diesel',
    seats: 3,
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80',
    available: true,
    description: 'Idéal pour le transport de marchandises.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CarService {
  getCars(): Car[] {
    return CARS;
  }

  getCarById(id: number): Car | undefined {
    return CARS.find((car) => car.id === id);
  }

  getCategories(): CarCategory[] {
    return Array.from(new Set(CARS.map((car) => car.category)));
  }

  getTransmissions(): Transmission[] {
    return Array.from(new Set(CARS.map((car) => car.transmission)));
  }

  filterCars(params: { category?: CarCategory | 'Tous'; maxPrice?: number }): Car[] {
    return CARS.filter((car) => {
      const matchCategory =
        !params.category || params.category === 'Tous' || car.category === params.category;
      const matchPrice = !params.maxPrice || car.pricePerDay <= params.maxPrice;
      return matchCategory && matchPrice;
    });
  }
}
