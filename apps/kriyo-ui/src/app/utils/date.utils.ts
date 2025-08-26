const getRelativeDateToToday = (date?: string): string => {
  if (!date) return '';
  const d = new Date(date);
  const today = new Date();
  if (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }
  const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `in ${diff} day${diff > 1 ? 's' : ''}`;
  if (diff < 0) return `${Math.abs(diff)} day${Math.abs(diff) > 1 ? 's' : ''} ago`;
  return d.toLocaleDateString();
};

const dateUtils = {
  getRelativeDateToToday,
};

export default dateUtils;
