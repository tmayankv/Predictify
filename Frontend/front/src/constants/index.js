import { HandCoinsIcon, HomeIcon, ListPlusIcon, LogOut, UserRound, WalletCardsIcon, Blocks } from "lucide-react";
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