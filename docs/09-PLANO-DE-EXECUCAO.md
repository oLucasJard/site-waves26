# 09 · Plano de execução

**Data de referência: 03/09/2026. O evento é em 18/09/2026 — faltam 15 dias.**

Isso muda tudo: não há espaço para um ciclo confortável de projeto. O plano abaixo é desenhado para colocar o site no ar **em 7 dias**, deixando **8 dias de divulgação** com o link vivo.

---

## 1. O trade-off, dito com clareza

Com 15 dias até o evento, existem dois caminhos:

| Caminho | Prazo | Risco |
|---|---|---|
| **A — Publicar rápido e enriquecer depois** ✅ **adotado** | No ar em **10/09** com o essencial; a galeria de 2025 entra em seguida | Baixo. O site cumpre a função desde o primeiro dia. |
| B — Publicar completo | No ar em ~15/09 | Alto. Sobram 3 dias de divulgação. O site chega quando quase todo mundo já decidiu. |

**Recomendação: caminho A.** Um site com data, valor, local e botão de inscrição no ar em 10/09 vale muito mais do que um site perfeito no ar em 15/09.

A arquitetura de [03](03-ARQUITETURA-DE-INFORMACAO.md) já prevê isso: a seção que ainda depende de material não localizado (`#2025`) pode ser omitida sem deixar buraco.

---

## 2. Cronograma

### Fase 0 — Desbloqueio (03/09) · ✅ **CONCLUÍDA**

Todas as decisões D1 a D10 foram fechadas pela liderança em 03/09. Registro em [10 · Decisões e pendências](10-PENDENCIAS.md).

**Já entregue no mesmo dia:**

- Página `/inscricao` construída e testada em navegador (celular e desktop)
- Página `/privacidade` completa, alinhada às decisões
- Assets de marca para web: lockup recortado, favicons, **imagem de compartilhamento (Open Graph)**, fonte Sora auto-hospedada
- `_headers`, `robots.txt` e `sitemap.xml` prontos para o Cloudflare Pages

### Fase 1 — Assets (04–06/09)

| Quando | O quê | Situação |
|---|---|---|
| — | A8 **imagem de compartilhamento** (1200×630) | ✅ gerada da arte de telão |
| — | A7 favicons (32/192/512 + apple-touch) | ✅ gerados |
| — | A2/A4 lockup e lema recortados com margem uniforme | ✅ |
| — | D1 fonte Sora auto-hospedada (48 KB, subsets latin + latin-ext) | ✅ |
| 04/09 | A1/A3/A5 **vetorizar** logos e lema (SVG) | ⏳ melhora nitidez; o site já funciona com os PNGs |
| 04/09 | A9 tile de textura (grão) | ⏳ |
| 05/09 | C1–C2 recorte de 10 s do hero, mudo, em laço | ⏳ |
| 05/09 | B1 poster do hero · B3 mapa · B5 arte de story | ⏳ |
| 06/09 | **B2 curadoria das fotos da Waves 2025** ([P3](10-PENDENCIAS.md)) | 🔴 bloqueia a seção `#2025` |

### Fase 2 — Construção (04–08/09)

| Quando | O quê | Situação |
|---|---|---|
| — | Tokens CSS, componentes, botões, formulário | ✅ `assets/css/style.css` |
| — | Página `/inscricao` + `/privacidade` | ✅ |
| 04/09 | Repositório no GitHub e Cloudflare Pages conectado | ⏳ |
| 05–06/09 | **Página inicial**: hero, contagem regressiva, `#sobre`, `#tema` | ⏳ |
| 06–07/09 | `#2025`, `#programacao`, `#inscricao`, `#local`, `#responsaveis` | ⏳ |
| 07/09 | `#store`, `#live`, `#faq`, `#convide`, CTA final, rodapé, `/404` | ⏳ |
| 08/09 | SEO, Open Graph, JSON-LD de evento, analytics | ⏳ |
| 08/09 | Passada de performance: AVIF/WebP, preload, CSS crítico | ⏳ |

### Fase 3 — Validação (09/09)

| Item | Critério de aprovação |
|---|---|
| PageSpeed Insights (Mobile) | LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1 |
| Lighthouse Acessibilidade | ≥ 95 |
| Teste em celular real | Android e iPhone, em rede 4G, não no Wi-Fi |
| **Navegador do Instagram** | Abrir pelo link na bio e conferir altura, vídeo e botão |
| **Navegador do WhatsApp** | Abrir por link mandado no grupo |
| Card de compartilhamento | Mandar o link no WhatsApp: a imagem tem que aparecer |
| Formulário de inscrição | Preencher e **concluir um envio de teste de verdade**, com um WhatsApp real. Testar também com data de menor de 18. |
| Revisão de texto | Nenhum `⟦colchete⟧` sobrou; datas conferidas |
| Leitura por um adolescente | Um jovem da rede lê a página e diz o que não entendeu |

### Fase 4 — Lançamento (10/09)

