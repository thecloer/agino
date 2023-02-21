'use client';

import { auth, uploadRecord } from '@/lib/fetcher';
import { useReducer, useState } from 'react';
import { gameDataInitializer, gameDataReducer } from './gameDataReducer';
import EditingTable from './EditingTable';
import Table from '../Table';
import Bill from './Bill';
import SectionTitle from './SectionTitle';

const AMOUNT = 1000; // TODO: make it configurable

export default function Record() {
  const [isRecording, setIsRecording] = useState(true);
  const [{ record, restPlayers, gameCount, amount }, dispatch] = useReducer(
    gameDataReducer,
    { amount: AMOUNT },
    gameDataInitializer
  );

  const uploadNewRecord = async () => {
    const input = prompt('Password?') ?? '';
    const res = await auth(input);
    if (!res.pass) return alert(res.message);
    uploadRecord([...record.entries()]).then((res) => console.log(res));
    setIsRecording(false);
  };
  const reset = () => {
    dispatch({ type: 'reset', payload: { amount: AMOUNT } });
    setIsRecording(true);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center py-8'>
        {isRecording ? (
          <EditingTable record={record} restPlayers={restPlayers} gameCount={gameCount} amount={amount} dispatch={dispatch} />
        ) : (
          <>
            <SectionTitle title='정산' />
            <Bill record={record} amount={amount} />
            <SectionTitle title='결과' className='mt-10' />
            <Table record={record} />
          </>
        )}
        <div className='flex justify-end mt-8'>
          <button className='btn' onClick={isRecording ? uploadNewRecord : reset}>
            {isRecording ? 'Save' : 'Reset'}
          </button>
        </div>
      </div>
    </div>
  );
}
