import LoginAdmin from "../pages/loginAdmin";
import {
  fireEvent,
  render,
  waitFor,
  screen,
} from '@testing-library/react';
import axios from 'axios';
import React from 'react';
jest.mock('react-cookie');

jest.mock('axios');

const setCookie = jest.fn();
const getCookie = jest.fn();
  jest.mock('react-cookie', () => ({
    useCookies: () => [getCookie, setCookie],
  }));

const email = 'test@example.com';
const password = 'password123';

describe("LoginAdmin component", () => {
  // handleSubmit関数の動作をテストする
  test("handleSubmit function", async () => {
    const mockedAxios = axios;
    // axios.postが成功した場合の返り値をモックする
    mockedAxios.post.mockResolvedValueOnce({
      data: { adminId: '1' },
    });
    // window.location.href の代入をモックする
    Object.defineProperty(window, 'location', {
      value: {
        href: jest.fn(),
      },
      writable: true,
    });

    const { getByPlaceholderText } = render(<LoginAdmin />);
    // メールアドレスとパスワードの入力フィールドに値を入力する
    fireEvent.change(getByPlaceholderText("メールアドレス"), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText("パスワード"), {
      target: { value: password },
    });
    // 入力されたメールアドレスとパスワードが正しいか確認する
    expect(getByPlaceholderText('メールアドレス').value).toBe(email);
    expect(getByPlaceholderText('パスワード').value).toBe(password);
    // clickイベントを発火させる
    fireEvent.click(screen.getByText('ログイン'));
    // axios.postが正しく呼び出されたか、適切な引数で呼び出されたか、
    // 他の期待される動作が行われたかを確認する
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`,
        {
          email:email,
          password:password
        }
      );
      expect(setCookie).toHaveBeenCalledWith('adminId', '1', { path: '/', secure: true });
      expect(window.location.href).toBe('/dashboard/dbAdmin');
    });
  });

  //APIがエラーを返したとき(catch (error))に適切に処理できるかのテスト
  test("handleSubmit function error handling", async () => {
     // window.location.href の代入をモックする
    Object.defineProperty(window, 'location', {
      value: {
        href: jest.fn(),
      },
      writable: true,
    });
    // axios.post がエラーを返すようにモックする
    const mockedError = new Error('Request failed');
    axios.post.mockRejectedValueOnce(mockedError);
    // console.log の呼び出しをモックし、実際のログ出力を防ぐ
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { getByPlaceholderText } = render(<LoginAdmin />);

    fireEvent.change(getByPlaceholderText("メールアドレス"), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText("パスワード"), {
      target: { value: password },
    });

    fireEvent.click(screen.getByText('ログイン'));
    // console.log がモックのエラーで呼び出されたかを確認する
    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith(mockedError);
    });
    // logSpy のモックをリストア（他のテストケースで console.log のオリジナルの動作が影響を受けないように復元）する
    logSpy.mockRestore();
  });
});
