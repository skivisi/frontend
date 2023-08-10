/* eslint-disable react-hooks/rules-of-hooks */

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { UserData } from '../../../types/types';
import PdfSpecView from './PdfSpecView';

const specview = ({ userData }: { userData: UserData }) => {
  // console.log(userData);
  const pdhDownloadHandler = () => {
    // PDFファイルに変換したいコンポーネントのidを検索してDOM要素を取得する
    const target = document.getElementById('pdf-id');
    if (target === null) return;

    const scaleFactor = 0.75;

    html2canvas(target, { scale: 3.0 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        const imgWidth = canvas.width / 3.0;
        const imgHeight = canvas.height / 3.0;

        const verticalMargin = 40; // 上下の余白
        const pdfWidth = imgWidth;
        const pdfHeight = imgHeight + 2 * verticalMargin; // 余白を追加

        const pdf = new jsPDF({
          orientation: pdfWidth > pdfHeight ? 'l' : 'p',
          unit: 'px',
          format: [pdfWidth, pdfHeight],
        });
        // 画像の位置を中央寄せにするためのマージンを計算
        const marginLeft = (pdfWidth - pdfWidth * scaleFactor) / 2;

        pdf.addImage(
          imgData,
          'PNG',
          marginLeft, // 左のマージンを適用
          verticalMargin, // 上の余白を適用
          pdfWidth * scaleFactor,
          pdfHeight * scaleFactor
        );

        pdf.save(`test.pdf`);
      })
      .catch((error) => {
        console.error('html2canvas error: ', error);
      });
  };
  return (
    <>
      <PdfSpecView userData={userData} />
      {userData.portfolio.length > 0 ? (
        <button
          type="button"
          onClick={pdhDownloadHandler}
          className="shadow-md mt-10 h-16  cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 rounded-xl border-2 border-white border-solid text-yellow-50 text-xl font-bold px-3"
        >
          PDFファイルをダウンロード
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default specview;
