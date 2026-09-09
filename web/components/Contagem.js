'use client';

import { useEffect, useState, useRef } from 'react';

const UM_SEGUNDO = 1000;

function restante(alvoMs) {
  const delta = alvoMs - Date.now();
  if (delta <= 0) return null;
  const s = Math.floor(delta / UM_SEGUNDO);
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    seg: s % 60,
  };
}

const pad = (n) => String(n).padStart(2, '0');
const plural = (n, um, muitos) => `${n} ${n === 1 ? um : muitos}`;

export default function Contagem({ inicio, fim }) {
  const [t, setT] = useState(null);
  const [estado, setEstado] = useState('carregando');
  const ultimoSeg = useRef(null);

  useEffect(() => {
    const alvo = new Date(inicio).getTime();
    const encerra = new Date(fim).getTime();
    let id = 0;

    function tique() {
      const agora = Date.now();
      if (agora >= encerra) return setEstado('passou');
      if (agora >= alvo) return setEstado('acontecendo');
      setEstado('contando');
      const r = restante(alvo);
      setT(r);
      ultimoSeg.current = r?.seg;
    }

    function ligar() {
      tique();
      if (!id) id = setInterval(tique, UM_SEGUNDO);
    }

    function desligar() {
      clearInterval(id);
      id = 0;
    }

    function aoTrocarVisibilidade() {
      if (document.hidden) desligar();
      else ligar();
    }

    ligar();
    document.addEventListener('visibilitychange', aoTrocarVisibilidade);

    return () => {
      desligar();
      document.removeEventListener('visibilitychange', aoTrocarVisibilidade);
    };
  }, [inicio, fim]);

  if (estado === 'acontecendo') {
    return (
      <div className="contagem contagem--fim" role="status">
        <span className="contagem__pulso" aria-hidden="true" />
        <span className="contagem__bloco">
          <span className="contagem__n">Agora</span>
          <span className="contagem__r">Está acontecendo</span>
        </span>
      </div>
    );
  }

  if (estado === 'passou') {
    return (
      <div className="contagem contagem--fim">
        <span className="contagem__bloco">
          <span className="contagem__n">2027</span>
          <span className="contagem__r">A próxima onda</span>
        </span>
      </div>
    );
  }

  const blocos = [
    ['dias', t ? t.dias : 0, t?.dias === 1 ? 'dia' : 'dias'],
    ['horas', t ? pad(t.horas) : '00', 'horas'],
    ['min', t ? pad(t.min) : '00', 'min'],
    ['seg', t ? pad(t.seg) : '00', 'seg'],
  ];

  return (
    <div className="contagem" role="timer" aria-live="off">
      {t ? (
        <span className="oculto-visual">
          Faltam {plural(t.dias, 'dia', 'dias')}, {plural(t.horas, 'hora', 'horas')} e{' '}
          {plural(t.min, 'minuto', 'minutos')} para a abertura.
        </span>
      ) : null}
      <div className="contagem__grade">
        {blocos.map(([chave, valor, rotulo]) => (
          <span className="contagem__bloco" key={chave} aria-hidden="true">
            <span className="contagem__n-wrap">
              <span className="contagem__n">{valor}</span>
            </span>
            <span className="contagem__r">{rotulo}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
