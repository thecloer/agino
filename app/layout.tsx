import './globals.css';
import Header from './Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko'>
      <head />
      <body className='bg-indigo-300 min-h-screen grid grid-rows-[5rem_1fr]'>
        <Header />
        <main className='mx-auto container p-4 grow'>{children}</main>
      </body>
    </html>
  );
}
