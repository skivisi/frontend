import { render, screen } from '@testing-library/react';
import DevelopmentExperiences from './DevelopmentExperiences';

describe('Greeting component', () => {
  test('renders Hello, John!', () => {
    render(<DevelopmentExperiences />);

    const greetingElement = screen.getByText(/Hello, John!/i);
    expect(greetingElement).toBeInTheDocument();
  });
});
