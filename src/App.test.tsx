import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('renders title of todo', () => {
  render(<App />);
  const linkElement = screen.getByText(/and ease your/i);
  expect(linkElement).toBeInTheDocument();
});

test('check form element in header', () => {
  render(<App />);
  const headerElement = screen.getByTestId('form-element')
  expect(headerElement).toBeInTheDocument();
});




// test('category should not be empty', () => {
//   render(<App />);
//   const inputCategory = screen.getByPlaceholderText(/Enter category of Todo/i);
//   expect(inputCategory.values).toBe('category');
// });


