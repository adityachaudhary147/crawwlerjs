import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, retries = 3, baseDelay = 2000) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url, {
        timeout: 20000,
        headers,
      });
      return response;
    } catch (e) {
      const status = e.response?.status;
      const retryAfter = parseInt(e.response?.headers['retry-after']) || null;

      if ([429, 402, 406].includes(status)) {
        const backoff = retryAfter
          ? retryAfter * 1000
          : baseDelay * (Math.pow(2, attempt) + Math.random());

        console.warn(`[WARN] ${status} at ${url}. Retrying in ${Math.round(backoff)} ms`);
        await delay(backoff);
      } else {
        console.error(`[ERROR Axios] ${url} - ${e.message}`);
        return null;
      }
    }
  }

  console.error(`[FAIL] Giving up on ${url} after ${retries + 1} attempts.`);
  return null;
}

export default fetchWithRetry;
