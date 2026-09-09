# 03 · Arquitetura de informação

---

## 1. Formato: página única (one-page)

**Decisão:** uma única página com âncoras, não um site multi-página.

**Por quê:**
- O visitante vem por link de rede social com uma intenção só. Cada clique de navegação é uma chance de desistir.
- Sem backend e sem CMS, cada página nova é mais um arquivo para manter desatualizado.
- Rolagem contínua com narrativa ("scrollytelling") é o formato que melhor funciona para lançamentos e eventos no público jovem.

**Exceções — páginas separadas mínimas:**

| Página | Motivo | Situação |
|---|---|---|
| `/` | A landing page | ⏳ a construir |
| `/inscricao` | **Formulário de inscrição** que entrega a mensagem ao WhatsApp da organização (D1). Página separada porque é um passo de foco total — nada compete com o formulário. | ✅ construída |
| `/privacidade` | Exigência de LGPD (ver [08](08-LGPD-E-MENORES.md)) | ✅ construída |
| `/404` | Boa prática; redireciona para `/` com a marca | ⏳ a construir |

---

## 2. Ordem das seções

A ordem não é estética — é a sequência de perguntas da persona primária ([02 § 2.1](02-ESTRATEGIA-E-PUBLICO.md)).

| # | Seção | Âncora | Responde | Obrigatória? |
|---|---|---|---|---|
| 1 | **Hero** | `#topo` | "O que é, quando é, e por que eu deveria ligar?" | ✅ |
| 2 | **Contagem regressiva + CTA** | — (dentro do hero) | "Tem prazo. Age agora." | ✅ |
| 3 | **O que é a Waves** | `#sobre` | "Isso vai ser chato?" | ✅ |
| 4 | **O tema: Ondas de Poder e Glória** | `#tema` | "Qual é a proposta espiritual?" | ✅ |
| 5 | **Prova social / Como foi 2025** | `#2025` | "Vai ter gente? É grande?" | ✅ confirmada (D6) |
| 6 | **Programação** | `#programacao` | "O que acontece em cada noite?" | ✅ |
| ~~7~~ | ~~Preletores e louvor~~ | — | — | ❌ **removida (D3)** — não serão divulgados |
| 8 | **Inscrição: valor e como fazer** | `#inscricao` | "Quanto custa e como pago?" | ✅ — leva para `/inscricao` |
| 9 | **Local e como chegar** | `#local` | "Onde é? Como chego?" | ✅ |
| 10 | **Para pais e responsáveis** | `#responsaveis` | "Meu filho está seguro?" | ✅ |
| 10b | **Waves Store** | `#store` | "Vai ter camisa?" | ✅ (D8) |
| 10c | **Transmissão ao vivo** | `#live` | "Dá para assistir de casa?" | ✅ (D9) |
| 11 | **FAQ** | `#faq` | Tudo que sobrou | ✅ |
| 12 | **Chame alguém** | `#convide` | "Como levo meus amigos?" | ✅ |
| 13 | **CTA final** | — | Última chance de converter | ✅ |
| 14 | **Rodapé** | — | Contato, redes, MANT Paraíso, privacidade | ✅ |

**Atualização de 03/09:** a seção de preletores saiu por decisão da liderança (D3) e a de fotos foi confirmada (D6). Se as fotos de 2025 não forem localizadas a tempo ([P3](10-PENDENCIAS.md)), a seção 5 é omitida — a arquitetura foi feita para que a ausência não deixe buraco visual.

---

## 3. Esqueleto visual (wireframe em texto)

