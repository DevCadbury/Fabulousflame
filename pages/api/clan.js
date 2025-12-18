// Server-side API route: proxies clan data using clashofclans.js client (server-only)
const { fetchClan } = require('../../lib/coc')

export default async function handler(req, res) {
  const { tag } = req.query
  if (!tag) return res.status(400).json({ error: 'tag is required' })
  
  // Add cache control headers
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  
  try {
    const clan = await fetchClan(tag)
    res.status(200).json(clan)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch clan' })
  }
}
