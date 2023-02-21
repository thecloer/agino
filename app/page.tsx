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
          <div className='flex justify-end mt-8'>
            <Link href='/files/record.csv'>
              <button className='btn'>Download</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
