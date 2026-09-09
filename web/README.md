# Site — Conferência Waves 2026

Next.js 16 (App Router), sem backend, publicado na Vercel.

---

## Rodar

```bash
cd SITE/web
npm install
npm run dev        # http://localhost:3000
```

Para conferir o que vai ao ar de verdade:

```bash
npm run build && npm start
```

---

## O conceito, em uma frase

**A página é uma descida.** O versículo da marca fala de água que cobre a terra, e o IDV já se divide em duas famílias de cor: laranja e ouro (sol na superfície, glória) e turquesa e índigo (profundidade). O site atravessa essa coluna d'água de cima a baixo — começa na luz, afunda até o abismo, e no fim a onda quebra e a página volta ao ouro.

Quem for mexer aqui: **isso não é decoração, é o versículo.** Se uma mudança quebrar a descida, provavelmente é a mudança que está errada.

---

## Como está montado

```
app/
  layout.js         coluna d'água, grão, metadados, dados estruturados
  page.js           home
  inscricao/        formulário
  privacidade/      política (LGPD)
  error.js          rede de segurança se algo estourar no cliente
  manifest.js       nome e ícone de quem salva o site na tela de início
  globals.css       todo o desenho: tokens, tipografia, componentes
components/
  Descida.js        rolagem suave + escreve --depth + âncoras + varredura
  Emerge.js         revelação por linha d'água
  Agua.js           vídeo do herói, com decisão de rede
  Contagem.js       contagem regressiva
  Formulario.js     inscrição → WhatsApp
  Calma.js          desliga a descida em páginas de leitura
  Moldura.js        cabeçalho, rodapé, barra fixa
  Foto.js           imagem responsiva (AVIF / WebP / JPEG)
lib/
  evento.js         FONTE ÚNICA de datas, valor, contatos, local
  imagens.js        manifesto das larguras de cada imagem
  revelar.js        registro de revelação (observador + resgate)
scripts/
  gerar-imagens.py  gera as variantes; ver scripts/LEIA-ME.md
```

### O que mexer para cada coisa

| Mudou | Onde |
|---|---|
| Data, valor, horário, contatos, endereço, links | **`lib/evento.js` e só ali** — inclusive as datas do herói e a linha de abertura, que hoje saem de lá derivadas |
| Texto das seções | `app/page.js` |
| Cor, tipografia, espaçamento | `app/globals.css` (blocos com título) |
| Imagens e vídeo | `public/media/` — e declare as larguras em `lib/imagens.js` |
| Logo, favicon, imagem de compartilhamento | `public/brand/` |

---

## Cinco detalhes que parecem bugs mas são decisões

**1. O recorte da revelação fica num `<span>` interno, não no elemento observado.**
Um `clip-path` no próprio alvo faz o IntersectionObserver calcular área zero — ele nunca dispara e o conteúdo some para sempre. Custou uma hora para descobrir. Não mova o recorte para fora.

**2. Há duas camadas revelando conteúdo.**
O observador cuida da rolagem normal; `lib/revelar.js` tem uma varredura de resgate chamada a cada quadro da descida. Sem ela, quem arrasta a barra de rolagem de uma vez, ou aperta End, deixa blocos invisíveis — o elemento pula de "abaixo da dobra" para "acima da dobra" entre dois quadros e nunca chega a intersectar.

**3. O vídeo do herói não carrega para todo mundo.**
`Agua.js` checa `saveData` e `effectiveType` antes, e serve dois arquivos: 1440 px em tela larga, 960 px no celular. Em 2G/3G ou com economia de dados fica só o quadro parado, que é a mesma água. O público chega em 4G e boa parte em plano pré-pago — megabyte não se cobra de quem não pediu.

**4. Os SVGs da marca têm cor fixa no arquivo.**
`currentColor` não resolve quando o SVG entra por `<img>`: o documento é independente e herda a cor inicial, preto. Por isso existem `logo-waves26.svg` (branco) e `logo-waves26-escuro.svg`.

**5. O `max` do campo de data é definido depois da montagem.**
Calcular `new Date()` no render gravaria a data do build no HTML estático — divergência de hidratação e limite congelado no dia da publicação.

**6. O `<video>` do herói não tem atributo `poster`.**
O quadro parado fica sempre no DOM, embaixo, como `<picture>`. O atributo `poster` só aceita um arquivo — usá-lo forçaria baixar o JPEG de 357 KB além do AVIF que o `<Foto>` já escolheu para aquela tela. Assim a mesma imagem serve de pôster e de retaguarda.

**7. As preloads de fonte vão por `ReactDOM.preload`, não por uma `<link>` escrita à mão.**
O React 19 iça a tag para o `<head>` e a deixa também onde foi escrita: duas preloads iguais em toda página.

**8. O foco depois de um envio recusado é disparado por um contador, não pela lista de erros.**
A lista encolhe conforme a pessoa digita; usá-la como gatilho roubaria o foco no meio de uma palavra.

---

## Publicar na Vercel

1. Repositório no GitHub com este projeto.
2. Na Vercel, **New Project** → importe o repositório → **Root Directory: `SITE/web`**.
3. Framework detectado: Next.js. Sem variáveis de ambiente, sem banco.
4. Domínio: adicionar `waves.mantparaiso.com.br` e apontar o CNAME no DNS.

O `vercel.json` já traz cabeçalhos de segurança e cache longo para fontes e mídia.

**Sobre a Content-Security-Policy.** Ela é fechada: nada de origem externa carrega. Se um dia entrar um script de terceiros — estatística, pixel, chat —, ele precisa ser liberado ali ou simplesmente não roda. O mesmo vale para a barra de comentários da Vercel nos *preview deployments*, que vem de `vercel.live`: nas prévias ela não aparece, e a produção não é afetada.

**Sobre o cache da marca.** `/fonts` e `/media` são `immutable` por um ano — os nomes carregam a largura, então um arquivo novo tem nome novo. `/brand` não: logo e favicon mudam mantendo o nome, e por isso ficam com uma semana mais revalidação em segundo plano.

**Sobre o `.vercelignore`.** Cerca de 44 MB da pasta `public/` são mídia que o site não referencia (o vídeo de chamada e as larguras de 3840 px). Continua tudo no repositório, como material de origem, mas fora de cada deploy. Voltou a usar? Apague a linha correspondente.

> **Atenção ao plano.** O plano gratuito (Hobby) da Vercel restringe uso comercial. Uma conferência de igreja com inscrição simbólica normalmente não é o alvo dessa cláusula, mas se a Waves Store passar a vender pelo site, confirme com a Vercel ou migre para o Pro. Cloudflare Pages e Netlify não têm essa restrição no plano gratuito e rodam este projeto sem alteração.

---

## Antes de publicar qualquer mudança

```
[ ] `npm run build` sem aviso
[ ] Abriu no celular de verdade, em 4G, não só no navegador do computador
[ ] Testou o envio do formulário com um WhatsApp real
[ ] Testou com data de nascimento de menor de 18 (o bloco do responsável tem que aparecer)
[ ] Mandou o link para você mesmo no WhatsApp e a imagem apareceu no card
[ ] Abriu pelo link na bio do Instagram
[ ] Datas e valor conferidos contra a arte oficial
[ ] Sem erro no console
```

---

Documentação de planejamento do projeto: [`../docs/`](../docs/)
