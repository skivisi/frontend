import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_JP, Kosugi_Maru } from 'next/font/google';
import { useEffect } from 'react';

const noto = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
});
const kosugi = Kosugi_Maru({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-kosugi',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.className = document.body.className;
  }, []);
  return (
    // <main >
    <main className={`${kosugi.variable} ${noto.variable} font-noto`}>
      <Component {...pageProps} />
    </main>
  );
}
