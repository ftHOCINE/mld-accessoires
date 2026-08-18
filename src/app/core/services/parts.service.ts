import { Injectable } from '@angular/core';
import { Part, PartCategory } from '../models/part.model';
import { PARTS } from '../data/parts.generated';

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
