'use client';

import { useEffect } from 'react';

/**
 * Páginas de leitura e de formulário não descem pela coluna d'água.
 *
 * A descida é a narrativa da home. Numa página curta ela viraria só um fundo
 * laranja aleatório atrás de um formulário — ruído, não conceito. Aqui a água
 * fica parada, funda e escura, para o conteúdo ter todo o silêncio.
 */
export default function Calma() {
  useEffect(() => {
    document.documentElement.dataset.calmo = 'true';
    return () => {
      delete document.documentElement.dataset.calmo;
    };
  }, []);

  return null;
}
