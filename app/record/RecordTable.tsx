'use client';
import { GameRecordType, Member } from '@/common/data';
import { GameDataAction, GAME_ACTION_TYPE, GAME_RESULT_TYPE } from './gameDataReducer';

type Props = {
  players: GameRecordType;
  restPlayers: Member[];
  gameCount: number;
  amount: number;
  dispatch: React.Dispatch<GameDataAction>;
};

export default function RecordTable({ players, restPlayers, gameCount, amount, dispatch }: Props) {
  const playerNames = [...players.keys()];

  const addPlayer = (targetPlayer: Member) => dispatch({ type: GAME_ACTION_TYPE.addPlayer, payload: { targetPlayer } });
  const deletePlayer = (targetPlayer: Member) => dispatch({ type: GAME_ACTION_TYPE.deletePlayer, payload: { targetPlayer } });
  const addGame = () => dispatch({ type: GAME_ACTION_TYPE.addGame });
  const deleteGame = (targetGame: number) => dispatch({ type: GAME_ACTION_TYPE.deleteGame, payload: { targetGame } });
  const updateGameResult = (targetPlayer: Member, targetGame: number) =>
    dispatch({ type: GAME_ACTION_TYPE.updateGameResult, payload: { targetPlayer, targetGame } });

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>
            {restPlayers.length > 0 ? (
              <select className='bg-inherit text-center ' onChange={(e) => addPlayer(e.target.value as Member)}>
                <option>+ Player</option>
                {restPlayers.map((player) => (
                  <option key={player} value={player}>
                    {player}
                  </option>
                ))}
              </select>
            ) : null}
          </th>
          {playerNames.map((player) => (
            <th key={player}>
              <button onClick={() => deletePlayer(player)}>{`${player} ❌`}</button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: gameCount }, (_, gameNum) => (
          <tr key={`game${gameNum}`}>
            <td>
              <button onClick={() => deleteGame(gameNum)}>{`- Game ${gameNum + 1}`}</button>
            </td>
            {playerNames.map((playerName) => (
              <td key={`game${gameNum}-${playerName}`}>
                <button onClick={() => updateGameResult(playerName, gameNum)}>
                  {GAME_RESULT_TYPE[players.get(playerName)!.gameResults[gameNum]]}
                </button>
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td>
            <button onClick={() => addGame()}>+ Game</button>
          </td>
          {playerNames.map((playerName, i) => (
            <td key={i}>{players.get(playerName)?.balance}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
