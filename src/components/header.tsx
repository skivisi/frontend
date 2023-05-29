import favicon from ".././app/favicon.ico"

const Header = () => {
  return (
    <div>
        
      <header className="text-gray-600 body-font bg-gradient-to-r from-blue-500 to-blue-400">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="text-3xl text-white font-bold">パワプロ</span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-end">
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-sky-900">
            ダッシュボードへ
          </button>
          <button className="ml-10 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-sky-900">
            ログアウト→
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
