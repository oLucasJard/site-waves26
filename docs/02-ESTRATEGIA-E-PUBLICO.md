# 02 · Estratégia e público

---

## 1. O trabalho que o site precisa fazer

O site tem **um objetivo primário e nada mais**:

> Fazer um jovem ou adolescente que nunca ouviu falar da Waves clicar em "Quero me inscrever" — e fazer quem já ouviu falar decidir hoje, não depois.

Objetivos secundários (só existem se não atrapalharem o primário):

1. Dar ao pai/mãe/responsável segurança para autorizar e pagar.
2. Dar ao jovem que já vai um **motivo e um jeito fácil de chamar amigos**.
3. Servir de endereço único e permanente para colar em bio do Instagram, status de WhatsApp e QR Code de arte impressa.

**O que o site NÃO é:** não é o site da igreja (esse já existe em `mantparaiso.com.br`), não é blog, não é área de membros, não é sistema de gestão de inscritos.

---

## 2. Quem é o público

### 2.1 Persona primária — "o convidado"

**Perfil:** 13 a 19 anos, Paraíso do Tocantins e região. Chega ao site por um link que um amigo mandou no WhatsApp ou pela bio do Instagram. Não é da igreja, ou é mas nunca foi a uma conferência.

**O que ele está realmente perguntando quando abre a página:**

| Pergunta interna | O que a página precisa responder | Em quanto tempo |
|---|---|---|
| "Isso vai ser chato?" | Energia visual e vídeo real de gente da idade dele | 3 segundos |
| "Vai ter gente que eu conheço?" | Foto de multidão jovem, "2ª edição", igrejas parceiras | 10 segundos |
| "Quanto custa?" | Valor visível sem precisar rolar caçando | 20 segundos |
| "Onde e quando é?" | Data, horário e endereço com link do mapa | 20 segundos |
| "É difícil de se inscrever?" | Um botão, dois cliques, no celular | 30 segundos |

**Barreira principal:** medo de ser um evento religioso formal, longo e sem gente da idade dele. O site derruba isso com imagem de gente real e linguagem direta.

### 2.2 Persona secundária — "o responsável"

**Perfil:** pai, mãe ou responsável, 35 a 55 anos. Vai receber o link do filho e precisa autorizar e pagar.

**O que ele pergunta:** Quem organiza? É seguro? Meu filho dorme lá? Quanto custa e como pago? Tem alguém responsável? Como falo com vocês?

**O que ele precisa ver:** logo da MANT Paraíso, endereço físico completo, horários claros, contato por WhatsApp com pessoa real, e — se houver pernoite — a informação explícita sobre isso.

> Ignorar esta persona é o erro mais comum em site de evento para adolescente. **Quem decide é o adolescente, mas quem paga é o responsável.** Uma seção curta de "Informações para responsáveis" resolve.

### 2.3 Persona terciária — "o já convertido"

Já vai. Quer o link para mandar no grupo, quer saber o que levar, quer a contagem regressiva. Precisa de: botão de compartilhar no WhatsApp, "adicionar ao calendário" e a seção "o que levar".

---

## 3. Ângulos de persuasão (na ordem em que o site usa)

Baseado no texto de marca oficial (Documento de Marca, § 2) e em boas práticas de landing page de evento:

1. **Identidade e urgência** — "Conferência Waves 2026 · 18, 19 e 20 de setembro" + contagem regressiva. Estabelece que é real e que tem prazo.
2. **Promessa emocional** — "Uma onda não pede permissão para avançar." O tema, dito em linguagem de adolescente, não de púlpito.
3. **Prova social** — 2ª edição, fotos de multidão, jovens de várias igrejas da região.
4. **Concreto** — datas, horários, local, o que vai acontecer nas 3 noites, quem prega, quem toca.
5. **Remoção de fricção** — valor claro, como se inscrever, o que está incluso, o que levar, FAQ.
6. **Fechamento** — CTA final grande + convite para chamar alguém.

