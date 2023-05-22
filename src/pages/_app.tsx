import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_JP } from 'next/font/google';

const Noto_Sans_JP_normal = Noto_Sans_JP({
  weight: '400',
  display: 'swap',
  preload: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={Noto_Sans_JP_normal.className}>
      <Component {...pageProps} />
    </main>
  );
}
