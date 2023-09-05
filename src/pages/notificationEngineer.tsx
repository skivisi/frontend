import { GetServerSideProps } from 'next';
import Header from '../components/header';
import Footer from '@/components/footer';
import axios from 'axios';
import useSWR from 'swr';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { User, Request } from '../../types/types';
import Link from 'next/link';

// 通知一覧(エンジニア)

const fetcher = (url: RequestInfo) =>
  fetch(url).then((res) => res.json());

const toJST = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).format(date);
};

const NotificationEngineer = () => {
  const getCookie = (name: string) => {
    return Cookies.get(name);
  };
  const cookie = getCookie('userId');
  let userId = Number(cookie);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/request/receive/${userId}`,
    fetcher
  );

  if (!data) {
    return (
      <>
        <Header />
        <div className="ml-24 mt-10 text-2xl text-sky-900 font-bold">
          通知はないよ！
        </div>
        <div className="absolute w-full" style={{ bottom: '0%' }}>
          <Footer />
        </div>
      </>
    );
  }

  // 新しい日付順で並び替える
  const sortRequest = [...data].sort((a, b) => {
    return (
      new Date(b.resultedAt).getTime() -
      new Date(a.resultedAt).getTime()
    );
  });

  // userIdをログインしているcookieIdと結びつける
  const filteredrequest = sortRequest.filter(
    (item: User) => item.userId === userId
  );

  if (!filteredrequest) {
    return <div>Loading...</div>; // データの取得中に表示
  }

  // console.log(filteredrequest);

  // statusによって表示を変える
  const status = filteredrequest.map((item: Request, index: number) =>
    item.status === 3 ? (
      <div key={index}>
        <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-b-2 border-r-2 border-l-2 border-zinc-200">
          <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md bg-gradient-to-b from-blue-400 border-2 border-white border-solid text-center">
            承認
          </h4>
          <div className="pt-3">{toJST(item.resultedAt)}</div>
          <p className="pt-3">スペックシートの申請が承認されました</p>
        </div>
      </div>
    ) : item.status === 2 ? (
      <div key={index}>
        <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-b-r-l-2 border-b-2 border-r-2 border-l-2 border-zinc-200">
          <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md bg-gradient-to-t bg-red-500 from-red-200 border-2 border-white border-solid text-center">
            返却
          </h4>
          <div className="pt-3">{toJST(item.resultedAt)}</div>
          <p className="pt-3">スペックシートの申請が返却されました</p>
        </div>

        <div className="bg-white text-xl py-5 px-8 border-b-2 border-r-2 border-l-2 border-zinc-200">
          <div className="pb-4">◆返却理由</div>
          <p className="text-base">{item.adminComment}</p>
          <div className="flex justify-end pt-8">
            <Link href="/specseat">
              <button className="text-base font-semibold text-white py-4 w-52 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid text-center">
                スペックシートを編集する
              </button>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div className="ml-24 mt-10 text-2xl text-sky-900 font-bold">通知はないよ！</div>
    )
  );

  // 申請結果通知の件数を計算
  const approvedCount = filteredrequest.filter(
    (item: Request) => item.status === 3
  ).length;
  const returnedCount = filteredrequest.filter(
    (item: Request) => item.status === 2
  ).length;
  const totalCount = approvedCount + returnedCount;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="text-sky-900 flex-grow font-bold">
          <div className="ml-24 my-14 text-2xl flex">
            <div>申請結果通知&nbsp;&nbsp;&nbsp;</div>
            <div>{totalCount}</div>
            <div>件</div>
          </div>

          <div className="mx-48 border-t-2 border-zinc-200 shadow-2xl">
            {status}
          </div>

          <div className="mx-96 pt-20 pb-20 border-zinc-200 rounded-md ">
            <div className="shadow-2xl"></div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NotificationEngineer;
