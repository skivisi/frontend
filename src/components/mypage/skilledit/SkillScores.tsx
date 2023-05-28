import styles from './style.module.css';

const SkillScores = ({
  skillName,
  skillTag,
}: {
  skillName: string;
  skillTag: string;
}) => {
  const className = `${skillTag}_scores`;
  const inputName = `${skillTag}_scores`; // ラジオボタングループごとに一意のname属性を指定
  return (
    <div className="flex justify-center bg-teal-800 p-2">
      <div
        className={`${styles.skill_name} text-white text-2xl leading-8 w-60 mt-1`}
      >
        {skillName}
      </div>
      <div className={`${styles[className]} flex ml-4`}>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_1`}
          value={1}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_1`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          1
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_2`}
          value={2}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_2`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          2
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_3`}
          value={3}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_3`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          3
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_4`}
          value={4}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_4`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          4
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_5`}
          value={5}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_5`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          5
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_6`}
          value={6}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_6`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          6
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_7`}
          value={7}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_7`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          7
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_8`}
          value={8}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_8`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          8
        </label>
        <input
          type="radio"
          name={inputName}
          id={`${inputName}_9`}
          value={9}
          className="hidden"
        />
        <label
          htmlFor={`${inputName}_9`}
          className=" hover:bg-teal-600 block cursor-pointer ml-1 px-3 py-1 border-2 border-teal-50 text-teal-50 text-lg font-bold text-center transition-all"
        >
          9
        </label>
      </div>
    </div>
  );
};

export default SkillScores;
