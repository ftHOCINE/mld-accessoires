import ExcelJS from 'exceljs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');
const outDir = path.join(root, 'src', 'app', 'core', 'data');

const CAR_CATEGORIES = ['Citadine', 'Berline', 'SUV', 'Utilitaire', 'Luxe'];
const TRANSMISSIONS = ['Manuelle', 'Automatique'];
const FUELS = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
const PART_CATEGORIES = ['Freinage', 'Éclairage', 'Intérieur', 'Pneus', 'Huiles & Entretien'];

function cellText(cell) {
  const v = cell?.value;
  if (v === null || v === undefined) return '';
  if (typeof v === 'object' && 'text' in v) return String(v.text).trim();
  if (typeof v === 'object' && 'result' in v) return String(v.result).trim();
  return String(v).trim();
}

function cellNumber(cell, rowNumber, columnName, sheetName) {
  const text = cellText(cell);
  const n = Number(text.replace(',', '.'));
  if (text === '' || Number.isNaN(n)) {
    throw new Error(`${sheetName}: ligne ${rowNumber} - "${columnName}" doit etre un nombre (valeur trouvee: "${text}")`);
  }
  return n;
}

function cellBoolean(text) {
  const normalized = text.trim().toLowerCase();
  return ['oui', 'yes', 'true', '1', 'x'].includes(normalized);
}

function assertOneOf(value, allowed, rowNumber, columnName, sheetName) {
  if (!allowed.includes(value)) {
    throw new Error(
      `${sheetName}: ligne ${rowNumber} - "${columnName}" invalide: "${value}". Valeurs autorisees: ${allowed.join(', ')}`
    );
  }
  return value;
}

async function loadSheet(filePath, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.getWorksheet(sheetName);
  if (!sheet) {
    throw new Error(`Feuille "${sheetName}" introuvable dans ${filePath}`);
  }
  return sheet;
}

function readCars(sheet) {
  const cars = [];
  let id = 1;

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // header

    const brand = cellText(row.getCell(1));
    const model = cellText(row.getCell(2));
    if (!brand && !model) return; // skip blank rows

    const category = assertOneOf(cellText(row.getCell(3)), CAR_CATEGORIES, rowNumber, 'Categorie', 'Voitures');
    const pricePerDay = cellNumber(row.getCell(4), rowNumber, 'Prix par jour', 'Voitures');
    const transmission = assertOneOf(cellText(row.getCell(5)), TRANSMISSIONS, rowNumber, 'Transmission', 'Voitures');
    const fuel = assertOneOf(cellText(row.getCell(6)), FUELS, rowNumber, 'Carburant', 'Voitures');
    const seats = cellNumber(row.getCell(7), rowNumber, 'Places', 'Voitures');
    const imageUrl = cellText(row.getCell(8));
    const available = cellBoolean(cellText(row.getCell(9)));
    const description = cellText(row.getCell(10));

    cars.push({
      id: id++,
      brand,
      model,
      category,
      pricePerDay,
      transmission,
      fuel,
      seats,
      imageUrl,
      available,
      ...(description ? { description } : {}),
    });
  });

  return cars;
}

function readParts(sheet) {
  const parts = [];
  let id = 1;

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // header

    const name = cellText(row.getCell(1));
    if (!name) return; // skip blank rows

    const category = assertOneOf(cellText(row.getCell(2)), PART_CATEGORIES, rowNumber, 'Categorie', 'Pieces');
    const price = cellNumber(row.getCell(3), rowNumber, 'Prix', 'Pieces');
    const imageUrl = cellText(row.getCell(4));
    const installationAvailable = cellBoolean(cellText(row.getCell(5)));
    const description = cellText(row.getCell(6));

    parts.push({
      id: id++,
      name,
      category,
      price,
      imageUrl,
      installationAvailable,
      ...(description ? { description } : {}),
    });
  });

  return parts;
}

function writeGeneratedFile(fileName, exportName, typeName, items) {
  const banner = `// Fichier genere automatiquement par scripts/generate-data.mjs a partir des fichiers Excel du dossier /data.\n// Ne pas modifier a la main : les changements seraient ecrases au prochain build.\n`;
  const importLine = `import { ${typeName} } from '../models/${typeName === 'Car' ? 'car' : 'part'}.model';\n\n`;
  const body = `export const ${exportName}: ${typeName}[] = ${JSON.stringify(items, null, 2)};\n`;
  writeFileSync(path.join(outDir, fileName), banner + importLine + body, 'utf-8');
}

async function main() {
  mkdirSync(outDir, { recursive: true });

  const carsSheet = await loadSheet(path.join(dataDir, 'voitures.xlsx'), 'Voitures');
  const cars = readCars(carsSheet);
  writeGeneratedFile('cars.generated.ts', 'CARS', 'Car', cars);
  console.log(`✔ ${cars.length} voiture(s) chargee(s) depuis data/voitures.xlsx`);

  const partsSheet = await loadSheet(path.join(dataDir, 'pieces.xlsx'), 'Pieces');
  const parts = readParts(partsSheet);
  writeGeneratedFile('parts.generated.ts', 'PARTS', 'Part', parts);
  console.log(`✔ ${parts.length} piece(s) chargee(s) depuis data/pieces.xlsx`);
}

main().catch((err) => {
  console.error('✘ Echec de la generation des donnees:', err.message);
  process.exit(1);
});
