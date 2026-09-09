'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

const VOLUME_PADRAO = 0.6; // 60% de volume conforme solicitado

const AudioContext = createContext({
  tocando: false,
  alternarAudio: () => {},
  volume: VOLUME_PADRAO,
});

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [tocando, setTocando] = useState(false);
  const [interagiu, setInteragiu] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = VOLUME_PADRAO;

    // Tentar tocar automaticamente
    const promessa = audio.play();
    if (promessa !== undefined) {
      promessa
        .then(() => {
          setTocando(true);
        })
        .catch(() => {
          // Autoplay bloqueado pelo navegador até primeira interação
          setTocando(false);
        });
    }

    function desbloquear() {
      if (audioRef.current && !interagiu) {
        audioRef.current.volume = VOLUME_PADRAO;
        audioRef.current
          .play()
          .then(() => {
            setTocando(true);
            setInteragiu(true);
          })
          .catch(() => {});
      }
      window.removeEventListener('click', desbloquear);
      window.removeEventListener('touchstart', desbloquear);
      window.removeEventListener('keydown', desbloquear);
    }

    window.addEventListener('click', desbloquear, { once: true });
    window.addEventListener('touchstart', desbloquear, { once: true });
    window.addEventListener('keydown', desbloquear, { once: true });

    return () => {
      window.removeEventListener('click', desbloquear);
      window.removeEventListener('touchstart', desbloquear);
      window.removeEventListener('keydown', desbloquear);
    };
  }, [interagiu]);

  function alternarAudio(e) {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (tocando) {
      audio.pause();
      setTocando(false);
    } else {
      audio.volume = VOLUME_PADRAO;
      audio
        .play()
        .then(() => {
          setTocando(true);
          setInteragiu(true);
        })
        .catch(() => {});
    }
  }

  return (
    <AudioContext.Provider value={{ tocando, alternarAudio, volume: VOLUME_PADRAO }}>
      <audio
        ref={audioRef}
        src="/media/trilha.mp3"
        loop
        preload="auto"
        aria-hidden="true"
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  return useContext(AudioContext);
}
