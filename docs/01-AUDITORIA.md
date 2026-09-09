# 01 · Auditoria de projeto, artes, logos e documentos

Levantamento feito em **03/09/2026** sobre `D:\MANT PSO\MULTIMIDIA\ARTES\CONFERÊNCIA WAVES 26` e pastas relacionadas.

---

## 1. Estrutura do projeto

```
CONFERÊNCIA WAVES 26/
├── ARTES/
│   ├── FEED/          ← VAZIA
│   ├── STORYS/        ← VAZIA
│   └── TELAO/         CHAMADA WAVES TELÃO.jpg + .psd (175 MB)
├── CANON - PREPAIR/   17 clipes MVI_0001–0017.MP4 (~1,7 GB) — captação bruta
├── DJI/               7 clipes DJI_0478–0484.MP4 (~1,4 GB) — aéreas brutas
├── docs/              Documento-de-Marca-Waves.md
├── ENVATO/            trilhas, SFX de água e template AE "Water Logo"
├── IDV/               APRESENTAÇÃO ID.psd, IDV.pdf, WS26.png, ONDAS P G.png
├── PREMIERE/          projetos .prproj + 8 vídeos renderizados
└── SITE/              ← esta pasta (documentação)
```

**Observação de organização:** `ARTES/FEED` e `ARTES/STORYS` existem mas estão vazias. Toda a produção de peça está solta em `PREMIERE/` (vídeo) ou só em `TELAO/` (estática). Isso não bloqueia o site, mas dificulta encontrar material.

---

## 2. Documentos

| Arquivo | Avaliação |
|---|---|
| `docs/Documento-de-Marca-Waves.md` | **Excelente.** Cobre evento, texto de marca oficial, tom de voz, paleta com hex, tipografia, diretrizes de Instagram e checklist de reuso. É a espinha dorsal do conteúdo do site. |

**Lacunas do documento de marca (do ponto de vista do site):**

- Não traz **valor de inscrição**, **link de inscrição**, **programação** nem **preletores**.
- Menciona "atualizar dados do evento (data, local, **valor da inscrição**)" no checklist da seção 7 — ou seja, o campo existe e não foi preenchido.
- Cita um "calendário editorial" com 4 fases (Revelação → Inscrições → Reta Final → Cobertura) que **não está anexado** ao projeto.
- Não define diretrizes de aplicação **digital/web** — o que é natural, é um documento de mídia social e impresso. O documento [04 · Design system](04-DESIGN-SYSTEM.md) preenche essa lacuna.

---

## 3. Identidade visual e logos

### 3.1 Arquivos auditados

| Arquivo | Dimensão | Formato | Situação |
|---|---|---|---|
| `IDV/WS26.png` | 1500 × 747 | PNG RGBA, logo **branca** | Utilizável. Lockup principal: "26" em contorno + "WAVES" sólido. |
| `IDV/ONDAS P G.png` | 1287 × 658 | PNG RGBA, branca | Utilizável. Lema "Ondas de Poder e Glória" (Mariglen + Kaway). |
| `IDV/APRESENTAÇÃO IDV.pdf` | 4624 × 19584 px | PDF de página única | Board de apresentação do IDV. Fonte de verdade visual. |
| `IDV/APRESENTAÇÃO ID.psd` | — | 86 MB | Editável do board. |
| `IDV/APRESENTAÇÃO ID-Recuperado.psd` | — | 87 MB | **Arquivo de recuperação do Photoshop.** Verificar qual é o mais recente e arquivar o outro para evitar divergência. |
| `ARTES/TELAO/CHAMADA WAVES TELÃO.jpg` | 1920 × 1080 | JPG | Arte-chave da edição. Confirma a data oficial. |

### 3.2 O que o IDV define

- **Lockup principal:** kicker `CONFERÊNCIA` espaçado (Sora Thin) + wordmark `WAVES` (Rushland) sobre numeral `26` / `2026` em contorno.
- **Variações existentes:** branca sobre preto; branca sobre turquesa; colorida sobre degradê laranja→amarelo; wordmark reduzido com `2K26` embutido.
- **Assinatura:** logo `MANT PSO` sempre presente no rodapé das peças.

### 3.3 Problemas encontrados nos logos

| # | Problema | Impacto no site | Gravidade |
|---|---|---|---|
| L1 | **Não existe versão vetorial (SVG/AI/EPS)** do lockup Waves 26. Só PNG rasterizado a 1500 px. | Logo pixelado em telas Retina/4K e no favicon pequeno. | **Alta** |
| L2 | **Não existe versão em cor sólida escura** para fundo claro. Só branca. | Impede seções de fundo claro e o modo claro do sistema. | Média |
| L3 | **Não existe favicon da edição 2026.** A edição 2025 tinha (`WAVES 2025/favicon.png`). | Aba do navegador sem identidade; regressão em relação a 2025. | Média |
| L4 | `WS26.png` tem **margem de transparência irregular** — o traço diagonal do "2" encosta na borda superior esquerda. | Alinhamento imprevisível no CSS. Precisa de recorte com margem controlada. | Baixa |
| L5 | Sem **Open Graph image** (imagem de preview em WhatsApp/Instagram/Telegram). | Link compartilhado aparece sem imagem — perde clique justamente no canal onde a divulgação acontece. | **Alta** |

