import { HandCoinsIcon, HomeIcon, ListPlusIcon, LogOut, UserRound, WalletCardsIcon, Blocks, ShieldHalf, Wallet2 } from "lucide-react";
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
  },
  {
    NAME:"Billing",
    icon: Wallet2,
    link: '/billing',
  },
  {
    name: 'profile',
    icon: UserRound,
    link: '/profile',
  },
  
];
