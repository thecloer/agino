import { GameRecordArray, GameRecordMapSchema } from '@/common/data';

const API_URL = process.env.API_URL || 'http://localhost:3000/api';
export const auth = (password: string) =>
  fetch(`${API_URL}/auth`, {
    method: 'POST',
    body: password,
  }).then((res) => res.json());

export const uploadRecord = (data: GameRecordArray) =>
  fetch(`${API_URL}/record`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

export const getRecord = () =>
  fetch(`${API_URL}/record`, { cache: 'no-store' })
    .then((res) => res.json())
    .then((recordArray) => GameRecordMapSchema.parse(new Map(recordArray)))
    .catch((err) => (console.error(err), GameRecordMapSchema.parse(new Map())));
