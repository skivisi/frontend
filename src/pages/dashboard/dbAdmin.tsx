import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import useSWR from 'swr';
import { Request } from '../../../types/types';

// 管理者DB
 export const fetcher = (
  resource: RequestInfo,
  init: RequestInit | undefined
) => fetch(resource, init).then((res) => res.json());

const DbAdmin = () => {
  const { data, error } = useSWR('/api/request', fetcher);

  if (!data) {
    return (
      <>
        <Header />
        <section>
          <div className="flex lg:justify-between justify-center font-bold flex-wrap max-w-4xl m-auto mt-10 lg:mt-20">
            <div className="relative">
              <button className="w-80 py-4 mt-10 lg:mt-20 mx-10 text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all">
                <Link href="/notificationList">申請通知</Link>
              </button>
              <Link href="/notificationEngineer"></Link>
            </div>

            <button className="w-80 py-4 mt-10 lg:mt-20 mx-10  text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all">
              <Link href="/dashboard/dbSales">エンジニア検索</Link>
            </button>
          </div>
        </section>
        <div className="absolute w-full" style={{ bottom: '0%' }}>
          <Footer />
        </div>
      </>
    ); // データの取得中に表示
  }

  // ステータスが申請中のみに絞る
  const requests = data.filter(
    (request: Request) => request.status === 1
  );

  return (
    <>
      <Header />
      <section>
        <div className="flex lg:justify-between justify-center font-bold flex-wrap max-w-4xl m-auto mt-10 lg:mt-20">
          <div className="relative">
            <button className="w-80 py-4 mt-10 lg:mt-20 mx-10 text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all">
              <Link href="/notificationList">申請通知</Link>
            </button>
            <div className="absolute rounded-full bg-blue-500 text-blue-50 py-1 px-3 text-2xl text-center lg:right-6 lg:top-16 right-6 top-8 cursor-pointer">
              <Link href="/notificationEngineer">
                {requests.length}
              </Link>
            </div>
          </div>

          <button className="w-80 py-4 mt-10 lg:mt-20 mx-10  text-orange-50 text-4xl text-center rounded-2xl shadow-lg cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-4 border-orange-50  hover:scale-110 transition-all">
            <Link href="/dashboard/dbSales">エンジニア検索</Link>
          </button>
        </div>
      </section>
      <div className="absolute w-full" style={{ bottom: '0%' }}>
        <Footer />
      </div>
    </>
  );
};

export default DbAdmin;
