import { Injectable } from '@angular/core';
import { Part, PartCategory } from '../models/part.model';

/**
 * Données fictives — à remplacer par un appel API quand le backend sera prêt.
 * Il suffit de modifier le tableau PARTS ci-dessous pour ajouter/retirer des produits.
 */
const PARTS: Part[] = [
  {
    id: 1,
    name: 'Plaquettes de frein avant',
    category: 'Freinage',
    price: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
    description: 'Compatible avec la majorité des véhicules citadins et berlines.',
  },
  {
    id: 2,
    name: 'Disques de frein (paire)',
    category: 'Freinage',
    price: 6000,
    imageUrl: 'https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
    description: 'Disques ventilés haute résistance.',
  },
  {
    id: 3,
    name: 'Phare avant LED',
    category: 'Éclairage',
    price: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
    description: 'Meilleure visibilité nocturne, montage inclus.',
  },
  {
    id: 4,
    name: 'Ampoules LED H7 (paire)',
    category: 'Éclairage',
    price: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1621361365424-06f0e1eaf120?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
  },
  {
    id: 5,
    name: 'Housses de siège universelles',
    category: 'Intérieur',
    price: 5500,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    installationAvailable: false,
    description: 'Confort et protection pour votre habitacle.',
  },
  {
    id: 6,
    name: 'Tapis de sol sur mesure',
    category: 'Intérieur',
    price: 3000,
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    installationAvailable: false,
  },
  {
    id: 7,
    name: 'Pneu 195/65 R15',
    category: 'Pneus',
    price: 9000,
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
    description: 'Montage et équilibrage sur place.',
  },
  {
    id: 8,
    name: 'Pneu 205/55 R16',
    category: 'Pneus',
    price: 11000,
    imageUrl: 'https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
  },
  {
    id: 9,
    name: 'Huile moteur 5W40 (5L)',
    category: 'Huiles & Entretien',
    price: 4800,
    imageUrl: 'https://images.unsplash.com/photo-1635784063505-9c2eb6a7f0c9?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
    description: 'Vidange complète avec filtre à huile inclus.',
  },
  {
    id: 10,
    name: 'Filtre à air + filtre à huile',
    category: 'Huiles & Entretien',
    price: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e59?auto=format&fit=crop&w=800&q=80',
    installationAvailable: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  getParts(): Part[] {
    return PARTS;
  }

  getPartById(id: number): Part | undefined {
    return PARTS.find((part) => part.id === id);
  }

  getCategories(): PartCategory[] {
    return Array.from(new Set(PARTS.map((part) => part.category)));
  }

  filterParts(category?: PartCategory | 'Tous'): Part[] {
    if (!category || category === 'Tous') {
      return PARTS;
    }
    return PARTS.filter((part) => part.category === category);
  }
}
