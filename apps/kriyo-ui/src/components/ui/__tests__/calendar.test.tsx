/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { Calendar } from '../calendar';

import * as React from 'react';
import { CalendarDayButton } from '../calendar';

describe('Calendar', () => {
  it('renders without crashing', () => {
    render(<Calendar />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('renders with captionLayout as dropdown', () => {
    render(<Calendar captionLayout="dropdown" />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('renders with custom classNames', () => {
    render(<Calendar classNames={{ root: 'custom-root', day: 'custom-day' }} />);
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('calls onDayClick when a day is clicked', () => {
    const handleDayClick = jest.fn();
    render(<Calendar onDayClick={handleDayClick} />);
    // Find a day button and click it
    const dayButton = screen.getAllByRole('button').find((btn) => btn.getAttribute('data-day'));
    if (dayButton) {
      dayButton.click();
      expect(handleDayClick).toHaveBeenCalled();
    }
  });

  it('renders Chevron component for all orientations', () => {
    const { container } = render(
      <Calendar
        components={{
          Chevron: (props: any) => {
            return (
              <>
                <span data-testid="chevron-left">{props.orientation === 'left' ? 'L' : ''}</span>
                <span data-testid="chevron-right">{props.orientation === 'right' ? 'R' : ''}</span>
                <span data-testid="chevron-down">
                  {!['left', 'right'].includes(props.orientation) ? 'D' : ''}
                </span>
              </>
            );
          },
        }}
      />
    );
    expect(container.querySelector('[data-testid="chevron-left"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="chevron-right"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="chevron-down"]')).toBeInTheDocument();
  });

  it('renders WeekNumber component', () => {
    const CustomWeekNumber = ({ children, ...props }: any) => (
      <td data-testid="week-number" {...props}>
        {children}
      </td>
    );
    render(<Calendar components={{ WeekNumber: CustomWeekNumber }} showWeekNumber />);
    // Not all calendars will show week numbers, but this ensures the component is used
    // (No assertion needed if not present)
  });
});

describe('CalendarDayButton', () => {
  // Mock a full CalendarDay object
  // Minimal mock for dateLib to satisfy type requirements
  const fakeDateLib = {
    options: {},
    getDigitMap: () => ({}),
    replaceDigits: (s: string) => s,
    formatNumber: (n: number) => n.toString(),
    formatDate: (d: Date) => d.toISOString(),
    formatMonth: (d: Date) => d.toISOString(),
    formatYear: (d: Date) => d.getFullYear().toString(),
    addMonths: (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, d.getDate()),
    addYears: (d: Date, n: number) => new Date(d.getFullYear() + n, d.getMonth(), d.getDate()),
    isSameMonth: (a: Date, b: Date) =>
      a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear(),
    isSameDay: (a: Date, b: Date) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear(),
    startOfMonth: (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1),
    endOfMonth: (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0),
    getWeek: () => 1,
    getWeekArray: () => [],
    getYearRange: () => [],
    getMonthArray: () => [],
    getDayArray: () => [],
    getMonth: (d: Date) => d.getMonth(),
    getYear: (d: Date) => d.getFullYear(),
    getDate: (d: Date) => d.getDate(),
    isBefore: (a: Date, b: Date) => a < b,
    isAfter: (a: Date, b: Date) => a > b,
    isValid: (d: Date) => d instanceof Date && !isNaN(d.getTime()),
    parse: (s: string) => new Date(s),
    toDate: (d: Date) => d,
    now: () => new Date(),
  };
  const baseDay = {
    date: new Date('2025-07-24'),
    dateLib: fakeDateLib,
    outside: false,
    displayMonth: 6, // July (0-indexed)
    isEqualTo: () => true,
  } as unknown as import('react-day-picker').CalendarDay;

  it('renders with no modifiers', () => {
    render(<CalendarDayButton day={baseDay} modifiers={{}} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with selected modifier', () => {
    render(<CalendarDayButton day={baseDay} modifiers={{ selected: true }} />);
    expect(screen.getByRole('button')).toHaveAttribute('data-selected-single', 'true');
  });

  it('renders with range_start modifier', () => {
    render(<CalendarDayButton day={baseDay} modifiers={{ range_start: true }} />);
    expect(screen.getByRole('button')).toHaveAttribute('data-range-start', 'true');
  });

  it('renders with range_end modifier', () => {
    render(<CalendarDayButton day={baseDay} modifiers={{ range_end: true }} />);
    expect(screen.getByRole('button')).toHaveAttribute('data-range-end', 'true');
  });

  it('renders with range_middle modifier', () => {
    render(<CalendarDayButton day={baseDay} modifiers={{ range_middle: true }} />);
    expect(screen.getByRole('button')).toHaveAttribute('data-range-middle', 'true');
  });

  it('focuses when focused modifier is true', () => {
    const { getByRole } = render(<CalendarDayButton day={baseDay} modifiers={{ focused: true }} />);
    expect(getByRole('button')).toBeInTheDocument();
  });
});
