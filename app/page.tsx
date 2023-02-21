'use client';
import { URL, getRecord } from '@/lib/fetcher';
import { use } from 'react';
import Table from './Table';

export default function Home() {
  const record = use(getRecord());

  const onDownloadClick = () => {
    const aTag = document.createElement('a');
    aTag.href = `${URL}/files/record.csv`;
    aTag.setAttribute('download', 'record.csv');
    aTag.click();
    aTag.remove();
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center py-8'>
        <section>
          <Table record={record} />
          <div className='flex justify-end mt-8'>
            <button className='btn' onClick={onDownloadClick}>
              Download
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
