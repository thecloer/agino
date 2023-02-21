import { GameRecordMap, GAME_RESULTS, Member } from '@/common/data';

const billCalculator = (record: GameRecordMap, amount: number) => {
  const result: Map<Member, { receiver: Member; amount: number }[]> = new Map();
  const others = new Set(record.keys());
  record.forEach(({ gameResults: playerScore }, player) => {
    others.delete(player);
    others.forEach((opponent) => {
      const opponentScore = record.get(opponent)!.gameResults;
      const playerVsOpponent = playerScore.reduce((acc, score, game) => {
        if (score === opponentScore[game] || score === GAME_RESULTS.NONE || opponentScore[game] === GAME_RESULTS.NONE) return acc;
        return score === GAME_RESULTS.WIN ? acc + 1 : acc - 1;
      }, 0 as number);
      if (playerVsOpponent === 0) return;

      const sign = playerVsOpponent > 0 ? 1 : -1;
      const sender = playerVsOpponent > 0 ? opponent : player;
      const receiver = playerVsOpponent > 0 ? player : opponent;
      result.set(sender, [...(result.get(sender) || []), { receiver, amount: sign * amount * playerVsOpponent }]);
    });
  });

  return result;
};

export default billCalculator;
