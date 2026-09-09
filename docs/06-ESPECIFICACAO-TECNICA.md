# 06 · Especificação técnica

Restrição de projeto: **sem backend.** Sem servidor de aplicação, sem banco de dados, sem API própria, sem função serverless.

---

## 1. Stack adotada

**Decisão da liderança (03/09):** site com tecnologias modernas, publicado na **Vercel**, sem backend.

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Next.js 16**, App Router, todas as rotas estáticas | Exportação estática pura (`○ Static` em todas as rotas). Nenhuma função de servidor, nenhum banco. |
| Estilo | **CSS puro** com Custom Properties, num arquivo comentado | O desenho é bastante autoral. Utilitários atrapalhariam mais do que ajudariam, e a equipe consegue ler e editar. |
| Rolagem | **Lenis** (~4 KB) | A rolagem suave é o que sustenta a sensação de descida. |
| Movimento | **CSS + IntersectionObserver**, sem biblioteca de animação | Todo o movimento é `transform`, `opacity` e `clip-path`. Nada de Framer Motion, nada de GSAP. |
| Tipografia | **Archivo** variável + **Sora**, auto-hospedadas | Zero requisição a terceiros. Ver § 1.3. |
| Hospedagem | **Vercel** | Escolha da liderança. Alternativas equivalentes em § 1.4. |

**Peso real da entrega:** 103 KB de JavaScript compartilhado, 1,6 KB por rota. Nenhuma dependência de UI.

### 1.1 O conceito, porque afeta o código

O versículo da marca fala de água que cobre a terra, e o IDV já se divide em duas famílias de cor: laranja e ouro (superfície, glória) e turquesa e índigo (profundidade). A página atravessa essa coluna d'água — começa na luz, afunda até o abismo, e no CTA final a onda quebra e volta ao ouro.

Tecnicamente: um único valor (`--depth`, de 0 a 1) é escrito a cada quadro e desloca um gradiente alto e fixo atrás de todo o conteúdo. Uma transformação na GPU, um write por quadro.

### 1.2 A revelação por linha d'água

O conteúdo não entra com o fade-and-slide de sempre: uma linha sobe através dele e o descobre. Duas armadilhas resolvidas, ambas documentadas no código:

- **O recorte fica num elemento interno.** Um `clip-path` no próprio elemento observado faz o IntersectionObserver calcular área de interseção zero — ele nunca dispara e o conteúdo fica invisível para sempre.
- **Há uma varredura de resgate.** Se a página pular de uma vez (arrastar a barra, tecla End, restauração de posição pelo navegador), um elemento vai de "abaixo da dobra" para "acima da dobra" entre dois quadros sem nunca intersectar. `lib/revelar.js` mantém um conjunto de pendentes e o esvazia a cada quadro da descida — custo zero depois do começo.

### 1.3 Tipografia: como a identidade entra sem risco de licença

| Papel | Fonte | Licença |
|---|---|---|
| Lockup "WAVES 26" e lema | Rushland, OC Grind, Mariglen, Kaway | **Não são webfonts.** Entram como imagem da arte original, exatamente como nas peças. |
| Títulos | **Archivo** variável (largura 62–125) | SIL OFL, auto-hospedada, 90 KB |
| Texto | **Sora** variável (peso 200–800) | SIL OFL, auto-hospedada, 33 KB |

A Archivo tem eixo de largura, e é ele que vira sistema: títulos em 125 (expandido — cobrem), rótulos em 62 (comprimido — contidos). O contraste dentro de uma mesma família é o que dá caráter, sem precisar de uma terceira fonte.

### 1.4 Sobre o plano da Vercel

O plano gratuito (Hobby) **restringe uso comercial**. Uma conferência de igreja com inscrição simbólica normalmente não é o alvo dessa cláusula, mas se a Waves Store passar a vender pelo site, confirme com a Vercel ou migre para o Pro. **Cloudflare Pages** e **Netlify** não têm essa restrição no plano gratuito e rodam este projeto sem nenhuma alteração de código.

