'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MusicaToggle from '@/components/MusicaToggle';
import { EVENTO, DATAS_EXTENSO, ABERTURA } from '@/lib/evento';

export function Topo({ acao = true }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();
  const ehHome = pathname === '/';

  // Fechar menu ao rolar ou trocar de página
  useEffect(() => {
    function aoRolar() {
      if (menuAberto) setMenuAberto(false);
    }
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, [menuAberto]);

  // Fechar menu gaveta ao trocar de rota
  useEffect(() => {
    setMenuAberto(false);
  }, [pathname]);

  return (
    <header
      className={`topo ${!ehHome ? 'topo--interna' : ''}`}
      data-topo
      data-preso={!ehHome ? 'true' : 'false'}
    >
      <div className="topo__esq">
        <Link href="/" className="topo__marca" aria-label="Conferência Waves 2026, início">
          <img
            src="/brand/logo-waves26.svg"
            alt="Conferência Waves 2026"
            width="1620"
            height="807"
            decoding="async"
          />
        </Link>
      </div>

      <nav className="topo__nav" aria-label="Navegação principal">
        <Link href={ehHome ? '#manifesto' : '/#manifesto'} className="topo__link">
          Sobre
        </Link>
        <Link href={ehHome ? '#noites' : '/#noites'} className="topo__link">
          Programação
        </Link>
        <Link href={ehHome ? '#local' : '/#local'} className="topo__link">
          Local
        </Link>
        <Link href={ehHome ? '#vaga' : '/#vaga'} className="topo__link">
          Sua Vaga
        </Link>
      </nav>

      <div className="topo__dir">
        <div className="topo__audio-desktop">
          <MusicaToggle rotuloCompleto={true} />
        </div>
        <div className="topo__audio-mobile">
          <MusicaToggle compacto={true} />
        </div>

        {acao ? (
          <Link href="/inscricao" className="botao botao--topo">
            Inscrever
          </Link>
        ) : (
          <Link href="/" className="botao botao--topo botao--vazado">
            ← Voltar ao site
          </Link>
        )}

        <button
          type="button"
          className="topo__menu-btn"
          aria-expanded={menuAberto}
          aria-label={menuAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span className={`topo__menu-icone ${menuAberto ? 'topo__menu-icone--aberto' : ''}`}>
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Menu mobile em gaveta elegante com backdrop blur */}
      <div
        className={`topo__gaveta ${menuAberto ? 'topo__gaveta--aberta' : ''}`}
        aria-hidden={!menuAberto}
      >
        <div className="topo__gaveta-conteudo">
          <div className="topo__gaveta-links">
            {!ehHome && (
              <Link
                href="/"
                className="topo__gaveta-link"
                style={{ color: 'var(--sol)', fontWeight: 700 }}
                onClick={() => setMenuAberto(false)}
              >
                ← Início (Página Principal)
              </Link>
            )}
            <Link
              href={ehHome ? '#manifesto' : '/#manifesto'}
              className="topo__gaveta-link"
              onClick={() => setMenuAberto(false)}
            >
              Sobre a Waves
            </Link>
            <Link
              href={ehHome ? '#noites' : '/#noites'}
              className="topo__gaveta-link"
              onClick={() => setMenuAberto(false)}
            >
              Programação das noites
            </Link>
            <Link
              href={ehHome ? '#local' : '/#local'}
              className="topo__gaveta-link"
              onClick={() => setMenuAberto(false)}
            >
              Local & Como chegar
            </Link>
            <Link
              href={ehHome ? '#vaga' : '/#vaga'}
              className="topo__gaveta-link"
              onClick={() => setMenuAberto(false)}
            >
              Valor & Inscrição
            </Link>
            <div className="topo__gaveta-audio">
              <span className="topo__gaveta-audio-label">Trilha sonora (60%)</span>
              <MusicaToggle compacto={false} />
            </div>

            {acao ? (
              <Link
                href="/inscricao"
                className="botao botao--largo"
                style={{ marginTop: '0.75rem' }}
                onClick={() => setMenuAberto(false)}
              >
                Fazer Inscrição
              </Link>
            ) : (
              <Link
                href="/"
                className="botao botao--largo botao--vazado"
                style={{ marginTop: '0.75rem' }}
                onClick={() => setMenuAberto(false)}
              >
                ← Voltar para o site
              </Link>
            )}
          </div>
          <p className="topo__gaveta-rodape">
            {DATAS_EXTENSO} · {EVENTO.local.nome}
          </p>
        </div>
      </div>
    </header>
  );
}

export function Rodape() {
  const { local, contatos, redes } = EVENTO;

  return (
    <footer className="rodape">
      <div className="limite">
        <div className="rodape__grade">
          <div className="rodape__col">
            <p className="rodape__t">Onde</p>
            <p style={{ margin: 0 }}>
              <strong>{local.nome}</strong>
              <br />
              {local.rua}
              <br />
              {local.cidade} — {local.uf}
            </p>
            <p style={{ marginTop: '.75rem' }}>
              <a
                href={local.mapa}
                target="_blank"
                rel="noopener noreferrer"
                className="rodape__link-mapa"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Abrir no Google Maps
              </a>
            </p>
          </div>

          <div className="rodape__col">
            <p className="rodape__t">Quando</p>
            <p style={{ margin: 0 }}>
              <strong>{DATAS_EXTENSO}</strong>
              <br />
              {ABERTURA}
            </p>
            <p style={{ marginTop: '.75rem', opacity: 0.75, fontSize: '.85rem' }}>
              Três noites inesquecíveis de louvor e adoração.
            </p>
          </div>

          <div className="rodape__col">
            <p className="rodape__t">Falar com a gente</p>
            <ul className="rodape__lista">
              {contatos.map((c) => (
                <li key={c.whatsapp}>
                  <a
                    href={`https://wa.me/${c.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.nome} — {c.visivel}
                  </a>
                  <br />
                  <span className="rodape__papel">{c.papel}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rodape__col">
            <p className="rodape__t">Acompanhar</p>
            <ul className="rodape__lista">
              <li>
                <a href={redes.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram da igreja
                </a>
              </li>
              <li>
                <a href={redes.instagramJovem} target="_blank" rel="noopener noreferrer">
                  Instagram dos jovens
                </a>
              </li>
              <li>
                <a href={redes.youtube} target="_blank" rel="noopener noreferrer">
                  YouTube (Transmissão)
                </a>
              </li>
              <li>
                <a href={redes.site} target="_blank" rel="noopener noreferrer">
                  mantparaiso.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rodape__fim">
          <p style={{ margin: 0 }}>
            Uma realização da <strong>Igreja de Cristo — MANT Paraíso</strong>
          </p>
          <div className="rodape__links-extras">
            <Link href="/privacidade">Privacidade & LGPD</Link>
            <span>·</span>
            <a href="#conteudo">Voltar ao topo ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function BarraInscricao() {
  return (
    <div className="barra" data-barra data-visivel="false">
      <div className="barra__info">
        <p className="barra__valor" style={{ margin: 0 }}>
          {EVENTO.inscricao.valorTexto}
        </p>
        <span className="barra__detalhe">Valor único · 3 noites</span>
      </div>
      <Link href="/inscricao" className="botao botao--barra">
        Garantir vaga
      </Link>
    </div>
  );
}
