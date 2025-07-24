import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('applies the correct variant class', () => {
    const { rerender } = render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText('Destructive').className).toMatch(/destructive/);
    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline').className).toMatch(/outline/);
  });

  it('applies the correct size class', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small').className).toMatch(/h-8/);
    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large').className).toMatch(/h-10/);
  });

  it('renders as a different element when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#">Link</a>
      </Button>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