---

## 2. Estrutura de arquivos

```
SITE/
├── docs/                    esta documentação
└── web/                     o site (Next.js)
    ├── app/
    │   ├── layout.js        coluna d'água, grão, metadados, JSON-LD
    │   ├── page.js          home
    │   ├── globals.css      todo o desenho
    │   ├── inscricao/       formulário
    │   ├── privacidade/     política (LGPD)
    │   ├── not-found.js     404
    │   ├── robots.js  sitemap.js
    ├── components/
    │   ├── Descida.js       rolagem suave, --depth, âncoras, varredura
    │   ├── Emerge.js        revelação por linha d'água
    │   ├── Agua.js          vídeo do herói com decisão de rede
    │   ├── Contagem.js      contagem regressiva
    │   ├── Formulario.js    inscrição → WhatsApp
    │   ├── Calma.js         desliga a descida em páginas de leitura
    │   └── Moldura.js       cabeçalho, rodapé, barra fixa
    ├── lib/
    │   ├── evento.js        FONTE ÚNICA: datas, valor, contatos, local
    │   └── revelar.js       registro de revelação
    ├── public/
    │   ├── brand/           lockup, lema, favicons, imagem de compartilhamento
    │   ├── fonts/           archivo-latin.woff2, sora-latin.woff2
    │   └── media/           agua.mp4, terra.jpg, paraiso.jpg, templo.jpg
    └── vercel.json          cabeçalhos de segurança e cache
```

> **Regra de manutenção:** data, valor, horário, contatos e endereço vivem **só** em `lib/evento.js`. Mudou algo do evento, muda ali e o site inteiro acompanha — inclusive os dados estruturados do Google.

### 2.1 De onde vêm as imagens

Nada de banco de imagens. Tudo saiu do material da própria conferência.

| Arquivo | Origem | Resolução nativa |
|---|---|---|
| `templo` | `DJI/DJI_0478.MP4` — aérea 4K da sede, com a placa legível | **3840 × 2160** |
| `paraiso` | `DJI/DJI_0478.MP4` — aérea 4K da cidade | **3840 × 2160** |
| `serra` | `DJI/DJI_0481.MP4` — a serra que cerca a cidade | **3840 × 2160** |
| `terra` | `PREMIERE/CHAMADA WAVES26.mp4` — a Terra vista do espaço | 1920 × 1080 |
| `agua-poster` | quadro do laço de água | 1920 × 1080 |
| `agua.mp4` / `agua-leve.mp4` | 1,8 s de oceano desacelerado e espelhado: laço de 8,6 s sem emenda | 1440 / 960 de largura |
| `logo-waves26.svg`, `lema-*.svg` | Traçados a partir dos PNGs do IDV | **vetor** |
| `og-waves26.jpg` | Recorte da arte oficial de telão | 1200 × 630 |

A captação bruta da DJI é **4K** — foi o que permitiu dobrar a resolução das aéreas em relação ao que estava sendo usado no vídeo de chamada, que é 1080p.

### 2.2 Pipeline de imagem responsiva

Cada foto existe em **AVIF, WebP e JPEG**, em larguras de 640 a 3200 px — nunca acima da resolução da fonte, porque ampliar não cria detalhe, só peso. O JPEG para em 1600: quem não tem AVIF nem WebP também não está numa tela de alta densidade.

O componente `Foto` monta o `<picture>` e o navegador escolhe formato e largura a partir de `sizes`. **Nenhuma otimização em tempo de execução** — os arquivos são gerados antes (`scripts/gerar-imagens.py`) e servidos como estáticos, o que mantém a promessa de "sem backend" e evita o custo por imagem da otimização da Vercel.

Medido em tela de 1440 px sem alta densidade: a Terra em tela cheia baixa `terra-1600.avif`; os quadros do trilho, de 520 px, baixam a variante de 640. Numa tela de alta densidade, as mesmas marcações pedem 2400 ou 3200.

