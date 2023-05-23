const DbSales = () => {
  return (
    <>
      <div className="mx-72 border-blue-200 rounded-md bg-blue-200">
        <section className="text-center mt-12">
          <h2 className="text-3xl mb-5 pt-12">エンジニア検索</h2>
          <form className="mb-5">
            <input
              type="text"
              className="w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
            />
          </form>
          <button className="px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white">
            検索する
          </button>
        </section>

        <section className="text-center pb-12">
          <h2 className="text-3xl mb-5 mt-40">スキル検索</h2>
          <div className="text-xl mr-72 mb-5 ">◾️業務状況</div>
          <form className="flex justify-center mb-5">
            <div className="mr-32">
              <input type="radio" name="1" />
              <label>待機中</label>
            </div>
            <div>
              <input type="radio" name="1" />
              <label>アサイン中</label>
            </div>
          </form>

          <div className="text-xl mr-80 mb-3">◾️職種</div>
          <form className="flex justify-center mb-5 text-xl">
            <div className="mr-4">
              <input type="radio" name="2" />
              <label>FR</label>
            </div>
            <div className="mr-4">
              <input type="radio" name="2" />
              <label>JAVA</label>
            </div>
            <div className="mr-4">
              <input type="radio" name="2" />
              <label>QA</label>
            </div>
            <div className="mr-4">
              <input type="radio" name="2" />
              <label>ML</label>
            </div>
            <div className="mr-4">
              <input type="radio" name="2" />
              <label>CL</label>
            </div>
            <div className="mr-4">
              <input type="radio" name="2" />
              <label>PHP</label>
            </div>
          </form>

          <div className="text-xl mr-80 mb-3">◾️スキル</div>
          <form className="flex justify-center mb-5 text-xl">
            <div className="mr-4">
              <input type="checkbox" />
              <label>React</label>
            </div>
            <div className="mr-4">
              <input type="checkbox" />
              <label>React</label>
            </div>
            <div className="mr-4">
              <input type="checkbox" />
              <label>React</label>
            </div>
            <div className="mr-4">
              <input type="checkbox" />
              <label>React</label>
            </div>
            <div className="mr-4">
              <input type="checkbox" />
              <label>React</label>
            </div>
            <div className="mr-4">
              <input type="checkbox" />
              <label>React</label>
            </div>
            <div className="mr-4">
              <input type="checkbox" />
              <label>React</label>
            </div>
          </form>

          <button className="mt-5 px-3 py-1 shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-white">
            検索する
          </button>
        </section>
      </div>
    </>
  );
};

export default DbSales;
