import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { CarListComponent } from '../cars/car-list/car-list.component';
import { PartsListComponent } from '../parts/parts-list/parts-list.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
    selector: 'app-home',
    imports: [HeroComponent, CarListComponent, PartsListComponent, ContactComponent],
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './home.component.css'
})
export class HomeComponent {}
