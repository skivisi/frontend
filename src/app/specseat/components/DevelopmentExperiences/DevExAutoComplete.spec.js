import { screen, render, fireEvent } from '@testing-library/react';
import DevExAutoComplete from './DevExAutoComplete';

describe('DevExAutoComplete', () => {
  let mockSetValue, dummyOptions, dummyValue;

  beforeEach(() => {
    mockSetValue = jest.fn();
    dummyOptions = [{ skill: 'Skill1' }, { skill: 'Skill2' }];
    dummyValue = ['Skill1'];
  });

  it('オートコンプリートフィールドの存在証明', () => {
    render(
      <DevExAutoComplete
        options={dummyOptions}
        value={dummyValue}
        setValue={mockSetValue}
        placeholder="Test Placeholder"
        index={0}
        skillType="testSkill"
      />
    );
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('オートコンプリートフィールドの初期値証明', () => {
    render(
      <DevExAutoComplete
        options={dummyOptions}
        value={dummyValue}
        setValue={mockSetValue}
        placeholder="Test Placeholder"
        index={0}
        skillType="testSkill"
      />
    );
    expect(screen.getByText('Skill1')).toBeInTheDocument();
  });

  it('新しいオプションの追加', () => {
    render(
      <DevExAutoComplete
        options={dummyOptions}
        value={dummyValue}
        setValue={mockSetValue}
        placeholder="Test Placeholder"
        index={0}
        skillType="testSkill"
      />
    );
    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), {
      target: { value: 'Skill2' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('Test Placeholder'), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(mockSetValue).toHaveBeenCalled();
  });

  it('オプションの削除', () => {
    render(
      <DevExAutoComplete
        options={dummyOptions}
        value={dummyValue}
        setValue={mockSetValue}
        placeholder="Test Placeholder"
        index={0}
        skillType="testSkill"
      />
    );
    fireEvent.click(screen.getByTestId('CancelIcon'));
    // .getByTestId('startDate-input')
    expect(mockSetValue).toHaveBeenCalled();
  });


  it('新しいオプションの追加', () => {
    render(
      <DevExAutoComplete
        options={dummyOptions}
        value={dummyValue}
        setValue={mockSetValue}
        placeholder="Test Placeholder"
        index={0}
        skillType="testSkill"
      />
    );
    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), {
      target: { value: 'Skill2' },
    });
    fireEvent.keyDown(screen.getByPlaceholderText('Test Placeholder'), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(mockSetValue).toHaveBeenCalledWith(
      expect.any(Function),
    );
    const setFunction = mockSetValue.mock.calls[0][0];
    const newValue = setFunction({
      developmentExperiences: [
        {
          testSkill: ['Skill1'],
        },
      ],
    });
    expect(newValue).toEqual({
      developmentExperiences: [
        {
          testSkill: ['Skill1', 'Skill2'],
        },
      ],
    });
  });
  
});