**O lockup e o lema são vetor.** Foram traçados a partir dos PNGs do IDV: 5 KB e 32 KB, nítidos em qualquer tamanho. Isso resolve a lacuna L1 da [auditoria](01-AUDITORIA.md) — não existia versão vetorial da marca. A variante escura resolve a L2.

---

## 3. Orçamento de performance

Meta: **LCP < 2,5 s** em 4G num celular intermediário — a condição real do público ([02 § 6](02-ESTRATEGIA-E-PUBLICO.md)).

| Recurso | Orçamento | Observação |
|---|---|---|
| HTML | ≤ 25 KB | Sem comprimir |
| CSS | ≤ 20 KB | CSS crítico do hero embutido no `<head>` |
| JavaScript | ≤ 15 KB | Sem framework, sem jQuery, sem biblioteca de animação |
| Fontes | ≤ 90 KB | **48 KB reais** — Sora variável, subsets latin + latin-ext |
| Imagem do hero | ≤ 180 KB | AVIF com fallback WebP |
| Vídeo do hero | ≤ 2,5 MB | Só carrega em `min-width: 900px` e com conexão boa |
| Galeria (8 fotos) | ≤ 600 KB | `loading="lazy"`, AVIF/WebP |
| **Total da primeira tela** | **≤ 350 KB** | |

### 3.1 Regras não negociáveis

1. **A imagem LCP não usa `loading="lazy"`.** Erro clássico que sozinho joga o LCP para 4 s. Use `fetchpriority="high"` nela.
2. **`width` e `height` em toda `<img>`** — evita CLS.
3. **AVIF → WebP → JPG** via `<picture>`:
   ```html
   <picture>
     <source srcset="hero.avif" type="image/avif">
     <source srcset="hero.webp" type="image/webp">
     <img src="hero.jpg" width="1200" height="1600" alt="" fetchpriority="high">
   </picture>
   ```
   AVIF reduz até 50 % em relação ao JPEG e WebP de 25 a 35 %. Em um público majoritariamente pré-pago, isso é dinheiro do visitante.
4. **Vídeo de fundo nunca carrega no celular.** Use `<img>` com o poster no mobile e troque por `<video>` só a partir de 900 px, via `matchMedia`. Atributos obrigatórios no vídeo: `muted playsinline loop preload="none" poster="..."`.
5. **`srcset` + `sizes`** em toda imagem que muda de tamanho com o viewport.
6. **Zero requisição a terceiros no carregamento inicial.** Fontes auto-hospedadas, sem Google Fonts, sem CDN de ícones, sem embed de mapa. O mapa é uma imagem estática que abre o Google Maps ao clicar.
7. **JavaScript com `defer`**, nunca bloqueando a renderização. Quebre qualquer tarefa longa (> 50 ms) — é o que garante INP < 200 ms.

### 3.2 Metas de Core Web Vitals

| Métrica | Meta | Como validar |
|---|---|---|
| LCP | ≤ 2,5 s | PageSpeed Insights, aba Mobile |
| INP | ≤ 200 ms | PageSpeed Insights / Chrome DevTools |
| CLS | ≤ 0,1 | Reservar espaço para imagens, fontes e contagem regressiva |

Validar em **PageSpeed Insights com throttling 4G** e num celular físico real — não só no desktop.

---

## 4. Inscrição sem backend — o modelo adotado

**Decisão fechada (D1):** as inscrições da Waves 2026 são geridas pela **Anna Beatriz Veiga**. Não há plataforma de inscrição nem pagamento online.

### 4.1 Como funciona

A página `/inscricao` traz um formulário curto. Ao enviar, o site **monta uma mensagem formatada e a entrega ao aplicativo WhatsApp** através de um link `wa.me`. Quem envia a mensagem é o próprio visitante, do número dele, para o número da Anna.

```
visitante preenche  →  o site monta a mensagem  →  abre o WhatsApp do visitante
                                                →  ele toca em enviar
                                                →  a Anna recebe e dá sequência
```

