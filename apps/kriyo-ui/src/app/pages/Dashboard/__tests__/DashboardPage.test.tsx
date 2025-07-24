/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('../components/PlannedTasks', () => () => (
  <div data-testid="planned-tasks">PlannedTasks</div>
));
jest.mock('../components/ProjectList', () => () => (
  <div data-testid="project-list">ProjectList</div>
));
jest.mock('../components/Calendar', () => () => <div data-testid="calendar">Calendar</div>);
jest.mock('../components/TaskActionArea', () => () => (
  <div data-testid="task-action-area">TaskActionArea</div>
));

import DashboardPage from '../';

describe('DashboardPage', () => {
  it('renders all main dashboard sections', () => {
    render(<DashboardPage />);
    expect(screen.getByTestId('planned-tasks')).toBeInTheDocument();
    expect(screen.getByTestId('project-list')).toBeInTheDocument();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
    expect(screen.getByTestId('task-action-area')).toBeInTheDocument();
  });
});
