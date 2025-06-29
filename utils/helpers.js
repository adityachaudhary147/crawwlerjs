// utils/helpers.js
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