**Por que este modelo é bom aqui:**

| Vantagem | Explicação |
|---|---|
| Zero backend | Nenhum servidor, banco ou serviço de terceiro no caminho |
| Zero custo | Não há mensalidade de plataforma de formulário |
| Zero armazenamento | Os dados nunca ficam no site — a exposição de LGPD é praticamente nula ([08 § 2](08-LGPD-E-MENORES.md)) |
| Canal que o público já usa | O adolescente já tem o WhatsApp aberto; não há cadastro nem senha |
| Conversa aberta na hora | A Anna já responde sobre pagamento e dúvidas no mesmo fio |

**Limitações a aceitar conscientemente:**

- Não há lista automática de inscritos — a organização compila as mensagens à mão.
- Não há pagamento integrado.
- O visitante precisa ter WhatsApp (na prática, todo o público tem).
- Se o volume passar de algumas centenas, o modelo cansa. Para a escala desta edição, serve.

### 4.2 Construção do link

```js
var url = 'https://wa.me/' + NUMERO + '?text=' + encodeURIComponent(mensagem);
```

`NUMERO` fica no HTML (`data-whatsapp="5563984721648"`), não no JavaScript — trocar o número é editar um atributo, sem mexer em código.

Formato do WhatsApp: código do país + DDD + número, **só dígitos**, sem `+`, espaço ou traço.

### 4.3 Formato da mensagem

O WhatsApp aceita `*negrito*` e `_itálico_`. A mensagem é montada em blocos rotulados para a Anna processar rápido:

```
*INSCRIÇÃO — CONFERÊNCIA WAVES 2026*
18, 19 e 20 de setembro

*Nome:* Maria Clara Souza
*Nascimento:* 22/04/2011 (15 anos)
*WhatsApp:* (63) 98888-7777
*Cidade:* Paraíso do Tocantins
*Igreja:* MANT Paraíso

*RESPONSÁVEL LEGAL*
*Nome:* Rosana Souza Lima
*WhatsApp:* (63) 99111-2222
_Autorização do responsável confirmada._

*Uso de imagem:* autorizado
*Política de privacidade:* aceita

_Enviado pelo site waves.mantparaiso.com.br_
```

O bloco do responsável só aparece quando a data de nascimento indica menos de 18 anos.

### 4.4 Robustez em navegador embutido

Navegadores internos do Instagram e do WhatsApp às vezes bloqueiam navegação automática. A implementação cobre isso com três camadas:

1. Tenta `window.location.href = url` logo após o envio.
2. Exibe um painel com um **link real** (`<a href>`) — "Não abriu? Toque aqui".
3. Oferece **"Copiar mensagem"**, com retaguarda em `execCommand('copy')` para navegadores sem a API de área de transferência.

Sem JavaScript, um `<noscript>` mostra o link direto do WhatsApp da Anna.

### 4.5 Campos do formulário

Mínimo necessário, conforme o princípio da minimização ([08 § 3.3](08-LGPD-E-MENORES.md)):

| Campo | Obrigatório | Por quê |
|---|---|---|
| Nome completo | sim | Identificação na lista |
| Data de nascimento | sim | Dispara o fluxo de menor de 18 anos |
| WhatsApp | sim | Canal de retorno |
| Cidade | sim | Logística e noção de alcance regional |
| Igreja | não | Só informativo |
| Nome e WhatsApp do responsável | se < 18 | Exigência da LGPD |
| Autorização do responsável | se < 18 | Exigência da LGPD |
| Concordância com o uso dos dados | sim | Base legal do tratamento |
| Autorização de imagem | **não** | Opcional por lei — não pode condicionar a inscrição |

### 4.6 O que o site nunca faz

- ❌ Não recebe nem armazena dado pessoal
- ❌ Não usa `localStorage` para dado de pessoa
- ❌ Não processa pagamento
- ❌ Não exibe lista de inscritos

