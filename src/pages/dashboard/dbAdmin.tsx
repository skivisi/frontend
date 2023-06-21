import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import useSWR from 'swr';

// 管理者DB
const fetcher = (
  resource: RequestInfo,
  init: RequestInit | undefined
) => fetch(resource, init).then((res) => res.json());

const DbAdmin = () => {
  const { data, error } = useSWR('/api/request', fetcher);
  console.log(data);

  if (!data) {
    return <div>Loading...</div>; // データの取得中に表示
  }

  // ステータスが申請中のみに絞る
  const requests = data.filter(
    (request: any) => request.status === 1
  );
  console.log(requests);

  return (
    <>
      <Header />
      <div className="flex justify-center mt-48 ">
        <div className="relative">
          <button className="font-semibold text-white py-4 my-8 mr-16 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid">
            <Link href="/notificationList">申請通知</Link>
          </button>
          <div
            className="absolute flex items-center justify-center ml-1 h-10 w-10 rounded-full bg-blue-500 text-white font-bold"
            style={{ top: '17%', right: '15%' }}
          >
            {requests.length}
          </div>
        </div>

        <button className="font-semibold text-white py-4 my-8 ml-16 w-80 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid">
          <Link href='/dashboard/dbSales'>エンジニア検索</Link>
        </button>
      </div>
      <div className="absolute w-full" style={{ bottom: '0%' }}>
        <Footer />
      </div>
    </>
  );
};

export default DbAdmin;