```
┌──────────────────────────────────────────────┐
│  [logo WAVES 26]              [ INSCREVER ]  │ ← barra fixa, aparece após rolar 1 tela
├──────────────────────────────────────────────┤
│                                              │
│   ▓▓▓ vídeo/imagem de fundo (ondas + gente)  │
│                                              │
│            C O N F E R Ê N C I A             │
│         ╔═══════════════════════╗            │
│         ║   W A V E S    2 6    ║            │  ← lockup em imagem (SVG)
│         ╚═══════════════════════╝            │
│         Ondas de Poder e Glória              │  ← lema em imagem
│                                              │
│   18, 19 e 20 de setembro · MANT Paraíso     │
│                                              │
│        ⏱  14 dias : 06 h : 22 min            │  ← contagem regressiva ao vivo
│                                              │
│        ┏━━━━━━━━━━━━━━━━━━━━━━━━━┓           │
│        ┃  GARANTIR MINHA VAGA →  ┃           │  ← CTA primário
│        ┗━━━━━━━━━━━━━━━━━━━━━━━━━┛           │
│              ↓ role para ver                 │
├──────────────────────────────────────────────┤ #sobre
│  O QUE É A WAVES                             │
│  [texto curto]     [vídeo 9:16 autoplay mudo]│
│  ┌────┐ ┌────┐ ┌────┐                        │
│  │3 noi│ │2ª ed│ │+igre│  ← 3 números-âncora │
│  └────┘ └────┘ └────┘                        │
├──────────────────────────────────────────────┤ #tema
│  ONDAS DE PODER E GLÓRIA                     │
│  "Porque a terra se encherá do conhecimento  │
│   da glória do SENHOR, como as águas cobrem  │
│   o mar."  — Habacuque 2:14                  │
│  [3 parágrafos do texto de marca]            │
├──────────────────────────────────────────────┤ #2025
│  A PRIMEIRA ONDA JÁ QUEBROU                  │
│  [ galeria de fotos 2025 · scroll horizontal]│
├──────────────────────────────────────────────┤ #programacao
│  TRÊS NOITES                                 │
│  Abertura: sexta, 19h30                      │
│  (demais horários: em breve)                 │
├──────────────────────────────────────────────┤ #inscricao
│  SUA VAGA                                    │
│  ╔══════════════════════════════════════╗    │
│  ║  R$ 50,00                            ║    │
│  ║  valor simbólico · sem lotes         ║    │
│  ║  ┏━━━━━━━━━━━━━━━━━━━┓               ║    │
│  ║  ┃ FAZER INSCRIÇÃO → ┃ → /inscricao  ║    │
│  ║  ┗━━━━━━━━━━━━━━━━━━━┛               ║    │
│  ╚══════════════════════════════════════╝    │
├──────────────────────────────────────────────┤ #local
│  ONDE É                                      │
│  Rua L10, 269 · Interlagos                   │
│  Paraíso do Tocantins – TO                   │
│  [ mapa estático clicável → Google Maps ]    │
├──────────────────────────────────────────────┤ #responsaveis
│  PARA PAIS E RESPONSÁVEIS                    │
│  [ texto + botão WhatsApp da organização ]   │
├──────────────────────────────────────────────┤ #store
│  WAVES STORE · 1 modelo de camisa            │
├──────────────────────────────────────────────┤ #live
│  TRANSMISSÃO AO VIVO no YouTube              │
├──────────────────────────────────────────────┤ #faq
│  DÚVIDAS                                     │
│  ▸ Preciso ser da igreja?                    │
│  ▸ Posso ir sozinho?                         │
│  ▸ ... (acordeão)                            │
├──────────────────────────────────────────────┤ #convide
│  NÃO VENHA SOZINHO                           │
│  [ Compartilhar no WhatsApp ] [ Copiar link ]│
│  [ Baixar arte para story ]                  │
├──────────────────────────────────────────────┤
│  ▓▓▓ CTA FINAL em tela cheia                 │
│  "A onda está vindo. Você vem?"              │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━┓                  │
│  ┃  GARANTIR MINHA VAGA → ┃                  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━┛                  │
├──────────────────────────────────────────────┤
│  RODAPÉ · MANT Paraíso · @mant_paraiso       │
│  contato · privacidade · © 2026              │
└──────────────────────────────────────────────┘

     [ ⚡ INSCREVER ]  ← barra fixa no rodapé, só no celular
```

---

## 4. Regras de CTA

O botão de inscrição aparece em **4 lugares fixos**, nunca menos:

1. Barra superior (aparece após rolar a primeira tela)
2. Dentro do hero, acima da dobra
3. Na seção `#inscricao`
4. No CTA final em tela cheia

