export const metadata = {
  title: 'スキル編集ページ',
  description: 'スキル編集ページです',
};

export default function SkillEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={` flex justify-center bg-gradient-to-b from-teal-50 to-teal-100`}
    >
      {children}
    </main>
  );
}
