import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowedOrigins = ['darnaor.com', 'localhost', 'vercel.app'];
  const isAllowed = allowedOrigins.some(o => origin.includes(o));

  const imageId = req.query.id || '';

  if (!imageId || !/^[a-z]_\d+_\d+$/.test(imageId)) {
    res.status(400).json({ error: 'Invalid image ID' });
    return;
  }

  try {
    const imagePath = path.join(process.cwd(), 'fitness-quiz', 'images', `${imageId}.png`);
    const imageBuffer = fs.readFileSync(imagePath);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.setHeader('Access-Control-Allow-Origin', isAllowed ? origin : '*');
    res.status(200).send(imageBuffer);
  } catch (e) {
    res.status(404).json({ error: 'Image not found' });
  }
}
