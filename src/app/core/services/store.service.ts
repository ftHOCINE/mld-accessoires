import { Injectable } from '@angular/core';

export interface StoreInfo {
  name: string;
  address: string;
  mapsQuery: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  mapsUrl: string;
  hours: { days: string; hours: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly info: StoreInfo = {
    name: 'MLD ACCESSOIRES',
    address: 'Rue Acheghane Mohammed, Boghni 15003, Algérie',
    mapsQuery: 'MLD ACCESSOIRES, Rue Acheghane Mohammed, Boghni 15003, Algérie',
    phone: '+213550414595',
    phoneDisplay: '0550 41 45 95',
    whatsappNumber: '213550414595',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=MLD+ACCESSOIRES+Rue+Acheghane+Mohammed+Boghni+15003+Algerie',
    hours: [{ days: 'Samedi - Jeudi', hours: '08h00 - 18h00' }],
  };

  getWhatsappLink(message: string): string {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${this.info.whatsappNumber}?text=${encoded}`;
  }

  getCallLink(): string {
    return `tel:${this.info.phone}`;
  }
}
