'use client';
import { GameRecordMap, GAME_RESULTS, Member } from '@/common/data';
import { GameDataAction, GAME_ACTION_TYPE } from './gameDataReducer';

type Props = {
  record: GameRecordMap;
  restPlayers: Member[];
  gameCount: number;
  amount: number;
  dispatch: React.Dispatch<GameDataAction>;
};

export default function EditingTable({ record, restPlayers, gameCount, amount, dispatch }: Props) {
  const playerNames = [...record.keys()];

  const addPlayer = (targetPlayer: Member) => dispatch({ type: GAME_ACTION_TYPE.addPlayer, payload: { targetPlayer } });
  const deletePlayer = (targetPlayer: Member) => dispatch({ type: GAME_ACTION_TYPE.deletePlayer, payload: { targetPlayer } });
  const addGame = () => dispatch({ type: GAME_ACTION_TYPE.addGame });
  const deleteGame = (targetGame: number) => dispatch({ type: GAME_ACTION_TYPE.deleteGame, payload: { targetGame } });
  const updateGameResult = (targetPlayer: Member, targetGame: number) =>
    dispatch({ type: GAME_ACTION_TYPE.updateGameResult, payload: { targetPlayer, targetGame } });

  return (
    <div className='record-table'>
      <div className='record-column'>
        <div className='record-cell-button'>
          {restPlayers.length > 0 ? (
            <select
              className='bg-inherit text-center outline-none w-full h-full cursor-pointer'
              onChange={(e) => addPlayer(e.target.value as Member)}
            >
              <option>+ Player</option>
              {restPlayers.map((player) => (
                <option key={player} value={player}>
                  {player}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        {Array.from({ length: gameCount }, (_, gameNum) => (
          <div key={gameNum} onClick={() => deleteGame(gameNum)} className='record-cell-button'>
            {`- Game ${gameNum + 1}`}
          </div>
        ))}
        <div onClick={() => addGame()} className='record-cell-button'>
          + Game
        </div>
      </div>

      {playerNames.map((playerName, i) => (
        <div key={playerName} className='record-column'>
          <div onClick={() => deletePlayer(playerName)} className='record-cell-button'>
            {`${playerName} ❌`}
          </div>
          {record.get(playerName)!.gameResults.map((gameResult, gameNum) => (
            <div
              key={`${playerName}-${gameNum}`}
              onClick={() => updateGameResult(playerName, gameNum)}
              className={`record-cell-button ${gameResult === GAME_RESULTS.WIN ? 'text-blue-700' : 'text-red-600'}`}
            >
              {gameResult === GAME_RESULTS.NONE ? '' : GAME_RESULTS[gameResult]}
            </div>
          ))}
          <div className='record-cell'>{record.get(playerName)?.balance}</div>
        </div>
      ))}
    </div>
  );
}
