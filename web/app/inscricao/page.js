import Link from 'next/link';
import Formulario from '@/components/Formulario';
import Calma from '@/components/Calma';
import Emerge from '@/components/Emerge';
import { Topo, Rodape } from '@/components/Moldura';
import { EVENTO, DATAS_EXTENSO, ABERTURA } from '@/lib/evento';

export const metadata = {
  title: 'Inscrição',
  description:
    'Preencha seus dados e finalize a inscrição na Conferência Waves 2026 pelo WhatsApp. 18, 19 e 20 de setembro, na MANT Paraíso.',
  openGraph: {
    title: 'Inscrição · Conferência Waves 2026',
    description: `${DATAS_EXTENSO}. MANT Paraíso, Paraíso do Tocantins.`,
    url: `${EVENTO.url}/inscricao`,
  },
  alternates: { canonical: '/inscricao' },
};

export default function Inscricao() {
  const { local, inscricao, contatos } = EVENTO;

  return (
    <>
      <Calma />
      <a className="pular" href="#formulario">
        Pular para o formulário
      </a>
      <Topo acao={false} />

      <main className="env pagina-inscricao" style={{ paddingTop: 'clamp(6rem, 14vh, 9rem)' }}>
        <section className="faixa faixa--curta">
          <div className="limite">
            <div className="pagina-inscricao__topo">
              <Emerge>
                <Link
                  href="/"
                  className="botao-voltar"
                  aria-label="Voltar para a página inicial"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Voltar para o site</span>
                </Link>
                <span className="secao-kicker" style={{ display: 'block' }}>Pass Oficial Waves 2026</span>
                <h1 className="display display--l" style={{ maxWidth: '12ch' }}>
                  Garanta a sua vaga
                </h1>
              </Emerge>
              <Emerge className="prosa" atraso={1} style={{ marginTop: 'clamp(1rem, 3vh, 2rem)' }}>
                <p>
                  Preencha os dados abaixo. Ao enviar, o seu WhatsApp abre com a mensagem
                  pronta para a <strong>{inscricao.responsavel}</strong>, que cuida das
                  inscrições — é só tocar em enviar que ela confirma o resto com você.
                </p>
              </Emerge>
            </div>
          </div>
        </section>

        <section className="faixa faixa--curta" style={{ paddingTop: 0 }}>
          <div className="limite">
            <div className="grid-inscricao">
              {/* Coluna Principal: Formulário */}
              <div id="formulario">
                <Emerge>
                  <div className="form-header">
                    <h2 className="display display--m" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)' }}>
                      Formulário de Inscrição
                    </h2>
                    <p className="prosa" style={{ fontSize: '.95rem', margin: '.5rem 0 2rem' }}>
                      Leva menos de 1 minuto. Nenhuma informação fica retida neste site — tudo vai direto para o atendimento oficial.
                    </p>
                  </div>
                </Emerge>

                <noscript>
                  <div className="avisos" data-visivel="true" style={{ marginBottom: '2rem' }}>
                    <h2>O formulário precisa de JavaScript ativo</h2>
                    <p style={{ fontSize: '.9rem', margin: 0 }}>
                      Ative o JavaScript ou fale direto com a {inscricao.responsavel} no WhatsApp:{' '}
                      <a href={`https://wa.me/${inscricao.whatsapp}`}>{inscricao.whatsappVisivel}</a>.
                    </p>
                  </div>
                </noscript>

                <Formulario />
              </div>

              {/* Coluna Lateral: Resumo do Evento & Confiança */}
              <aside className="resumo-inscricao">
                <Emerge atraso={1}>
                  <div className="resumo-card">
                    <span className="resumo-card__tag">Resumo da Inscrição</span>

                    <div className="resumo-card__preco">
                      <span className="rotulo">Valor por pessoa</span>
                      <p className="vaga__valor" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}>
                        <sup>{inscricao.moeda}</sup>
                        {inscricao.valor}
                      </p>
                      <span className="resumo-card__nota">Valor único · Acesso às 3 noites</span>
                    </div>

                    <hr className="regua" style={{ margin: '1.25rem 0' }} />

                    <div className="resumo-card__detalhes">
                      <div className="resumo-card__item">
                        <span className="rotulo">Quando</span>
                        <p style={{ margin: '.25rem 0 0', fontWeight: 600 }}>
                          {DATAS_EXTENSO}
                        </p>
                        <small style={{ color: 'var(--tinta-fraca)' }}>{ABERTURA}</small>
                      </div>

                      <div className="resumo-card__item">
                        <span className="rotulo">Onde</span>
                        <p style={{ margin: '.25rem 0 0', fontWeight: 600 }}>
                          {local.nome}
                        </p>
                        <small style={{ color: 'var(--tinta-fraca)' }}>
                          {local.rua}, {local.cidade} — {local.uf}
                        </small>
                      </div>

                      <div className="resumo-card__item">
                        <span className="rotulo">Classificação</span>
                        <p style={{ margin: '.25rem 0 0', fontWeight: 600 }}>
                          Livre para jovens e adolescentes
                        </p>
                        <small style={{ color: 'var(--tinta-fraca)' }}>
                          Menores de 18 com autorização do responsável
                        </small>
                      </div>
                    </div>

                    <div className="resumo-card__ajuda">
                      <p className="rotulo" style={{ marginBottom: '.5rem' }}>Dúvidas?</p>
                      <a
                        href={`https://wa.me/${inscricao.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="botao botao--vazado botao--largo"
                        style={{ fontSize: '.85rem' }}
                      >
                        Chamar {inscricao.responsavel} no WhatsApp
                      </a>
                    </div>
                  </div>
                </Emerge>
              </aside>
            </div>
          </div>
        </section>

        <hr className="regua" />

        <section className="faixa faixa--curta" aria-labelledby="t-ajuda">
          <div className="limite par">
            <Emerge>
              <h2 id="t-ajuda" className="display display--m">
                Precisa
                <br />
                de ajuda?
              </h2>
            </Emerge>
            <Emerge atraso={1}>
              <div className="pilha">
                <p className="prosa">
                  Tem alguma dúvida sobre sua vaga, forma de pagamento, acomodação ou caravanas? Fale diretamente com a coordenação:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
                  {contatos.map((c) => (
                    <a
                      key={c.whatsapp}
                      className="botao botao--vazado"
                      href={`https://wa.me/${c.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c.nome} — {c.papel}
                    </a>
                  ))}
                </div>
              </div>
            </Emerge>
          </div>
        </section>
      </main>

      <Rodape />
    </>
  );
}
