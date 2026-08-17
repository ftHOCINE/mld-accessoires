import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StoreService } from '../../core/services/store.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  mapsEmbedUrl: SafeResourceUrl;

  constructor(public store: StoreService, private sanitizer: DomSanitizer) {
    const rawUrl = `https://www.google.com/maps?q=${encodeURIComponent(this.store.info.address)}&output=embed`;
    this.mapsEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }
}
