import { EVENTO } from '@/lib/evento';

/**
 * A política de privacidade NÃO é bloqueada aqui. Ela já traz `noindex` na
 * própria página — e um robots.txt que proíbe rastrear impede o buscador de
 * ler justamente esse `noindex`, além de esconder um documento que, por ser
 * exigência da LGPD, precisa estar acessível a quem procurar.
 */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${EVENTO.url}/sitemap.xml`,
    host: EVENTO.url,
  };
}
