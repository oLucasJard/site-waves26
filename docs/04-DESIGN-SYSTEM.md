# 04 · Design system web

Tradução do IDV 2026 para a tela.

> **Implementado.** O sistema descrito aqui está em `SITE/web/app/globals.css`, com os mesmos nomes. Este documento explica o porquê; o CSS é a fonte de verdade.

## 0. O conceito: descida

O versículo da marca fala de água que cobre a terra. O IDV já se divide em duas famílias de cor que mapeiam uma jornada vertical: laranja e ouro na superfície (sol, glória) e turquesa e índigo na profundidade.

**A página atravessa essa coluna d'água.** Começa na luz, afunda até o abismo, e no CTA final a onda quebra e a página volta ao ouro. Não é gradiente decorativo — é o versículo virado em rolagem.

Consequências de projeto:

- Uma variável (`--depth`, de 0 a 1) escrita por quadro desloca um gradiente alto e fixo atrás de tudo.
- Um véu escuro por cima da coluna mantém o contraste do texto branco em qualquer profundidade — sem ele, o texto sobre o laranja reprovaria em acessibilidade (ver § 1.2).
- Páginas de leitura e o formulário **não descem**: a água para funda e escura, para o conteúdo ter silêncio (`components/Calma.js`).

## 0.1 Movimento

Um gesto assinatura, não efeitos espalhados: **a linha d'água**. O conteúdo é descoberto por uma linha que sobe através dele (`clip-path`), não pelo fade-and-slide-up que aparece em toda página gerada.

Cortados de propósito: cursor customizado, marquee, botões magnéticos, cortina de transição entre páginas, parallax em vários elementos. Todos são bonitos e todos são o default de portfólio — a ousadia fica concentrada em três momentos: o oceano do herói, a linha d'água e a quebra final.



---


## 1. Cor

### 1.1 Paleta da marca (fonte: Documento de Marca § 4)

| Nome | Hex | Papel no IDV |
|---|---|---|
| Azul-turquesa Vibrante | `#00A5B4` | Cor secundária / fundo de destaque |
| Laranja Incandescente | `#FF6C00` | Destaque, CTA, fundo de impacto |
| Amarelo Ouro | `#F3CE04` | Luz / glória, degradê com o laranja |
| Azul-índigo Profundo | `#1D3F75` | Base de fundos escuros |
| Branco | `#FFFFFF` | Wordmark, textos sobre cor |

### 1.2 Auditoria de contraste — leia antes de usar

Contraste medido (WCAG 2.1). Mínimos: **4,5:1** para texto normal, **3:1** para texto grande (≥ 24 px ou ≥ 19 px em negrito) e para elementos de interface.

| Combinação | Razão | Veredito |
|---|---|---|
| Branco sobre **laranja** `#FF6C00` | **2,84:1** | ❌ **Reprova até para texto grande** |
| Branco sobre **amarelo** `#F3CE04` | 1,54:1 | ❌ Reprova |
| Branco sobre **turquesa** `#00A5B4` | 2,98:1 | ❌ Reprova para texto normal; ⚠️ passa raspando para texto grande |
| Índigo `#1D3F75` sobre laranja | 3,66:1 | ⚠️ Só texto grande |
| Índigo sobre amarelo | 6,75:1 | ✅ Aprova |
| Branco sobre índigo `#1D3F75` | 10,4:1 | ✅ Excelente |
| Amarelo sobre preto | 12,86:1 | ✅ Excelente |

> **Este é o achado mais importante deste documento.** A combinação mais natural e mais usada nas artes — **texto branco sobre laranja** — é ilegível pelos critérios de acessibilidade, e na prática também é ruim em celular sob sol forte. As artes de mídia social podem manter isso (são imagem, não interface). **O site não pode**, especialmente em botões e texto corrido.

### 1.3 Solução: base escura + véu sobre a coluna

O IDV já tem uma variação preto/branco oficial. Ela é a base do site.

