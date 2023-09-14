import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';


export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.className = document.body.className;
  }, []);
  return (
    // <main >
    <main>
      <Component {...pageProps} />
    </main>
  );
}
