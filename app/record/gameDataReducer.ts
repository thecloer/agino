import { GameRecordMap, GameResultNumber, GAME_RESULTS, Member, MEMBERS, GAME_RESULTS_STRING } from '@/common/data';
import { z } from 'zod';

export const GAME_ACTION_TYPE = z.enum([
  'addPlayer',
  'deletePlayer',
  'addGame',
  'deleteGame',
  'updateGameResult',
  'updateAmount',
  'reset',
]).enum;

export type GameDataState = {
  record: GameRecordMap;
  restPlayers: Member[];
  gameCount: number;
  amount: number;
};
export type GameDataAction =
  | {
      type: typeof GAME_ACTION_TYPE.addPlayer | typeof GAME_ACTION_TYPE.deletePlayer;
      payload: { targetPlayer: Member };
    }
  | {
      type: typeof GAME_ACTION_TYPE.addGame;
    }
  | {
      type: typeof GAME_ACTION_TYPE.deleteGame;
      payload: { targetGame: number };
    }
  | {
      type: typeof GAME_ACTION_TYPE.updateGameResult;
      payload: {
        targetPlayer: Member;
        targetGame: number;
      };
    }
  | {
      type: typeof GAME_ACTION_TYPE.updateAmount | typeof GAME_ACTION_TYPE.reset;
      payload: { amount: number };
    };

export const gameDataInitializer = ({ amount }: { amount: number }) => ({
  record: new Map(),
  restPlayers: [...MEMBERS],
  gameCount: 0,
  amount,
});

export const gameDataReducer = (state: GameDataState, action: GameDataAction) => {
  let { amount, gameCount, restPlayers } = state;
  const record = new Map(state.record);

  switch (action.type) {
    case GAME_ACTION_TYPE.addPlayer:
      if (record.has(action.payload.targetPlayer)) return state;
      record.set(action.payload.targetPlayer, {
        gameResults: Array.from({ length: gameCount }, () => GAME_RESULTS.NONE),
        balance: 0,
      });
      break;
    case GAME_ACTION_TYPE.deletePlayer:
      if (!record.delete(action.payload.targetPlayer)) return state;
      break;
    case GAME_ACTION_TYPE.addGame:
      record.forEach(({ balance }, player) =>
        record.set(player, {
          balance,
          gameResults: [...record.get(player)!.gameResults, GAME_RESULTS.WIN],
        })
      );
      gameCount++;
      break;
    case GAME_ACTION_TYPE.deleteGame:
      record.forEach(({ balance }, player) =>
        record.set(player, {
          balance,
          gameResults: record.get(player)!.gameResults.filter((_, game) => game !== action.payload.targetGame),
        })
      );

      gameCount--;
      break;
    case GAME_ACTION_TYPE.updateGameResult:
      const { targetPlayer, targetGame } = action.payload;
      if (!record.has(targetPlayer)) throw new Error(`reduce updateGameResult Error: targetPlayer ${targetPlayer} is not exist`);
      record.get(targetPlayer)!.gameResults[targetGame] = ((record.get(targetPlayer)!.gameResults[targetGame] + 1) %
        3) as GameResultNumber;
      break;
    case GAME_ACTION_TYPE.updateAmount:
      amount = action.payload.amount;
      break;
    case GAME_ACTION_TYPE.reset:
      return gameDataInitializer({ amount: action.payload.amount });

    default:
      throw new Error('reducer type Error');
  }

  const games: { winners: Member[]; losers: Member[] }[] = Array.from({ length: gameCount }, () => ({ winners: [], losers: [] }));
  for (const [player, { gameResults }] of record) {
    gameResults.forEach((result, gameNum) => {
      if (GAME_RESULTS[result] !== GAME_RESULTS_STRING.NONE)
        games[gameNum][GAME_RESULTS[result] === GAME_RESULTS_STRING.WIN ? 'winners' : 'losers'].push(player);
    });
  }
  record.forEach((memberInfo) => (memberInfo.balance = 0));
  games.forEach((game) => {
    if (game.winners.length && game.losers.length) {
      game.losers.forEach((loser) => (record.get(loser)!.balance -= amount * game.winners.length));
      game.winners.forEach((winner) => (record.get(winner)!.balance += amount * game.losers.length));
    }
  });

  return {
    amount,
    gameCount,
    record,
    restPlayers: MEMBERS.filter((member) => !record.has(member)),
  };
};
