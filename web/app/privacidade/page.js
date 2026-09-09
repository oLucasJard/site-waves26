import Link from 'next/link';
import Calma from '@/components/Calma';
import { Topo, Rodape } from '@/components/Moldura';
import { EVENTO } from '@/lib/evento';

export const metadata = {
  title: 'Política de Privacidade',
  description:
    'Como a Conferência Waves 2026 trata os dados de quem se inscreve, incluindo os dados de menores de 18 anos.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/privacidade' },
};

const secoes = [
  {
    t: 'Quem somos',
    c: (
      <>
        <p>
          A Conferência Waves 2026 é realizada pela <strong>Igreja de Cristo — MANT
          Paraíso</strong>, {EVENTO.local.rua}, {EVENTO.local.cidade} — {EVENTO.local.uf}.
        </p>
        <p>
          Para tratar de qualquer assunto sobre os seus dados, fale com a organização pelo
          WhatsApp{' '}
          <a href={`https://wa.me/${EVENTO.inscricao.whatsapp}`} target="_blank" rel="noopener noreferrer">
            {EVENTO.inscricao.whatsappVisivel}
          </a>{' '}
          ({EVENTO.inscricao.responsavel}, responsável pelas inscrições) ou pelo e-mail{' '}
          <a href={`mailto:${EVENTO.redes.email}`}>{EVENTO.redes.email}</a>.
        </p>
      </>
    ),
  },
  {
    t: 'Este site não guarda seus dados',
    c: (
      <>
        <p>
          O site é estático: não tem servidor de aplicação nem banco de dados e{' '}
          <strong>não armazena nenhuma informação pessoal</strong>.
        </p>
        <p>
          No formulário de inscrição, os dados que você digita ficam apenas no seu
          dispositivo. Ao tocar em “Enviar pelo WhatsApp”, o site monta uma mensagem e a
          entrega ao aplicativo — <strong>quem envia a mensagem é você</strong>, do seu
          próprio número, para o número da organização.
        </p>
      </>
    ),
  },
  {
    t: 'Que dados a organização recebe',
    c: (
      <ul>
        <li>Nome completo</li>
        <li>Data de nascimento e idade</li>
        <li>Número de WhatsApp</li>
        <li>Cidade e, se você informar, a igreja onde congrega</li>
        <li>Se você tiver menos de 18 anos: nome e WhatsApp do responsável legal</li>
        <li>Se autorizou ou não o uso da sua imagem</li>
      </ul>
    ),
  },
  {
    t: 'Para que usamos',
    c: (
      <p>
        Só para organizar e realizar a Conferência Waves 2026: confirmar a inscrição,
        controlar vagas, combinar o pagamento, comunicar mudanças de programação e ter um
        contato em caso de emergência. <strong>Não vendemos, não cedemos e não
        compartilhamos seus dados com terceiros para publicidade.</strong>
      </p>
    ),
  },
  {
    t: 'Base legal',
    c: (
      <p>
        Consentimento do titular e, no caso de menores de 18 anos, consentimento específico
        e destacado de pelo menos um dos pais ou responsável legal — Lei nº 13.709/2018
        (LGPD), art. 7º, I, e art. 14.
      </p>
    ),
  },
  {
    t: 'Dados de crianças e adolescentes',
    c: (
      <p>
        A Waves é uma conferência de jovens e adolescentes e a idade de participação é
        livre. Por isso tratamos dados de menores de 18 anos sempre no melhor interesse
        deles: a inscrição de quem tem menos de 18 anos exige o nome, o contato e a
        autorização de um responsável legal.
      </p>
    ),
  },
  {
    t: 'Imagem e voz',
    c: (
      <>
        <p>
          A conferência será fotografada e filmada, e haverá transmissão ao vivo no canal da
          igreja no YouTube. O uso da sua imagem em publicações de divulgação depende da
          autorização específica que você marca (ou não) no formulário —{' '}
          <strong>essa autorização é opcional e não interfere na sua inscrição</strong>.
        </p>
        <p>
          Se você aparecer em alguma foto ou vídeo e quiser que seja retirado, é só pedir
          pelos contatos do primeiro item.
        </p>
      </>
    ),
  },
  {
    t: 'Por quanto tempo guardamos',
    c: (
      <p>
        As mensagens e listas de inscrição são mantidas por até 12 meses após o encerramento
        do evento e depois descartadas, salvo obrigação legal em sentido diverso.
      </p>
    ),
  },
  {
    t: 'Seus direitos',
    c: (
      <p>
        Você pode, a qualquer momento, confirmar a existência do tratamento, acessar,
        corrigir, anonimizar, solicitar a eliminação dos seus dados e revogar o
        consentimento. Basta pedir pelos contatos do primeiro item.
      </p>
    ),
  },
  {
    t: 'Medição de audiência',
    c: (
      <p>
        Usamos uma ferramenta de estatística de acessos que{' '}
        <strong>não utiliza cookies e não identifica pessoas</strong> — ela apenas conta
        visitas de forma agregada, para sabermos se a divulgação está funcionando.
      </p>
    ),
  },
];

export default function Privacidade() {
  return (
    <>
      <Calma />
      <Topo acao={false} />

      <main className="env" style={{ paddingTop: 'clamp(6rem, 14vh, 9rem)' }}>
        <section className="faixa faixa--curta">
          <div className="limite">
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
            <h1 className="display display--m" style={{ maxWidth: '14ch' }}>
              Política de Privacidade
            </h1>
            <p className="rotulo" style={{ marginTop: '1.25rem' }}>
              Atualizada em 3 de setembro de 2026
            </p>
          </div>
        </section>

        <section className="faixa" style={{ paddingTop: 0 }}>
          <div className="limite pilha pilha--larga" style={{ maxWidth: '760px', marginInline: 0 }}>
            {secoes.map((s, i) => (
              <article key={s.t}>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', marginBottom: '.75rem' }}
                >
                  {i + 1}. {s.t}
                </h2>
                <div className="prosa" style={{ fontSize: '1rem' }}>
                  {s.c}
                </div>
              </article>
            ))}

            <p>
              <Link href="/inscricao" className="botao">
                Fazer minha inscrição
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Rodape />
    </>
  );
}
