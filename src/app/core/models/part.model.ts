export type PartCategory =
  | 'Freinage'
  | 'Éclairage'
  | 'Intérieur'
  | 'Pneus'
  | 'Huiles & Entretien';

export interface Part {
  id: number;
  name: string;
  category: PartCategory;
  price: number;
  imageUrl: string;
  installationAvailable: boolean;
  description?: string;
}
