import Header from '@/components/header';
import Footer from '@/components/footer';

const SearchAdmin = () => {
  const items = [1, 2, 3];
  return (
    <>
      <Header />
      <div className="text-sky-900">
        <div className="ml-24 my-14 text-2xl flex">
          <div>検索結果&nbsp;&nbsp;&nbsp;</div>
          <div>{3}</div>
          <div>件</div>
        </div>

        <div
          className="mx-64 border-blue-200 rounded-md bg-blue-200"
          style={{ borderWidth: '100px' }}
        >
          <div className="">
            <div className="">
              <div className="flex justify-center text-xl space-x-32">
                <div className="">社員番号</div>
                <div className="">入社年月</div>
                <div className="">名前</div>
                <div className="">所属</div>
                <div className="">業務状況</div>
              </div>
            </div>

            <div>
              {items.map((item) => (
                <div
                  key={item}
                  className="mt-14 text-lg border-b-2 border-light-blue-500 pb-2"
                >
                  <a
                    href="#"
                    className="relative flex justify-center space-x-32 mr-10 mb-2"
                  >
                    <div className="absolute left-36">2276</div>
                    <div className="absolute" style={{ left: '21%' }}>
                      2020/1
                    </div>
                    <div
                      className="absolute"
                      style={{ right: '41%' }}
                    >
                      青山 真太郎
                    </div>
                    <div className="relative left-52">FR</div>
                    <div></div>
                  </a>
                  <div className="relative">
                    <div
                      className="absolute mb-2 w-40 text-center shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white"
                      style={{ bottom: '70%', left: '78%' }}
                    >
                      アサインに変更
                    </div>
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

export default SearchAdmin;
