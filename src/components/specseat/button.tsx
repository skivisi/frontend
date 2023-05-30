'use client';
import styles from '../../app/specseat/style.module.css';

export default function Button(props: { name: string }) {
  function mock() {}
  return (
    <div className="mt-5">
      <button
        onClick={mock}
        type="button"
        className={`${styles.focus} shadow-md cursor-pointer bg-gradient-to-b from-orange-400 to-yellow-400 h-10 rounded-xl border-2 border-white border-solid`}
      >
        <span className="text-white font-bold m-4">
          + {props.name}の追加
        </span>
      </button>
    </div>
  );
}
