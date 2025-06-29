import * as cheerio from 'cheerio';
import { isProductUrl, isNotWorthyUrl } from '../utils/helpers.js';
import fetchWithRetry from '../utils/fetchWithRetry.js';
import { MAX_DEPTH, MAX_PRODUCTS } from '../config.js';


const visited = new Set();
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



export default async function cheerioCrawler(domain) {
  const queue = [[domain, 0]];
  const productUrls = [];

  while (queue.length > 0) {
    const [url, depth] = queue.shift();
    if (visited.has(url) || depth > MAX_DEPTH) continue;

    const res = await fetchWithRetry(url);
    if (!res) continue;

    const $ = cheerio.load(res.data);
    visited.add(url);
    console.log(`[Cheerio][DEPTH ${depth}] Visiting: ${url}`);

    $('a[href]').each((_, el) => {
      let href = $(el).attr('href');
      if (href.startsWith('//')) href = 'https:' + href;
      else if (href.startsWith('/')) href = domain.replace(/\/$/, '') + href;

      if (href.includes(domain) && !visited.has(href) && !isNotWorthyUrl(href)) {
        if (isProductUrl(href)) {
          console.log(`[PRODUCT] ${href}`);
          productUrls.push(href);
          if (productUrls.length >= MAX_PRODUCTS) return false;
        }
        queue.push([href, depth + 1]);
      }
    });

    // Random sleep between 1–2.5s to be polite
    await delay(1000 + Math.random() * 1500);
  }

  return productUrls;
}
