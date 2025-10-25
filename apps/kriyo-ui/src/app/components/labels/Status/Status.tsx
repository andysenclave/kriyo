const STATUS_MAP = Object.freeze({
  planning: {
    display: 'To Do',
    color: 'bg-purple-200 text-purple-900',
  },
  todo: {
    display: 'To Do',
    color: 'bg-cyan-200 text-cyan-900',
  },
  'in-progress': {
    display: 'In Progress',
    color: 'bg-blue-200 text-blue-800',
  },
  active: {
    display: 'Active',
    color: 'bg-blue-200 text-blue-800',
  },
  'in-review': {
    display: 'In Review',
    color: 'bg-orange-200 text-orange-800',
  },
  done: {
    display: 'Done',
    color: 'bg-green-200 text-green-800',
  },
  'on-hold': {
    display: 'On hold',
    color: 'bg-red-200 text-red-800',
  },
  blocked: {
    display: 'Blocked',
    color: 'bg-red-200 text-red-800',
  },
  completed: {
    display: 'Completed',
    color: 'bg-green-400 text-green-900',
  },
  cancelled: {
    display: 'Cancelled',
    color: 'bg-gray-400 text-gray-900',
  },
});

interface StatusLabelProps {
  status: keyof typeof STATUS_MAP;
}

const StatusLabel: React.FC<StatusLabelProps> = ({
  status,
}: {
  status: keyof typeof STATUS_MAP;
}) => {
  const statusInfo = STATUS_MAP[status] || STATUS_MAP.todo;

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
      {statusInfo.display}
    </span>
  );
};

export default StatusLabel;
