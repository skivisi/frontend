import { screen, render } from '@testing-library/react';
import OptionYears from './OptionYears';

describe('OptionYears', () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2010;

  beforeEach(() => {
    render(<OptionYears />);
  });

  it('現在の年が表示されること', () => {
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
  });

  it('開始年が表示されること', () => {
    expect(screen.getByText(startYear.toString())).toBeInTheDocument();
  });

  it('正しいオプションの数が生成されること', () => {
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(currentYear - startYear + 1);
  });
});
