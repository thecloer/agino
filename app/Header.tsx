import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-indigo-400 shadow-sm'>
      <div className='container mx-auto h-full flex justify-between items-center text-white'>
        <Link href='/' className='text-3xl font-bold tracking-wide p-4'>
          Agino
        </Link>

        <div className='font-semibold'>
          <Link href='/' className='p-4'>
            통계
          </Link>
          <Link href='/record' className='p-4'>
            기록
          </Link>
        </div>
      </div>
    </header>
  );
}
