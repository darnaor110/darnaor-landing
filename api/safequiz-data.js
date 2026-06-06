export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).json({ status: 'ok', message: 'SafeQuiz API ready', timestamp: Date.now() });
}