---

## 5. SEO

### 5.1 Essenciais

```html
<html lang="pt-BR">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>…</title>
<meta name="description" content="…">
<link rel="canonical" href="https://waves.mantparaiso.com.br/">
<meta name="theme-color" content="#0B1A33">
```

### 5.2 Open Graph — o item de maior retorno

A divulgação acontece no WhatsApp e no Instagram. **Sem `og:image`, o link compartilhado aparece como texto cru e a taxa de clique despenca.**

```html
<meta property="og:type"        content="website">
<meta property="og:title"       content="Conferência Waves 2026 · Ondas de Poder e Glória">
<meta property="og:description" content="18, 19 e 20 de setembro · MANT Paraíso · Paraíso do Tocantins">
<meta property="og:image"       content="https://waves.mantparaiso.com.br/assets/img/og-waves26.jpg">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url"         content="https://waves.mantparaiso.com.br/">
<meta property="og:locale"      content="pt_BR">
<meta name="twitter:card"       content="summary_large_image">
```

A imagem OG precisa ser **JPG ou PNG** (o WhatsApp não renderiza WebP de forma confiável em pré-visualização), abaixo de 300 KB, com o lockup e a data legíveis num card pequeno.

### 5.3 Dados estruturados de evento

Faz o Google exibir data, local e link de inscrição direto no resultado de busca.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Conferência Waves 2026 — Ondas de Poder e Glória",
  "startDate": "2026-09-18T19:30-03:00",
  "endDate": "2026-09-20T22:00-03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Igreja de Cristo — MANT Paraíso (Sede)",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua L10, 269 — Interlagos",
      "addressLocality": "Paraíso do Tocantins",
      "addressRegion": "TO",
      "addressCountry": "BR"
    }
  },
  "image": ["https://waves.mantparaiso.com.br/assets/img/og-waves26.jpg"],
  "description": "Conferência de jovens e adolescentes. Três noites de louvor, Palavra e presença de Deus.",
  "organizer": {
    "@type": "Organization",
    "name": "Igreja de Cristo — MANT Paraíso",
    "url": "https://www.mantparaiso.com.br"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://waves.mantparaiso.com.br/inscricao",
    "price": "50.00",
    "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-09-03"
  }
}
</script>
```

O `startDate` usa a abertura confirmada (sexta, 19h30 — D4). O `endDate` é estimativa até a programação fechar ([P4](10-PENDENCIAS.md)) — ajustar quando sair. Validar no **Rich Results Test** do Google antes de publicar.

### 5.4 Arquivos de apoio

`robots.txt` liberando tudo e apontando o sitemap; `sitemap.xml` com as duas URLs.

---

## 6. Acessibilidade (WCAG 2.1 AA)

Não é burocracia: adolescente usa o site sob sol, com uma mão, com a tela em brilho baixo. Acessibilidade aqui é usabilidade.

- [ ] Contraste conforme a tabela de [04 § 1.2](04-DESIGN-SYSTEM.md). **Nunca branco sobre laranja.**
- [ ] Hierarquia de títulos correta: um `<h1>`, depois `<h2>` por seção, sem pular nível
- [ ] `alt` descritivo em toda imagem com conteúdo; `alt=""` em decorativa
- [ ] O lockup em SVG é imagem de texto → `alt="Conferência Waves 26"`
- [ ] Alvos de toque ≥ 48 × 48 px
- [ ] `:focus-visible` visível em todo elemento interativo
- [ ] Navegação completa por teclado; ordem de tabulação natural
- [ ] `prefers-reduced-motion` respeitado
- [ ] Vídeo do hero: `muted`, sem som automático, com poster
- [ ] Vídeos de conteúdo com legenda embutida (a maioria assiste sem som)
- [ ] Zoom até 200 % sem quebrar o layout
- [ ] Link "pular para o conteúdo" antes da barra fixa

Validar com **axe DevTools** e **Lighthouse** (aba Acessibilidade ≥ 95).

---

## 7. Analytics sem backend e sem cookie

Para medir os KPIs de [02 § 5](02-ESTRATEGIA-E-PUBLICO.md).

**Recomendado:** analytics sem cookie e sem dado pessoal — **Cloudflare Web Analytics** (grátis, já integrado à hospedagem, sem cookie, sem banner de consentimento) ou **Plausible** (pago, mais recursos).

**Evitar Google Analytics 4** neste projeto: usa cookie, coleta dado pessoal, exige banner de consentimento e trata dado de menor de idade — exatamente o que a [LGPD](08-LGPD-E-MENORES.md) manda evitar quando não é necessário.

**Eventos a rastrear:**

| Evento | Onde |
|---|---|
| `cta_inscricao` | Clique em qualquer botão de inscrição (com `data-local` indicando qual: hero, seção, rodapé, barra fixa) |
| `compartilhar_whatsapp` | Botão de compartilhar |
| `copiar_link` | Botão de copiar |
| `ver_programacao` | Rolagem até `#programacao` |
| `abrir_faq` | Abertura de item do FAQ (registra qual dúvida mais aparece) |
| `clique_mapa` | Clique em "Como chegar" |

