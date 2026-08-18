import { Component, ChangeDetectionStrategy } from '@angular/core';

import { StoreService } from '../../../core/services/store.service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  navLinks = [
    { label: 'Accueil', fragment: 'accueil' },
    { label: 'Location de voitures', fragment: 'location' },
    { label: 'Pièces & Accessoires', fragment: 'pieces' },
    { label: 'Contact', fragment: 'contact' },
  ];

  constructor(public store: StoreService) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
