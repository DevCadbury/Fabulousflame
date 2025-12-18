// Server-side API route: fetch player data
const { fetchPlayer } = require('../../lib/coc')

export default async function handler(req, res) {
  const { tag } = req.query
  if (!tag) return res.status(400).json({ error: 'tag is required' })  
  // Add cache control headers
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    try {
    const player = await fetchPlayer(tag)
    res.status(200).json(player)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch player' })
  }
}
