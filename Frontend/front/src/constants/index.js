import { HandCoinsIcon, HomeIcon, ListPlusIcon, LogOut, UserRound, WalletCardsIcon, Blocks, ShieldHalf, Wallet2, BookUpIcon } from "lucide-react";
export const navlinks = [
  {
    name: 'Home',
    icon:HomeIcon,
    link: '/',
  },
  {
    name: 'profile',
    icon: UserRound,
    link: '/profile',
  },
  {
    name: 'campaign',
    icon: ListPlusIcon,
    link: '/create-campaign',
  },
  {
    name: 'expense',
    icon: BookUpIcon,
    link: '/expense',
  },
  {
    name:"Billing",
    icon: Wallet2,
    link: '/billing',
  },
  {
    name: 'all campaigns',
    icon: Blocks,
    link: '/all-campaigns',
  },
  {
    name: 'Income Management',
    icon: WalletCardsIcon,
    link: '/income-management',
  },
  
];
