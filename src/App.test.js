import { render, screen } from '@testing-library/react';
import FirstApp from './App';

test('renders learn react link', () => {
  render(<FirstApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
