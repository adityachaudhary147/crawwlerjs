import cheerioCrawler from './crawlers/cheerioCrawler.js';
import playwrightCrawler from './crawlers/playwrightCrawler.js';
import { generateFileName, saveToFile } from './utils/fileUtils.js';
import { isJsSite } from './utils/helpers.js';
import pLimit from 'p-limit';

// ⬇️ Concurrency limit
const limit = pLimit(3);

const domains = [
  "https://www.virgio.com",
  "https://www.tatacliq.com",
  "https://www.nykaafashion.com",
  "https://www.westside.com",
  "https://www.zara.com",
  "https://www.hnm.com",
  "https://www.myntra.com",
  "https://www.ajio.com",
];

async function crawlAndSave(domain) {
  console.log(`\n========== Starting crawl for ${domain} ==========`);
  const crawler = isJsSite(domain) ? playwrightCrawler : cheerioCrawler;
  const products = await crawler(domain);
  console.log(`[RESULT] Found ${products.length} product URLs`);
  const filename = generateFileName(domain);
  saveToFile(products, filename);
}

// ✅ Run with concurrency limit
(async () => {
  const tasks = domains.map(domain => limit(() => crawlAndSave(domain)));
  await Promise.all(tasks);
})();
