import cache from "../lib/cache.js";

/**
 * Express middleware that caches GET responses.
 * @param {number} ttl - Time-to-live in seconds (default = global default = 120s)
 */
export const cacheMiddleware = (ttl) => (req, res, next) => {
  // Only cache GET requests
  if (req.method !== "GET") return next();

  // Build a unique key from URL + query string
  const key = `${req.originalUrl}`;

  const cached = cache.get(key);
  if (cached !== undefined) {
    console.log(`[Cache] HIT — ${key}`);
    return res.json(cached);
  }

  // Monkey-patch res.json so we can intercept and store the response
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (res.statusCode === 200) {
      cache.set(key, data, ttl ?? cache.options.stdTTL);
      console.log(`[Cache] MISS (stored) — ${key}`);
    }
    return originalJson(data);
  };

  next();
};
