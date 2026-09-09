import { EVENTO } from '@/lib/evento';

/**
 * O site é estático: este módulo roda uma vez, na geração. `PUBLICADO` fica
 * sendo a data do build — que é exatamente o que `lastModified` quer dizer.
 */
const PUBLICADO = new Date();

export default function sitemap() {
  return [
    { url: `${EVENTO.url}/`, lastModified: PUBLICADO, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${EVENTO.url}/inscricao`,
      lastModified: PUBLICADO,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
