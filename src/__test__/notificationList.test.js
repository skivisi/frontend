import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react';
import NotificationList from '../pages/notificationList';

import useSWR from 'swr';

jest.mock('swr', () => jest.fn());

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

test('NotificationList component should render correctly', () => {
  render(<NotificationList />);

  // Check if the data is displayed correctly
  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.getByText('2020-05-01')).toBeInTheDocument();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Engineering')).toBeInTheDocument();

  // Toggle visibility
  const toggleButton = screen.getByText(/▼/i);
  fireEvent.click(toggleButton);

  // Check if the comment is shown
  expect(screen.getByText('Test comment')).toBeInTheDocument();

  // Toggle visibility again
  fireEvent.click(toggleButton);

  // Check if the comment is hidden
  expect(screen.queryByText('Test comment')).not.toBeInTheDocument();
});

test('handles server error', async () => {
  // Mock useSWR for error scenario
  useSWR.mockImplementation(() => ({
    data: null,
    error: new Error('Server error'),
  }));

  render(<NotificationList />);

  // Since the error is mocked to be a server error, "通知はありません" should be displayed
  expect(screen.getByText(/通知はありません/i)).toBeInTheDocument();
});
