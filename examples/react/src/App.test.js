import { render, screen } from '@testing-library/react';
import App from './App';

test('renders subscribe to published event text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Subscribe to published event/i);
  expect(linkElement).toBeInTheDocument();
});
