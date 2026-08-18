import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StoreService } from '../../core/services/store.service';

@Component({
    selector: 'app-contact',
    imports: [],
    templateUrl: './contact.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './contact.component.css'
})
export class ContactComponent {
  mapsEmbedUrl: SafeResourceUrl;

  constructor(public store: StoreService, private sanitizer: DomSanitizer) {
    const rawUrl = `https://www.google.com/maps?q=${encodeURIComponent(this.store.info.address)}&output=embed`;
    this.mapsEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }
}
