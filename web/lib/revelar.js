/**
 * Registro de revelação.
 *
 * O IntersectionObserver sozinho não basta. Se a página pular de uma vez —
 * arrastar a barra de rolagem, tecla End, o navegador restaurando a posição —
 * um elemento pode ir de "abaixo da dobra" para "acima da dobra" entre dois
 * quadros. Como ele nunca chega a intersectar, nenhum retorno é disparado e o
 * conteúdo fica invisível para sempre.
 *
 * Por isso há duas camadas: o observador, que cuida da rolagem normal, e uma
 * varredura barata chamada pela descida, que resgata o que ficou para trás. O
 * conjunto encolhe até zero, então a varredura custa nada depois do começo.
 */

const pendentes = new Set();
let observador = null;

function revelar(el) {
  el.dataset.visivel = 'true';
  pendentes.delete(el);
  observador?.unobserve(el);
}

function garantirObservador() {
  if (observador || typeof IntersectionObserver === 'undefined') return;
  observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) revelar(e.target);
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
  );
}

export function registrar(el) {
  if (!el) return () => {};

  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    if (el) el.dataset.visivel = 'true';
    return () => {};
  }

  garantirObservador();
  pendentes.add(el);
  observador?.observe(el);

  return () => {
    pendentes.delete(el);
    observador?.unobserve(el);
  };
}

/** Resgata o que a rolagem rápida deixou passar. Sem custo quando vazio. */
export function varrer() {
  if (!pendentes.size) return;
  const limite = window.innerHeight;
  for (const el of pendentes) {
    if (el.getBoundingClientRect().top < limite) revelar(el);
  }
}
