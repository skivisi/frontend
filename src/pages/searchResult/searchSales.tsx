import Header from '@/components/header';
import Footer from '@/components/footer';

// 検索結果(営業)

const SearchSales = () => {
  const items = [1, 2, 3];
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
          className="mx-72 border-blue-200 rounded-md bg-blue-200"
          style={{ borderWidth: '100px' }}
        >
          <div className="text-center">
            <div className="">
              <div className="flex justify-center text-xl space-x-32">
                <div className="w-24">社員番号</div>
                <div className="w-24">入社年月</div>
                <div className="w-24">名前</div>
                <div className="w-24">所属</div>
                <div className="w-24">業務状況</div>
              </div>
            </div>

            <div>
              {items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="flex justify-center mt-14 text-lg space-x-32 border-b-2 border-light-blue-500 pb-2"
                >
                  <div className="w-24">2276</div>
                  <div className="w-24">2020/1</div>
                  <div className="w-24">青山 真太郎</div>
                  <div className="w-24">FR</div>
                  <div className="w-24">アサイン中</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchSales;
