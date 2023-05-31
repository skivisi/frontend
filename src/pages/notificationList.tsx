import Header from '../components/header';
import Footer from '@/components/footer';

// 申請通知リスト(管理者)

const NotificationList = () => {
  const items = [1, 2, 3, 4];
  return (
    <>
      <Header />
      <div className="text-sky-900">
        <div className="ml-24 my-14 text-2xl flex">
          <div>申請通知&nbsp;&nbsp;&nbsp;</div>
          <div>{3}</div>
          <div>件</div>
        </div>
        <div
          className="mx-auto border-blue-200 rounded-md bg-blue-200 max-w-6xl py-3 mb-2"
         
        >
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
              {items.map((item) => (
                <div
                  key={item}
                  className="border-b-2 border-light-blue-500 pb-2"
                >
                  <div
                    key={item}
                    className="flex justify-center mt-14 md:pl-36 text-lg space-x-2 md:space-x-32 pr-24"
                  >
                    <a
                      href="#"
                      className="relative flex justify-center space-x-32"
                    >
                      <div className="w-24">2276</div>
                      <div
                        className="w-24 relative"
                        style={{ left: '1%' }}
                      >
                        2024/1
                      </div>
                      <div className="w-28">青山 真太郎</div>
                      <div
                        className="w-24 relative"
                        style={{ right: '1%' }}
                      >
                        FR
                      </div>
                    </a>
                    <button>▼</button>
                  </div>
                  <div className="pt-7 text-left pl-40">
                    <p>○開発経験</p>
                    <p>SNS開発を追加しました</p>
                    <p>ご確認の程よろしくお願いいたします</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotificationList;
