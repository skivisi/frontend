/* eslint-disable react-hooks/rules-of-hooks */
/*
① 編集ページ遷移
*/

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
  UserData,
} from '../../../types/types';
import PdfSpecView from './PdfSpacView';

const specview = ({ userData }: { userData: UserData }) => {
  // console.log(userData);
  const pdhDownloadHandler = () => {
    // PDFファイルに変換したいコンポーネントのidを検索してDOM要素を取得する
    const target = document.getElementById('pdf-id');
    if (target === null) return;

    const scaleFactor = 0.75;

    html2canvas(target, { scale: 3.0 }) // scaleの値を調整
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // キャプチャのサイズに基づいて、PDFのページサイズを動的に設定
      const pdfWidth = canvas.width / 3.0; // scaleの値で割る
      const pdfHeight = canvas.height / 3.0; // scaleの値で割る
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? "l" : "p",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth * scaleFactor, pdfHeight * scaleFactor);
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
        <button type="button" onClick={pdhDownloadHandler}>
          PDFファイルをダウンロードするボタン
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default specview;
