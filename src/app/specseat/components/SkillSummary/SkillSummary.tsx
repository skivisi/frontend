import React from 'react';
import SummaryAutoComplete from './SummaryAutoComplete';

const SkillSummary = ({
  autocomplete,
  defaultData,
  setDefaultData,
}: {
  autocomplete: any;
  defaultData: any;
  setDefaultData: any;
}) => {
  return (
    <>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
          動作環境(OS)
        </label>

        {autocomplete.os && (
          <SummaryAutoComplete
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            options={autocomplete.os}
            skillType="environment"
            placeholder="Mac OS"
          />
        )}
      </div>

      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
          言語
        </label>
        {autocomplete.lang && (
          <SummaryAutoComplete
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            options={autocomplete.lang}
            skillType="programmingLanguage"
            placeholder="Javascript"
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
          フレームワーク
        </label>
        {autocomplete.framework && (
          <SummaryAutoComplete
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            options={autocomplete.framework}
            skillType="framework"
            placeholder="Vue.js"
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
          ライブラリ
        </label>
        {autocomplete.library && (
          <SummaryAutoComplete
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            options={autocomplete.library}
            skillType="library"
            placeholder="React"
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
          クラウド
        </label>
        {autocomplete.cloud && (
          <SummaryAutoComplete
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            options={autocomplete.cloud}
            skillType="cloud"
            placeholder="AWS"
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
          ツール･その他
        </label>
        {autocomplete.tool && (
          <SummaryAutoComplete
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            options={autocomplete.tool}
            skillType="tool"
            placeholder="GitHub"
          />
        )}
      </div>
      <div className="w-full flex flex-row border-2 border-slate-300 shadow-md">
        <label className="bg-slate-200 block w-1/4 p-1" htmlFor="">
          担当開発工程
        </label>
        {autocomplete.assignedDevelopment && (
          <SummaryAutoComplete
            defaultData={defaultData}
            setDefaultData={setDefaultData}
            options={autocomplete.assignedDevelopment}
            skillType="developmentDomain"
            placeholder="設計"
          />
        )}
      </div>
    </>
  );
};

export default SkillSummary;
