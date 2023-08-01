import { screen, render, fireEvent } from '@testing-library/react';
import Portfolios from './Portfolios';

describe('Portfolios', () => {
  let mockHandleValueChange, mockHandleRemove;

  beforeEach(() => {
    mockHandleValueChange = jest.fn();
    mockHandleRemove = jest.fn();
  });

  it('インプットフォームの存在証明', () => {
    render(
      <Portfolios
        portfolio={{ heading: '', url: '' }}
        index={0}
        handleChange={mockHandleValueChange}
      />
    );
    expect(screen.getByPlaceholderText('qiita')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('http://...')
    ).toBeInTheDocument();
  });

  it('handleValueChange関数呼び出し確認', () => {
    render(
      <Portfolios
        portfolio={{ heading: '', url: '' }}
        index={0}
        handleChange={mockHandleValueChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('qiita'), {
      target: { value: 'New heading' },
    });
    fireEvent.change(screen.getByPlaceholderText('http://...'), {
      target: { value: 'New url' },
    });

    expect(mockHandleValueChange).toHaveBeenCalledTimes(2);
  });

  it('削除ボタンの存在証明', () => {
    render(
      <Portfolios
        portfolio={{ heading: '', url: '' }}
        index={0}
        handleChange={mockHandleValueChange}
        handleRemove={mockHandleRemove}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handleRemove関数呼び出し確認', () => {
    render(
      <Portfolios
        portfolio={{ heading: '', url: '' }}
        index={0}
        handleChange={mockHandleValueChange}
        handleRemove={mockHandleRemove}
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleRemove).toHaveBeenCalled();
  });
});
