import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../style.module.css';

const SellingPoints = ({
  sellingPoint,
  index,
  handleRemove, // 追加フォーム削除ボタンがある場合
  handleChange, // 追加フォームsetState関数
  handleEdit, // 既存データsetState関数
}: {
  sellingPoint: any;
  index: number;
  handleRemove?: any;
  handleChange?: any;
  handleEdit?: any;
}) => {
  const handleValueChange = handleEdit ? handleEdit : handleChange;
  return (
    <div key={index} className={handleRemove && 'mt-3'}>
      {handleRemove && (
        <button
          onClick={(e) => handleRemove(e, 'sellingPoints', index)}
        >
          <HighlightOffIcon />
        </button>
      )}
      <div className="w-full flex flex-row border-2 border-slate-300shadow-md">
        <label
          className="bg-slate-200 block w-1/4 p-1"
          htmlFor="appealTitle"
        >
          タイトル
        </label>
        <input
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          id="appealTitle"
          value={sellingPoint.title ? sellingPoint.title : ''}
          onChange={(e) =>
            handleValueChange(e, 'sellingPoints', 'title', index)
          }
        />
      </div>
      <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
        <label
          className="bg-slate-200 block w-1/4 pt-1 px-2"
          htmlFor="appealContent"
        >
          内容
        </label>
        <textarea
          id="appealContent"
          className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
          rows={8}
          value={sellingPoint.content ? sellingPoint.content : ''}
          onChange={(e) =>
            handleValueChange(e, 'sellingPoints', 'content', index)
          }
        ></textarea>
      </div>
    </div>
  );
};

export default SellingPoints;
