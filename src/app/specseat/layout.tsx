import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google';

const noto = Noto_Sans_JP({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  preload: false,
  variable: '--font-noto',
});
const maru = Zen_Maru_Gothic({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
  preload: false,
  variable: '--font-maru',
});

export const metadata = {
  title: 'スペックシート編集',
  description: 'スペックシートの編集画面です',
};

export default function SpecSeatEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className={`${noto.variable} ${maru.variable} flex justify-center`}
      >
        {children}
      </main>
    </>
  );
}
