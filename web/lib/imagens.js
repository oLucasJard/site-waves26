/**
 * Manifesto das imagens.
 *
 * Cada uma existe em AVIF, WebP e JPEG, em várias larguras — nunca acima da
 * resolução da fonte, porque ampliar não cria detalhe, só peso. O JPEG existe
 * só como retaguarda para navegador antigo e por isso para em 1600: quem não
 * tem AVIF nem WebP também não está numa tela de alta densidade.
 *
 * Gerado por `scripts/gerar-imagens.py`. Mudou a fonte? Rode de novo e ajuste
 * as larguras aqui.
 */

const JPEG_MAX = 1600;

export const IMAGENS = {
  // Aéreas 4K da DJI — a sede e a cidade
  templo: {
    larguras: [640, 1024, 1600, 2400, 3200],
    w: 3840,
    h: 2160,
  },
  paraiso: {
    larguras: [640, 1024, 1600, 2400, 3200],
    w: 3840,
    h: 2160,
  },
  serra: {
    larguras: [640, 1024, 1600, 2400, 3200],
    w: 3840,
    h: 2160,
  },
  // Vindas do vídeo de chamada, que é 1080p — essa é a resolução nativa
  terra: {
    larguras: [640, 1024, 1600, 1920],
    w: 1920,
    h: 1080,
  },
  'agua-poster': {
    larguras: [640, 1024, 1600, 1920],
    w: 1920,
    h: 1080,
  },
};

export function conjunto(base, ext) {
  const im = IMAGENS[base];
  if (!im) throw new Error(`imagem desconhecida: ${base}`);
  const larguras =
    ext === 'jpg' ? im.larguras.filter((l) => l <= JPEG_MAX) : im.larguras;
  return larguras.map((l) => `/media/${base}-${l}.${ext} ${l}w`).join(', ');
}

export function retaguarda(base) {
  const im = IMAGENS[base];
  const l = im.larguras.filter((x) => x <= JPEG_MAX).at(-1);
  return `/media/${base}-${l}.jpg`;
}
