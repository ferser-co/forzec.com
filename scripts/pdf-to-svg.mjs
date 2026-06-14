// Convierte un PDF de una sola página (logo vectorial) a SVG limpio.
// Uso: node scripts/pdf-to-svg.mjs <input.pdf> <output.svg>

import * as mupdf from 'mupdf';
import fs from 'node:fs';
import path from 'node:path';

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) {
  console.error('Uso: node pdf-to-svg.mjs <input.pdf> <output.svg>');
  process.exit(1);
}

const buf = fs.readFileSync(path.resolve(inputPath));
const doc = mupdf.Document.openDocument(buf, 'application/pdf');
const page = doc.loadPage(0);

const svg = page.toStructuredText('preserve-spans');
// MuPDF expone `toStructuredText` para texto. Para SVG vectorial usamos
// el writer dedicado.
const buffer = new mupdf.Buffer();
const writer = new mupdf.DocumentWriter(buffer, 'svg', '');
const device = writer.beginPage(page.getBounds());
page.run(device, mupdf.Matrix.identity);
writer.endPage();
writer.close();

const svgText = buffer.asString();
fs.writeFileSync(path.resolve(outputPath), svgText, 'utf-8');
console.log(`OK → ${outputPath} (${svgText.length} bytes)`);
