import { EVENTO, DATAS_EXTENSO } from '@/lib/evento';

/**
 * Manifesto do app. Quem salva o site na tela de início — e boa parte do
 * público chega pelo link na bio do Instagram e faz exatamente isso — ganha
 * ícone e nome próprios em vez de uma miniatura da página.
 */
export default function manifest() {
  return {
    name: `${EVENTO.nome} — ${EVENTO.tema}`,
    short_name: 'Waves 26',
    description: `${DATAS_EXTENSO}. ${EVENTO.local.nome}, ${EVENTO.local.cidade}.`,
    lang: 'pt-BR',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#04101e',
    theme_color: '#04101e',
    icons: [
      { src: '/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/favicon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/brand/favicon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
