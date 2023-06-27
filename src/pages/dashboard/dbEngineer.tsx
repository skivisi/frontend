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
    `http://localhost:8000/api/request/receive/${cookie}`
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
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-center mt-48 relative ml-32">
          <div className="relative">
            <button className="bg-indigo-700 font-semibold text-white py-4 mx-96 my-8 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid">
              <Link href="/notificationEngineer">申請結果通知</Link>
            </button>
            <div
              className="absolute flex items-center justify-center ml-1 h-10 w-10 rounded-full bg-blue-500 text-white font-bold"
              style={{ top: '17%', right: '15%' }}
            >
              {totalCount}
            </div>
          </div>
          <button className="bg-indigo-700 font-semibold text-white py-4 mr-96 my-8 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid">
            マイページへ移動
          </button>
          <button
            className="font-semibold text-white py-4 ml-96 my-8 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid"
            onClick={handleTemplateButton}
            onMouseEnter={handleTemplateButton}
          >
            テンプレートを見る
          </button>
          {showTemplateButtons && (
            <>
              <button
                className="absolute bg-gray-600 font-semibold text-white py-4 ml-96 my-8 w-80 rounded border-2 border-white border-solid"
                style={{ top: '75%' }}
              >
                <a href="#">FR</a>
              </button>
              <button
                className="absolute bg-gray-600 font-semibold text-white py-4 ml-96 my-8 w-80 border-2 border-white border-solid"
                style={{ top: '96%' }}
              >
                <a href="#">JAVA</a>
              </button>
              <button
                className="absolute bg-gray-600 font-semibold text-white py-4 ml-96 my-8 w-80 border-2 border-white border-solid"
                style={{ top: '117%' }}
              >
                <a href="#">QA</a>
              </button>
              <button
                className="absolute bg-gray-600 font-semibold text-white py-4 ml-96 my-8 w-80 border-2 border-white border-solid"
                style={{ top: '138%' }}
              >
                <a href="#">ML</a>
              </button>
              <button
                className="absolute bg-gray-600 font-semibold text-white py-4 ml-96 my-8 w-80 border-2 border-white border-solid"
                style={{ top: '159%' }}
              >
                <a href="#">CL</a>
              </button>
              <button
                className="absolute bg-gray-600 font-semibold text-white py-4 ml-96 my-8 w-80 border-2 border-white border-solid"
                style={{ top: '180%' }}
              >
                <a href="#">PHP</a>
              </button>
            </>
          )}
          <button className="bg-indigo-700 font-semibold text-white mr-96 my-8 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid">
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