---

## 8. Segurança e cabeçalhos

Em `vercel.json` (já configurado no projeto):

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; frame-ancestors 'none'
  Strict-Transport-Security: max-age=31536000; includeSubDomains
```

O CSP acima só funciona porque o site não carrega nada de terceiros — mais um argumento a favor de auto-hospedar fontes e não embutir mapa.

Cache em `_headers`:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

Assets com hash no nome ganham cache de 1 ano; HTML nunca é cacheado, para que uma correção de horário chegue na hora.

---

## 9. Compatibilidade

| Alvo | Suporte |
|---|---|
| Chrome / Edge | 2 últimas versões |
| Safari iOS | 15+ |
| Chrome Android | 2 últimas versões |
| Navegador interno do Instagram e do WhatsApp | **Teste obrigatório** — é onde a maior parte do público vai abrir |
| Firefox | 2 últimas versões |

> Testar dentro do webview do Instagram não é opcional. Ele tem particularidades de altura de viewport (`100vh` estoura), autoplay de vídeo e cache. Use `100dvh` em vez de `100vh`.

---

## 10. Publicação

1. Repositório no GitHub, branch `main`
2. Vercel conectada ao repositório, **Root Directory: `SITE/web`**; deploy automático a cada push
3. Domínio `waves.mantparaiso.com.br` apontado por CNAME; HTTPS automático
4. Cada Pull Request gera uma URL de pré-visualização para aprovação da liderança antes de ir ao ar
5. Rollback: reverter o commit — o deploy anterior volta em segundos

---

## Fontes de pesquisa

- [DanubeData — Cloudflare Pages vs Netlify vs Vercel (2026)](https://danubedata.ro/blog/cloudflare-pages-vs-netlify-vs-vercel-static-hosting-2026)
- [ecn-apps — Vercel vs Netlify vs Cloudflare Pages vs GitHub Pages 2026](https://ecn-apps.com/pages/articles/vercel-vs-netlify-vs-cloudflare-pages-2026.html)
- [FormGrid — The Best Form Backend for Static Sites in 2026](https://formgrid.dev/blog/the-best-form-backend-for-static-sites-in-2026)
- [DEV — Tally Alternatives in 2026](https://dev.to/allenarduino/tally-alternatives-in-2026-for-developers-who-need-a-form-backend-not-just-a-builder-3955)
- [Digital Applied — Core Web Vitals 2026: INP, LCP & CLS](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide)
- [Fluxando — Core Web Vitals 2026: o que mudou](https://fluxando.com.br/blog/core-web-vitals-2026.html) (dado sobre pré-pago no Brasil)
- [W3era — Core Web Vitals Guide 2026](https://www.w3era.com/blog/seo/core-web-vitals-guide/)
