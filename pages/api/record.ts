import type { NextApiRequest, NextApiResponse } from 'next';
import { GameRecordArraySchema } from '@/common/data';
import { totalRecord } from '@/models/record.model';

const getRecord = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json(totalRecord.asArray);
};

const addRecord = (req: NextApiRequest, res: NextApiResponse) => {
  const safeParsedBody = GameRecordArraySchema.safeParse(req.body);
  if (!safeParsedBody.success) return res.status(400).json({ success: false, message: safeParsedBody.error });

  const newRecord = safeParsedBody.data;
  totalRecord.addRecord(newRecord);

  return res.status(200).json({ success: true, message: 'Record added' });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return getRecord(req, res);
  else if (req.method === 'POST') return addRecord(req, res);
}
