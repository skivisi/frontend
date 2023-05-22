import { Noto_Sans_JP } from 'next/font/google';

const Noto_Sans_JP_normal = Noto_Sans_JP({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  preload: false,
});

export const metadata = {
  title: 'スペックシート編集',
  description: 'Generated by create next app',
};

export default function SpecSeatEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className={`${Noto_Sans_JP_normal.className} flex justify-center`}
      >
        {children}
      </main>
    </>
  );
}
