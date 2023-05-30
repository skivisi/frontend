/* eslint-disable react-hooks/rules-of-hooks */
/*
① 動的ページ化
② モックオブジェクトをAPIにする(安田さん同期)
③ データがない場合の出しわけ
*/

'use client';
// import { useState } from 'react';
import '../globals.css';
import Skillview from '@/components/mypage/Skillview';
import Specview from '@/components/mypage/Specview';
import { useState } from 'react';

const page = () => {
  // タブの切り替え
  const selected =
    'w-32 bg-blue-700 text-white text-xl font-black border-x-4 border-t-4 border-blue-300 rounded-t-2xl px-5 py-3 transition-all';
  const unselected =
    'w-32 bg-blue-950 text-zinc-500 text-xl font-black border-x-4 border-t-4 border-zinc-500 rounded-t-2xl px-5 py-3 transition-all';

  const [pageState, setPageState] = useState<boolean>(true);
  const changePageState = (boolean: boolean) => {
    setPageState(boolean);
  };

  return (
    <div className="w-full">
      <p className="ml-20 mt-20">{data.userName}のプロフィール! ▼</p>

      {/* スイッチのボタン スペックシート切り替え */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => changePageState(true)}
          className="mr-20 px-8 bg-black text-white text-2xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-800 border-x-4 border-t-4 border-zinc-500 hover:scale-110 transition-all"
        >
          L
        </button>
        <div className="mr-5">
          <button
            onClick={() => changePageState(true)}
            className={pageState ? selected : unselected}
          >
            スペック
          </button>
        </div>
        <div className="ml-5">
          <button
            onClick={() => changePageState(false)}
            className={pageState ? unselected : selected}
          >
            スキル
          </button>
        </div>
        <button
          onClick={() => changePageState(false)}
          className="ml-20 px-8 bg-black text-white text-2xl rounded-tr-3xl rounded-tl-lg bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-800 border-x-4 border-t-4 border-zinc-500 hover:scale-110 transition-all"
        >
          R
        </button>
      </div>

      <section className="bg-blue-200 text-sky-900 max-w-4xl p-10 shadow-xl m-auto border-4 border-sky-800">
        {/* タブ切り替えの内容 */}
        {pageState ? (
          <Skillview data={data} />
        ) : (
          <Specview data={data} />
        )}
        <Specview data={data} />
      </section>
    </div>
  );
};

export default page;


// 仮データ
const data = {
  userId: 5,
  email: 'kagawa@gmail.com',
  employeeNumber: 4455,
  joinDate: '2022年7月',
  userName: '香川',
  affiliation: 'CL',
  businessSituation: false,
  password: '44556677',
  confirmPassword: '44556677',
  createdAt: '2023-05-23T07:46:53.577Z',
  updatedAt: '2023-05-23T07:46:53.577Z',
  skill: {
    InherentName: 'スキル',
    InherentDescription: 'スキルが高い',
    FR: 10,
    BK: 9,
    DB: 8,
    SBR: 7,
    AR: 3,
    TS: 2,
    COM: 1,
    abilities: [
      { property: '予知能力', value: 1 },
      { property: 'テックリード', value: 0 },
      { property: 'vim職人', value: 0 },
      { property: 'shell芸人', value: 1 },
      { property: '超ポジティブ', value: 0 },
      { property: '遅刻魔', value: 2 },
      { property: '気分屋', value: 0 },
      { property: '新人', value: 1 },
      { property: 'お喋り野郎', value: 3 },
      { property: 'ガヤ', value: 2 },
    ],
  },
  portfolio: [
    {
      github: 'url...',
    },
    {
      qiita: 'url...',
    },
  ],
  skillSummary: {
    os: ['Linux(CentOS)', 'macOS'],
    lang: [
      'JavaScript',
      'TypeScript',
      'SQL',
      'HTML',
      'CSS',
      'シェルスクリプト',
    ],
    flame: ['Next.js(13)', 'Jest'],
    lib: ['React(18)', 'jQuery'],
    tool: ['Git', 'Vim', 'PostgreSQL14', 'VisualStudioCode'],
    detail: [
      '詳細設計',
      '実装',
      'デバッグ',
      'テスト(ブラックボックステスト仕様書作成)',
    ],
  },
  sellingPoint: [
    {
      title: 'タイトル',
      content:
        'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
    },
    {
      title: 'タイトル',
      content:
        'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
    },
  ],
  offHours:
    'ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキスト\nダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト',
};
