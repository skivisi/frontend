const OptionYears = () => {
  const currentYear = new Date().getFullYear(); // 現在の年を取得
  const startYear = 2010; // 開始年を設定

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </>
  );
};

export default OptionYears;