E mais um, só no celular: **barra fixa no rodapé** (`position: sticky`), sempre visível a partir da segunda tela. É o padrão que mais converte em landing page mobile.

**Texto do botão:** sempre em primeira pessoa e com verbo de posse — *"Garantir minha vaga"*, *"Quero me inscrever"*. Nunca "Saiba mais", "Clique aqui" ou "Enviar".

**Comportamento:** todos os CTAs da página inicial levam ao **mesmo destino** — a página `/inscricao`, na mesma aba, com evento de analytics disparado no clique. Só lá, ao final do formulário, é que o visitante sai para o WhatsApp.

---

## 4b. Fluxo da página `/inscricao`

```
    página inicial            /inscricao                  WhatsApp
  ┌───────────────┐        ┌──────────────┐        ┌──────────────────┐
  │  CTA "Fazer   │  ───▶  │  formulário  │  ───▶  │  mensagem pronta │
  │  inscrição"   │        │  6 campos    │        │  o visitante     │
  └───────────────┘        │  + LGPD      │        │  toca em enviar  │
                           └──────────────┘        └──────────────────┘
                                  │                         │
                        se < 18 anos, abre                  ▼
                        bloco do responsável         Anna Beatriz recebe
```

**Princípios da página:**

1. **Foco total.** Sem menu, sem seções de venda, sem distração. Quem chega aqui já decidiu — o trabalho é não atrapalhar.
2. **Contexto mínimo no topo.** Data, abertura, local, idade e valor, em blocos curtos, para quem chegou direto pelo link sem passar pela home.
3. **Um botão só.** "Enviar pelo WhatsApp".
4. **O envio não é o fim.** O painel pós-envio deixa claro que a inscrição só vale depois que a mensagem for enviada de fato — é o erro mais provável do fluxo.
5. **Saída de dúvida.** Ao final, contatos da Anna Beatriz e do Ev. Athos, para quem travou.

Detalhe técnico em [06 § 4](06-ESPECIFICACAO-TECNICA.md).

---

## 5. Navegação

**Barra superior fixa**, minimalista, só com:
- Lockup Waves 26 à esquerda (clica → volta ao topo)
- Botão de inscrição à direita

**Sem menu hambúrguer.** Um menu de navegação em página única de evento adiciona um clique e não adiciona nada. Se a liderança insistir em navegação, use âncoras horizontais com rolagem (`Sobre · Programação · Inscrição · Local`) — nunca um menu escondido.

---

## 6. Estados que a página precisa tratar

| Estado | Quando | Comportamento |
|---|---|---|
| **Inscrições não abertas** | Antes da data de abertura | CTA vira "Avise-me quando abrir" → formulário de e-mail/WhatsApp externo |
| **Inscrições abertas** | Padrão | CTA normal |
| **Últimas vagas** | Definido pela liderança | Faixa de urgência acima do CTA: "Últimas vagas" |
| **Inscrições encerradas** | Após a data-limite | CTA desabilitado + "Inscrições encerradas. Vem para a Waves 2027." |
| **Durante o evento** | 18–20/09 | Hero vira "Está acontecendo agora" + link da transmissão, se houver |
| **Pós-evento** | A partir de 21/09 | Hero vira retrospectiva + galeria + "Waves 2027 vem aí" |

Como o site é estático, esses estados são **trocados manualmente** editando uma constante no topo do JavaScript (ex.: `const ESTADO = 'aberto';`). Simples, sem backend, e à prova de erro.

---

## 7. O que NÃO entra no site

Decisões explícitas de corte, para evitar o inchaço que mata a conversão:

- ❌ Blog / notícias
- ❌ Área de login ou "meu ingresso"
- ❌ Newsletter genérica
- ❌ Galeria de fotos com dezenas de imagens (só um recorte curado)
- ❌ Player de música de fundo com autoplay de áudio
- ❌ Pop-up de saída (*exit intent*) — irrita e destrói a confiança com esse público
- ❌ Chat/bot
- ❌ Contador de "pessoas vendo esta página agora" (falso e detectável)
