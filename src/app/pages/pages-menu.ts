import { Menu } from '../@shared/models/menu';

export const MENU_ITEMS: Menu[] = [
  {
    title: 'Filmes',
    icon: 'theaters',
    link: '/pages/movies',
  },
  {
    title: 'Watchlist',
    icon: 'list',
    link: '/pages/watchlist',
  },
  {
    title: 'Watchlist',
    icon: 'list',
    link: '/pages/watchlist',
    children: [
      {
        title: 'Favoritos',
        link: '/pages/watchlist',
      },
      {
        title: 'Assistir mais tarde',
        link: '/pages/watchlist',
      },
    ],
  },
];
