
import { render, screen } from '@testing-library/react';
import { Chart } from './Chart';

describe('Chart component', () => {
  it('renders correctly', () => {
    // Prepare mock data for the chart
    const skillPoints = {
      FR: 5,
      BK: 6,
      DB: 7,
      SBR: 4,
      AR: 8,
      TS: 6,
      COM: 9
    };

    render(<Chart skill={skillPoints} />);

    expect(screen.getByRole('img')).toBeTruthy();
  });
});
