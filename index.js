import cheerioCrawler from './crawlers/cheerioCrawler.js';
import playwrightCrawler from './crawlers/playwrightCrawler.js';
import { generateFileName, saveToFile } from './utils/fileUtils.js';
import { isJsSite } from './utils/helpers.js';
import pLimit from 'p-limit';
import { getRules } from './utils/ruleChecker.js';

// ⬇️ Concurrency limit
const limit = pLimit(8);

const domains = [
  "https://www.virgio.com",
  "https://www.tatacliq.com",
  "https://www.nykaafashion.com",
  "https://www.westside.com",
  "https://www.zara.com/in/",
  "https://www2.hm.com",
  "https://www.myntra.com",
  "https://www.ajio.com",
];

async function crawlAndSave(domain,rules) {
  console.log(`\n========== Starting crawl for ${domain} ==========`);
  const crawler = isJsSite(domain) ? playwrightCrawler : cheerioCrawler;
  const products = await crawler(domain,rules);
  console.log(`[RESULT] Found ${products.length} product URLs`);
  const filename = generateFileName(domain);
  saveToFile(products, filename);
}

(async () => {
    const tasks = domains.map(domain => {
        const rules = getRules(domain);
        return limit(() => crawlAndSave(domain, rules))
    });
    await Promise.all(tasks);
})();
