import { GetServerSideProps } from 'next';
import Header from '../components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';

// 通知一覧(エンジニア)
const fetcher = (
  resource: Request | URL,
  init: RequestInit | undefined
) => fetch(resource, init).then((res) => res.json());

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  // ログイン中のエンジニアのidを取得
  const cookies = req.cookies;
  const cookie = cookies.userId || null;
  console.log(cookie)

  return {
    props: {
      // requestData,
      cookie,
    },
  };
};

const NotificationEngineer =  (cookie: any | null) => {
  console.log(cookie);
  let userId = Number(cookie.cookie)
  console.log(userId)

  const { data, error } = useSWR(
    `http://localhost:8000/api/request/receive/${userId}`,
    fetcher
  );
  
  if (!data) {
    return <div>Loading...</div>; // データの取得中に表示
  }

  // console.log(response.data);
  console.log(data)

  // 新しい日付順で並び替える
  const sortRequest = [...data].sort((a, b) => {
    return (
      new Date(b.resultedAt).getTime() -
      new Date(a.resultedAt).getTime()
    );
  });

  // userIdをログインしているcookieIdと結びつける
  const filteredrequest = sortRequest.filter(
    (item: any) => item.userId === userId
  );

  if (!filteredrequest) {
    return <div>Loading...</div>; // データの取得中に表示
  }

  console.log(filteredrequest);

  // statusによって表示を変える
  const status = filteredrequest.map((item: any,index:number) =>
    item.status === 3 ? (
      <div key={index}>
        <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-b-2 border-r-2 border-l-2 border-black">
          <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md bg-gradient-to-b from-blue-400 border-2 border-white border-solid text-center">
            承認
          </h4>
          <div className="pt-3">{item.resultedAt}</div>
          <p className="pt-3">スキルの申請が承認されました</p>
        </div>
      </div>
    ) : item.status === 2 ? (
      <div key={index}>
        <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-b-r-l-2 border-b-2 border-r-2 border-l-2 border-black">
          <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md bg-gradient-to-t bg-red-500 from-red-200 border-2 border-white border-solid text-center">
            返却
          </h4>
          <div className="pt-3">{item.resultedAt}</div>
          <p className="pt-3">スペックシートの申請が返却されました</p>
        </div>

        <div className="bg-white text-xl py-5 px-8 border-b-2 border-r-2 border-l-2 border-black">
          <div className="pb-4">◆返却理由</div>
          <p className="text-base">{item.adminComment}</p>
          <div className="flex justify-end pt-8">
            <button className="text-base font-semibold text-white py-1 w-48 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid text-center">
              スキルシートを編集する
            </button>
          </div>
        </div>
      </div>
    ) : null
  );

  // 申請結果通知の件数を計算
  const approvedCount = filteredrequest.filter(
    (item: any) => item.status === 3
  ).length;
  const returnedCount = filteredrequest.filter(
    (item: any) => item.status === 2
  ).length;
  const totalCount = approvedCount + returnedCount;

  return (
    <>
      <Header />
      <div className="text-sky-900">
        <div className="ml-24 my-14 text-2xl flex">
          <div>申請結果通知&nbsp;&nbsp;&nbsp;</div>
          <div>{totalCount}</div>
          <div>件</div>
        </div>

        <div className="mx-48 border-t-2 border-black">{status}</div>

        <div className="mx-96 pt-20 pb-20 border-black rounded-md ">
          <div className="shadow-2xl"></div>
        </div>
      </div>
      <Footer />
    </>
  );
  
  
};

export default NotificationEngineer;
