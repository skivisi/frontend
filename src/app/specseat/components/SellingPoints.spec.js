import { screen, render, fireEvent } from '@testing-library/react';
import SellingPoints from './SellingPoints';

describe('SellingPoints', () => {
  let mockHandleRemove, mockHandleChange, mockHandleEdit;
  let dummyData = {
    sellingPointId: 173,
    specId: 80,
    title: 'うにたこ',
    content: 'エビかに',
  };

  beforeEach(() => {
    mockHandleRemove = jest.fn();
    mockHandleChange = jest.fn();
    mockHandleEdit = jest.fn();
  });

  it('削除ボタンの存在証明,呼び出し確認', () => {
    render(
      <SellingPoints
        sellingPoint={{ title: '', content: '' }}
        index={0}
        handleRemove={mockHandleRemove}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleRemove).toHaveBeenCalled();
  });

  it('タイトル入力フィールドの存在証明', () => {
    render(
      <SellingPoints
        sellingPoint={{ title: '', content: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('タイトル')).toBeInTheDocument();
  });

  it('内容入力フィールドの存在証明', () => {
    render(
      <SellingPoints
        sellingPoint={{ title: '', content: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('内容')).toBeInTheDocument();
  });

  it('タイトル入力フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <SellingPoints
        sellingPoint={{ title: '', content: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('タイトル'), {
      target: { value: '新しいタイトル' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('内容入力フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <SellingPoints
        sellingPoint={{ title: '', content: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('内容'), {
      target: { value: '新しい内容' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('タイトル入力フィールドの初期値確認', () => {
    render(
      <SellingPoints
        sellingPoint={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('タイトル')).toHaveValue('うにたこ');
  });

  it('内容入力フィールドの初期値確認', () => {
    render(
      <SellingPoints
        sellingPoint={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('内容')).toHaveValue('エビかに');
  });

  it('handleEdit関数の呼び出し確認', () => {
    render(
      <SellingPoints
        sellingPoint={{ title: '', content: '' }}
        index={0}
        handleChange={mockHandleChange}
        handleEdit={mockHandleEdit}
      />
    );
    fireEvent.change(screen.getByLabelText('タイトル'), {
      target: { value: '新しいタイトル' },
    });
    expect(mockHandleEdit).toHaveBeenCalled();
    expect(mockHandleChange).not.toHaveBeenCalled();
  });

  it('handleChange関数の呼び出し確認', () => {
    render(
      <SellingPoints
        sellingPoint={{ title: '', content: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('タイトル'), {
      target: { value: '新しいタイトル' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
