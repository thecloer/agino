import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { totalRecord } from '@/models/record.model';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const stringified = readFileSync(totalRecord.RECORD_PATH, 'utf8');

  res.setHeader('Content-Type', 'text/csv');
  return res.end(stringified);
}
