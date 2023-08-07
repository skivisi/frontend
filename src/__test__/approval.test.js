import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Approval from '../pages/approval/[id]';
import useSWR from 'swr';

jest.mock('swr');

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

// Define API endpoints and responses
let approvalHandlerCalled = false;
let denialHandlerCalled = false;

const server = setupServer(
  rest.put(`http://localhost:8000/api/request/approval/${mockData[0].id}`, (req, res, ctx) => {
    approvalHandlerCalled = true;
    return res(ctx.json({ message: 'Success' }));
  }),
  rest.put(`http://localhost:8000/api/request/denial/${mockData[0].id}`, (req, res, ctx) => {
    denialHandlerCalled = true;
    return res(ctx.json({ message: 'Success' }));
  })
);

describe("Approval Component", () => {
  beforeAll(() => server.listen()); // Start the mock service worker
  afterEach(() => {
    server.resetHandlers(); // Reset any request handlers that we may add during the tests
    approvalHandlerCalled = false;
    denialHandlerCalled = false;
  });
  afterAll(() => server.close()); // Clean up after the tests are finished

  beforeEach(() => {
    (useSWR).mockReturnValue({
      data: mockData,
      error: undefined,
    });
  });

  test('renders the approval page correctly', () => {
    render(<Approval userId={mockUserId} cookie={null} adminId={mockAdminId} />);

    expect(screen.getByText('承認する')).toBeInTheDocument();
    expect(screen.getByText('差し戻す')).toBeInTheDocument();
  });

  test('calls the correct endpoints on button click', async () => {
    render(<Approval userId={mockUserId} cookie={null} adminId={mockAdminId} />);

    fireEvent.click(screen.getByText('承認する'));
    await waitFor(() => {
      expect(approvalHandlerCalled).toBe(true);
    }, { timeout: 5000 });

    fireEvent.click(screen.getByText('差し戻す'));
    await waitFor(() => {
      expect(denialHandlerCalled).toBe(true);
    }, { timeout: 5000 });
  });
});
