export default interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
  subMenuItems?: NavigationItem[];
}
