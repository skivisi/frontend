import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../style.module.css';
import OptionYears from './OptionDates/OptionYears';
import OptionMonth from './OptionDates/OptionMonth';

function QualificationForm({
  qualification,
  index,
  handleRemove, // 追加フォーム削除ボタンがある場合
  handleChange, // 追加フォームsetState関数
  handleEdit,   // 既存データsetState関数
}: {
  qualification: any;
  index: number;
  handleRemove?: any;
  handleChange?: any;
  handleEdit?: any;
}) {
  const handleValueChange = handleEdit ? handleEdit : handleChange;
    // 描画時日時分解
    function decodeYearAndMonth(value: string, setIndex: string) {
      const yearAndMonth = value.split('年'); // ["2022", "10月"]
      const year = yearAndMonth[0]; // "2022"
      const month = yearAndMonth[1].replace('月', ''); // "10"
      if (setIndex == 'year') {
        return year;
      } else {
        return month;
      }
    }

  return (
    <div key={index} className={handleRemove && "mt-3"}>
      {handleRemove && (
        <button
          onClick={(e) => handleRemove(e, 'qualifications', index)}
        >
          <HighlightOffIcon />
        </button>
      )}
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="year">
          取得年
        </label>
        <select
          name=""
          id="year"
          className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
          value={
            handleEdit
              ? decodeYearAndMonth(
                  qualification.acquisitionDate,
                  'year'
                )
              : qualification.year
          }
          onChange={(e) =>
            handleValueChange(e, 'qualifications', 'year', index)
          }
        >
          <OptionYears />
        </select>
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="month">
          取得月
        </label>
        <select
          name=""
          id="month"
          className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
          value={
            handleEdit
              ? decodeYearAndMonth(
                  qualification.acquisitionDate,
                  'month'
                )
              : qualification.month
          }
          onChange={(e) =>
            handleValueChange(e, 'qualifications', 'month', index)
          }
        >
          <OptionMonth />
        </select>
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="credential">
          資格
        </label>
        <input
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          id='credential'
          value={qualification.credential || ''}
          onChange={(e) =>
            handleValueChange(
              e,
              'qualifications',
              'credential',
              index
            )
          }
        />
      </div>
    </div>
  );
}

export default QualificationForm;
