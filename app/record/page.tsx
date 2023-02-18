'use client';
import { MEMBERS } from '@/common/data';
import { auth, uploadRecord } from '@/lib/fetcher';
import { useReducer } from 'react';
import { gameDataReducer } from './gameDataReducer';
import EditingTable from './EditingTable';

export default function Record() {
  const [{ record, restPlayers, gameCount, amount }, dispatch] = useReducer(gameDataReducer, {
    record: new Map(),
    restPlayers: [...MEMBERS],
    gameCount: 0,
    amount: 1000,
  });

  const uploadNewRecord = async () => {
    const input = prompt('Password?') ?? '';
    const res = await auth(input);
    if (!res.pass) return alert(res.message);
    uploadRecord([...record.entries()]).then((res) => console.log(res));
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center py-8'>
        <EditingTable record={record} restPlayers={restPlayers} gameCount={gameCount} amount={amount} dispatch={dispatch} />
        <button
          className='mt-8 text-lg bg-indigo-600 px-4 py-1 text-white rounded-md hover:bg-indigo-500 transition-colors duration-200'
          onClick={uploadNewRecord}
        >
          Save
        </button>
      </div>
    </div>
  );
}
