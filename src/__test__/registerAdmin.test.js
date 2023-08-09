import RegisterAdmin from '../pages/registerAdmin'
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';

// axios をモック化して、実際のHTTPリクエストを送信しないようにする
jest.mock('axios');

describe('RegisterAdmin', () => {
  // 各テストの前にコンポーネントをレンダリングする
  beforeEach(() => {
    render(<RegisterAdmin />);
  });

  it('ボタンやフィールドがレンダリングされているか', () => {
    expect(screen.getByPlaceholderText('ユーザー')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('パスワード')).toBeInTheDocument();
    expect(screen.getByText('登録')).toBeInTheDocument();
  });

  it('stateが更新されるか', () => {
    fireEvent.change(screen.getByPlaceholderText('ユーザー'), { target: { value: 'AdminName' } });
    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('パスワード'), { target: { value: 'admin123' } });

    expect(screen.getByPlaceholderText('ユーザー')).toHaveValue('AdminName');
    expect(screen.getByPlaceholderText('メールアドレス')).toHaveValue('admin@example.com');
    expect(screen.getByPlaceholderText('パスワード')).toHaveValue('admin123');
  });

  it('フォーム送信でAPI呼び出しができるか', async () => {
    // axiosのmock実装を設定する
    (axios.post).mockResolvedValueOnce({ data: 'some data' });

    fireEvent.change(screen.getByPlaceholderText('ユーザー'), { target: { value: 'AdminName' } });
    fireEvent.change(screen.getByPlaceholderText('メールアドレス'), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('パスワード'), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByText('登録'));

    // axios.postが呼び出されることを待つ
    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    // axios.postが正しいパラメータで呼び出されたかを検証する
    expect(axios.post).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/admin/register`, {
      name: 'AdminName',
      email: 'admin@example.com',
      password: 'admin123',
      createdAt: expect.any(Date),
    });
  });
});
