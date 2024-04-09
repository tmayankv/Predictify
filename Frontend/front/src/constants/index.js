import { HandCoinsIcon, HomeIcon, ListPlusIcon, LogOut, UserRound, WalletCardsIcon } from "lucide-react";

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
    name: 'withdraw',
    icon: WalletCardsIcon,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    icon: UserRound,
    link: '/profile',
  },
  {
    name: 'logout',
    icon: LogOut,
    link: '/',
    disabled: true,
  },
];
