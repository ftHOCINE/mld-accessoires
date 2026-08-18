import { Injectable } from '@angular/core';
import { Car, CarCategory, Transmission } from '../models/car.model';
import { CARS } from '../data/cars.generated';

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
