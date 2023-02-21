import { GameRecordArray, GameRecordMapSchema } from '@/common/data';

export const URL = process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://agino.vercel.app';
export const auth = (password: string) =>
  fetch(`${URL}/api/auth`, {
    method: 'POST',
    body: password,
  }).then((res) => res.json());

export const uploadRecord = (data: GameRecordArray) =>
  fetch(`${URL}/api/record`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

export const getRecord = () =>
  fetch(`${URL}/api/record`, { cache: 'no-store' })
    .then((res) => res.json())
    .then((recordArray) => GameRecordMapSchema.parse(new Map(recordArray)))
    .catch((err) => (console.error(err), GameRecordMapSchema.parse(new Map())));