Ações correspondentes em [07 · Pipeline de assets](07-PIPELINE-DE-ASSETS.md).

---

## 4. Tipografia — o achado mais crítico para a web

| Fonte | Uso no IDV | Situação para web |
|---|---|---|
| **Sora** | Kicker "CONFERÊNCIA", corpo de texto | ✅ **Livre.** Open source (SIL OFL), disponível no Google Fonts. Pode ser embutida sem custo. |
| **Rushland** | Wordmark "WAVES" | ⚠️ Fonte display de terceiros. **Licença de webfont não verificada.** |
| **OC Grind** | Números "2K26" | ⚠️ Idem. |
| **Mariglen** | "Ondas de" | ⚠️ Idem. |
| **Kaway** | "Poder e Glória" | ⚠️ Idem. |

**Risco:** uma licença de fonte *desktop* — a que se usa no Photoshop — **não cobre** o uso como webfont. `@font-face` é uma licença separada na maioria das foundries, e o arquivo da fonte fica publicamente baixável a partir do site.

**Recomendação (resolve o risco sem perder a identidade):**

1. As palavras que usam Rushland / OC Grind / Mariglen / Kaway aparecem no site como **imagem (SVG ou PNG)** exportada do Photoshop — exatamente como já aparecem nas artes. São poucas e sempre as mesmas: o lockup e o lema.
2. **Todo o resto** — títulos de seção, corpo, botões, FAQ, rodapé — usa **Sora**, que é livre e já é a fonte oficial de texto da marca.

Isso mantém 100% da identidade, elimina o risco jurídico e ainda melhora a performance (menos arquivos de fonte para baixar). Detalhe em [04 · Design system § 2](04-DESIGN-SYSTEM.md).

---

## 5. Lacunas críticas

| # | Lacuna | Por que importa | Onde resolver |
|---|---|---|---|
| G1 | **Zero fotos da Waves 2025 arquivadas neste drive.** Nenhuma pasta de fotografia do evento foi encontrada em `D:\MANT PSO`. | Prova social é o principal argumento de conversão para adolescente: ele quer ver gente da idade dele lá. Sem foto, a seção "Como foi 2025" não existe. | [10 · Pendências, D6](10-PENDENCIAS.md) |
| G2 | **Link e plataforma de inscrição não definidos.** Em 2025 usou-se InChurch (arquivo `FAÇA INSCRIÇÃO - LINK INCHURCH.jpg`). Para 2026, nada. | Sem isso o site não tem CTA — perde a razão de existir. | [10 · Pendências, D1](10-PENDENCIAS.md) |
| G3 | **Valor da inscrição não definido.** | É a primeira pergunta de qualquer adolescente e do responsável que vai pagar. | [10 · Pendências, D2](10-PENDENCIAS.md) |
| G4 | **Programação e preletores não definidos.** Em 2025 houve preletor anunciado (Ricardo Libanes). Em 2026, nada até o momento. | É o segundo motivo mais citado para decidir ir a uma conferência. | [10 · Pendências, D3/D4](10-PENDENCIAS.md) |
| G5 | **Nenhuma peça de FEED ou STORYS produzida** para a 2ª edição (pastas vazias). Só telão e vídeo. | O site precisa ser divulgado — e a divulgação mora no Instagram. | Fora do escopo do site; sinalizado à equipe. |
| G6 | **Sem endereço definido para o site.** O site da igreja é `mantparaiso.com.br` (Next.js). | Define hospedagem, DNS e SEO. | [10 · Pendências, D5](10-PENDENCIAS.md) |

---

## 6. Inconsistências e pontos a confirmar

| # | Achado | Observação |
|---|---|---|
| C1 | `PREMIERE/FALTAM 5 DIAS JOAQUIM.mp4` foi renderizado em **02/09/2026**, mas o evento é **18/09**. | Provavelmente é peça de contagem produzida com antecedência, para publicar em 13/09. **Confirmar antes de publicar** — se for erro de contagem, a peça vira ruído e queima credibilidade. |
| C2 | O documento de marca diz "Data: 18 a 20 de setembro" sem o ano; a arte de telão diz "**18, 19 & 20 DE SETEMBRO DE 2026**". | A arte é a fonte de verdade. Sugestão: incluir o ano no documento de marca. |
| C3 | `IDV/APRESENTAÇÃO ID.psd` e `APRESENTAÇÃO ID-Recuperado.psd` coexistem, com ~1 MB de diferença. | Definir o arquivo canônico e arquivar o outro. |
| C4 | O documento de marca chama a edição de "2ª edição (a 1ª ocorreu no ano anterior)". A 1ª edição foi em **outubro de 2025** (datas dos arquivos em `CONFERÊNCIA WAVES 2025`), com o tema "**Ondas do Mover do Espírito**". | Útil para a seção histórica do site. Confirmar as datas exatas de 2025. |

