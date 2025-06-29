import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { isProductUrl,isCurrentUrlProduct } from '../utils/helpers.js';
import { getRules, shouldCrawlUrl } from '../utils/ruleChecker.js';
//  not required as we lazy load it in chromium browser
import fetchWithRetry from '../utils/fetchWithRetry.js'; 
import { MAX_PRODUCTS } from '../config.js';

const visited = new Set();

export default async function playwrightCrawler(domain,rules) {
  const queue = [[domain, 0]];
  const productUrls = [];

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  while (queue.length > 0 && (productUrls.length < rules.maxProducts ?? MAX_PRODUCTS)) {
    const [url, depth] = queue.shift();
    if (visited.has(url)) continue;
    if (depth > rules.maxDepth) continue;

    try {
      console.log(`[Playwright][DEPTH ${depth}] Visiting: ${url}`);
      await page.goto(url, { timeout: 20000 });

      for (let i = 0; i < 3; i++) {
        await page.mouse.wheel(0, 3000);
        await page.waitForTimeout(1000);
      }

      const content = await page.content();
      const $ = cheerio.load(content);
      visited.add(url);

      $('a[href]').each((_, el) => {
        let href = $(el).attr('href');
        if (!href) return;

        if (href.startsWith('//')) href = 'https:' + href;
        else if (href.startsWith('/')) href = domain.replace(/\/$/, '') + href;

        if (
          href.includes(domain) &&
          !visited.has(href) &&
          shouldCrawlUrl(href, domain, depth + 1,rules)
        ) {
          if (isCurrentUrlProduct(href, domain)) {
            console.log(`[PRODUCT] ${href}`);
            productUrls.push(href);
          } else {
            if (queue.length < 10) {
              queue.push([href, depth + 1]);
            }
          }
        }
      });

      await page.waitForTimeout(rules.rateLimitMs); // domain-specific delay

    } catch (e) {
      console.error(`[ERROR Playwright] ${url} - ${e.message}`);
    }
  }

  await browser.close();
  return productUrls;
}
