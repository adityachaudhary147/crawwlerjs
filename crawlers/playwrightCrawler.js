import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { isProductUrl, isNotWorthyUrl } from '../utils/helpers.js';
import { MAX_DEPTH, MAX_PRODUCTS } from '../config.js';

const visited = new Set();

export default async function playwrightCrawler(domain) {
  const queue = [[domain, 0]];
  const productUrls = [];

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  while (queue.length > 0 && productUrls.length < MAX_PRODUCTS) {
    const [url, depth] = queue.shift();
    if (visited.has(url) || depth > MAX_DEPTH) continue;

    try {
      console.log(`[Playwright][DEPTH ${depth}] Visiting: ${url}`);
      await page.goto(url, { timeout: 60000 });

      for (let i = 0; i < 3; i++) {
        await page.mouse.wheel(0, 3000);
        await page.waitForTimeout(1000);
      }

      const content = await page.content();
      const $ = cheerio.load(content);
      visited.add(url);

      $('a[href]').each((_, el) => {
        let href = $(el).attr('href');
        if (href.startsWith('//')) href = 'https:' + href;
        else if (href.startsWith('/')) href = domain.replace(/\/$/, '') + href;

        if (href.includes(domain) && !visited.has(href) && !isNotWorthyUrl(href)) {
          if (isProductUrl(href)) {
            console.log(`[PRODUCT] ${href}`);
            productUrls.push(href);
          } else {
            queue.push([href, depth + 1]);
          }
        }
      });

    } catch (e) {
      console.error(`[ERROR Playwright] ${url} - ${e.message}`);
    }
  }

  await browser.close();
  return productUrls;
}
