import { Menu } from '../@shared/models/menu';

export const MENU_ITEMS: Menu[] = [
  {
    title: 'Filmes',
    icon: { icon: 'movie', fontSet: 'material-icons-outlined' },
    link: '/pages/movies',
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
