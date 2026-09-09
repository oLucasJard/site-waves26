'use client';

import { useState, useRef, useEffect } from 'react';
import { EVENTO, DATAS_EXTENSO } from '@/lib/evento';

export default function AgendaCalendario() {
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function aoClicarFora(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setAberto(false);
      }
    }
    if (aberto) {
      document.addEventListener('mousedown', aoClicarFora);
      document.addEventListener('touchstart', aoClicarFora);
    }
    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('touchstart', aoClicarFora);
    };
  }, [aberto]);

  // UTC para Google Agenda (BRT é UTC-3):
  // 18/09/2026 19h30 BRT = 2026-09-18 22:30:00 UTC
  // 20/09/2026 22h00 BRT = 2026-09-21 01:00:00 UTC
  const googleUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text=' +
    encodeURIComponent(EVENTO.nome + ' — ' + EVENTO.tema) +
    '&dates=20260918T223000Z/20260921T010000Z' +
    '&details=' +
    encodeURIComponent(
      `Conferência Waves 2026 na MANT Paraíso.\n\n` +
      `Programação Oficial:\n` +
      `• Sexta (18/09): 19h30 — Abertura Oficial\n` +
      `• Sábado (19/09): 08h30 (Manhã) e 19h00 (Noite)\n` +
      `• Domingo (20/09): 19h00 — Encerramento\n\n` +
      `${DATAS_EXTENSO}\n` +
      `Mais detalhes: ${EVENTO.url}`
    ) +
    '&location=' +
    encodeURIComponent(
      `${EVENTO.local.nome}, ${EVENTO.local.rua}, ${EVENTO.local.cidade} — ${EVENTO.local.uf}`
    );

  function baixarICS() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MANT Paraiso//Waves 2026//PT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:waves2026-mantparaiso@waves.mantparaiso.com.br',
      'DTSTAMP:20260903T000000Z',
      'DTSTART:20260918T223000Z',
      'DTEND:20260921T010000Z',
      'SUMMARY:Conferência Waves 2026 — Ondas de Poder e Glória',
      `DESCRIPTION:Conferência Waves 2026 na MANT Paraíso.\\n\\nProgramação Oficial:\\n• Sexta (18/09): 19h30 — Abertura Oficial\\n• Sábado (19/09): 08h30 (Manhã) e 19h00 (Noite)\\n• Domingo (20/09): 19h00 — Encerramento\\n\\n${DATAS_EXTENSO}\\nMais informações: ${EVENTO.url}`,
      `LOCATION:${EVENTO.local.nome}, ${EVENTO.local.rua}, ${EVENTO.local.cidade} - ${EVENTO.local.uf}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conferencia-waves-2026.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="agenda-menu" ref={menuRef}>
      <button
        type="button"
        className="botao botao--vazado botao--agenda"
        onClick={() => setAberto(!aberto)}
        aria-expanded={aberto}
        aria-haspopup="true"
        aria-label="Adicionar a Conferência Waves 2026 ao seu calendário"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="M12 14v4" />
          <path d="M10 16h4" />
        </svg>
        <span>Salvar no calendário</span>
      </button>

      {aberto && (
        <div className="agenda-menu__popover" role="menu">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="agenda-menu__item"
            role="menuitem"
            onClick={() => setAberto(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
            </svg>
            Google Agenda
          </a>
          <button
            type="button"
            className="agenda-menu__item"
            role="menuitem"
            onClick={() => {
              baixarICS();
              setAberto(false);
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Apple / Outlook (.ics)
          </button>
        </div>
      )}
    </div>
  );
}
