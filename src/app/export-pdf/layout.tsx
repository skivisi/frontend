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
      <main className="flex justify-center">{children}</main>
    </>
  );
}
