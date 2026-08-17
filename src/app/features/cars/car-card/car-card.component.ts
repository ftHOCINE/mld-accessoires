import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car } from '../../../core/models/car.model';
import { StoreService } from '../../../core/services/store.service';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  @Input({ required: true }) car!: Car;

  constructor(private store: StoreService) {}

  get reserveLink(): string {
    const message = `Bonjour MLD Accessoires, je souhaite réserver la voiture "${this.car.brand} ${this.car.model}" (${this.car.pricePerDay} DA/jour). Merci de me confirmer la disponibilité.`;
    return this.store.getWhatsappLink(message);
  }
}
