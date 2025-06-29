import * as cheerio from 'cheerio';
import { isProductUrl, isNotWorthyUrl, isCurrentUrlProduct } from '../utils/helpers.js';
import fetchWithRetry from '../utils/fetchWithRetry.js';
import { MAX_DEPTH, MAX_PRODUCTS, MAX_QUEUE_SIZE } from '../config.js';
import { getRules, shouldCrawlUrl } from '../utils/ruleChecker.js';

export default async function cheerioCrawler(domain,rules) {

  const visited = new Set();
  const queue = [[domain, 0]];
  const productUrls = [];

  while (queue.length > 0) {
    const [url, depth] = queue.shift();
    if (visited.has(url)) continue;
    if (depth > rules.maxDepth) continue;

    const res = await fetchWithRetry(url);
    if (!res) continue;

    const $ = cheerio.load(res.data);
    visited.add(url);
    console.log(`[Cheerio][DEPTH ${depth}] Visiting: ${url}`);

    $('a[href]').each((_, el) => {
      let href = $(el).attr('href');
      if (href?.startsWith('//')) href = 'https:' + href;
      else if (href?.startsWith('/')) href = domain.replace(/\/$/, '') + href;
      if (
        href &&
        href.includes(domain) &&
        !visited.has(href) &&
        shouldCrawlUrl(href, domain, depth + 1, rules)
      ) {
        if (isCurrentUrlProduct(href, domain)) {
          console.log(`[PRODUCT] ${href}`);
          productUrls.push(href);
          if (productUrls.length >= MAX_PRODUCTS) return productUrls;
        }
        if (queue.length < MAX_QUEUE_SIZE) {
          queue.push([href, depth + 1]);
        }
      }
    });
    await new Promise(res => setTimeout(res, rules.rateLimitMs)); 
  }
  return productUrls;
}
