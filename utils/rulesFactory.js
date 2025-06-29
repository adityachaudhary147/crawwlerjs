// utils/rulesFactory.js

export function createRulesForDomain(domain) {
    const hostname = new URL(domain).hostname.replace(/^www\./, '');
    console.log(hostname);
    console.log(domain);

    switch (hostname) {
        case 'virgio.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 2,
                rateLimitMs: 1000,
                // not used 
                maxProducts: 10000,
            };

        case 'tatacliq.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 3,
                rateLimitMs: 1500,
                // not used
                maxProducts: 100,
            };

        case 'nykaafashion.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 4,
                rateLimitMs: 1200,
                // not used
                maxProducts: 100,
            };
        case 'zara.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 2,
                rateLimitMs: 1200,
                // not used
                maxProducts: 100,
            };
        case 'hm.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 2,
                rateLimitMs: 1200,
                // not used
                maxProducts: 100,
            };
        case 'ajio.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 2,
                rateLimitMs: 1200,
                // not used
                maxProducts: 100,
            };
        case 'myntra.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 2,
                rateLimitMs: 1200,
                // not used
                maxProducts: 100,
            };
        default:
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: () => true,
                maxDepth: 2,
                rateLimitMs: 1000,
                // not used
                maxProducts: 10000,
            };
    }
}
