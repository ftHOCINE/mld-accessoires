import { Component } from '@angular/core';

import { StoreService } from '../../../core/services/store.service';

@Component({
    selector: 'app-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(public store: StoreService) {}
}
