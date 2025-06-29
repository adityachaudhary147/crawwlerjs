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
                maxDepth: 6,
                rateLimitMs: 1000,
                maxProducts: 10000,
            };

        case 'tatacliq.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 6,
                rateLimitMs: 1500,
                // not used
                maxProducts: 10000,
            };

        case 'nykaafashion.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 6,
                rateLimitMs: 1200,
                maxProducts: 10000,
            };
        case 'zara.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 6,
                rateLimitMs: 1200,
                // not used
                maxProducts: 10000,
            };
        case 'www2.hm.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 6,
                rateLimitMs: 1200,
                // not used
                maxProducts: 10000,
            };
        case 'ajio.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 6,
                rateLimitMs: 1200,
                maxProducts: 10000,
            };
        case 'myntra.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 6,
                rateLimitMs: 1200,
                // not used
                maxProducts: 10000,
            };
        case 'westside.com':
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: (url) => true,
                maxDepth: 6,
                rateLimitMs: 1200,
                // not used
                maxProducts: 100,
            };

        default:
            return {
                include: [/.*/],
                exclude: [/terms/, /condition/, /policy/, /career/],
                match: () => true,
                maxDepth: 6,
                rateLimitMs: 1000,
                // not used
                maxProducts: 10000,
            };
    }
}
