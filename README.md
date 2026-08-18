# MLD ACCESSOIRES

Site vitrine Angular pour **MLD ACCESSOIRES** (Boghni, Algérie) : location de voitures et vente/montage de pièces détachées & accessoires auto.

- Angular 22 (standalone components, sans NgModule)
- TailwindCSS pour le styling (mobile-first, responsive, thème sombre)
- Catalogue voitures & pièces géré depuis des fichiers **Excel** dans `/data`, converti automatiquement en données TypeScript à chaque build

## Structure du projet

```
data/
├── voitures.xlsx                # catalogue voitures — source de verite, modifiable sans toucher au code
└── pieces.xlsx                  # catalogue pieces/accessoires — idem

scripts/
└── generate-data.mjs            # lit /data/*.xlsx et genere src/app/core/data/*.generated.ts

src/app/
├── core/
│   ├── models/
│   │   ├── car.model.ts        # interface Car (+ Transmission, Fuel, CarCategory)
│   │   └── part.model.ts       # interface Part (+ PartCategory)
│   ├── data/                    # genere automatiquement, non versionne (voir scripts/generate-data.mjs)
│   └── services/
│       ├── car.service.ts      # expose CARS (importe depuis core/data) + filtres
│       ├── parts.service.ts    # expose PARTS (importe depuis core/data) + filtres par categorie
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

## Modifier le catalogue (voitures / pièces)

1. Ouvrez `data/voitures.xlsx` ou `data/pieces.xlsx` dans Excel (ou LibreOffice/Google Sheets).
2. Modifiez, ajoutez ou supprimez des lignes. Les colonnes à valeurs limitées (Catégorie, Transmission, Carburant, Disponible...) doivent respecter exactement les valeurs listées dans l'onglet **"Valeurs autorisees"** de chaque fichier — toute autre valeur fait échouer le build avec un message précis (fichier + numéro de ligne + colonne).
3. Enregistrez, puis `git add data/ && git commit -m "..." && git push` — le site se reconstruit et se republie automatiquement.

Les identifiants (`id`) sont attribués automatiquement selon l'ordre des lignes ; inutile de les gérer à la main.

Pour prévisualiser en local sans attendre le déploiement : `npm start` régénère les données puis lance le serveur de dev.

## Autres données

- **Coordonnées du magasin** (adresse, téléphone, horaires, lien Maps) : [src/app/core/services/store.service.ts](src/app/core/services/store.service.ts) (reste en dur, pas dans Excel).

## Développement

```bash
npm install
npm start
```

Puis ouvrir `http://localhost:4200/`.

`npm start` et `npm run build` régénèrent automatiquement `src/app/core/data/*.generated.ts` depuis `/data/*.xlsx` avant de lancer Angular (hooks `prestart`/`prebuild`). Pour régénérer manuellement : `npm run generate:data`.

## Build de production

```bash
npm run build
```

Les artefacts sont générés dans `dist/mld-accessoires`.
