import styles from '../style.module.css';

const AddFormButton = ({
  onClick,
  buttonText,
}: {
  onClick: any;
  buttonText: string;
}) => {
  return (
    <div className="mt-5">
      <button
        onClick={onClick}
        type="button"
        className={`${styles.focus} border-2 border-transparent shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 h-10 rounded-xl border-white border-solid`}
      >
        <span className="text-white font-bold m-4">
          + {buttonText}の追加
        </span>
      </button>
    </div>
  );
};

export default AddFormButton;
