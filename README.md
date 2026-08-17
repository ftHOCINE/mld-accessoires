# MLD ACCESSOIRES

Site vitrine Angular pour **MLD ACCESSOIRES** (Boghni, Algérie) : location de voitures et vente/montage de pièces détachées & accessoires auto.

- Angular 18 (standalone components, sans NgModule)
- TailwindCSS pour le styling (mobile-first, responsive)
- Données 100% fictives, centralisées dans `CarService` et `PartsService` pour être facilement modifiées

## Structure du projet

```
src/app/
├── core/
│   ├── models/
│   │   ├── car.model.ts        # interface Car (+ Transmission, Fuel, CarCategory)
│   │   └── part.model.ts       # interface Part (+ PartCategory)
│   └── services/
│       ├── car.service.ts      # données véhicules + filtres
│       ├── parts.service.ts    # données pièces + filtres par catégorie
│       └── store.service.ts    # coordonnées magasin, lien WhatsApp/tel, Google Maps
├── shared/components/
│   ├── header/                 # nav responsive + menu hamburger + tel/WhatsApp
│   └── footer/                 # coordonnées, horaires, lien Google Maps
├── features/
│   ├── home/
│   │   ├── home.component.ts   # assemble hero + car-list + parts-list + contact
│   │   └── hero/                # section d'accueil avec CTA
│   ├── cars/
│   │   ├── car-list/            # filtres (catégorie / prix) + grille
│   │   └── car-card/            # carte véhicule + bouton "Réserver sur WhatsApp"
│   ├── parts/
│   │   ├── parts-list/          # filtre par catégorie + grille
│   │   └── part-card/           # carte produit + bouton "Demander la disponibilité"
│   └── contact/                 # coordonnées + carte Google Maps intégrée
├── app.component.ts             # Header + router-outlet + Footer
└── app.routes.ts
```

## Modifier les données

- **Véhicules** : éditez le tableau `CARS` dans [src/app/core/services/car.service.ts](src/app/core/services/car.service.ts).
- **Pièces / accessoires** : éditez le tableau `PARTS` dans [src/app/core/services/parts.service.ts](src/app/core/services/parts.service.ts).
- **Coordonnées du magasin** (adresse, téléphone, horaires, lien Maps) : [src/app/core/services/store.service.ts](src/app/core/services/store.service.ts).

## Développement

```bash
npm install
ng serve
```

Puis ouvrir `http://localhost:4200/`.

## Build de production

```bash
ng build
```

Les artefacts sont générés dans `dist/mld-accessoires`.
