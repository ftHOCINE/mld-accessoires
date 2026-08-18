import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Part, PartCategory } from '../../../core/models/part.model';
import { PartsService } from '../../../core/services/parts.service';
import { PartCardComponent } from '../part-card/part-card.component';

@Component({
    selector: 'app-parts-list',
    imports: [PartCardComponent],
    templateUrl: './parts-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './parts-list.component.css'
})
export class PartsListComponent {
  parts: Part[] = [];
  categories: (PartCategory | 'Tous')[] = [];
  selectedCategory: PartCategory | 'Tous' = 'Tous';

  constructor(private partsService: PartsService) {
    this.categories = ['Tous', ...this.partsService.getCategories()];
    this.parts = this.partsService.getParts();
  }

  selectCategory(category: PartCategory | 'Tous'): void {
    this.selectedCategory = category;
    this.parts = this.partsService.filterParts(category);
  }
}
