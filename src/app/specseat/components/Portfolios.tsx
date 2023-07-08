import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../style.module.css';

function Portfolios({
  portfolio,
  index,
  handleRemove, // 追加フォーム削除ボタンがある場合
  handleChange, // 追加フォームsetState関数
  handleEdit,   // 既存データsetState関数
}: {
  portfolio: any;
  index: number;
  handleRemove?: any;
  handleChange?: any;
  handleEdit?: any;
}) {
  const handleValueChange = handleEdit ? handleEdit : handleChange;
  return (
    <div key={index} className={handleRemove && "mt-3"}>
      {handleRemove && (
        <button
          onClick={(e) =>
            handleRemove(e, 'portfolios', index)
          }
        >
          <HighlightOffIcon />
        </button>
      )}
      <div
        className="w-full flex flex-row border-2 border-slate-300 shadow-md"
        key={index}
      >
        <input
          className={`${styles.focus} border-2 border-transparent bg-slate-200 block w-1/4 p-1`}
          type="text"
          name=""
          placeholder="qiita"
          value={portfolio.heading ? portfolio.heading : ''}
          onChange={(e) =>
            handleValueChange(e, 'portfolios', 'heading', index)
          }
        />

        <input
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          name=""
          placeholder="http://..."
          value={portfolio.url ? portfolio.url : ''}
          onChange={(e) =>
            handleValueChange(e, 'portfolios', 'url', index)
          }
        />
      </div>
    </div>
  );
}

export default Portfolios;