---

## 7. Herança da 1ª edição (Waves 2025) — o que dá para reaproveitar

A pasta `MULTIMIDIA/ARTES/CONFERÊNCIA WAVES 2025` mostra que a operação da 1ª edição foi madura e tem material reaproveitável **como conteúdo do site**:

| Elemento de 2025 | Uso no site 2026 |
|---|---|
| Tema "Ondas do Mover do Espírito" e IDV 2025 | Seção "A história da Waves" — mostra que não é evento de estreia |
| `CONVITES/` — 6 convites nominais para igrejas parceiras (Ágape, Oeste, Pouso, Quadrangular, Vila Regina, Vinho Novo) | Prova de que a conferência é regional, não só interna. Reforça o "chame seus amigos" |
| `CAMISAS/` e `STORE/WAVES STORE.mp4` — linha de camisetas oversized | Seção "Waves Store" no site, se houver loja em 2026 |
| `PULSEIRA/` — pulseira de acesso | Sinal de organização; útil na seção "o que você recebe" |
| `SORTEIO WS25.jpg` | Mecânica de engajamento já testada, que pode ser repetida e hospedada no site |
| `COUNTDOWN/` (contagem de 7 a 3 dias) | Padrão de contagem regressiva já validado; o site pode ter contador ao vivo |
| `favicon.png` | Modelo do que precisa ser refeito para 2026 |
| `INSCRIÇÕES.jpg` aponta para `WWW.MANTPARAISO.COM.BR` | **Precedente importante:** em 2025 o tráfego de inscrição foi mandado para o site da igreja |

**Leitura estratégica:** a Waves 2026 já tem lastro. O site deve dizer isso com todas as letras — "2ª edição", "jovens de várias igrejas da região". É o argumento que converte quem nunca veio.

---

## 8. Vídeo e áudio disponíveis

Material renderizado em `PREMIERE/`, todo a 23,976 fps:

| Arquivo | Formato | Duração | Uso no site |
|---|---|---|---|
| `CHAMADA REELS WS26.mp4` | 1080×1920 (9:16) | 42,8 s | **Melhor candidato ao vídeo do hero.** Vertical, curto, com endcard do lockup |
| `CHAMADA WAVES26.mp4` | 1920×1080 (16:9) | 120,2 s | Longo demais para o site; ótimo para telão |
| `OQ É A CONFERENCIA WAVES ATHOS.mp4` | 1080×1920 | 45,8 s | Depoimento/explicação — ideal para a seção "O que é a Waves" |
| `CHAMADA ATHOS AMANHECER-COM-CRISTO.mp4` | 1080×1920 | 49,2 s | Conteúdo da igreja, não da conferência |
| `FALTAM 5 DIAS JOAQUIM.mp4` | 1080×1920 | 35,9 s | Contagem regressiva (ver C1) |
| `CHAMADA TEL REDE DE JOVENS.mp4` | 1920×1080 | 18,1 s | Telão |

Há também captação bruta não editada: **17 clipes Canon** (~1,7 GB) e **7 clipes DJI** (~1,4 GB). Se houver imagem de gente ou da cidade nesses clipes, é matéria-prima para o vídeo de fundo do hero e para a galeria — vale uma decupagem.

Trilhas e efeitos em `ENVATO/` (incluindo SFX de gota d'água e um template "Water Logo" do After Effects) reforçam o conceito de água e podem gerar as micro-animações do site.

> **Aviso de licenciamento:** conteúdo do Envato e trechos baixados do YouTube presentes na pasta (`Abertura do culto - Emily Soares (youtube).mp4`, `ASMR Water Sound ... (youtube).mp3`) **não devem ser publicados no site** sem verificação de licença. Uso em site é distribuição pública e fica exposto.

---

## 9. Veredito

| Frente | Nota | Comentário |
|---|---|---|
| Identidade visual | 🟢 Forte | Distinta, coerente, madura. Pronta para virar site. |
| Documento de marca | 🟢 Forte | Bem acima da média para projeto de igreja. |
| Assets de logo | 🟡 Parcial | Falta vetor, versão escura, favicon e OG image. Resolvível em 1 dia de Photoshop. |
| Tipografia para web | 🟠 Risco | Licença de 4 fontes display não verificada. Contornável (ver § 4). |
| Conteúdo de conversão | 🔴 Ausente | Sem link, sem valor, sem programação, sem preletor. **Bloqueia a publicação.** |
| Prova social (fotos) | 🔴 Ausente | Maior perda de conversão potencial. |
| Vídeo | 🟢 Forte | Material vertical curto e bem produzido, pronto para o hero. |

**Conclusão:** o projeto está pronto do lado do design e não está pronto do lado da informação. O site pode ser construído em paralelo à coleta dessas informações, desde que elas cheguem antes da publicação.
