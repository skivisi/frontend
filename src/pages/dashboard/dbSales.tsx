import Header from '@/components/header';
import Footer from '@/components/footer';

const DbSales = () => {
  return (
    <>
      <Header />
      <div className="text-sky-900 mx-96 mt-10 py-5 border-blue-200 rounded-md bg-blue-200 shadow-xl">
        <section className="text-center mt-12">
          <h2 className="text-4xl mb-10 pt-12">エンジニア検索</h2>
          <form className="mb-5">
            <input
              type="text"
              className="w-72 rounded-md py-1.5 bg-white shadow-xl border-2 border-slate-300"
            />
          </form>
          <button className="text-xl px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white">
            検索する
          </button>
        </section>

        <section className="text-center pb-12 mx-20">
          <h2 className="text-4xl mb-10 mt-28">スキル検索</h2>

          <div className="flex">
            <div className="pt-3 text-2xl mb-5 w-52 bg-sky-50 shadow-xl border-2 border-slate-300">
              業務状況
            </div>
            <form className="flex justify-between text-xl p-3 mb-5 w-full bg-white shadow-xl border-2 border-slate-300">
              <div className="pl-28">
                <input type="radio" name="1" id="1" />
                <label htmlFor="1">待機中</label>
              </div>
              <div className="pr-52">
                <input type="radio" name="1" id="1" />
                <label htmlFor="1">アサイン中</label>
              </div>
            </form>
          </div>

          <div className="flex">
            <div className="text-2xl pt-3 w-52 bg-sky-50 shadow-xl border-2 border-slate-300">
              職種
            </div>
            <form className="flex justify-between text-xl p-3 w-full bg-white shadow-xl border-2 border-slate-300">
              <div className="px-5">
                <input type="radio" name="2" id="2" />
                <label htmlFor="2">FR</label>
              </div>
              <div className="">
                <input type="radio" name="2" id="2" />
                <label htmlFor="2">JAVA</label>
              </div>
              <div className="">
                <input type="radio" name="2" id="2" />
                <label htmlFor="2">QA</label>
              </div>
              <div className="">
                <input type="radio" name="2" id="2" />
                <label htmlFor="2">ML</label>
              </div>
              <div className="">
                <input type="radio" name="2" id="2" />
                <label htmlFor="2">CL</label>
              </div>
              <div className="pr-4">
                <input type="radio" name="2" id="2" />
                <label htmlFor="2">PHP</label>
              </div>
            </form>
          </div>

          <div className="flex mt-5">
            <div className="text-2xl pt-6 bg-sky-50 w-52 shadow-xl border-2 border-slate-300">
              スキル
            </div>
            <form className="flex text-xl p-3 w-full bg-white shadow-xl border-2 border-slate-300">
              <div className="grid grid-cols-6">
                <div className="px-5">
                  <input type="checkbox" id="3" />
                  <label htmlFor="3">React</label>
                </div>
                <div className="">
                  <input type="checkbox" id="4" />
                  <label htmlFor="4">React</label>
                </div>
                <div className="">
                  <input type="checkbox" id="5" />
                  <label htmlFor="5">React</label>
                </div>
                <div className="">
                  <input type="checkbox" id="6" />
                  <label htmlFor="7">React</label>
                </div>
                <div className="">
                  <input type="checkbox" id="7" />
                  <label htmlFor="7">React</label>
                </div>
                <div className="">
                  <input type="checkbox" id="8" />
                  <label htmlFor="8">React</label>
                </div>
                <div className="">
                  <input type="checkbox" id="9" />
                  <label htmlFor="9">React</label>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-5">
            <div className="text-2xl">
              その他
              <input
                type="text"
                className="ml-3 bg-white shadow-xl border-2 border-slate-300"
              />
            </div>
          </div>

          <button className="text-xl mt-5 px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white">
            検索する
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default DbSales;
