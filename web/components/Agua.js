'use client';

import { useEffect, useRef, useState } from 'react';
import Foto from '@/components/Foto';

/**
 * A água do herói.
 *
 * O vídeo só entra quando vale a pena: em conexão boa, sem economia de dados e
 * sem preferência por menos movimento. Nos demais casos fica o quadro parado —
 * que já é a mesma água, só sem custo. E há dois cortes: telas largas recebem o
 * arquivo de 1440 px, o celular recebe o de 960. O público chega em 4G e muitos
 * em plano pré-pago; megabyte não se cobra de quem não pediu.
 *
 * O quadro parado fica SEMPRE no DOM, como camada de baixo, e o vídeo entra por
 * cima. É de propósito: o atributo `poster` do <video> só aceita um arquivo, o
 * que forçaria baixar o JPEG de 357 KB além do AVIF que o <Foto> já escolheu
 * para aquela tela. Assim a mesma imagem serve de pôster e de retaguarda, e o
 * navegador continua escolhendo o formato e a largura que couberem.
 */
export default function Agua() {
  const [fonte, setFonte] = useState(null);
  const [pronto, setPronto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rede = navigator.connection;
    if (rede) {
      if (rede.saveData) return;
      if (/(^|-)(2g|3g)$/.test(rede.effectiveType || '')) return;
    }

    // tela larga recebe o arquivo de 1440; celular não precisa e não deve pagar
    const largo = window.matchMedia('(min-width: 900px)').matches;
    setFonte(largo ? '/media/agua.mp4' : '/media/agua-leve.mp4');
  }, []);

  useEffect(() => {
    if (!fonte || !ref.current) return;
    const v = ref.current;
    // navegadores embutidos às vezes recusam o autoplay declarativo
    const p = v.play?.();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  }, [fonte]);

  return (
    <div className="heroi__agua" data-video={pronto ? 'pronto' : 'nao'} aria-hidden="true">
      <Foto base="agua-poster" alt="" sizes="100vw" prioridade />

      {fonte ? (
        <video
          ref={ref}
          key={fonte}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          width="1920"
          height="1080"
          onPlaying={() => setPronto(true)}
        >
          <source src={fonte} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
