import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Car, CarCategory } from '../../../core/models/car.model';
import { CarService } from '../../../core/services/car.service';
import { CarCardComponent } from '../car-card/car-card.component';

@Component({
    selector: 'app-car-list',
    imports: [CommonModule, FormsModule, CarCardComponent],
    templateUrl: './car-list.component.html',
    styleUrl: './car-list.component.css'
})
export class CarListComponent {
  cars: Car[] = [];
  categories: (CarCategory | 'Tous')[] = [];
  maxPriceOptions = [4000, 6000, 8000, 10000, 20000];

  selectedCategory: CarCategory | 'Tous' = 'Tous';
  selectedMaxPrice = 0;

  constructor(private carService: CarService) {
    this.categories = ['Tous', ...this.carService.getCategories()];
    this.applyFilters();
  }

  applyFilters(): void {
    this.cars = this.carService.filterCars({
      category: this.selectedCategory,
      maxPrice: this.selectedMaxPrice || undefined,
    });
  }

  resetFilters(): void {
    this.selectedCategory = 'Tous';
    this.selectedMaxPrice = 0;
    this.applyFilters();
  }
}
