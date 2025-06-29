import fs from 'fs';
import { URL } from 'url';

export function generateFileName(domain) {
  const { hostname } = new URL(domain);
  const base = hostname.replace('www.', '').split('.')[0];
  const files = fs.readdirSync('.');
  const count = files.filter(f => f.startsWith(base) && f.endsWith('.json')).length;
  return `${base}_${count + 1}.json`;
}

export function saveToFile(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`[SAVED] Product URLs saved to ${filename}`);
}