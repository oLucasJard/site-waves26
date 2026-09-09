'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Foto from '@/components/Foto';

const TRILHO_SIZES = '(min-width: 900px) 520px, 78vw';

const FOTOS = [
  {
    base: 'paraiso',
    alt: 'Vista aérea de Paraíso do Tocantins',
    titulo: 'Paraíso do Tocantins',
    subtitulo: 'A cidade onde a onda começa e se espalha',
  },
  {
    base: 'templo',
    alt: 'Vista aérea da sede da MANT Paraíso',
    titulo: 'MANT Paraíso — Sede',
    subtitulo: 'Rua L10, 269 — Interlagos. Onde tudo acontece',
  },
  {
    base: 'serra',
    alt: 'A serra que cerca Paraíso do Tocantins',
    titulo: 'A terra que a onda vai cobrir',
    subtitulo: 'Da nossa cidade para toda a região',
  },
  {
    base: 'agua-poster',
    alt: 'Superfície do mar com águas profundas',
    titulo: 'Como as águas cobrem o mar',
    subtitulo: 'Habacuque 2.14',
  },
];

export default function TrilhoCarrossel() {
  const trilhoRef = useRef(null);
  const [podeRolarEsq, setPodeRolarEsq] = useState(false);
  const [podeRolarDir, setPodeRolarDir] = useState(true);
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const [estaArrastando, setEstaArrastando] = useState(false);
  const inicioX = useRef(0);
  const scrollInicio = useRef(0);

  const atualizarBotoes = useCallback(() => {
    const el = trilhoRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setPodeRolarEsq(scrollLeft > 10);
    setPodeRolarDir(scrollLeft < scrollWidth - clientWidth - 10);

    // Calcular card mais próximo do centro
    const itens = el.children;
    const centroTrilho = scrollLeft + clientWidth / 2;
    let maisProximo = 0;
    let menorDistancia = Infinity;

    for (let i = 0; i < itens.length; i++) {
      const item = itens[i];
      const centroItem = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(centroTrilho - centroItem);
      if (dist < menorDistancia) {
        menorDistancia = dist;
        maisProximo = i;
      }
    }
    setIndiceAtivo(maisProximo);
  }, []);

  useEffect(() => {
    const el = trilhoRef.current;
    if (!el) return;
    atualizarBotoes();
    el.addEventListener('scroll', atualizarBotoes, { passive: true });
    window.addEventListener('resize', atualizarBotoes, { passive: true });
    return () => {
      el.removeEventListener('scroll', atualizarBotoes);
      window.removeEventListener('resize', atualizarBotoes);
    };
  }, [atualizarBotoes]);

  function rolarPara(direcao) {
    const el = trilhoRef.current;
    if (!el) return;
    const deslocamento = el.clientWidth * 0.75;
    el.scrollBy({
      left: direcao === 'dir' ? deslocamento : -deslocamento,
      behavior: 'smooth',
    });
  }

  function rolarParaIndice(i) {
    const el = trilhoRef.current;
    if (!el) return;
    const item = el.children[i];
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  // Suporte a arrasto no desktop com o mouse
  function onMouseDown(e) {
    const el = trilhoRef.current;
    if (!el) return;
    setEstaArrastando(true);
    inicioX.current = e.pageX - el.offsetLeft;
    scrollInicio.current = el.scrollLeft;
  }

  function onMouseMove(e) {
    if (!estaArrastando) return;
    e.preventDefault();
    const el = trilhoRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const caminhar = (x - inicioX.current) * 1.5;
    el.scrollLeft = scrollInicio.current - caminhar;
  }

  function onMouseUp() {
    setEstaArrastando(false);
  }

  return (
    <div className="carrossel-container">
      <div className="carrossel-controles">
        <span className="carrossel-dica">
          <span className="carrossel-dica__icone" aria-hidden="true">↔</span>
          Arraste ou deslize para ver as fotos
        </span>
        <div className="carrossel-setas" aria-hidden="true">
          <button
            type="button"
            className="carrossel-btn"
            onClick={() => rolarPara('esq')}
            disabled={!podeRolarEsq}
            aria-label="Foto anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="carrossel-btn"
            onClick={() => rolarPara('dir')}
            disabled={!podeRolarDir}
            aria-label="Próxima foto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trilhoRef}
        className={`trilho ${estaArrastando ? 'trilho--arrastando' : ''}`}
        role="region"
        tabIndex={0}
        aria-label="Galeria de imagens de Paraíso do Tocantins e da sede — use as setas do teclado para navegar"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {FOTOS.map((f, i) => (
          <figure className="trilho__item" key={f.base}>
            <Foto base={f.base} alt={f.alt} sizes={TRILHO_SIZES} />
            <figcaption>
              <span className="trilho__item-titulo">{f.titulo}</span>
              <span className="trilho__item-sub">{f.subtitulo}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="carrossel-indicadores" aria-hidden="true">
        {FOTOS.map((f, i) => (
          <button
            key={f.base}
            type="button"
            className={`carrossel-ponto ${i === indiceAtivo ? 'carrossel-ponto--ativo' : ''}`}
            onClick={() => rolarParaIndice(i)}
            aria-label={`Ir para imagem ${i + 1} de ${FOTOS.length}`}
          />
        ))}
      </div>
    </div>
  );
}
