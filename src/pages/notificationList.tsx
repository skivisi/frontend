import axios from 'axios';
import Header from '../components/header';
import Footer from '@/components/footer';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import requestHandler from './api/request';
import useSWR from 'swr';
import Link from 'next/link';
import { Request } from '../../types/types';

// 申請通知リスト(管理者)
const fetcher = (url: RequestInfo) =>
  fetch(url).then((res) => res.json());

const NotificationList = () => {
  // トグル状態管理
  const [expanded, setExpanded] = useState<{ [id: number]: boolean }>(
    {}
  );

  // requestのデータ取得
  const { data, error } = useSWR('/api/request', fetcher);

  if (!data) {
    return (
      <>
        <Header />
        <div>通知はありません</div>
        <Footer />
      </>
    );
  }

  // エンジニアコメントのトグル
  const handleToggle = (id: number) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  // 申請結果通知の件数を計算
  const totalCount = data.filter(
    (item: Request) => item.status === 1
  ).length;

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="text-sky-900 flex-grow">
        <div className="ml-24 my-14 text-2xl flex">
          <div>申請通知&nbsp;&nbsp;&nbsp;</div>
          <div>{totalCount}</div>
          <div>件</div>
        </div>
        <div className="mx-auto border-blue-200 rounded-md bg-blue-200 max-w-6xl py-3 mb-2">
          <div className="text-center">
            <div className="">
              <div className="flex justify-center mt-14 text-lg space-x-2 md:space-x-32 pr-24">
                <div className="w-24">社員番号</div>
                <div className="w-24">入社年月</div>
                <div className="w-24">名前</div>
                <div className="w-24">所属</div>
              </div>
            </div>

            <div>
              {data.map((request: Request, index: number) => (
                <div
                  key={index}
                  className="border-b-2 border-light-blue-500 pb-2"
                >
                  <div className="flex justify-center mt-14 md:pl-36 text-lg space-x-2 md:space-x-32 pr-24">
                    <Link
                      legacyBehavior
                      href={`/approval/${request.user?.userId}`}
                    >
                      <a className="relative flex justify-center space-x-32">
                        <div className="w-24">
                          {request.user?.employeeNumber}
                        </div>
                        <div
                          className="w-24 relative"
                          style={{ left: '1%' }}
                        >
                          {request.user?.joinDate}
                        </div>
                        <div className="w-28">
                          {request.user?.userName}
                        </div>
                        <div
                          className="w-24 relative"
                          style={{ right: '1%' }}
                        >
                          {request.user?.affiliation}
                        </div>
                      </a>
                    </Link>
                    <button
                      onClick={() =>
                        handleToggle(request.user?.userId)
                      }
                    >
                      {expanded[request.user?.userId] ? '▲' : '▼'}
                    </button>
                  </div>
                  {expanded[request.user?.userId] && (
                    <div className="pt-7 text-left pl-40">
                      <p>{request.engineerComment}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default NotificationList;
