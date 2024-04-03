import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

afterEach(cleanup)

test('Renders all main elements', async () => {
  render(<App />);
  expect(screen.getByText(/Text Readability Analyzer/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Enter text to analyze/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Analyze/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
  expect(screen.getByText(/© 2024 Aleksandra. All Rights Reserved./i)).toBeInTheDocument();
});

test('Clicking clear button clears the textarea', async () => {
  render(<App />);
  const input = screen.getByLabelText(/Enter text to analyze/i) as HTMLInputElement;
  await act(async () => {
    userEvent.type(input, 'Test text');
  });
  
  const clearButton = screen.getByRole('button', { name: /Clear/i });
  
  await act(async () => {
    fireEvent.click(clearButton);
  });

  expect(input.value).toBe('');
});

