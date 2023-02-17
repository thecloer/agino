import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ pass: false, message: 'Method Not Allowed' });
  if (req.body !== process.env.PASSWORD) return res.status(401).json({ pass: false, message: 'Wrong Password.' });
  return res.status(200).json({ pass: true });
}
