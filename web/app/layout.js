import './globals.css';
import ReactDOM from 'react-dom';
import Descida from '@/components/Descida';
import { AudioProvider } from '@/lib/audio';
import { EVENTO, DATAS_EXTENSO } from '@/lib/evento';

export const metadata = {
  metadataBase: new URL(EVENTO.url),
  title: {
    default: `Conferência Waves 2026 — ${DATAS_EXTENSO}`,
    template: '%s · Conferência Waves 2026',
  },
  description:
    'Três noites de louvor, Palavra e presença de Deus para jovens e adolescentes, na MANT Paraíso. Segunda edição da Conferência Waves.',
  applicationName: 'Conferência Waves 2026',
  authors: [{ name: 'Igreja de Cristo — MANT Paraíso' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Conferência Waves 2026',
    title: 'Conferência Waves 2026 — Ondas de Poder e Glória',
    description: `${DATAS_EXTENSO}. MANT Paraíso, Paraíso do Tocantins.`,
    url: EVENTO.url,
    images: [
      {
        url: '/brand/og-waves26.jpg',
        width: 1200,
        height: 630,
        alt: 'Conferência Waves 2026 — 18, 19 e 20 de setembro de 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conferência Waves 2026 — Ondas de Poder e Glória',
    description: `${DATAS_EXTENSO}. MANT Paraíso, Paraíso do Tocantins.`,
    images: ['/brand/og-waves26.jpg'],
  },
  creator: 'Igreja de Cristo — MANT Paraíso',
  publisher: 'Igreja de Cristo — MANT Paraíso',
  // os telefones da página já são links de WhatsApp; o iOS não precisa
  // reinventá-los como ligações
  formatDetection: { telephone: false, address: false, email: false },
  appleWebApp: { capable: true, title: 'Waves 26', statusBarStyle: 'black-translucent' },
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32' },
      { url: '/brand/favicon-192.png', sizes: '192x192' },
    ],
    apple: '/brand/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#04101e',
  colorScheme: 'dark',
  // sem maximumScale nem userScalable: ampliar a página é direito de quem lê
  width: 'device-width',
  initialScale: 1,
};

const dadosEstruturados = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Conferência Waves 2026 — Ondas de Poder e Glória',
  startDate: EVENTO.inicio,
  endDate: EVENTO.fim,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  // evento misto precisa declarar os dois lugares: o físico e o da transmissão.
  // Só o Place faria o Google recusar o resultado enriquecido.
  location: [
    {
      '@type': 'Place',
      name: EVENTO.local.nome,
      address: {
        '@type': 'PostalAddress',
        streetAddress: EVENTO.local.rua,
        addressLocality: EVENTO.local.cidade,
        addressRegion: EVENTO.local.uf,
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'VirtualLocation',
      name: `Canal ${EVENTO.transmissao.canal} no YouTube`,
      url: EVENTO.transmissao.url,
    },
  ],
  image: [`${EVENTO.url}/brand/og-waves26.jpg`],
  description:
    'Conferência de jovens e adolescentes. Três noites de louvor, Palavra e presença de Deus.',
  organizer: {
    '@type': 'Organization',
    name: 'Igreja de Cristo — MANT Paraíso',
    url: EVENTO.redes.site,
  },
  offers: {
    '@type': 'Offer',
    url: `${EVENTO.url}/inscricao`,
    price: String(EVENTO.inscricao.valor),
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    validFrom: '2026-09-03',
  },
  inLanguage: 'pt-BR',
  isAccessibleForFree: false,
  audience: {
    '@type': 'Audience',
    audienceType: 'Jovens e adolescentes',
  },
};

export default function RootLayout({ children }) {
  // As duas fontes são necessárias já no primeiro quadro: Archivo no título do
  // herói, Sora no texto logo abaixo. Sem o preload, o navegador só as descobre
  // depois de baixar e analisar o CSS.
  //
  // Vai por ReactDOM.preload, e não por uma <link> escrita à mão: o React 19
  // içaria a tag para o <head> e a deixaria também onde foi escrita — duas
  // preloads iguais no HTML de toda página.
  for (const fonte of ['/fonts/archivo-latin.woff2', '/fonts/sora-latin.woff2']) {
    ReactDOM.preload(fonte, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    });
  }

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }}
        />
      </head>
      <body suppressHydrationWarning>
        <AudioProvider>
          <div className="depth" aria-hidden="true">
            <div className="depth__column">
              <div className="depth__rays" />
            </div>
            <div className="depth__veu" />
            <div className="depth__motes" />
          </div>

          {children}

          <div className="grao" aria-hidden="true" />
          <Descida />
        </AudioProvider>
      </body>
    </html>
  );
}
