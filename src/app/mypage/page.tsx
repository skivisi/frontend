'use client';

// import { useState } from 'react';
import '../globals.css';
import Skillview from '@/components/mypage/Skillview';
import Specview from '@/components/mypage/Specview';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { userFetch } from './_lib/userFetch';


const Page = () => {
  // URLのクエリパラメータから取得したuserIdを保持するステート
  const [userId, setUserId] = useState<string | null>(null);
  // コンポーネントのマウント時、またはURLが変更された時にuserIdを更新する
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const uid = searchParams.get('userId');
    setUserId(uid);
  }, []);
  // userIdが存在する場合は数値に変換、存在しない場合は0をデフォルトとして設定
  let argId = userId ? Number(userId) : 0;
  // userIdの有無に応じてAPIからユーザデータを取得
  let userData = userId
    ? userFetch(true, argId)
    : userFetch(false, 0);

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
      {/* スイッチのボタン スペックシート切り替え */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => changePageState(true)}
          className="mr-20 px-8 bg-black text-white text-2xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-800 border-x-4 border-t-4 border-zinc-500 hover:scale-110 transform transition-transform duration-100 z-20 relative"
          style={{ transition: 'all 0.2s' }}
        >
          L
        </button>
        <div className="mr-5">
          <button
            onClick={() => changePageState(true)}
            className={pageState ? selected : unselected}
          >
            スキル
          </button>
        </div>
        <div className="ml-5">
          <button
            onClick={() => changePageState(false)}
            className={pageState ? unselected : selected}
          >
            スペック
          </button>
        </div>
        <button
          onClick={() => changePageState(false)}
          className="ml-20 px-8 bg-black text-white text-2xl rounded-tr-3xl rounded-tl-lg bg-gradient-to-b from-zinc-800 via-zinc-500 to-zinc-800 border-x-4 border-t-4 border-zinc-500 hover:scale-110 transform transition-transform duration-100 z-20 relative"
          style={{ transition: 'all 0.2s' }}
        >
          R
        </button>
      </div>
      <style jsx>{`
        button:active {
          transform: translateY(10px);
        }
      `}</style>

      <section className="bg-blue-200 text-sky-900 max-w-4xl p-10 shadow-xl m-auto border-4 border-sky-800 z-30 relative">
        <div className="flex">
          <h2 className="text-3xl font-bold mb-5 drop-shadow-white">
            {pageState ? 'スキルシート' : 'スペックシート'}
          </h2>
          <div className="text-center">
            {userId ? (
              <a>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="shadow-md h-12 ml-2 relative bottom-2 cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid transition-all"
                >
                  <span className="text-white font-bold m-5 text-lg">
                    一覧に戻る
                  </span>
                </button>
              </a>
            ) : (
              <Link href={pageState ? '/skilledit' : '/specseat'}>
                <button
                  type="button"
                  className="shadow-md h-12 ml-2 relative bottom-2 cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid transition-all"
                >
                  <span className="text-white font-bold m-5 text-lg">
                    編集
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* タブ切り替えの内容 */}
        {pageState ? (
          <Skillview userData={userData} />
        ) : (
          <Specview userData={userData} />
        )}
      </section>
    </div>
  );
};

export default Page;
