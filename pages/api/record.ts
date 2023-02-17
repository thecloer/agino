import type { NextApiRequest, NextApiResponse } from 'next';
import { GameRecordSchema } from '@/common/data';
// import { totalRecord } from '@/models/record.model';

const addRecord = (req: NextApiRequest, res: NextApiResponse) => {
  const safeParsedBody = GameRecordSchema.safeParse(new Map(req.body));
  if (safeParsedBody.success === false) return res.status(400).json({ error: safeParsedBody.error });

  const newRecord = safeParsedBody.data;
  // totalRecord.addRecord(newRecord);

  return res.status(200).json({});
};
const uploadRecord = (req: NextApiRequest, res: NextApiResponse) => {};
const getRecord = (req: NextApiRequest, res: NextApiResponse) => {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return getRecord(req, res);
  else if (req.method === 'POST') return addRecord(req, res);
  else if (req.method === 'PUT') return uploadRecord(req, res);
}
