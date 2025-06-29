// config/productRules.js

const genericPatterns = [/\/product/, /\/products/, /\/p\//, /\/p-/, /-p/];

export const productUrlRules = {
  "virgio.com": [
    /\/products\/.+/,
    /\/p\//,
    ...genericPatterns
  ],
  "tatacliq.com": [
    /\/product\/.+/,
    ...genericPatterns
  ],
  "nykaafashion.com": [
    /\/products\/.+/,
    ...genericPatterns
  ],
  "westside.com": [
    /\/products\/.+/,
    ...genericPatterns
  ],
  "zara.com": [
    /-p\d+\.html/
  ],
  "hm.com": [
    /productpage\.\d+\.html/
  ],
  "ajio.com": [/\/p\//],
  "myntra.com": [
    /\/\d+\/buy/
  ],
  default: [
    ...genericPatterns
  ]
};
