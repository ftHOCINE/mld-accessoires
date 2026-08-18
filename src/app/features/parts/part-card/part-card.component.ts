import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Part } from '../../../core/models/part.model';
import { StoreService } from '../../../core/services/store.service';
import { onImageError } from '../../../shared/utils/image-fallback';

@Component({
    selector: 'app-part-card',
    imports: [CommonModule],
    templateUrl: './part-card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './part-card.component.css'
})
export class PartCardComponent {
  @Input({ required: true }) part!: Part;

  readonly onImageError = onImageError;

  constructor(private store: StoreService) {}

  get availabilityLink(): string {
    const message = `Bonjour MLD Accessoires, je souhaite connaître la disponibilité de : "${this.part.name}" (${this.part.category}).`;
    return this.store.getWhatsappLink(message);
  }
}
