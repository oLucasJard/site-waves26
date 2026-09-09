'use client';

import Link from 'next/link';

/**
 * Última rede de segurança. Se algo estourar no cliente, a pessoa continua
 * vendo uma página da conferência — com o caminho para a inscrição, que é o
 * que ela veio fazer — em vez da tela branca do navegador.
 */
export default function Erro({ reset }) {
  return (
    <main
      className="env"
      style={{
        minHeight: '80svh',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--margem)',
      }}
    >
      <div className="pilha" style={{ textAlign: 'center', justifyItems: 'center' }}>
        <h1 className="display display--l">A onda virou</h1>
        <p className="prosa" style={{ maxWidth: '38ch' }}>
          Alguma coisa quebrou por aqui. Tente de novo — e, se insistir, fale com a gente
          pelo WhatsApp.
        </p>
        <div className="pilha" style={{ justifyItems: 'center' }}>
          <button type="button" className="botao" onClick={() => reset()}>
            Tentar de novo
          </button>
          <Link href="/" className="botao botao--vazado">
            Voltar para o início
          </Link>
        </div>
      </div>
    </main>
  );
}
