export const hoge = (x: number): number => {
  return x * 2;
};

describe('関数hogeのテスト', () => {
  test('hoge関数の引数に1を渡したら2が返ってくること', () => {
    expect(hoge(1)).toBe(2);
  });
});
