import NodeCache from "node-cache";

// Default TTL = 2 minutes, check period every 60s
const cache = new NodeCache({ stdTTL: 120, checkperiod: 60 });

export default cache;
