import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface ViewAllProps {
  onClick?: () => void;
  text?: string;
}

const ViewAllBtn: React.FC<ViewAllProps> = ({ onClick, text }) => {
  return (
    <Button variant="outline" className="cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-1">
        <span className="text-primary text-xs font-medium flex items-center gap-1">
          {text || 'View all'}
        </span>
        <ArrowRightIcon style={{ width: '12px !important', height: '12px !important' }} />
      </div>
    </Button>
  );
};

export default ViewAllBtn;
