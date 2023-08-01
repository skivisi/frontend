import DbEngineer from '../pages/dashboard/dbEngineer';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import axios from 'axios';
import { getServerSideProps } from '../pages/dashboard/dbEngineer';
jest.mock('axios');

const mockData = [
  {
    adminComment: '',
    adminId: 1,
    applicationId: 13,
    createdAt: '2023-07-19',
    engineerComment: '',
    resultedAt: '2023-07-19',
    status: 2,
    userId: 1,
  },
  {
    adminComment: '',
    adminId: 1,
    applicationId: 14,
    createdAt: '2023-07-19T09:15:47.367Z',
    engineerComment: '',
    resultedAt: '2023-07-19T09:15:47.367Z',
    status: 3,
    userId: 1,
  },
];

// MSWのサーバーをセットアップする
const server = setupServer(
  rest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/request/receive/:id`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockData));
    }
  )
);

// テスト実行前にMSWサーバーを起動
beforeAll(() => server.listen());

// 各テスト実行後にMSWサーバーをリセット
afterEach(() => server.resetHandlers());

// テスト終了後にMSWサーバーを閉じる
afterAll(() => server.close());

describe('SSRでcookie取得', () => {
  test('cookies取得できるか', async () => {
    const userId = '1';
    // const mockData = 'data';

    axios.get.mockResolvedValue({ data: mockData });

    const { props } = await getServerSideProps({
      req: { cookies: { userId } },
    });

    expect(props.requestData).toEqual(mockData);
  });
});

describe('テンプレートボタン', () => {
  beforeEach(() => {
    render(<DbEngineer />);
  });

  test('テンプレートボタンのレンダリングテスト', () => {
    const templateButton = screen.getByText('テンプレート閲覧');
    expect(templateButton).toBeInTheDocument();
  });

  test('テンプレート項目が最初は非表示であるか', () => {
    expect(screen.queryByText('FR')).not.toBeInTheDocument();
  });

  test('テンプレート項目がホバー時に表示されるか', async () => {
    const templateButton = screen.getByText('テンプレート閲覧');
    fireEvent.mouseOver(templateButton);
    const frButton = await screen.findByText('FR');
    expect(frButton).toBeInTheDocument();
  });

  test('テンプレート項目がホバー終了時に非表示になるか', async () => {
    const templateButton = screen.getByText('テンプレート閲覧');

    // ホバー開始
    fireEvent.mouseEnter(templateButton);
    let frButton = await screen.findByText('FR');
    expect(frButton).toBeInTheDocument();

    // ホバー終了
    fireEvent.mouseLeave(templateButton);

    frButton = screen.queryByText('FR');
    expect(frButton).not.toBeInTheDocument();
  });
});

describe('通知数計算', () => {
  const renderComponentWithMockData = async (mockData) => {
    render(<DbEngineer />);

    const approvedCount = Object.values(mockData).filter(
      (item) => item.status === 3
    ).length;
    const returnedCount = Object.values(mockData).filter(
      (item) => item.status === 2
    ).length;
    const totalCount = approvedCount + returnedCount;

    const displayedTotalCount = await screen.findAllByText(
      new RegExp(totalCount.toString(), 'i')
    );

    expect(displayedTotalCount[0]).toBeInTheDocument();
  };

  test('statusが3の場合', async () => {
    const mockData = {
      adminComment: '',
      adminId: 1,
      applicationId: 14,
      createdAt: '2023-07-19T09:15:47.367Z',
      engineerComment: '',
      resultedAt: '2023-07-19T09:15:47.367Z',
      status: 3,
      userId: 1,
    };
    await renderComponentWithMockData(mockData);
  });

  test('statusが2の場合', async () => {
    const mockData = {
      adminComment: '',
      adminId: 1,
      applicationId: 13,
      createdAt: '2023-07-19',
      engineerComment: '',
      resultedAt: '2023-07-19',
      status: 2,
      userId: 1,
    };
    await renderComponentWithMockData(mockData);
  });
  test('statusが2と3が含まれている場合', async () => {
    const mockData = [
      {
        adminComment: '',
        adminId: 1,
        applicationId: 13,
        createdAt: '2023-07-19',
        engineerComment: '',
        resultedAt: '2023-07-19',
        status: 2,
        userId: 1,
      },
      {
        adminComment: '',
        adminId: 1,
        applicationId: 14,
        createdAt: '2023-07-19T09:15:47.367Z',
        engineerComment: '',
        resultedAt: '2023-07-19T09:15:47.367Z',
        status: 3,
        userId: 1,
      },
    ];
    await renderComponentWithMockData(mockData);
  });
  test('stausが1の場合', async () => {
    const mockData = {
      adminComment: '',
      adminId: 1,
      applicationId: 14,
      createdAt: '2023-07-19T09:15:47.367Z',
      engineerComment: '',
      resultedAt: '2023-07-19T09:15:47.367Z',
      status: 1,
      userId: 1,
    };

    await renderComponentWithMockData(mockData);
  });
});
