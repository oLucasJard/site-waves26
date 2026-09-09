'use client';

import { useEffect, useRef } from 'react';
import { registrar } from '@/lib/revelar';

/**
 * Revelação por linha d'água.
 *
 * O conteúdo não aparece com fade: uma linha sobe através dele e o descobre.
 *
 * O recorte fica num elemento interno de propósito. Um `clip-path` no próprio
 * alvo faz o IntersectionObserver calcular área de interseção zero — ele nunca
 * dispararia e o conteúdo ficaria invisível para sempre. O invólucro externo
 * permanece intacto para ser observado; só o miolo é recortado.
 *
 * As bordas laterais e inferior do recorte são negativas para que descendentes
 * (ç, g, p) e sombras não sejam cortados quando o elemento está em repouso.
 */
export default function Emerge({
  children,
  atraso = 0,
  como: Como = 'div',
  className = '',
  ...resto
}) {
  const ref = useRef(null);

  useEffect(() => registrar(ref.current), []);

  return (
    <Como
      ref={ref}
      className={`emerge ${className}`.trim()}
      data-visivel="false"
      data-atraso={atraso || undefined}
      {...resto}
    >
      <span className="emerge__i">{children}</span>
    </Como>
  );
}
