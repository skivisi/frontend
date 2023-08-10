import { screen, render, fireEvent } from '@testing-library/react';
import Qualifications from './Qualifications';

describe('Qualifications', () => {
  let mockHandleRemove, mockHandleChange, mockHandleEdit;
  let dummyData = {
    qualificationId: 157,
    specId: 80,
    credential: '草むしり検定２級',
    year: '2014',
    month: '10',
  };

  beforeEach(() => {
    mockHandleRemove = jest.fn();
    mockHandleChange = jest.fn();
    mockHandleEdit = jest.fn();
  });

  it('削除ボタンの存在証明', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleRemove={mockHandleRemove}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleRemove).toHaveBeenCalled();
  });

  it('取得年選択フィールドの存在証明', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('取得年')).toBeInTheDocument();
  });

  it('取得月選択フィールドの存在証明', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('取得月')).toBeInTheDocument();
  });

  it('資格入力フィールドの存在証明', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('資格')).toBeInTheDocument();
  });
  it('取得年選択フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('取得年'), {
      target: { value: '2022' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('取得月選択フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('取得月'), {
      target: { value: '1' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('資格入力フィールドの値変更に伴う関数呼び出しの確認', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('資格'), {
      target: { value: '新しい資格' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('取得年選択フィールドの初期値確認', () => {
    render(
      <Qualifications
        qualification={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('取得年')).toHaveValue('2014');
  });

  it('取得月選択フィールドの初期値確認', () => {
    render(
      <Qualifications
        qualification={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('取得月')).toHaveValue('10');
  });

  it('資格入力フィールドの初期値確認', () => {
    render(
      <Qualifications
        qualification={dummyData}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    expect(screen.getByLabelText('資格')).toHaveValue(
      '草むしり検定２級'
    );
  });
  it('取得年選択フィールドの初期値確認', () => {
    render(
      <Qualifications
        qualification={{
          qualificationId: 160,
          specId: 80,
          credential: 'ドッ',
          acquisitionDate: '2017年7月',
        }}
        index={0}
        handleEdit={mockHandleEdit}
      />
    );
    expect(screen.getByLabelText('取得年')).toHaveValue('2017');
    expect(screen.getByLabelText('取得月')).toHaveValue('7');
  });

  it('handleChange関数の呼び出し確認', () => {
    render(
      <Qualifications
        qualification={{ credential: '', year: '', month: '' }}
        index={0}
        handleChange={mockHandleChange}
      />
    );
    fireEvent.change(screen.getByLabelText('取得年'), {
      target: { value: '2022' },
    });
    expect(mockHandleChange).toHaveBeenCalled();
  });
});
