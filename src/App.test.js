import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders game board & controls', async () => {
  render(<App />);

  const title = await screen.findByText(/reactjs game of life/i);
  const boardGame = await screen.findByTestId('boardGame');
  const startButton = await screen.findByRole('button', {
    name: /start/i,
  });
  const randomButton = await screen.findByRole('button', {
    name: /random/i,
  });
  const clearButton = await screen.findByRole('button', {
    name: /start/i,
  });

  expect(title).toBeInTheDocument();
  expect(boardGame).toBeInTheDocument();
  expect(startButton).toBeInTheDocument();
  expect(randomButton).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
});

test('calls button functions', async () => { 
  const mockRun = jest.fn();
  const mockRandom = jest.fn();
  const mockClear = jest.fn();
  render(<App />);

  const startButton = await screen.findByRole('button', {
    name: /start/i,
  });
  const stopButton = await screen.findByRole('button', {
    name: /start/i,
  });
  const randomButton = await screen.findByRole('button', {
    name: /random/i,
  });
  const clearButton = await screen.findByRole('button', {
    name: /start/i,
  });

  fireEvent.click(startButton, { onClick: mockRun() });
  expect(mockRun).toHaveBeenCalledTimes(1);
  expect(stopButton).toBeInTheDocument();
  fireEvent.click(randomButton, { onClick: mockRandom() });
  expect(mockRandom).toHaveBeenCalledTimes(1);
  fireEvent.click(clearButton, { onClick: mockClear() });
  expect(mockClear).toHaveBeenCalledTimes(1);
 })
