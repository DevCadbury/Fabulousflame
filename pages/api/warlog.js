// Server-side API route: proxies war log data
const { fetchWarLog } = require('../../lib/coc')

export default async function handler(req, res) {
  const { tag } = req.query
  if (!tag) return res.status(400).json({ error: 'tag is required' })
  try {
    const warLog = await fetchWarLog(tag)
    res.status(200).json(warLog)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'failed to fetch war log' })
  }
}
