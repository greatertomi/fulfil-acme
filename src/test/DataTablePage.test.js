import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import DataTablePage from '../pages/DataTablePage';
import { testAxios } from './testUtil/testAxios';

test('Checks if page render properly', async () => {
  render(<DataTablePage />);

  expect(
    await screen.getByRole('heading', { name: /data table/i })
  ).toHaveTextContent('Data Table');
});

test('Check if it fetches from api', async () => {
  const data = await testAxios('https://jsonplaceholder.typicode.com/photos');
  expect(data.length).toBeGreaterThan(0);
});
