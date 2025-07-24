import { render, screen } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../dialog';

describe('Dialog', () => {
  it('renders children when open', () => {
    render(<Dialog open={true}>Dialog Content</Dialog>);
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });
});

describe('DialogTrigger', () => {
  it('renders children and data-slot', () => {
    render(
      <Dialog>
        <DialogTrigger>Trigger</DialogTrigger>
      </Dialog>
    );
    const el = screen.getByText('Trigger');
    expect(el).toHaveAttribute('data-slot', 'dialog-trigger');
  });
});

describe('DialogClose', () => {
  it('renders children and data-slot', () => {
    render(
      <Dialog>
        <DialogClose>Close</DialogClose>
      </Dialog>
    );
    const el = screen.getByText('Close');
    expect(el).toHaveAttribute('data-slot', 'dialog-close');
  });
});

describe('DialogContent', () => {
  it('renders children and data-slot', () => {
    render(
      <Dialog open={true}>
        <DialogContent>Content</DialogContent>
      </Dialog>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    // Should render close button by default
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
  it('does not render close button if showCloseButton is false', () => {
    render(
      <Dialog open={true}>
        <DialogContent showCloseButton={false}>NoClose</DialogContent>
      </Dialog>
    );
    expect(screen.getByText('NoClose')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });
});

describe('DialogHeader', () => {
  it('renders children and data-slot', () => {
    render(
      <Dialog>
        <DialogHeader className="header-class">Header</DialogHeader>
      </Dialog>
    );
    const el = screen.getByText('Header').closest('div');
    expect(el).toHaveClass('header-class');
    expect(el).toHaveAttribute('data-slot', 'dialog-header');
  });
});

describe('DialogFooter', () => {
  it('renders children and data-slot', () => {
    render(
      <Dialog>
        <DialogFooter className="footer-class">Footer</DialogFooter>
      </Dialog>
    );
    const el = screen.getByText('Footer').closest('div');
    expect(el).toHaveClass('footer-class');
    expect(el).toHaveAttribute('data-slot', 'dialog-footer');
  });
});

describe('DialogTitle', () => {
  it('renders children and data-slot', () => {
    render(
      <Dialog>
        <DialogTitle className="title-class">Title</DialogTitle>
      </Dialog>
    );
    const el = screen.getByText('Title');
    expect(el).toHaveClass('title-class');
    expect(el).toHaveAttribute('data-slot', 'dialog-title');
  });
});

describe('DialogDescription', () => {
  it('renders children and data-slot', () => {
    render(
      <Dialog>
        <DialogDescription className="desc-class">Desc</DialogDescription>
      </Dialog>
    );
    const el = screen.getByText('Desc');
    expect(el).toHaveClass('desc-class');
    expect(el).toHaveAttribute('data-slot', 'dialog-description');
  });
});
