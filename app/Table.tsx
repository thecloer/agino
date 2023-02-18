import { GameRecordMap, GAME_RESULTS } from '@/common/data';

type Props = {
  record: GameRecordMap;
};

export default function Table({ record }: Props) {
  const playerNames = [...record.keys()];
  const gameCount = record.get(playerNames[0])?.gameResults.length ?? 0;
  return (
    <div className='record-table bg-gradation'>
      <div className='record-column'>
        <div className='record-cell'></div>
        <div className='record-cell'>Total</div>
        {Array.from({ length: gameCount }, (_, gameNum) => (
          <div key={gameNum} className='record-cell'>
            {gameNum + 1}
          </div>
        ))}
      </div>

      {playerNames.map((playerName, i) => (
        <div key={playerName} className='record-column'>
          <div className='record-cell'>{playerName}</div>
          <div className='record-cell hover:cursor-default hover:bg-indigo-300'>{record.get(playerName)?.balance}</div>
          {record.get(playerName)!.gameResults.map((gameResult, gameNum) => (
            <div
              key={`${playerName}-${gameNum}`}
              className={`record-cell ${gameResult === GAME_RESULTS.WIN ? 'text-blue-700' : 'text-red-600'}`}
            >
              {gameResult === GAME_RESULTS.NONE ? '' : GAME_RESULTS[gameResult]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
