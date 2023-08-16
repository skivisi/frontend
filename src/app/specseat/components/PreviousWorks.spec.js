import { screen, render, fireEvent } from '@testing-library/react';
import PreviousWorks from './PreviousWorks';

describe('PreviousWorks', () => {
  let mockHandleRemove, mockHandleChange, mockHandleEdit;
  let dummyData = {
    previousWorkId: 141,
    specId: 80,
    industry: 'ニート',
    occupation: '自宅',
    JobDuties: '自宅警備',
  };

  beforeEach(() => {
    mockHandleRemove = jest.fn();
    mockHandleChange = jest.fn();
    mockHandleEdit = jest.fn();
  });

  it('削除ボタンの存在証明', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleRemove={mockHandleRemove}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleRemove).toHaveBeenCalled();
  });

  it('業界入力フィールドの存在証明', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('業界')).toBeInTheDocument();
  });

  it('業種入力フィールドの存在証明', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('業種')).toBeInTheDocument();
  });

  it('業務内容入力フィールドの存在証明', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('業務内容')).toBeInTheDocument();
  });

  it('業界入力フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('業界'), {
      target: { value: '新しい業界' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('業種入力フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('業種'), {
      target: { value: '新しい業種' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('業務内容入力フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('業務内容'), {
      target: { value: '新しい業務内容' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });
  it('業界入力フィールドの初期値確認', () => {
    render(
      <PreviousWorks
        previousWork={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('業界')).toHaveValue('ニート');
  });

  it('業種入力フィールドの初期値確認', () => {
    render(
      <PreviousWorks
        previousWork={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('業種')).toHaveValue('自宅');
  });

  it('業務内容入力フィールドの初期値確認', () => {
    render(
      <PreviousWorks
        previousWork={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('業務内容')).toHaveValue('自宅警備');
  });
  it('handleEdit関数の呼び出し確認', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
        handleEdit={mockHandleEdit}
      />
    );
    fireEvent.change(screen.getByLabelText('業界'), {
      target: { value: '新しい業界' },
    });
    expect(mockHandleEdit).toHaveBeenCalled();
    expect(mockHandleChange).not.toHaveBeenCalled();
  });

  it('handleChange関数の呼び出し確認', () => {
    render(
      <PreviousWorks
        previousWork={{ industry: '', occupation: '', JobDuties: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('業界'), {
      target: { value: '新しい業界' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
