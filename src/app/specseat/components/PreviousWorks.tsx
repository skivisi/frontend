import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../style.module.css';

const PreviousWorks = ({
  previousWork,
  index,
  handleRemove, // 追加フォーム削除ボタンがある場合
  handleChange, // 追加フォームsetState関数
  handleEdit,   // 既存データsetState関数
}: {
  previousWork: any;
  index: number;
  handleRemove?: any;
  handleChange?: any;
  handleEdit?: any;
}) => {
  const handleValueChange = handleEdit ? handleEdit : handleChange;
  return (
    <>
      <div className="mt-3" key={index}>
        {handleRemove && (
          <button
            onClick={(e) => handleRemove(e, 'qualifications', index)}
          >
            <HighlightOffIcon />
          </button>
        )}
        <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
          <label className="bg-slate-200 block w-1/4 p-1" htmlFor="industry">
            業界
          </label>
          <input
            className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
            type="text"
            id='industry'
            value={previousWork.industry ? previousWork.industry : ''}
            onChange={(e) =>
                handleValueChange(
                e,
                'previousWorks',
                'industry',
                index
              )
            }
          />
        </div>
        <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
          <label className="bg-slate-200 block w-1/4 p-1" htmlFor="occupation">
            業種
          </label>
          <input
            className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
            type="text"
            id='occupation'
            value={previousWork.occupation ? previousWork.occupation : ''}
            onChange={(e) =>
                handleValueChange(
                e,
                'previousWorks',
                'occupation',
                index
              )
            }
          />
        </div>
        <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
          <label className="bg-slate-200 block w-1/4 p-1" htmlFor="JobDuties">
            業務内容
          </label>
          <textarea
            name=""
            id="JobDuties"
            className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
            rows={8}
            value={previousWork.JobDuties ? previousWork.JobDuties : ''}
            onChange={(e) =>
                handleValueChange(
                e,
                'previousWorks',
                'JobDuties',
                index
              )
            }
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default PreviousWorks;
