import Link from 'next/link';
import Agua from '@/components/Agua';
import Foto from '@/components/Foto';
import Contagem from '@/components/Contagem';
import Emerge from '@/components/Emerge';
import TrilhoCarrossel from '@/components/TrilhoCarrossel';
import AgendaCalendario from '@/components/AgendaCalendario';
import { Topo, Rodape, BarraInscricao } from '@/components/Moldura';
import { EVENTO, DATAS_EXTENSO, DATAS_HEROI } from '@/lib/evento';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const { local, inscricao, noites, versiculo, transmissao } = EVENTO;

  const conviteTexto = encodeURIComponent(
    'E aí! Vai rolar a Conferência Waves 2026 em Paraíso do Tocantins (18, 19 e 20 de setembro). Três noites de louvor e adoração. Bora comigo? Olha o site oficial: https://waves.mantparaiso.com.br'
  );

  const detalhesNoites = [
    {
      sub: 'Abertura oficial da conferência',
      badge: 'Abertura',
    },
    {
      sub: 'Manhã e noite de adoração e Palavra profunda',
      badge: '2 Sessões',
    },
    {
      sub: 'Celebração e encerramento profético',
      badge: 'Encerramento',
    },
  ];

  const faqs = [
    {
      q: 'Como funciona o cronograma dos 3 dias de evento?',
      r: 'Na sexta-feira (18/09) iniciamos às 19h30 com a grande Abertura Oficial. No sábado (19/09) teremos duas sessões especiais: às 08h30 da manhã e às 19h00 da noite. No domingo (20/09) a celebração e encerramento começam às 19h00.',
    },
    {
      q: 'Preciso ser membro de alguma igreja para participar?',
      r: 'Não! A Waves é 100% aberta para todos os jovens e adolescentes de qualquer igreja, denominação ou para quem nunca pisou em uma igreja.',
    },
    {
      q: 'Como funciona o pagamento dos R$ 50?',
      r: 'O valor é único e simbólico, sem taxas extras. Ao preencher o formulário, o WhatsApp abre direto com a Anna Beatriz, que combina o pagamento via PIX de forma rápida e segura.',
    },
    {
      q: 'Menores de 18 anos precisam vir com os pais?',
      r: 'Não é obrigatório que os pais assistam juntos, mas no formulário de inscrição é necessário preencher o nome e WhatsApp do responsável legal confirmando a autorização.',
    },
    {
      q: 'Onde vai acontecer a conferência?',
      r: 'Na sede da MANT Paraíso, localizada na Rua L10, 269 — Interlagos, em Paraíso do Tocantins - TO.',
    },
  ];

  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Topo />

      {/* ---------------------------------------------------------------
          A superfície. Você chega aqui em cima, na luz.
          --------------------------------------------------------------- */}
      <section className="heroi">
        <Agua />

        <div className="heroi__centro">
          <h1 className="oculto-visual">
            Conferência Waves 2026 — Ondas de Poder e Glória. {DATAS_EXTENSO}, na MANT
            Paraíso, Paraíso do Tocantins.
          </h1>

          <div className="heroi__marcas-wrap">
            <img
              className="heroi__marca"
              src="/brand/logo-waves26.svg"
              alt="Waves 2026"
              width="1620"
              height="807"
              fetchPriority="high"
            />
            <img
              className="heroi__lema"
              src="/brand/lema-ondas-poder-gloria.svg"
              alt="Ondas de Poder e Glória"
              width="1389"
              height="710"
            />
          </div>
        </div>

        {/* Indicador sutil de rolagem animado */}
        <div className="heroi__descer" aria-hidden="true">
          <span></span>
          <small>Role para descer</small>
        </div>

        <div className="heroi__rodape">
          <div className="heroi__info-local">
            <p className="heroi__quando">
              {DATAS_HEROI.dias}
              <br />
              {DATAS_HEROI.mes}
            </p>
            <p className="heroi__onde">
              <strong>{local.nome}</strong>
              <br />
              {local.cidade}, {local.uf}
            </p>
          </div>
          <div className="heroi__contagem-wrap">
            <span className="heroi__contagem-rotulo">Abertura em</span>
            <Contagem inicio={EVENTO.inicio} fim={EVENTO.fim} />
          </div>
        </div>
      </section>

      <main id="conteudo" className="env">
        {/* -------------------------------------------------------------
            Primeiro fôlego. As frases são do vídeo de chamada da própria
            conferência.
            ------------------------------------------------------------- */}
        <section className="faixa" id="manifesto" aria-labelledby="t-manifesto">
          <div className="limite manifesto">
            <h2 id="t-manifesto" className="oculto-visual">
              O que é a Waves
            </h2>
            <Emerge como="p" className="display display--l manifesto__linha">
              Uma onda começa pequena.
            </Emerge>
            <Emerge como="p" className="display display--l manifesto__linha" atraso={1}>
              Depois fica mais profunda, mais intensa.
            </Emerge>
            <Emerge como="p" className="display display--l manifesto__linha" atraso={2}>
              Aí ela cobre tudo.
            </Emerge>
          </div>
        </section>

        <section className="faixa faixa--curta" aria-labelledby="t-sobre">
          <div className="limite par par--deslocado">
            <Emerge>
              <span className="secao-kicker">Segunda Edição</span>
              <h2 id="t-sobre" className="display display--m">
                Três noites,
                <br />
                uma geração
              </h2>
            </Emerge>
            <Emerge className="prosa" atraso={1}>
              <p>
                A Waves é uma conferência de jovens e adolescentes. Sem formalidade e sem
                enrolação: louvor alto, Palavra que fala com a sua vida de verdade e três
                noites intensas da presença de Deus.
              </p>
              <p>
                <strong>Você não precisa ser da igreja.</strong> Não precisa entender de
                nada, não precisa ter idade certa. Só precisa vir com o coração aberto.
              </p>
              <p>
                Esta é a segunda edição. A primeira encheu a casa com gente de várias
                cidades e igrejas da região — e a onda dessa vez volta ainda maior.
              </p>
              <div style={{ marginTop: '1.8rem' }}>
                <a href="#noites" className="link-seta">
                  Ver a programação das noites <span>↓</span>
                </a>
              </div>
            </Emerge>
          </div>
        </section>

        {/* -------------------------------------------------------------
            O versículo, sobre a Terra vista do espaço. É o ponto mais
            fundo da descida e o coração da marca.
            ------------------------------------------------------------- */}
        <section className="terra" aria-labelledby="t-tema">
          <div className="terra__img">
            <Foto base="terra" alt="" sizes="100vw" />
          </div>
          <Emerge className="terra__texto">
            <span className="terra__kicker">O Versículo Tema</span>
            <h2 id="t-tema" className="versiculo">
              “{versiculo.texto}”
            </h2>
            <p className="terra__ref">{versiculo.ref}</p>
          </Emerge>
        </section>

        <section className="faixa" id="local" aria-labelledby="t-porque">
          <div className="limite par">
            <Emerge>
              <span className="secao-kicker">Onde Tudo Começa</span>
              <h2 id="t-porque" className="display display--m">
                Começando
                <br />
                por aqui
              </h2>
            </Emerge>
            <Emerge className="prosa" atraso={1}>
              <p>
                Uma onda não pede permissão para avançar. Ela cobre, transforma e redesenha
                tudo o que toca. É isso que esperamos para essa geração: uma glória que não
                recua e um poder que não se limita.
              </p>
              <p>
                Habacuque falou de um dia em que o conhecimento da glória de Deus não ficaria
                preso em um lugar — cobriria toda a terra, como o oceano cobre cada
                centímetro do fundo do mar.
              </p>
              <p>
                <strong>E essa terra começa em Paraíso do Tocantins.</strong> Na sua escola,
                na sua casa, em você.
              </p>
            </Emerge>
          </div>
        </section>

        {/* -------------------------------------------------------------
            Carrossel interativo de Paraíso do Tocantins e da sede
            ------------------------------------------------------------- */}
        <section className="faixa faixa--cheia faixa--curta" aria-label="Fotos de Paraíso do Tocantins e da sede">
          <div className="limite" style={{ paddingInline: 'var(--margem)', marginBottom: '1.25rem' }}>
            <Emerge>
              <span className="secao-kicker">Nossa Cidade, Nosso Alvo</span>
              <h3 className="display display--s" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}>
                Paraíso do Tocantins
              </h3>
            </Emerge>
          </div>
          <TrilhoCarrossel />
        </section>

        {/* -------------------------------------------------------------
            Programação com cards e integração com calendário
            ------------------------------------------------------------- */}
        <section className="faixa" id="noites" aria-labelledby="t-noites">
          <div className="limite pilha">
            <div className="noites-topo">
              <Emerge>
                <span className="secao-kicker">Cronograma Oficial</span>
                <h2 id="t-noites" className="display display--m">
                  As três noites
                </h2>
              </Emerge>
              <Emerge atraso={1}>
                <AgendaCalendario />
              </Emerge>
            </div>

            <div className="noites-grid">
              {noites.map((n, i) => (
                <Emerge key={n.dia} atraso={i}>
                  <article className={`card-noite ${n.abertura ? 'card-noite--destaque' : ''}`}>
                    <div className="card-noite__dia-wrap">
                      <span className="card-noite__dia">{n.dia}</span>
                      <span className="card-noite__mes">SET</span>
                    </div>

                    <div className="card-noite__info">
                      <div className="card-noite__header">
                        <span className="card-noite__semana">{n.semana}</span>
                        <span className={`badge-status ${n.abertura ? 'badge-status--ativo' : ''}`}>
                          {detalhesNoites[i]?.badge || 'Confirmado'}
                        </span>
                      </div>
                      <h3 className="card-noite__sub">
                        {detalhesNoites[i]?.sub}
                      </h3>
                      {n.sessoes && n.sessoes.length > 1 ? (
                        <div className="card-noite__sessoes" aria-label="Sessões do dia">
                          {n.sessoes.map((sessao) => (
                            <div key={sessao} className="card-noite__sessao-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{sessao}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="card-noite__hora">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>{n.hora ? `Início às ${n.hora}` : 'Horário detalhado em breve'}</span>
                        </p>
                      )}
                    </div>
                  </article>
                </Emerge>
              ))}
            </div>

          </div>
        </section>

        {/* -------------------------------------------------------------
            A vaga — Ticket Pass oficial com benefícios inclusos
            ------------------------------------------------------------- */}
        <section className="faixa" id="vaga" aria-labelledby="t-vaga">
          <div className="limite">
            <Emerge>
              <span className="secao-kicker">Inscrição Única</span>
              <h2 id="t-vaga" className="display display--m" style={{ marginBottom: '2rem' }}>
                Garanta o seu pass
              </h2>
            </Emerge>

            <div className="ticket-pass">
              <div className="ticket-pass__corpo">
                <div className="ticket-pass__header">
                  <div>
                    <span className="ticket-pass__tag">Pass Oficial · Edição 2026</span>
                    <h3 className="ticket-pass__titulo">Conferência Waves</h3>
                  </div>
                  <span className="ticket-pass__edicao">2ª Edição</span>
                </div>

                <div className="ticket-pass__grid">
                  <div className="ticket-pass__preco-bloco">
                    <span className="rotulo">Valor simbólico</span>
                    <p className="vaga__valor">
                      <sup>{inscricao.moeda}</sup>
                      {inscricao.valor}
                    </p>
                    <span className="ticket-pass__nota-preco">Sem virada de lote · Preço único</span>
                  </div>

                  <div className="ticket-pass__itens">
                    <span className="rotulo">O que está incluído</span>
                    <ul className="ticket-pass__lista">
                      <li>
                        <span className="check-icone">✓</span>
                        <span>Acesso livre às <strong>3 noites</strong> de conferência</span>
                      </li>
                      <li>
                        <span className="check-icone">✓</span>
                        <span>Pulseira de identificação oficial da edição</span>
                      </li>
                      <li>
                        <span className="check-icone">✓</span>
                        <span>Ministrações, louvor ao vivo e momentos de comunhão</span>
                      </li>
                      <li>
                        <span className="check-icone">✓</span>
                        <span>Atendimento e confirmação direta pelo WhatsApp com {inscricao.responsavel}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="ticket-pass__acoes">
                  <Link href="/inscricao" className="botao botao--ticket">
                    Fazer minha inscrição agora
                  </Link>

                  <a
                    href={`https://wa.me/?text=${conviteTexto}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="botao botao--vazado botao--compartilhar"
                    title="Convidar amigos para a Waves 2026 no WhatsApp"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                    </svg>
                    Convidar amigos no WhatsApp
                  </a>
                </div>
              </div>

              <div className="ticket-pass__lateral" aria-hidden="true">
                <div className="ticket-pass__picote" />
                <span className="ticket-pass__codigo">WAVES-2026-PASS</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="regua" />

        {/* -------------------------------------------------------------
            Mais duas coisas & Para Pais (Cards modernos interativos)
            ------------------------------------------------------------- */}
        <section className="faixa faixa--curta" aria-labelledby="t-extra">
          <div className="limite">
            <div className="extras-grid">
              <Emerge className="card-extra">
                <div className="card-extra__icone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <h3 className="card-extra__titulo">Não consegue vir presencialmente?</h3>
                <p className="card-extra__texto">
                  As três noites serão transmitidas ao vivo no canal da <strong>{transmissao.canal}</strong> no YouTube com áudio e imagem de alta qualidade. Reúna a galera na sua casa ou assista com a sua célula.
                </p>
                <a
                  href={transmissao.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-seta"
                >
                  Acessar canal no YouTube <span>→</span>
                </a>
              </Emerge>

              <Emerge className="card-extra" atraso={1}>
                <div className="card-extra__icone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                </div>
                <h3 className="card-extra__titulo">Waves Store</h3>
                <p className="card-extra__texto">
                  Um modelo único e exclusivo de camisa da Waves 2026 com tecido premium oversized. As informações de reserva, tamanhos e valores serão divulgadas no Instagram dos jovens.
                </p>
                <a
                  href={EVENTO.redes.instagramJovem}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-seta"
                >
                  Seguir @mantjovem <span>→</span>
                </a>
              </Emerge>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------
            Para pais e responsáveis + Perguntas frequentes (FAQ)
            ------------------------------------------------------------- */}
        <section className="faixa faixa--curta" aria-labelledby="t-pais">
          <div className="limite">
            <div className="par" style={{ alignItems: 'start' }}>
              <Emerge>
                <span className="secao-kicker">Segurança & Cuidado</span>
                <h2 id="t-pais" className="display display--m" style={{ marginBottom: '1.25rem' }}>
                  Para pais e
                  <br />
                  responsáveis
                </h2>
                <div className="prosa">
                  <p>
                    A conferência é organizada com zelo e dedicação pela Igreja de Cristo — MANT Paraíso, em nossa sede própria, com liderança pastoral, segurança e voluntários acompanhando os jovens durante todas as atividades.
                  </p>
                  <p>
                    Menores de 18 anos contam com campo específico no formulário para confirmação da ciência e autorização dos pais. A autorização de uso de imagem é facultativa.
                  </p>
                </div>
              </Emerge>

              <Emerge atraso={1}>
                <div className="faq-bloco">
                  <span className="rotulo" style={{ marginBottom: '1rem', display: 'block' }}>
                    Dúvidas Frequentes
                  </span>
                  <div className="faq-lista">
                    {faqs.map((f, i) => (
                      <details className="faq-item" key={i}>
                        <summary className="faq-pergunta">
                          <span>{f.q}</span>
                          <span className="faq-icone" aria-hidden="true">+</span>
                        </summary>
                        <p className="faq-resposta">{f.r}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </Emerge>
            </div>
          </div>
        </section>
      </main>

      {/* -----------------------------------------------------------------
          A onda quebra. A página sobe de volta à luz.
          ----------------------------------------------------------------- */}
      <section className="quebra">
        <div className="limite pilha pilha--larga">
          <Emerge como="h2" className="display display--l" style={{ maxWidth: '14ch' }}>
            A onda está vindo. Você vem?
          </Emerge>
          <Emerge className="quebra__nota prosa" atraso={1}>
            <p style={{ color: 'inherit' }}>
              {DATAS_EXTENSO} — {local.cidade}. Não venha sozinho: chame quem você quer ver
              sendo alcançado e transformado.
            </p>
          </Emerge>
          <Emerge atraso={2}>
            <Link href="/inscricao" className="botao botao--quebra">
              Garantir minha vaga
            </Link>
          </Emerge>
        </div>
      </section>

      <Rodape />
      <BarraInscricao />
    </>
  );
}
