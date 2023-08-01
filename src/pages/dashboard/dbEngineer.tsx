import { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Request } from '../../../types/types';

// エンジニアDB

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  // ログイン中のエンジニアのidを取得
  const cookies = req.cookies;
  const cookie = cookies.userId;

  const { data: requestData } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/request/receive/${cookie}`
  );

  return {
    props: {
      requestData,
    },
  };
};

const DbEngineer = ({ requestData }: { requestData: Request[] }) => {
  const [showTemplateButtons, setShowTemplateButtons] =
    useState(false);

  const handleTemplateButton = () => {
    setShowTemplateButtons(
      (showTemplateButtons) => !showTemplateButtons
    );
  };

  const request = requestData;
  console.log(request)

  // 申請結果通知の件数を計算
  const approvedCount = (request || []).filter(
    (item: Request) => item.status === 3
  ).length;
  const returnedCount = (request || []).filter(
    (item: Request) => item.status === 2
  ).length;
  const totalCount = approvedCount + returnedCount;

  return (
    <div>
      <Header />
      <section>
        <div className="flex lg:justify-between justify-center font-bold flex-wrap max-w-4xl m-auto mt-10 lg:mt-20">
          <div className="relative">
            <button className="w-80 py-4 mt-10 lg:mt-20 mx-10 text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all">
              <Link href="/notificationEngineer">申請結果通知</Link>
            </button>

            <div className="absolute rounded-full bg-blue-500 text-blue-50 py-1 px-3 text-2xl text-center lg:right-6 lg:top-16 right-6 top-8 cursor-pointer">
              <Link href="/notificationEngineer">{totalCount}</Link>
            </div>
          </div>

          <button className="w-80 py-4 mt-10 lg:mt-20 mx-10  text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all">
            <Link href="/mypage">マイページ</Link>
          </button>

          <div className="">
            <button
              className="w-80 py-4 mt-10 lg:mt-20 mx-10  text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all"
              onMouseEnter={handleTemplateButton}
              onMouseLeave={handleTemplateButton}
            >
              テンプレート閲覧
            </button>

            {showTemplateButtons && (
              <div
                className="absolute z-40 ml-1"
                onMouseEnter={handleTemplateButton}
                onMouseLeave={handleTemplateButton}
              >
                <button className="block ml-9 w-80 py-4 bg-slate-800 text-2xl text-center text-slate-100 border-2 border-slate-100 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-800">
                  <a href="#">FR</a>
                </button>
                <button className="block ml-9 w-80 py-4 bg-slate-800 text-2xl text-center text-slate-100 border-2 border-slate-100 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-800">
                  <a href="#">JAVA</a>
                </button>
                <button className="block ml-9 w-80 py-4 bg-slate-800 text-2xl text-center text-slate-100 border-2 border-slate-100 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-800">
                  <a href="#">QA</a>
                </button>
                <button className="block ml-9 w-80 py-4 bg-slate-800 text-2xl text-center text-slate-100 border-2 border-slate-100 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-800">
                  <a href="#">ML</a>
                </button>
                <button className="block ml-9 w-80 py-4 bg-slate-800 text-2xl text-center text-slate-100 border-2 border-slate-100 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-800">
                  <a href="#">CL</a>
                </button>
                <button className="block ml-9 w-80 py-4 bg-slate-800 text-2xl text-center text-slate-100 border-2 border-slate-100 hover:text-slate-800 hover:bg-slate-100 hover:border-slate-800">
                  <a href="#">PHP</a>
                </button>
              </div>
            )}
          </div>
          <button className="w-80 py-4 mt-10 lg:mt-20 mx-10  text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all">
            更新履歴
          </button>
        </div>
      </section>
      <div className="absolute w-full" style={{ bottom: '0%' }}>
        <Footer />
      </div>
    </div>
  );
};

export default DbEngineer;