## 4. Tom de voz aplicado à web

Herdado do Documento de Marca, § 3, com regras específicas para tela:

| Regra | Sim | Não |
|---|---|---|
| Frases curtas | "Três noites. Uma cidade. Uma geração." | "A Conferência Waves tem como propósito proporcionar aos participantes..." |
| Segunda pessoa | "Você não vai sair o mesmo." | "Os participantes serão impactados." |
| Verbo de ação no botão | "Garantir minha vaga" | "Saiba mais" / "Clique aqui" |
| Jargão explicado | "avivamento — quando Deus mexe de verdade com uma geração" | "avivamento" solto |
| Emoji com moderação | 🌊 e 🔥 pontuais | 🙏🔥✨💯🚀 em sequência |
| Sem pressão | "Chama quem você ama pra vir junto." | "Não perca! Última chance! Corre!" |

**Regra de ouro do documento de marca, aplicada ao site:** todo bloco de texto persuasivo precisa se amarrar ao texto de marca (glória que cobre, como as águas cobrem o mar). É o que separa uma página bonita de uma comunicação com propósito.

---

## 5. Metas e KPIs

Como o site é estático e sem backend, a medição é feita por analytics do lado do cliente e pela plataforma de inscrição.

| Métrica | Como medir | Meta sugerida |
|---|---|---|
| Visitantes únicos | Analytics (ver [06 § 7](06-ESPECIFICACAO-TECNICA.md)) | — (linha de base, 1ª edição do site) |
| **Taxa de clique no CTA de inscrição** | Evento de clique nos botões `#inscricao` | **≥ 25 %** dos visitantes |
| Inscrições concluídas | Painel da plataforma de inscrição | Definida pela liderança (ver [Pendências D2](10-PENDENCIAS.md)) |
| Taxa de conclusão (clique → inscrito) | Cruzamento manual | ≥ 40 % |
| Compartilhamentos no WhatsApp | Evento de clique no botão de compartilhar | ≥ 10 % dos visitantes |
| Tempo até o primeiro clique | Analytics | < 45 s |
| LCP no celular | PageSpeed Insights / Search Console | **< 2,5 s** |

**Um número que importa mais que todos:** *cliques no CTA ÷ visitantes*. Se estiver abaixo de 15 %, o problema não é tráfego — é a página. As causas mais prováveis, em ordem: valor escondido, ausência de foto de gente, CTA abaixo da dobra.

---

## 6. De onde vem o tráfego (e o que isso exige do site)

| Canal | Peso esperado | Exigência técnica |
|---|---|---|
| Link na bio do Instagram (@mant_paraiso, @mantjovem, @nexusmant) | **Alto** | Abrir rápido dentro do navegador do app; título e cor consistentes com o feed |
| WhatsApp (grupos de rede de jovens, status, encaminhamento) | **Alto** | **Open Graph image obrigatória** — sem ela o link vira texto cru e ninguém clica |
| QR Code em arte de telão / impressa / convite | Médio | URL curta e memorizável; a página tem que funcionar em 4G no ginásio |
| Boca a boca / busca por "conferência waves paraíso" | Baixo–médio | SEO básico: `<title>`, descrição, dados estruturados de evento |

**Consequência de projeto:** o site é **mobile-first de verdade**, não "responsivo depois". Mais de 90 % do tráfego virá de celular, dentro de webview de app, em rede móvel.

---

## Fontes de pesquisa

- [RD Station — 11 exemplos de landing pages com até 96% de conversão](https://www.rdstation.com/blog/marketing/exemplos-de-landing-pages/)
- [Gabriel do Site — Landing Page para 2026: template + checklist de conversão](https://gabrieldosite.com.br/landing-page-para-2026-template-checklist-de-conversao/)
- [involve.me — Landing Page Design Trends by Industry (2026)](https://www.involve.me/blog/landing-page-design-trends)
- [Moburst — Best Landing Page Design Trends for 2026](https://www.moburst.com/blog/landing-page-design-trends-2026/)