| Quando | O quê |
|---|---|
| 10/09 manhã | Domínio apontado, HTTPS ativo, site no ar |
| 10/09 | Link na bio de @mant_paraiso, @mantjovem, @nexusmant |
| 10/09 | Post de feed + story anunciando o site |
| 10/09 | Link enviado aos grupos de WhatsApp da rede de jovens |
| 10/09 | QR Code do site gerado para as artes de telão |

### Fase 5 — Reta final (11–17/09)

| Quando | O quê |
|---|---|
| Diário | Conferir a contagem regressiva e o fluxo de mensagens de inscrição |
| 11–12/09 | Publicar o bloco da Waves Store, quando o preço da camisa sair ([P6](10-PENDENCIAS.md)) |
| 12–13/09 | Publicar galeria `#2025`, assim que as fotos forem localizadas ([P3](10-PENDENCIAS.md)) |
| 13/09 | Peça de contagem "faltam 5 dias" (ver [Auditoria C1](01-AUDITORIA.md)) |
| 15/09 | Se aplicável, mudar o estado do site para "últimas vagas" |
| 17/09 | Congelar alterações. Última conferência de horário e local. |

### Fase 6 — Durante e depois (18–25/09)

| Quando | O quê |
|---|---|
| 18/09 | Trocar o hero para o estado "Está acontecendo agora" |
| 21/09 | Trocar para o estado pós-evento: retrospectiva + "Waves 2027 vem aí" |
| 22–25/09 | Publicar galeria do evento; exportar métricas; escrever o retrospecto |

---

## 3. Divisão de responsabilidades

| Papel | Responsabilidades |
|---|---|
| **Liderança** | D1–D10 decididas. Resolver P1, P4, P5, P6; aprovar o site antes do ar |
| **Multimídia — design** | Assets A, B, C ([07](07-PIPELINE-DE-ASSETS.md)); curadoria das fotos |
| **Multimídia — desenvolvimento** | Construção, performance, SEO, deploy |
| **Anna Beatriz — inscrições** | Teste de ponta a ponta do formulário, atendimento do WhatsApp, controle da lista de inscritos |
| **Rede de jovens** | Divulgação, leitura do texto, teste em celular real |

---

## 4. Riscos e planos B

| Risco | Probabilidade | Plano B |
|---|---|---|
| ~~Decisões D1–D4 não saem até 04/09~~ | — | ✅ **Resolvido.** Fechadas em 03/09. |
| **Acesso ao DNS não sai a tempo** ([P2](10-PENDENCIAS.md)) | Média | Publicar na URL provisória do Cloudflare Pages (`*.pages.dev`) e divulgar por ela até o subdomínio subir |
| **Fotos da Waves 2025 não são localizadas** | **Alta** | Cortar `#2025`; usar recorte do `CHAMADA WAVES26.mp4` e os convites das igrejas parceiras como prova de alcance regional |
| ~~Preletores não confirmados a tempo~~ | — | ✅ **Resolvido por decisão (D3):** não serão divulgados. Seção removida. |
| Vetorização dos logos atrasa | Baixa | ✅ Já mitigado: o site está no ar com os PNGs recortados; o SVG entra depois sem quebrar nada |
| **Volume de inscrições passa de algumas centenas** | Baixa | O modelo de WhatsApp é manual. Se o volume explodir, migrar para formulário hospedado (Tally) mantendo o mesmo botão |
| Licença das fontes display se confirmar restritiva | Baixa (já mitigado) | Nenhuma ação — a arquitetura de [04 § 2](04-DESIGN-SYSTEM.md) já não usa essas fontes como webfont |
| Site lento no celular | Média | Cortar o vídeo do hero e usar só imagem. Resolve de uma vez. |
| Pico de acesso no dia do anúncio | Baixa | Cloudflare Pages tem banda ilimitada e CDN global — não é gargalo |

---

## 5. Definição de "pronto"

O site está pronto para ir ao ar quando **todos** os itens abaixo forem verdadeiros:

```
[ ] Data, local e horário corretos e conferidos contra a arte oficial
[ ] Valor da inscrição visível sem rolar caçando
[ ] Formulário testado com um WhatsApp real, de ponta a ponta
[ ] Testado com data de nascimento de menor de 18 (bloco do responsável tem que aparecer)
[ ] LCP ≤ 2,5s no PageSpeed Insights (Mobile)
[ ] Card do WhatsApp aparece com imagem
[ ] Abre corretamente no navegador do Instagram
[ ] Página de privacidade publicada e linkada
[ ] Nenhum ⟦colchete⟧ na página
[ ] Aprovado pela liderança
```

---

## 6. Depois do evento — o que deixar pronto para 2027

O Documento de Marca § 7 já traz um checklist de reuso. Acrescente a ele:

- [ ] Arquivar o código do site em `SITE/` (é o esqueleto da próxima edição)
- [ ] Guardar as fotos e vídeos do evento em pasta dedicada — **é o principal ativo de conversão de 2027**, e a ausência delas foi o maior gargalo de 2026
- [ ] Exportar as métricas do site e da plataforma de inscrição
- [ ] Registrar, no documento de marca, o que converteu e o que não converteu
- [ ] Manter o domínio ativo apontando para a retrospectiva até o anúncio de 2027
