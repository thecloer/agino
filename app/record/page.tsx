'use client';
import { MEMBERS } from '@/common/data';
import { auth, uploadRecord } from '@/lib/fetcher';
import { useReducer } from 'react';
import { gameDataReducer } from './gameDataReducer';
import RecordTable from './RecordTable';

export default function Record() {
  const [{ players, restPlayers, gameCount, amount }, dispatch] = useReducer(gameDataReducer, {
    players: new Map(),
    restPlayers: [...MEMBERS],
    gameCount: 1,
    amount: 1000,
  });

  const uploadNewRecord = async () => {
    const input = prompt('Password?') ?? '';
    const res = await auth(input);
    if (!res.pass) return alert(res.message);
    uploadRecord([...players.entries()]);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center pt-8'>
        <RecordTable players={players} restPlayers={restPlayers} gameCount={gameCount} amount={amount} dispatch={dispatch} />
        <button className='mt-8 text-lg bg-indigo-600 px-4 py-1 text-white rounded-md' onClick={uploadNewRecord}>
          Save
        </button>
      </div>
    </div>
  );
}
