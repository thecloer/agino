import type { NextApiRequest, NextApiResponse } from 'next';
import { totalRecord } from '@/models/record.model';
import { recordArrayToCSV } from '@/lib/csvFile';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = recordArrayToCSV(totalRecord.asArray);
  res.setHeader('Content-Type', 'text/csv');
  return res.end(file);
}
