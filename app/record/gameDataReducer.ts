import { GameRecordType, Member, MEMBERS } from '@/common/data';
import { z } from 'zod';

const DEFAULT_GAME_RESULT = 0;
export const GAME_RESULT_TYPE = ['win', 'lose', '-'] as const;

export const GAME_ACTION_TYPE = z.enum([
  'addPlayer',
  'deletePlayer',
  'addGame',
  'deleteGame',
  'updateGameResult',
  'updateAmount',
]).enum;

export type GameDataState = {
  players: GameRecordType;
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
      type: typeof GAME_ACTION_TYPE.updateAmount;
      payload: { amount: number };
    };

export const gameDataReducer = (state: GameDataState, action: GameDataAction) => {
  let { amount, gameCount, restPlayers } = state;
  const players = new Map(state.players);

  switch (action.type) {
    case GAME_ACTION_TYPE.addPlayer:
      if (players.has(action.payload.targetPlayer)) return state;
      players.set(action.payload.targetPlayer, {
        gameResults: Array.from({ length: gameCount }, () => DEFAULT_GAME_RESULT),
        balance: 0,
      });
      break;
    case GAME_ACTION_TYPE.deletePlayer:
      if (!players.delete(action.payload.targetPlayer)) return state;
      break;
    case GAME_ACTION_TYPE.addGame:
      players.forEach(({ balance }, player) =>
        players.set(player, {
          balance,
          gameResults: [...players.get(player)!.gameResults, DEFAULT_GAME_RESULT],
        })
      );
      gameCount++;
      break;
    case GAME_ACTION_TYPE.deleteGame:
      players.forEach(({ balance }, player) =>
        players.set(player, {
          balance,
          gameResults: players.get(player)!.gameResults.filter((_, game) => game !== action.payload.targetGame),
        })
      );

      gameCount--;
      break;
    case GAME_ACTION_TYPE.updateGameResult:
      const { targetPlayer, targetGame } = action.payload;
      if (!players.has(targetPlayer)) throw new Error(`reduce updateGameResult Error: targetPlayer ${targetPlayer} is not exist`);
      players.get(targetPlayer)!.gameResults[targetGame] = ((players.get(targetPlayer)!.gameResults[targetGame] + 1) % 3) as
        | 0
        | 1
        | 2;
      break;
    case GAME_ACTION_TYPE.updateAmount:
      amount = action.payload.amount;
      break;

    default:
      throw new Error('reducer type Error');
  }

  const games: { winners: Member[]; losers: Member[] }[] = Array.from({ length: gameCount }, () => ({ winners: [], losers: [] }));
  for (const [player, { gameResults }] of players) {
    gameResults.forEach((result, gameNum) => {
      if (GAME_RESULT_TYPE.at(result) !== '-')
        games[gameNum][GAME_RESULT_TYPE.at(result) === 'win' ? 'winners' : 'losers'].push(player);
    });
  }
  players.forEach((memberInfo) => (memberInfo.balance = 0));
  games.forEach((game) => {
    if (game.winners.length && game.losers.length) {
      game.losers.forEach((loser) => (players.get(loser)!.balance -= amount * game.winners.length));
      game.winners.forEach((winner) => (players.get(winner)!.balance += amount * game.losers.length));
    }
  });

  return {
    amount,
    gameCount,
    players,
    restPlayers: MEMBERS.filter((member) => !players.has(member)),
  };
};
