import Image from 'next/image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from '../../style.module.css';
import OptionYears from '../OptionDates/OptionYears';
import OptionMonth from '../OptionDates/OptionMonth';
import DevExAutoComplete from './DevExAutoComplete';
import noimaged from '@/public/noimaged.png';

const DevelopmentExperiences = ({
  developmentExperience,
  index,
  handleRemove, // 追加フォーム削除ボタンがある場合
  handleChange, // 追加フォームsetState関数
  handleEdit, // 既存データsetState関数
  autocomplete,
  setData,
  renderFiles,
  userData,
}: {
  developmentExperience: any;
  index: number;
  handleRemove?: any;
  handleChange?: any;
  handleEdit?: any;
  autocomplete: any;
  setData: any;
  renderFiles: any;
  userData: any;
}) => {
  const handleValueChange = handleEdit ? handleEdit : handleChange;
  return (
    <div key={index} className="mt-6">
      {handleRemove && (
        <button
        data-testid="remove-button"
          onClick={(e) =>
            handleRemove(e, 'developmentExperiences', index)
          }
        >
          <HighlightOffIcon />
        </button>
      )}
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="startYear">
          開始年
        </label>
        <select
        data-testid="startYear-input"
          name=""
          id="startYear"
          className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
          value={
            developmentExperience.startYear
              ? developmentExperience.startYear
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'startYear',
              index
            )
          }
        >
          <OptionYears />
        </select>
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="startDate">
          開始月
        </label>
        <select
        data-testid="startDate-input"
          name=""
          id="startDate"
          className={`${styles.focus} border-2 border-transparent w-1/4 text-center`}
          value={
            developmentExperience.startDate
              ? developmentExperience.startDate
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'startDate',
              index
            )
          }
        >
          <OptionMonth />
        </select>
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="duration">
          期間
        </label>
        <input
        data-testid="duration-input"
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          id='duration'
          value={
            developmentExperience.duration
              ? developmentExperience.duration
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'duration',
              index
            )
          }
        />
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="assignedTask">
          担当役割
        </label>
        <input
         data-testid="assignedTask-input"
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          id='assignedTask'
          value={
            developmentExperience.assignedTask
              ? developmentExperience.assignedTask
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'assignedTask',
              index
            )
          }
        />
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="teamSize">
          チーム人数
        </label>
        <input
        data-testid="teamSize-input"
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          id='teamSize'
          value={
            developmentExperience.teamSize
              ? developmentExperience.teamSize
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'teamSize',
              index
            )
          }
        />
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="totalProjectHeadcount">
          PJ全体人数
        </label>
        <input
        data-testid="totalProjectHeadcount-input"
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          id='totalProjectHeadcount'
          value={
            developmentExperience.totalProjectHeadcount
              ? developmentExperience.totalProjectHeadcount
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'totalProjectHeadcount',
              index
            )
          }
        />
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="projectName">
          プロジェクト名
        </label>
        <input
        data-testid="projectName-input"
          className={`${styles.focus} border-2 border-transparent block w-3/4 p-2`}
          type="text"
          id='projectName'
          value={
            developmentExperience.projectName
              ? developmentExperience.projectName
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'projectName',
              index
            )
          }
        />
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="environments">
          動作環境
        </label>
        {autocomplete.os && (
          <DevExAutoComplete
            options={autocomplete.os}
            value={
              developmentExperience?.environments
                ? developmentExperience.environments
                : []
            }
            setValue={setData}
            placeholder="Mac OS"
            index={index}
            skillType={'environments'}
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="programmingLanguages">
          言語
        </label>
        {autocomplete.lang && (
          <DevExAutoComplete
            options={autocomplete.lang}
            value={
              developmentExperience?.programmingLanguages
                ? developmentExperience.programmingLanguages
                : []
            }
            setValue={setData}
            placeholder="TypeScript"
            index={index}
            skillType={'programmingLanguages'}
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="frameworks">
          フレームワーク
        </label>
        {autocomplete.framework && (
          <DevExAutoComplete
            options={autocomplete.framework}
            value={
              developmentExperience?.frameworks
                ? developmentExperience.frameworks
                : []
            }
            setValue={setData}
            placeholder="Vue.js"
            index={index}
            skillType={'frameworks'}
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="tools">
          ツール･その他
        </label>
        {autocomplete.tool && (
          <DevExAutoComplete
            options={autocomplete.tool}
            value={
              developmentExperience?.tools
                ? developmentExperience.tools
                : []
            }
            setValue={setData}
            placeholder="vscode"
            index={index}
            skillType={'tools'}
          />
        )}
      </div>
      <div className="flex-row w-full flex border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="jobDuties">
          業務内容
        </label>
        <textarea
        data-testid="jobDuties-input"
          name=""
          id="jobDuties"
          className={`${styles.focus} border-2 border-transparent p-2 w-3/4`}
          rows={8}
          value={
            developmentExperience.jobDuties
              ? developmentExperience.jobDuties
              : ''
          }
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'jobDuties',
              index
            )
          }
        ></textarea>
      </div>
      <div className="w-full flex h-10 ">
        <label
          className="bg-slate-200 block w-1/4 pt-2 px-1 text-sm border-2 border-slate-300 shadow-md"
          htmlFor="img"
        >
          アーキテクチャ
        </label>
        <input
        data-testid="img-input"
          className="block mt-1 ml-2"
          type="file"
          id='img'
          accept=".png, .jpeg, .jpg"
          onChange={(e) =>
            handleValueChange(
              e,
              'developmentExperiences',
              'img',
              index
            )
          }
        />
      </div>
      {/* 追加データの場合 */}
      {handleRemove ? (
        <>
          {renderFiles[
            index + userData.developmentExperience.length
          ] !== null && (
            <div className="flex justify-center">
              <Image
                src={
                  renderFiles[
                    index + userData.developmentExperience.length
                  ]
                }
                width={600}
                height={400}
                alt="Picture of the architecture"
              />
            </div>
          )}
        </>
      ) : (
        // 既存データの場合
        <div className="flex justify-center">
          <Image
            src={
              renderFiles[index] !== null
                ? renderFiles[index]
                : developmentExperience.img
                ? `${process.env.NEXT_PUBLIC_SUPABASE_STRAGE_URL}/${developmentExperience.img}`
                : noimaged
            }
            width={600}
            height={400}
            alt="Picture of the architecture"
          />
        </div>
      )}
    </div>
  );
};

export default DevelopmentExperiences;
