import LoginAdmin from "../pages/loginAdmin";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
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
  // test("email and password", async () => {
  //   const { getByPlaceholderText,getById } = render(<LoginAdmin />);

  //   fireEvent.change(getByPlaceholderText("メールアドレス"), {
  //     target: { value: email },
  //   });
  //   fireEvent.change(getByPlaceholderText("パスワード"), {
  //     target: { value: password },
  //   });

  //   expect(getByPlaceholderText('メールアドレス').value).toBe(email);
  //   expect(getByPlaceholderText('パスワード').value).toBe(password);
  // });
  test("handleSubmit function", async () => {
    // Mock axios.post
    const mockedAxios = axios;
    mockedAxios.post.mockResolvedValueOnce({
      data: { adminId: '1' },
    });

    const { getByPlaceholderText } = render(<LoginAdmin />);

    fireEvent.change(getByPlaceholderText("メールアドレス"), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText("パスワード"), {
      target: { value: password },
    });
    expect(getByPlaceholderText('メールアドレス').value).toBe(email);
    expect(getByPlaceholderText('パスワード').value).toBe(password);

    // Simulate form submission
    fireEvent.submit(getByPlaceholderText('メールアドレス'));

    // Wait for promises to resolve
    await waitFor(() => {
      // Assert axios.post was called
      expect(mockedAxios.post).toHaveBeenCalled();
      // Assert axios.post was called with correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`,
        {
          email:email,
          password:password
        }
      );
      // Assert cookie was set
      expect(setCookie).toHaveBeenCalledWith('adminId', '1', { path: '/', secure: true });
    });
  });
});
