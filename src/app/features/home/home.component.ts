import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { CarListComponent } from '../cars/car-list/car-list.component';
import { PartsListComponent } from '../parts/parts-list/parts-list.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CarListComponent, PartsListComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
