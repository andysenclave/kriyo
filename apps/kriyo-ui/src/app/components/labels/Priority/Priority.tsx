import { ChevronsDown, ChevronsUp, EqualApproximately } from 'lucide-react';

const PRIORITY_MAP = Object.freeze({
  high: {
    display: 'High',
    Icon: ChevronsUp,
    color: 'bg-red-100 text-red-800 border-red-200',
  },
  medium: {
    display: 'Medium',
    Icon: EqualApproximately,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  low: {
    display: 'Low',
    Icon: ChevronsDown,
    color: 'bg-green-100 text-green-800 border-green-200',
  },
  none: {
    display: 'None',
    Icon: EqualApproximately,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
  },
});

interface PriorityLabelProps {
  priority: keyof typeof PRIORITY_MAP;
}

const PriorityLabel: React.FC<PriorityLabelProps> = ({
  priority,
}: {
  priority: keyof typeof PRIORITY_MAP;
}) => {
  const { color, display, Icon } = PRIORITY_MAP[priority] || PRIORITY_MAP.low;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium flex flex-row ${color}`}
      style={{ alignItems: 'center' }}
    >
      <Icon className="w-3 h-3 mr-1" />
      {display}
    </span>
  );
};

export default PriorityLabel;
