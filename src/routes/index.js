import FilmesPage from '../pages/filmes';
import CinemasPage from '../pages/cinemas';
import SessoesPage from '../pages/sessoes';

const routes = [
  {
    path: '/filmes',
    title: 'Filmes',
    component: FilmesPage,
  },
  {
    path: '/cinemas',
    title: 'Cinemas',
    component: CinemasPage,
  },
  {
    path: '/sessoes',
    title: 'Sessões',
    component: SessoesPage,
  },
];

export default routes;
