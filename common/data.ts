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

const MemberSchema = z.enum(MEMBERS);
const GameResultNumberSchema = z.union([z.literal(0), z.literal(1), z.literal(2)]);
export type GameResultNumber = z.infer<typeof GameResultNumberSchema>;
const GameInfoSchema = z.object({
  gameResults: z.array(GameResultNumberSchema),
  balance: z.number(),
});
export const GameRecordMapSchema = z.map(MemberSchema, GameInfoSchema);
export type GameRecordMap = z.infer<typeof GameRecordMapSchema>;

export const GameRecordArrayRowSchema = z.tuple([MemberSchema, GameInfoSchema]);
export const GameRecordArraySchema = z.array(GameRecordArrayRowSchema);
export type GameRecordArray = [Member, z.infer<typeof GameInfoSchema>][];

export enum GAME_RESULTS {
  WIN,
  LOSE,
  NONE,
}
export const GAME_RESULTS_STRING = z.enum(['WIN', 'LOSE', 'NONE']).enum;
