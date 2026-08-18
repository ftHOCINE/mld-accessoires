import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../../core/models/car.model';
import { StoreService } from '../../../core/services/store.service';
import { onImageError } from '../../../shared/utils/image-fallback';

@Component({
    selector: 'app-car-card',
    imports: [CommonModule],
    templateUrl: './car-card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './car-card.component.css'
})
export class CarCardComponent {
  @Input({ required: true }) car!: Car;

  readonly onImageError = onImageError;

  constructor(private store: StoreService) {}

  get reserveLink(): string {
    const message = `Bonjour MLD Accessoires, je souhaite réserver la voiture "${this.car.brand} ${this.car.model}" (${this.car.pricePerDay} DA/jour). Merci de me confirmer la disponibilité.`;
    return this.store.getWhatsappLink(message);
  }
}
