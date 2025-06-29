// utils/ruleChecker.js
import { createRulesForDomain } from './rulesFactory.js';

export function getRules(domain) {
  const ruleForDomain = createRulesForDomain(domain);
  console.log(ruleForDomain);
  return ruleForDomain;
}

export function shouldCrawlUrl(url, domain, depth, rules) {

  const included = rules.include.some(p => p.test(url));
  const excluded = rules.exclude.some(p => p.test(url));
  const customMatch = rules.match ? rules.match(url) : true;
  const withinDepth = depth <= (rules.maxDepth ?? 2);

  return included && !excluded && customMatch && withinDepth;
}
