import { screen, render, fireEvent } from '@testing-library/react';
import AddFormButton from './AddFormButton';

describe('AddFormButton', () => {
  let mockOnClick;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  it('ボタンの存在証明', () => {
    render(
      <AddFormButton onClick={mockOnClick} buttonText="テスト" />
    );
    expect(screen.getByText('+ テストの追加')).toBeInTheDocument();

  });
  it('onClick呼び出し確認', () => {
    render(
      <AddFormButton onClick={mockOnClick} buttonText="テスト" />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
