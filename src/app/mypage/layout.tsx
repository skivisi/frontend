export const metadata = {
  title: 'マイページ',
  description: 'マイページです',
};

export default function SpecSeatEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className={`flex justify-center`}>{children}</main>
    </>
  );
}
