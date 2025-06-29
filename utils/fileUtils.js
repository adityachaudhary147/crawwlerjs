import fs from 'fs';
import { URL } from 'url';

export function generateFileName(domain) {
  const { hostname } = new URL(domain);
  const base = hostname.replace(/^www\d?\./, ''); // handles www2, www, etc.
  const files = fs.readdirSync('./results_all/');
  const count = files.filter(f => f.startsWith(base) && f.endsWith('.json')).length;
  return `./results_all/${base}_${count + 1}.json`;
}

export function saveToFile(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`[SAVED] Product URLs saved to ${filename}`);
}