// Extrae el JPEG embebido del PDF (vía SVG generado por mupdf),
// lo recorta a la región del wordmark y lo vectoriza con potrace.
// Resultado: public/logo.svg con paths reales y fondo transparente,
// usando currentColor para que se pueda tintar via CSS.

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import potrace from 'potrace';

const SRC_SVG = '.cache/logo-raw.svg';
const OUT_SVG = 'public/logo.svg';
const TMP_PNG = '.cache/logo-trace-input.png';

const raw = fs.readFileSync(SRC_SVG, 'utf-8');
const match = raw.match(/data:image\/(jpeg|png);base64,([\s\S]+?)"/);
if (!match) throw new Error('No se encontró imagen embebida en el SVG');
const buf = Buffer.from(match[2].replace(/\s+/g, ''), 'base64');

// Recortamos solo verticalmente para mantener el ancho completo del wordmark
// (el crop horizontal anterior dejaba la C contra el borde). Hacemos el
// cropping en dos pasos para que sharp no se queje del extract después de trim.
const meta = await sharp(buf).metadata();
console.log(`Imagen embebida: ${meta.width}×${meta.height} ${meta.format}`);

const cropTop = Math.round(meta.height * 0.40);
const cropHeight = Math.round(meta.height * 0.20);

// Paso 1: extracción de la franja del wordmark + grayscale + normalize
const stripBuf = await sharp(buf)
  .extract({ left: 0, top: cropTop, width: meta.width, height: cropHeight })
  .grayscale()
  .normalize()
  .png()
  .toBuffer();

// Paso 2: trim bordes blancos + padding limpio
await sharp(stripBuf)
  .trim({ background: 'white', threshold: 240 })
  .extend({ top: 32, bottom: 32, left: 48, right: 48, background: { r: 255, g: 255, b: 255 } })
  .png()
  .toFile(TMP_PNG);

const tmpMeta = await sharp(TMP_PNG).metadata();
console.log(`Recorte final: ${tmpMeta.width}×${tmpMeta.height}`);

console.log(`Recortado → ${TMP_PNG}`);

// Vectoriza con potrace
const svg = await new Promise((resolve, reject) => {
  potrace.trace(
    TMP_PNG,
    {
      threshold: 128,
      turdSize: 8,        // suprime motas pequeñas
      optTolerance: 0.4,  // suavizado
      color: 'currentColor',
      background: 'transparent',
    },
    (err, out) => (err ? reject(err) : resolve(out)),
  );
});

// Ajustamos el SVG resultante para que use currentColor y tenga viewBox limpio
const cleaned = svg
  .replace(/fill="[^"]*"/, 'fill="currentColor"')
  .replace(/<svg /, '<svg fill="currentColor" ');

fs.writeFileSync(OUT_SVG, cleaned, 'utf-8');
console.log(`OK → ${OUT_SVG} (${cleaned.length} bytes)`);

// Limpieza
fs.unlinkSync(TMP_PNG);
fs.unlinkSync(SRC_SVG);
