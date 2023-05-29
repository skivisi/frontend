import Footer from '@/components/footer';
import Header from '@/components/header';
import { Noto_Sans_JP } from 'next/font/google';

const Noto_Sans_JP_normal = Noto_Sans_JP({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  preload: false,
});

export const metadata = {
  title: 'PDF出力',
  description: 'スペックシートをPDFとして出力します',
};

export default function SpecSeatEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        className={`${Noto_Sans_JP_normal.className} flex justify-center`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
