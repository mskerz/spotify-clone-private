import { Home, Search } from "lucide-react";



export type MenuItem = {
  title: string;
  url: string;
  icon?: React.ElementType;
};

export const items: MenuItem[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  
];

export function customMenuItems(newItems: MenuItem[]): MenuItem[] {
  return [ ...items, ...newItems ];
}