A descida ([§ 0](#0-o-conceito-descida)) atravessa cores saturadas, inclusive o laranja. Para o texto branco continuar legível em qualquer profundidade, um **véu** de `rgba(3, 12, 24, .58)` cobre a coluna inteira. O matiz continua mudando; o brilho não sobe. É exatamente o que água funda faz com a luz.

Tokens implementados (`globals.css`):

| Token | Hex | Contraste do branco sobre ele | Papel |
|---|---|---|---|
| `--abismo` | `#04101E` | **17,4:1** ✅ | Fundo mais fundo, base do `body` |
| `--fundo` | `#1D3F75` | 10,4:1 ✅ | Profundidade média |
| `--mare` | `#00A5B4` | — | Água rasa (sob o véu) |
| `--brasa` | `#FF6C00` | — | Superfície (sob o véu) |
| `--sol` | `#F3CE04` | 11,3:1 com `--abismo` por cima ✅ | **Cor do CTA**, números, destaques |
| `--espuma` | `#FFFFFF` | — | Texto principal, lockup |
| `--tinta-fraca` | `rgba(255,255,255,.62)` | 9,4:1 ✅ | Texto de apoio |

### 1.4 Botão de inscrição (a decisão mais importante de cor do site)

```
FUNDO   #F3CE04  (--sol)
TEXTO   #04101E  (--abismo)
RAZÃO   11,3:1   ✅
```

Amarelo sólido com texto azul-escuro. É a maior luz da paleta — coerente com o conceito de glória do IDV — e o único par de alto impacto que passa com folga. É também a **única mancha sólida de cor da página**, o que faz o olho ir direto nele.

No hover, uma onda branca sobe por dentro do botão (`transform: translateY(101%) → 0`). Micro-gesto, mesmo conceito.

**Nunca** use branco sobre laranja em botão.

### 1.5 A quebra

O CTA final inverte tudo: fundo em degradê `--brasa → --sol`, texto em `--abismo`, botão escuro com texto dourado. É a onda arrebentando na superfície depois da descida inteira — e o contraste de 6,1:1 do azul-escuro sobre o laranja passa com folga para o corpo, e muito mais para o título.

---

## 2. Tipografia

### 2.1 A regra que resolve o risco de licença

| Camada | Fonte | Como entra |
|---|---|---|
| Lockup "WAVES 26" e lema "Ondas de Poder e Glória" | Rushland, OC Grind, Mariglen, Kaway | **Imagem da arte original.** Não são webfonts — nenhum arquivo de fonte comercial é distribuído. |
| Títulos e rótulos | **Archivo** variável | SIL OFL, auto-hospedada (90 KB) |
| Texto | **Sora** variável | SIL OFL, auto-hospedada (33 KB) |

### 2.2 Archivo: o eixo de largura é o sistema

A Archivo variável tem eixo de largura de **62 % a 125 %**. Esse intervalo vira a estrutura tipográfica do site:

| Papel | Largura | Peso | Leitura |
|---|---|---|---|
| Títulos display | **125 %** | 800 | Expandido — espalha, cobre |
| Versículo | 108 % | 500 | Aberto, calmo |
| Botões | 100 % | 700 | Neutro, funcional |
| Rótulos e apoio | **62 %** | 600 | Comprimido — contido |

O contraste entre os dois extremos de uma mesma família é o que dá caráter, sem precisar de uma terceira fonte. E ecoa a geometria larga e chapada do wordmark do IDV.

### 2.3 Caixa-alta: onde sim e onde não

Caixa-alta espaçada em rótulo — o famoso *eyebrow* — é o tique mais reconhecível de página gerada por IA. Foi removida de todos os rótulos do site: eles ficam em caixa normal, e a distinção vem da largura comprimida da Archivo.

A caixa-alta sobrou em dois lugares, onde é decisão e não reflexo: nos **títulos display** (o wordmark do IDV é caixa-alta) e nos **botões**, onde marca a ação.

**O versículo é a exceção que prova a regra:** uma frase longa em caixa-alta não se lê. Ele está em caixa normal, corpo grande, largura aberta — e é o momento mais bonito da página por causa disso.

### 2.4 Escala

Toda fluida com `clamp()`, sem media query para tamanho de texto. Valores em `globals.css`.

| Papel | Classe | Tamanho |
|---|---|---|
| Display extra | `.display--xl` | `clamp(3.2rem, 13vw, 12rem)` |
| Display grande | `.display--l` | `clamp(2.6rem, 8.5vw, 7rem)` |
| Display médio | `.display--m` | `clamp(2rem, 5.4vw, 4rem)` |
| Versículo | `.versiculo` | `clamp(1.45rem, 3.3vw, 3rem)` |
| Valor | `.vaga__valor` | `clamp(4rem, 20vw, 15rem)` |
| Corpo | `.prosa` | `clamp(1.05rem, 0.98rem + 0.5vw, 1.35rem)` |

**Regras rígidas:** corpo nunca abaixo de 16 px (abaixo disso o iOS dá zoom automático em campos); largura máxima de bloco de texto em torno de 66 caracteres; `text-wrap: balance` nos títulos.

> **Armadilha registrada:** a unidade `ch` num contêiner resolve contra a fonte **do contêiner**, não a do filho. Um `max-width: 24ch` num bloco com fonte de 17 px deu uma coluna de 161 px para um título de 47 px, e o versículo saiu quebrando as palavras. Limite de largura para blocos com título grande: use `px` ou `vw`.

## 3. Ritmo e espaçamento

Escala de 4 px:

```css
--sp-1: .25rem;  --sp-2: .5rem;   --sp-3: .75rem;  --sp-4: 1rem;
--sp-6: 1.5rem;  --sp-8: 2rem;    --sp-12: 3rem;   --sp-16: 4rem;
--sp-24: 6rem;   --sp-32: 8rem;
```

- Padding vertical de seção: `clamp(4rem, 12vh, 8rem)`
- Padding lateral do container: `clamp(1.25rem, 5vw, 2rem)`
- Largura máxima do container: `1200px`
- Alvo de toque mínimo: **48 × 48 px** (requisito de acessibilidade e de dedo em celular)

---

## 4. Elementos gráficos da marca na web

Do conceito "ondas + glória (luz) + poder (movimento)", implementados em `globals.css`:

| Elemento | Como é feito |
|---|---|
| **Coluna d'água** | Gradiente de 560 vh, fixo atrás de tudo, deslocado por `--depth` |
| **Raios de luz** | Dois `repeating-linear-gradient` inclinados, com máscara vertical, sumindo com a profundidade |
| **Partículas em suspensão** | Seis `radial-gradient` pequenos em laço vertical — a poeira que o facho revela na água |
| **Grão** | Ruído SVG (`feTurbulence`) em `data:` URI, 5,5 % de opacidade, `mix-blend-mode: overlay` — reproduz a textura das artes |
| **Halo de glória** | Radial quente no topo do herói: o sol atravessando a superfície |
| **Linha d'água** | `clip-path: inset()` animado de baixo para cima, no `.emerge__i` |
| **Onda no botão** | `::after` branco que sobe de `translateY(101%)` no hover |

> A textura de grão é o que faz a marca parecer analógica e não genérica. Custa 300 bytes inline e faz muita diferença.

---

## 5. Componentes

Todos em `globals.css`, com os nomes usados no JSX.

| Classe | O que é |
|---|---|
| `.botao` / `.botao--vazado` / `.botao--largo` | Ação. Altura mínima 56 px, pílula, onda no hover |
| `.emerge` + `.emerge__i` | Revelação por linha d'água |
| `.contagem` | Contagem regressiva, numerais tabulares com largura mínima (sem CLS) |
| `.noite` | Linha de programação: dia gigante, semana, horário |
| `.trilho` | Faixa horizontal com `scroll-snap` |
| `.vaga__valor` | O preço em escala máxima |
| `.quebra` | O CTA final invertido |
| `.entrada` / `.campo` / `.marca-caixa` | Formulário — campos sublinhados, caixa de seleção desenhada à mão |
| `.barra` | Barra fixa de inscrição no celular, com `env(safe-area-inset-bottom)` |
| `.tutela` | Bloco do responsável legal, contornado em laranja |

**A caixa de seleção é desenhada à mão de propósito:** a nativa some num fundo escuro, e uma delas é o consentimento obrigatório da LGPD. Uma caixa invisível num campo obrigatório é um problema de usabilidade e de conformidade ao mesmo tempo.

---

## 6. Movimento

- Anima **só** `transform`, `opacity` e `clip-path`. Nunca `width`, `height`, `top`, `left`.
- Um único write de propriedade por quadro (`--depth`), arredondado para não reescrever a cada pixel.
- Rolagem suave via Lenis, só no ponteiro — no toque a rolagem nativa é mais previsível e mais leve.
- **Nada de rolagem sequestrada.**
- `prefers-reduced-motion` desliga a rolagem suave, a linha d'água, os raios e as partículas. O conteúdo aparece inteiro, a coluna para numa profundidade fixa.

---

## 7. Composição do herói

Hierarquia visual, do mais forte ao mais fraco:

1. Lockup `WAVES 26` (arte original, até 40 svh de altura)
2. Botão de inscrição — a única mancha amarela sólida da tela
3. Datas, em Archivo 112 %
4. Lema "Ondas de Poder e Glória" (arte original)
5. Contagem regressiva
6. Vídeo de oceano real, escurecido, com halo quente no topo

O fundo **nunca** compete com o botão. Se o vídeo ficar claro demais, aumente a camada escura — não diminua o botão.

---

## 8. Referências de pesquisa

- [Wix — The 11 Biggest Web Design Trends of 2026](https://www.wix.com/blog/web-design-trends) (tipografia pesada, neobrutalismo)
- [DesignRush — 15 Web Design Trends for 2026](https://www.designrush.com/agency/website-design-development/trends/web-design-trends)
- [GetResponse — Landing Page Design Trends for 2026](https://www.getresponse.com/blog/landing-page-design-trends) (contraste e clareza de CTA)
