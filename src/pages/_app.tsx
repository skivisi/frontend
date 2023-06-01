import Header from '@/components/header';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_JP, Kosugi_Maru } from 'next/font/google';
import Footer from '@/components/footer';


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
  return (
    // <main >
    <main className={`${kosugi.variable} ${noto.variable} font-noto`}>
      <Component {...pageProps} />
    </main>
  );
}
