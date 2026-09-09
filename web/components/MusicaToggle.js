'use client';

import { useAudio } from '@/lib/audio';

export default function MusicaToggle({ compacto = false, rotuloCompleto = false }) {
  const { tocando, alternarAudio } = useAudio();

  return (
    <button
      type="button"
      className={`musica-btn ${compacto ? 'musica-btn--compacto' : ''}`}
      onClick={alternarAudio}
      aria-label={tocando ? 'Pausar música de fundo (60%)' : 'Tocar música de fundo (60%)'}
      title={tocando ? 'Música de fundo ligada (60%) — Toque para pausar' : 'Música de fundo pausada — Toque para ouvir'}
    >
      <span className="musica-btn__ondas" aria-hidden="true" data-tocando={tocando ? 'true' : 'false'}>
        <span className="onda onda-1" />
        <span className="onda onda-2" />
        <span className="onda onda-3" />
      </span>

      {!compacto && (
        <span className="musica-btn__texto">
          {tocando ? 'Música ativa' : 'Música'}
        </span>
      )}

      {rotuloCompleto && (
        <span className="musica-btn__vol" aria-hidden="true">60%</span>
      )}
    </button>
  );
}
