import { render, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import DbSales from './DbSales';
import { autoComplete } from '../../app/specseat/_lib/autoComplete';

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('../../app/specseat/_lib/autoComplete');

describe('DbSales', () => {
  let mockRouterPush = jest.fn();
  let mockData;

  beforeEach(() => {
    (useRouter).mockImplementation(() => ({
      push: mockRouterPush,
    }));
    mockData = {
      mockAutoComplete:["JavaScript","TypeScript"]
    };
    autoComplete.mockImplementation(() => mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //APIを叩き、usernameを取得できるか及びページ遷移ができるのかのテスト
  it('fetches users on button click', async () => {
    // autoComplete.mockImplementation(() => mockData);
    const searchUser = 'Test User';
    const foundUser = { username: searchUser };
    //mockResolvedValueOnceは一度だけ動作するモック
    (axios.get).mockResolvedValueOnce({ data: foundUser });

    const { getByPlaceholderText, getByTestId } = render(<DbSales />);

    const input = getByPlaceholderText('ユーザー名を入力してください');
    const button = getByTestId('search-button-1');

    await act(async () => {
      fireEvent.change(input, { target: { value: searchUser } });
      fireEvent.click(button);
    });

    expect(axios.get).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/search/users`, {
      params: {
        userName: searchUser,
      },
    });

    await waitFor(() =>
      expect(mockRouterPush).toHaveBeenCalledWith(
        `/searchResult/searchSales?foundUser=${encodeURIComponent(
          JSON.stringify(foundUser)
        )}`
      )
    );
  });
  //バリデーションメッセージが表示されるかのテスト
  it('displays validation message when search field is empty', async () => {
    const { getByPlaceholderText, getByTestId,getByText } = render(<DbSales />);

    const input = getByPlaceholderText('ユーザー名を入力してください');
    const button = getByTestId('search-button-1');

    await act(async () => {
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.click(button);
    });

    expect(axios.get).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(getByText('ユーザー名を入力してください')).toBeInTheDocument(),
      { timeout: 2000 }
    );
  });
});
