import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import NotificationEngineer from '../pages/notificationEngineer';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Cookies from 'js-cookie';

const mockData = [
  {
    adminComment: '',
    adminId: 1,
    applicationId: 13,
    createdAt: '2023-07-19',
    engineerComment: '',
    resultedAt: '2023-08-02',
    status: 2,
    userId: 1,
  },
  {
    adminComment: '',
    adminId: 1,
    applicationId: 14,
    createdAt: '2023-07-20',
    engineerComment: '',
    resultedAt: '2023-08-03',
    status: 3,
    userId: 1,
  },
];

// モックサーバーの設定
const server = setupServer(
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/request/receive/:userId`,
    (req, res, ctx) => {
      return res(ctx.json(mockData));
    }
  )
);

beforeAll(() => server.listen()); // テストの前にモックサーバーを開始
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); // テストの後にモックサーバーを終了

describe('SSRでcookie取得', () => {
  test('requestデータを取得して表示', async () => {
    let testRequest = null;
    server.use(
      rest.get(
        `${process.env.NEXT_PUBLIC_API_URL}/request/receive/:userId`,
        (req, res, ctx) => {
          testRequest = req;
          return res(ctx.json(mockData));
        }
      )
    );

    Cookies.set('userId', '1');

    render(<NotificationEngineer />);

    const element = await screen.findByText(/2023/i);
    expect(element).toBeInTheDocument();
  });
  
  test('日付順に並び替え', () => {
    render(<NotificationEngineer />);
  
    const sortedData = [
      {
        adminComment: '',
        adminId: 1,
        applicationId: 14,
        createdAt: '2023-07-20',
        engineerComment: '',
        resultedAt: '2023-08-03',
        status: 3,
        userId: 1,
      },
      {
        adminComment: '',
        adminId: 1,
        applicationId: 13,
        createdAt: '2023-07-19',
        engineerComment: '',
        resultedAt: '2023-08-02',
        status: 2,
        userId: 1,
      },
    ];
  
    const sortRequest = [...mockData].sort((a, b) => {
      return (
        new Date(b.resultedAt).getTime() -
        new Date(a.resultedAt).getTime()
      );
    });
  
    expect(sortRequest).toEqual(sortedData);
  });
});
