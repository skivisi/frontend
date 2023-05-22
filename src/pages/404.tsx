import Link from 'next/link';

function NotFound() {
  return (
    <>
      <div>お探しのページはありません</div>
      <Link href="/">
        <button>トップに戻る</button>
      </Link>
    </>
  );
}

export default NotFound;
