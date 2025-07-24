import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from '../card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });
  it('applies className and data-slot', () => {
    render(<Card className="test-class">X</Card>);
    const el = screen.getByText('X').closest('div');
    expect(el).toHaveClass('test-class');
    expect(el).toHaveAttribute('data-slot', 'card');
  });
});

describe('CardHeader', () => {
  it('renders children and props', () => {
    render(<CardHeader className="header-class">Header</CardHeader>);
    const el = screen.getByText('Header').closest('div');
    expect(el).toHaveClass('header-class');
    expect(el).toHaveAttribute('data-slot', 'card-header');
  });
});

describe('CardTitle', () => {
  it('renders children and props', () => {
    render(<CardTitle className="title-class">Title</CardTitle>);
    const el = screen.getByText('Title').closest('div');
    expect(el).toHaveClass('title-class');
    expect(el).toHaveAttribute('data-slot', 'card-title');
  });
});

describe('CardDescription', () => {
  it('renders children and props', () => {
    render(<CardDescription className="desc-class">Desc</CardDescription>);
    const el = screen.getByText('Desc').closest('div');
    expect(el).toHaveClass('desc-class');
    expect(el).toHaveAttribute('data-slot', 'card-description');
  });
});

describe('CardAction', () => {
  it('renders children and props', () => {
    render(<CardAction className="action-class">Action</CardAction>);
    const el = screen.getByText('Action').closest('div');
    expect(el).toHaveClass('action-class');
    expect(el).toHaveAttribute('data-slot', 'card-action');
  });
});

describe('CardContent', () => {
  it('renders children and props', () => {
    render(<CardContent className="content-class">Content</CardContent>);
    const el = screen.getByText('Content').closest('div');
    expect(el).toHaveClass('content-class');
    expect(el).toHaveAttribute('data-slot', 'card-content');
  });
});

describe('CardFooter', () => {
  it('renders children and props', () => {
    render(<CardFooter className="footer-class">Footer</CardFooter>);
    const el = screen.getByText('Footer').closest('div');
    expect(el).toHaveClass('footer-class');
    expect(el).toHaveAttribute('data-slot', 'card-footer');
  });
});
