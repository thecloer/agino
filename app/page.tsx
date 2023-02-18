import { getRecord } from '@/lib/fetcher';
import Link from 'next/link';

import Table from './Table';

export default async function Home() {
  const record = await getRecord();

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center py-8'>
        <section>
          <Table record={record} />
          <div className='flex justify-end'>
            <Link href='/files/record.csv' className='mt-8'>
              <button className='text-lg bg-indigo-600 px-4 py-1 text-white rounded-md'>Save</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
