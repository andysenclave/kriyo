import { render, screen, fireEvent } from '@testing-library/react';
import { ViewAllBtn } from '../../';

describe('ViewAllBtn', () => {
  it('renders with correct label', () => {
    render(<ViewAllBtn />);
    expect(screen.getByText('View all')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ViewAllBtn onClick={handleClick} />);
    fireEvent.click(screen.getByText('View all'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
