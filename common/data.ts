import { z } from 'zod';

export const MEMBERS = [
  '강지훈',
  '김철우',
  '김한주',
  '박종현',
  '양우석',
  '이상우',
  '이황희',
  '전상범',
  '최민규',
  '최혁진',
  '최석규',
  '홍시형',
] as const;
export type Member = typeof MEMBERS[number];

export const GameRecordSchema = z.map(
  z.enum(MEMBERS),
  z.object({ gameResults: z.array(z.union([z.literal(0), z.literal(1), z.literal(2)])), balance: z.number() })
);
export type GameRecordType = z.infer<typeof GameRecordSchema>;
