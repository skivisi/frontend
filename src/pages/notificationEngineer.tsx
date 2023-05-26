import Header from '../components/header';
import Footer from '@/components/footer';

const NotificationEngineer = () => {
  return (
    <>
      <Header />
      <div className="text-sky-900">
        <div className="ml-24 my-14 text-2xl flex">
          <div>申請結果通知&nbsp;&nbsp;&nbsp;</div>
          <div>{3}</div>
          <div>件</div>
        </div>

        <div className="mx-96 pt-20 pb-20 border-black rounded-md ">
          <div className="shadow-2xl">
            <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-2 border-black">
              <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-blue-400 border-2 border-white border-solid text-center">
                承認
              </h4>
              <div className="pt-3">2023/5/25</div>
              <p className="pt-3">
                スペックシートの申請が承認されました
              </p>
            </div>

            <div>
              <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-b-r-l-2 border-b-2 border-r-2 border-l-2 border-black">
                <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md bg-gradient-to-t bg-red-500 from-red-200 border-2 border-white border-solid text-center">
                  返却
                </h4>
                <div className="pt-3">2023/5/25</div>
                <p className="pt-3">
                  スペックシートの申請が返却されました
                </p>
              </div>

              <div className="bg-white text-xl py-5 px-8 border-b-2 border-r-2 border-l-2 border-black">
                <div className="pb-4">◆返却理由</div>
                <p className="text-base">
                  ダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキストダミーテキスト
                </p>
                <div className="flex justify-end pt-8">
                  <button className="text-base font-semibold text-white py-1 w-48 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 border-2 border-white border-solid text-center">
                    スキルシートを編集する
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex bg-blue-200 text-xl space-x-10 py-5 pl-8 border-b-2 border-r-2 border-l-2 border-black">
                <h4 className="font-semibold text-white py-2 w-24 rounded-xl shadow-md cursor-pointer bg-gradient-to-b from-blue-400 border-2 border-white border-solid text-center">
                  承認
                </h4>
                <div className="pt-3">2023/5/25</div>
                <p className="pt-3">スキルの申請が承認されました</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationEngineer;
