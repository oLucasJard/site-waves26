'use client';

import { useEffect } from 'react';
import { varrer } from '@/lib/revelar';

/**
 * A descida.
 *
 * Escreve uma única propriedade CSS (--depth, de 0 a 1) conforme a página rola.
 * A coluna d'água atrás de tudo se desloca a partir dela — um write por quadro,
 * uma transformação na GPU. É o que faz a página afundar.
 *
 * Também liga a rolagem suave (Lenis) e cuida dos estados do cabeçalho e da
 * barra de inscrição, para não haver dois ouvintes de scroll disputando quadro.
 *
 * A altura da página e a do viewport ficam em cache: lê-las a cada quadro,
 * logo depois de escrever no style da raiz, obriga o navegador a recalcular o
 * layout 60 vezes por segundo. Elas só mudam quando a janela muda de tamanho
 * ou o conteúdo cresce — e é aí que são medidas de novo.
 */
export default function Descida() {
  useEffect(() => {
    const raiz = document.documentElement;
    const topo = document.querySelector('[data-topo]');
    const barra = document.querySelector('[data-barra]');

    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)');

    let desmontado = false;
    let lenis = null;
    let aoClicar = null;
    let observadorTamanho = null;
    let rafId = 0;
    let quadroId = 0;
    let ultimo = -1;

    // medidas caras, recalculadas só quando algo de fato muda
    let alcance = 0;
    let altura = 0;

    function remedir() {
      altura = window.innerHeight;
      alcance = raiz.scrollHeight - altura;
    }

    function medir() {
      // --- leituras primeiro -------------------------------------------
      const y = window.scrollY;

      // resgata o que uma rolagem brusca deixou sem revelar (mede retângulos)
      varrer();

      // --- só então as escritas ----------------------------------------
      // misturar as duas ordens obriga o navegador a recalcular o layout no
      // meio do quadro, 60 vezes por segundo
      const p = alcance > 0 ? Math.min(1, Math.max(0, y / alcance)) : 0;

      // duas casas bastam: evita reescrever a variável a cada pixel
      const arredondado = Math.round(p * 500) / 500;
      if (arredondado !== ultimo) {
        raiz.style.setProperty('--depth', String(arredondado));
        ultimo = arredondado;
      }

      if (topo) {
        const ehInterna = topo.classList.contains('topo--interna');
        topo.dataset.preso = (ehInterna || y > 50) ? 'true' : 'false';
      }
      if (barra) {
        const perto = y + altura > alcance + altura - altura * 0.6;
        barra.dataset.visivel = y > altura * 0.9 && !perto ? 'true' : 'false';
      }
    }

    function aoRolar() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        medir();
      });
    }

    function aoRedimensionar() {
      remedir();
      aoRolar();
    }

    async function ligar() {
      if (!reduzir.matches) {
        try {
          const { default: Lenis } = await import('lenis');
          // o componente pode ter desmontado enquanto o módulo carregava
          if (desmontado) return;

          lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            // no toque, a rolagem nativa é melhor: mais previsível e mais leve
            syncTouch: false,
          });

          const quadro = (t) => {
            lenis.raf(t);
            quadroId = requestAnimationFrame(quadro);
          };
          quadroId = requestAnimationFrame(quadro);

          // com a rolagem suave ligada, os links de âncora precisam passar
          // por ela — senão o Lenis puxa a página de volta no quadro seguinte
          aoClicar = (ev) => {
            const a = ev.target.closest?.('a[href^="#"], a[href^="/#"]');
            if (!a) return;
            const href = a.getAttribute('href');
            const id = href.startsWith('/#') ? href.slice(2) : href.slice(1);
            if (!id) return;
            const alvo = document.getElementById(id);
            if (!alvo) return;
            ev.preventDefault();
            lenis.scrollTo(alvo, { offset: -80 });
            alvo.setAttribute('tabindex', '-1');
            alvo.focus({ preventScroll: true });
            history.replaceState(null, '', `#${id}`);
          };
          document.addEventListener('click', aoClicar);

          // exposto para inspeção e para rolagens programáticas
          window.__lenis = lenis;
        } catch {
          // sem rolagem suave a página continua inteira — só menos macia
        }
      }

      if (desmontado) return;

      window.addEventListener('scroll', aoRolar, { passive: true });
      window.addEventListener('resize', aoRedimensionar, { passive: true });

      // o conteúdo pode crescer depois da montagem (fontes, imagens tardias)
      if (typeof ResizeObserver !== 'undefined') {
        observadorTamanho = new ResizeObserver(aoRedimensionar);
        observadorTamanho.observe(document.body);
      }

      remedir();
      medir();
    }

    remedir();
    medir();
    ligar();

    return () => {
      desmontado = true;
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRedimensionar);
      observadorTamanho?.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (quadroId) cancelAnimationFrame(quadroId);
      if (lenis) {
        lenis.destroy();
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}
