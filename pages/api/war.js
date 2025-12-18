// Server-side API route: fetch current war data
const { fetchCurrentWar } = require('../../lib/coc')

export default async function handler(req, res) {
  const { tag } = req.query
  if (!tag) return res.status(400).json({ error: 'tag is required' })  
  // Add cache control headers
  res.setHeader('Cache-Control', 'public, s-maxage=180, stale-while-revalidate=360');
    try {
    const war = await fetchCurrentWar(tag)
    res.status(200).json(war)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch war' })
  }
}
