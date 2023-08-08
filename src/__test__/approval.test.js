import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import Approval from '../pages/approval/[id]';
import { getServerSideProps } from '../pages/approval/[id]';
import useSWR from 'swr';

jest.mock('swr');

describe('getServerSideProps', () => {
  it('returns expected props', async () => {
    const mockContext = {
      query: { id: 'mockId' },
      req: {
        cookies: {
          userId: 'mockUserId',
          adminId: 'mockAdminId',
        },
      },
    };

    const { props } = await getServerSideProps(mockContext);

    expect(props).toEqual({
      cookie: 'mockUserId',
      userId: { id: 'mockId' },
      adminId: 'mockAdminId',
    });
  });
});

const mockData = [
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
];

const mockUserId = { id: 1 };
const mockAdminId = 1;

const server = setupServer(
  rest.put(
    `http://localhost:8000/api/request/approval/${mockData[0].id}`,
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.put(
    `http://localhost:8000/api/request/denial/${mockData[0].id}`,
    (req, res, ctx) => {
      const { adminId, adminComment } = req.body;

      expect(adminId).toBe(mockAdminId);
      expect(adminComment).toBe('Test comment');

      return res(ctx.status(200));
    }
  )
);

describe('Approval Component', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    useSWR.mockReturnValue({
      data: mockData,
      error: undefined,
    });
  });

  test('renders the approval page correctly', () => {
    render(
      <Approval
        userId={mockUserId}
        cookie={null}
        adminId={mockAdminId}
      />
    );

    expect(screen.getByText('承認する')).toBeInTheDocument();
    expect(screen.getByText('差し戻す')).toBeInTheDocument();
  });

  test('calls the correct endpoints on button click and updates status', async () => {
    render(
      <Approval
        userId={mockUserId}
        cookie={null}
        adminId={mockAdminId}
      />
    );

    let statusElement = screen.getByTestId('approvalButton');
    expect(statusElement.textContent).toBe('承認する');

    fireEvent.click(screen.getByText('承認する'));

    await waitFor(() => {
      statusElement = screen.getByTestId('sendBackButton');
      expect(statusElement.textContent).toBe('差し戻す');
    });
  });

  test('calls the correct endpoint and sends the right body', async () => {
    render(
      <Approval
        userId={mockUserId}
        cookie={null}
        adminId={mockAdminId}
      />
    );

    const statusElement = screen.getByTestId('sendBackButton');
    fireEvent.click(statusElement);

    expect(statusElement.textContent).toBe('差し戻す');
  });
});
