// Fonte única de verdade sobre o evento.
// Mudou alguma informação? Muda aqui e o site inteiro acompanha.

export const EVENTO = {
  nome: 'Conferência Waves 2026',
  tema: 'Ondas de Poder e Glória',
  versiculo: {
    texto:
      'Porque a terra se encherá do conhecimento da glória do Senhor, como as águas cobrem o mar.',
    ref: 'Habacuque 2.14',
  },

  // 18, 19 e 20 de setembro de 2026. Abertura sexta, 19h30 (fuso -03:00).
  inicio: '2026-09-18T19:30:00-03:00',
  fim: '2026-09-20T22:00:00-03:00',
  mes: 'setembro',
  ano: 2026,

  noites: [
    {
      dia: '18',
      semana: 'Sexta-feira',
      hora: '19h30',
      sessoes: ['19h30 — Abertura Oficial'],
      abertura: true,
      sub: 'Abertura oficial da conferência',
    },
    {
      dia: '19',
      semana: 'Sábado',
      hora: '08h30 e 19h00',
      sessoes: ['08h30 (Manhã)', '19h00 (Noite)'],
      abertura: false,
      sub: 'Manhã e noite de adoração e Palavra profunda',
    },
    {
      dia: '20',
      semana: 'Domingo',
      hora: '19h00',
      sessoes: ['19h00 — Encerramento'],
      abertura: false,
      sub: 'Celebração e encerramento profético',
    },
  ],

  local: {
    nome: 'MANT Paraíso — Sede',
    rua: 'Rua L10, 269 — Interlagos',
    cidade: 'Paraíso do Tocantins',
    uf: 'TO',
    mapa:
      'https://www.google.com/maps/search/?api=1&query=Rua+L10%2C+269%2C+Interlagos%2C+Para%C3%ADso+do+Tocantins+-+TO',
  },

  inscricao: {
    valor: 50,
    valorTexto: 'R$ 50',
    moeda: 'R$',
    // Anna Beatriz Veiga — responsável pelas inscrições
    whatsapp: '5563984721648',
    whatsappVisivel: '(63) 98472-1648',
    responsavel: 'Anna Beatriz',
  },

  contatos: [
    {
      nome: 'Anna Beatriz',
      papel: 'Inscrições',
      whatsapp: '5563984721648',
      visivel: '(63) 98472-1648',
    },
    {
      nome: 'Ev. Athos',
      papel: 'Liderança de adolescentes',
      whatsapp: '5563999140125',
      visivel: '(63) 99914-0125',
    },
  ],

  transmissao: {
    canal: 'MANT Paraíso',
    url: 'https://www.youtube.com/@MANTPARAISO',
  },

  redes: {
    instagram: 'https://www.instagram.com/mant_paraiso',
    instagramJovem: 'https://www.instagram.com/mantjovem',
    youtube: 'https://www.youtube.com/@MANTPARAISO',
    site: 'https://www.mantparaiso.com.br',
    email: 'mantparaisosede@gmail.com',
  },

  url: 'https://waves.mantparaiso.com.br',
};

// ---------------------------------------------------------------------------
// Derivados. Nada aqui é digitado duas vezes: tudo sai de EVENTO acima, para
// que mudar uma data em um lugar mude a página inteira — inclusive o herói, o
// rodapé e os dados estruturados.
// ---------------------------------------------------------------------------

const dias = EVENTO.noites.map((n) => n.dia);

/** "18, 19 e 20" */
export const DIAS_CURTO =
  dias.length > 1 ? `${dias.slice(0, -1).join(', ')} e ${dias.at(-1)}` : dias[0];

/** "18, 19 e 20 de setembro de 2026" */
export const DATAS_EXTENSO = `${DIAS_CURTO} de ${EVENTO.mes} de ${EVENTO.ano}`;

/** "18, 19 e 20\nde setembro" — as duas linhas do herói */
export const DATAS_HEROI = { dias: DIAS_CURTO, mes: `de ${EVENTO.mes}` };

const primeira = EVENTO.noites.find((n) => n.abertura) ?? EVENTO.noites[0];

/** "Abertura sexta-feira, 19h30" */
export const ABERTURA = `Abertura ${primeira.semana.toLowerCase()}${
  primeira.hora ? `, ${primeira.hora}` : ''
}`;
