import { render, screen } from '@testing-library/react';
// eslint-disable-next-line react/display-name
jest.mock('../pages/Dashboard', () => () => <div data-testid="dashboard">DashboardPage</div>);
import Home from '../page';

describe('Home page', () => {
  it('renders DashboardPage', () => {
    render(<Home />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});
