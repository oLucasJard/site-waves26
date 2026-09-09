import { IMAGENS, conjunto, retaguarda } from '@/lib/imagens';

/**
 * Imagem responsiva.
 *
 * AVIF primeiro, WebP depois, JPEG como retaguarda. O navegador escolhe o
 * formato que entende e a largura que precisa a partir de `sizes` — quem está
 * num celular baixa o arquivo de celular, quem está num monitor de alta
 * densidade baixa o grande. Nenhuma otimização em tempo de execução: os
 * arquivos são gerados antes e servidos como estáticos.
 */
export default function Foto({ base, alt, sizes, prioridade = false, className }) {
  const im = IMAGENS[base];

  return (
    <picture>
      <source type="image/avif" srcSet={conjunto(base, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={conjunto(base, 'webp')} sizes={sizes} />
      <img
        className={className}
        src={retaguarda(base)}
        srcSet={conjunto(base, 'jpg')}
        sizes={sizes}
        width={im.w}
        height={im.h}
        alt={alt}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding={prioridade ? 'sync' : 'async'}
        fetchPriority={prioridade ? 'high' : undefined}
      />
    </picture>
  );
}
