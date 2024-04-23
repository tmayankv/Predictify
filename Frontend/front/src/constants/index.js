import { HandCoinsIcon, HomeIcon, ListPlusIcon, LogOut, UserRound, WalletCardsIcon, Blocks, ShieldHalf } from "lucide-react";
export const navlinks = [
  {
    name: 'Home',
    icon:HomeIcon,
    link: '/',
  },
  {
    name: 'campaign',
    icon: ListPlusIcon,
    link: '/create-campaign',
  },
  {
    name: 'all campaigns',
    icon: Blocks,
    link: '/all-campaigns',
    disabled: true,
  },
  {
    name: 'retirement planner',
    icon: ShieldHalf,
    link: '/retirement-planner',
  },
  {
    name: 'Income Management',
    icon: WalletCardsIcon,
    link: '/income-management',
    disabled: true,
  },
  {
    name: 'profile',
    icon: UserRound,
    link: '/profile',
  },
  
];
