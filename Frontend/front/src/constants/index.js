import { HandCoinsIcon, HomeIcon, ListPlusIcon, LogOut, UserRound, WalletCardsIcon, Blocks, ShieldHalf, Wallet2, BookUpIcon, LucideBellRing, ContactIcon } from "lucide-react";
export const navlinks = [
  {
    name: 'Dashboard',
    icon:HomeIcon,
    link: '/dashboard',
  },
  {
    name: 'profile',
    icon: UserRound,
    link: '/profile',
  },
  {
    name: 'Notifications',
    icon: LucideBellRing,
    link: '/notifications',
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
    name: 'Contact',
    icon: ContactIcon,
    link: '/contact',
  },
  {
    name: 'Income Management',
    icon: WalletCardsIcon,
    link: '/income-management',
  },
];
