# Site — Conferência Waves 2026

Documentação de planejamento do site da **Conferência de Jovens e Adolescentes Waves — Ondas de Poder e Glória**
Igreja de Cristo · MANT Paraíso · 18, 19 e 20 de setembro de 2026

---

## Estado atual

**Fase:** documentação concluída · construção em andamento.

| Entrega | Situação |
|---|---|
| Auditoria, estratégia e especificação (11 documentos) | ✅ |
| Decisões da liderança (D1 a D10) | ✅ fechadas em 03/09 |
| Site completo (home, `/inscricao`, `/privacidade`, 404) | ✅ construído e testado |
| Assets de marca para web (lockup, favicons, imagem de compartilhamento, fontes) | ✅ |
| Vídeo e imagens extraídos do material da conferência | ✅ |
| Fotos da Waves 2025 para a galeria | ⏳ a localizar |
| Domínio `waves.mantparaiso.com.br` | ⏳ a apontar |

**Premissas fechadas:**
- Site **100% estático, sem backend** (sem servidor, sem banco de dados, sem API própria).
- Objetivo único e mensurável: **fazer jovens e adolescentes se inscreverem na Waves 2026.**
- Identidade visual já existe e está aprovada (IDV 2026). O site é uma extensão dela, não uma reinvenção.
- **Inscrições pelo WhatsApp da Anna Beatriz Veiga**, sem plataforma externa e sem pagamento online.

## Pastas

| Pasta | O que é |
|---|---|
| [`docs/`](docs/) | Documentação de planejamento (11 documentos) |
| [`web/`](web/) | O site em si — Next.js. Ver [`web/README.md`](web/README.md) para rodar e publicar |

---

## Índice da documentação

| # | Documento | Para que serve |
|---|---|---|
| 00 | [Sumário executivo](docs/00-SUMARIO-EXECUTIVO.md) | Leitura de 3 minutos para a liderança. Comece aqui. |
| 01 | [Auditoria de projeto, artes, logos e documentos](docs/01-AUDITORIA.md) | O que existe, o que está utilizável, o que falta |
| 02 | [Estratégia e público](docs/02-ESTRATEGIA-E-PUBLICO.md) | Quem queremos alcançar, o que os move, metas e KPIs |
| 03 | [Arquitetura de informação](docs/03-ARQUITETURA-DE-INFORMACAO.md) | Sitemap, ordem das seções, jornada do visitante |
| 04 | [Design system web](docs/04-DESIGN-SYSTEM.md) | Cores, tipografia, componentes, tokens prontos para código |
| 05 | [Conteúdo e copy](docs/05-CONTEUDO-E-COPY.md) | Todo o texto do site, pronto para colar |
| 06 | [Especificação técnica](docs/06-ESPECIFICACAO-TECNICA.md) | Stack, hospedagem, performance, SEO, acessibilidade |
| 07 | [Pipeline de assets](docs/07-PIPELINE-DE-ASSETS.md) | O que exportar dos PSDs, em que formato, com que nome |
| 08 | [LGPD e dados de menores](docs/08-LGPD-E-MENORES.md) | Obrigações legais na coleta de inscrições de adolescentes |
| 09 | [Plano de execução](docs/09-PLANO-DE-EXECUCAO.md) | Cronograma, checklist de lançamento e de pós-evento |
| 10 | [Decisões e pendências](docs/10-PENDENCIAS.md) | Registro das decisões da liderança e o que ainda falta |

---

## Regra de escopo

Toda alteração feita por esta frente de trabalho fica **dentro da pasta `SITE/`**. As pastas `ARTES/`, `IDV/`, `PREMIERE/`, `ENVATO/`, `CANON - PREPAIR/`, `DJI/` e `docs/` da raiz do projeto são de leitura apenas.

## Documento de referência externo

O [Documento de Marca — Conferência Waves](../docs/Documento-de-Marca-Waves.md) (na raiz do projeto) é a fonte de verdade sobre marca, tom de voz e paleta. Esta documentação **não o substitui** — ela o traduz para a web.
