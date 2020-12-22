import { screen } from '@testing-library/dom';

test('renders without crashing', () => {
  const app = document.createElement('div');
  app.setAttribute('id', 'app');
  document.body.appendChild(app);
  require('main');
  const link = screen.queryByRole('link');
  expect(link).toBeInTheDocument();
});
