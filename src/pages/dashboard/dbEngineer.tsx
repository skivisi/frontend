import { useState } from 'react';

const DbEngineer = () => {
  const [showTemplateButtons, setShowTemplateButtons] =
    useState(false);

  const handleTemplateButtonClick = () => {
    setShowTemplateButtons(true);
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 justify-center mt-48 relative">
          <button className="bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 rounded w-80">
            申請通知
          </button>
          <button className="bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 rounded w-80">
            マイページへ移動
          </button>
          <button
            className="bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 rounded w-80"
            onClick={handleTemplateButtonClick}
          >
            テンプレートを見る
          </button>
          {showTemplateButtons && (
            <>
              <button
                className="absolute bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 w-80"
                style={{ top: '75%'}}
              >
                FR
              </button>
              <button
                className="absolute bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 w-80"
                style={{ top: '96%' }}
              >
                JAVA
              </button>
              <button
                className="absolute bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 w-80"
                style={{ top: '117%' }}
              >
                QA
              </button>
              <button
                className="absolute bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 w-80"
                style={{ top: '138%' }}
              >
                ML
              </button>
              <button
                className="absolute bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 w-80"
                style={{ top: '159%' }}
              >
                CL
              </button>
              <button
                className="absolute bg-indigo-700 font-semibold text-white py-4 mx-72 my-8 w-80"
                style={{ top: '180%' }}
              >
                PHP
              </button>
            </>
          )}
          <button className="bg-indigo-700 font-semibold text-white mx-72 my-8 w-80 rounded ">
            更新履歴
          </button>
        </div>
      </section>
    </>
  );
};

export default DbEngineer;
