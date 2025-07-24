import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface ViewAllProps {
  onClick?: () => void;
}

const ViewAllBtn: React.FC<ViewAllProps> = ({ onClick }) => {
  return (
    <Button variant="outline" className="cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-1">
        <span className="text-primary text-xs font-medium flex items-center gap-1">View all</span>
        <ArrowRightIcon style={{ width: '12px !important', height: '12px !important' }} />
      </div>
    </Button>
  );
};

export default ViewAllBtn;
