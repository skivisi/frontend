import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react';
import NotificationList from '../pages/notificationList';
import useSWR from 'swr';

jest.mock('swr', () => jest.fn());

// テスト前に実行される処理
beforeEach(() => {
  useSWR.mockImplementation(() => ({
    data: [
      {
        id: 1,
        user: {
          userId: 'user1',
          employeeNumber: '123',
          joinDate: '2020-05-01',
          userName: 'John Doe',
          affiliation: 'Engineering',
        },
        status: 1,
        engineerComment: 'Test comment',
      },
    ],
    error: null,
  }));
});

test('NotificationListレンダリング', () => {
  render(<NotificationList />);

  // データが表示されているか
  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.getByText('2020-05-01')).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Engineering')).toBeInTheDocument();

  // トグルイベント
  const toggleButton = screen.getByText(/▼/i);
  fireEvent.click(toggleButton);

  // コメントが表示されているかを確認
  expect(screen.getByText('Test comment')).toBeInTheDocument();

  // トグルイベント
  fireEvent.click(toggleButton);

  // コメントが非表示になっているかを確認
  expect(screen.queryByText('Test comment')).not.toBeInTheDocument();
});

test('サーバーエラーの場合', async () => {
  // エラーになるモック
  useSWR.mockImplementation(() => ({
    data: null,
    error: new Error('Server error'),
  }));

  render(<NotificationList />);

  // "通知がありません"が表示
  expect(screen.getByText(/通知はありません/i)).toBeInTheDocument();
});
