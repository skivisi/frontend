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
      <main className="flex justify-center">{children}</main>
    </>
  );
}
