import { GetServerSideProps } from 'next';
import Header from '../components/header';
import Footer from '@/components/footer';
import axios from 'axios';

// 通知一覧(エンジニア)

export const getServerSideProps: GetServerSideProps = async ({
  req,
}) => {
  // ログイン中のエンジニアのidを取得
  const cookies = req.cookies;
  const cookie = cookies.id;

  // エンジニアのuserIdとcookieのidを結びつける
  const { data: requestData } = await axios.get(
    `http://localhost:8000/request?userId=${cookie}`
  );

  return {
    props: {
      requestData,
    },
  };
};

const NotificationEngineer = (requestData: any) => {
  const request = requestData.requestData;

  // 新しい日付順で並び替える
  const sortRequest = [...request].sort((a, b) => {
    return (
      new Date(b.resultedAt).getTime() -
      new Date(a.resultedAt).getTime()
    );
  });

  // statusによって表示を変える
  const status = sortRequest.map((item: any) =>
    item.status === 3 ? (
      <div key={item.id}>
        <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-b-2 border-r-2 border-l-2 border-black">
          <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md bg-gradient-to-b from-blue-400 border-2 border-white border-solid text-center">
            承認
          </h4>
          <div className="pt-3">{item.resultedAt}</div>
          <p className="pt-3">スキルの申請が承認されました</p>
        </div>
      </div>
    ) : item.status === 2 ? (
      <div key={item.id}>
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
  const approvedCount = request.filter(
    (item: any) => item.status === 3
  ).length;
  const returnedCount = request.filter(
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
