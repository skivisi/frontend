'use client';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userId','affiliation','adminId']);

  const handleLogout = () => {
    if (cookies.userId) {
      removeCookie('userId',{ path: '/' });
    }
    if (cookies.affiliation) {
      removeCookie('affiliation',{ path: '/' });
    }
    if (cookies.adminId) {
      removeCookie('adminId',{ path: '/' });
    }
  };

  const handleDash = () => {
    if (
      cookies.affiliation === 'FR' ||
      cookies.affiliation === 'JAVA' ||
      cookies.affiliation === 'QA' ||
      cookies.affiliation === 'ML' ||
      cookies.affiliation === 'CL' ||
      cookies.affiliation === 'PHP'
    ) {
      window.location.href = '/dashboard/dbEngineer';
    } else if (cookies.affiliation === '営業') {
      window.location.href = '/dashboard/dbSales';
    } else {
      window.location.href = '/dashboard/dbAdmin';
    }
  };
  return (
    <div>
      <header className="text-gray-600 body-font bg-gradient-to-tr from-blue-600 to-sky-300 shadow-lg">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a  onClick={handleDash} className="cursor-pointer flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="text-3xl text-white font-bold">
              パワプロ
            </span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-end"></nav>
          <button
            onClick={handleDash}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-sky-900 shadow-lg"
          >
            ダッシュボードへ
          </button>

          <button
            className="ml-10 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 text-sky-900 shadow-lg"
            onClick={handleLogout}
          >
            <Link href="/login">ログアウト→</Link>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
