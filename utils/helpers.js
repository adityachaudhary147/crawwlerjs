// utils/helpers.js
import { productUrlRules } from './productRules.js';
import { productPatterns, notWorthyPatterns, jsSites } from '../config.js';

export function isProductUrl(url) {
  return productPatterns.some((pattern) => pattern.test(url));
}

export function isNotWorthyUrl(url) {
  return notWorthyPatterns.some((pattern) => pattern.test(url));
}

export function isJsSite(domain) {
  return jsSites.some(js => domain.startsWith(js));
}

export function isCurrentUrlProduct(url, domain) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\d?\./, ''); // handles www2, www, etc.

    const patterns = productUrlRules[hostname] || productUrlRules.default;
    const result = patterns.some(pattern => pattern.test(url));
    return result;
  } catch (err) {
    console.warn(`[WARN] Invalid domain or URL: ${url}, ${domain}`);
    return false;
  }
}