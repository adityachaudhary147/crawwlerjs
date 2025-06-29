// config/productRules.js

const genericPatterns = [/\/product/, /\/products/, /\/p\//, /\/p-/, /-p/];

export const productUrlRules = {
  "virgio.com": [
    /\/products\/[a-z0-9\-]+/,
  ],
  "tatacliq.com": [
    /\/[^\/]+\/p-mp\d+/,
  ],
  "nykaafashion.com": [
    /\/[^\/]+\/p\/\d+/,
  ],
  "westside.com": [
    /\/products\/[a-z0-9\-]+-\d+/,
  ],
  "zara.com": [
    /-p\d+\.html/
  ],
  "hm.com": [
    /productpage\.\d+\.html/
  ],
  "ajio.com": [
    /\/[a-z0-9\-]+\/p\/\d+_[a-z]+/,
  ],
  "myntra.com": [
    /\/\d+\/buy/
  ],
  default: [
    ...genericPatterns
  ]
};
