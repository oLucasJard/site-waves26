# 07 · Pipeline de assets

Ordem de serviço para a equipe de Multimídia. Cada item corresponde a uma lacuna encontrada na [Auditoria](01-AUDITORIA.md).

Todos os arquivos gerados vão para `SITE/src/assets/`. **Nenhum arquivo das pastas de origem é alterado.**

---

## 1. Ordem de serviço — logos e marca

| # | Entregar | Origem | Formato | Especificação | Resolve |
|---|---|---|---|---|---|
| A1 ✅ | `logo-waves26.svg` + `-escuro.svg` | Traçado do `IDV/WS26.png` | **SVG** | **Entregue.** 5 KB, independente de resolução. Cor fixa no arquivo — `currentColor` não resolve via `<img>`. | L1, L2 |
| A2 ✅ | `logo-waves26.png` | `IDV/WS26.png` | PNG-24 | **Entregue.** 1620 × 807, recortado no bounding box e com margem uniforme de 4 %. Resolve o encosto do traço na borda. | L1, L4 |
| A3 ✅ | `logo-waves26-escuro.svg` | idem | SVG | **Entregue.** `#04101e`, para fundo claro. | L2 |
| A4 ✅ | `lema-ondas-poder-gloria.svg` + `-escuro.svg` | Traçado do `IDV/ONDAS P G.png` | **SVG** | **Entregue.** 32 KB, vetor. O PNG continua no repositório para usos fora da web. | — |
| A5 | `logo-mant-pso.svg` | `D:\MANT PSO\FINAL\MANT_PSO.png` | SVG | Assinatura do rodapé, versão branca. | — |
| A6 ⏳ | `favicon.svg` | Lockup reduzido | SVG | Refinamento opcional: isolar **apenas o "26"** a partir do PSD. Os PNGs de A7 já resolvem o essencial. | L3 |
| A7 ✅ | `favicon-32/192/512.png` + `apple-touch-icon.png` | `logo-waves26.png` | PNG | **Entregues.** Disco `#1D3F75` com o lockup em `#F3CE04` — mesma estrutura do favicon de 2025, na cor de 2026. O apple-touch é quadrado sólido `#0B1A33`. | L3 |
| A8 ✅ | `og-waves26.jpg` | `ARTES/TELAO/CHAMADA WAVES TELÃO.jpg` | **JPG** | **Entregue.** 1200 × 630, 152 KB. Lockup, data e assinatura MANT PSO visíveis. ⏳ falta o teste real de compartilhamento no WhatsApp (§ 1.1). | L5 |
| A9 | `grain.png` | Textura das artes | PNG | Tile de 256 × 256 px, ≤ 8 KB, sem emenda visível. Aplicado com `opacity: .05`. | — |

### 1.1 Como testar A8 antes de publicar

Mande o link para você mesmo no WhatsApp e no direct do Instagram, num celular. Se o card não mostrar imagem ou o texto ficar ilegível, refaça. **Este é o asset com maior impacto direto em cliques** — o link é compartilhado centenas de vezes.

---

## 2. Ordem de serviço — imagens

| # | Entregar | Origem | Especificação |
|---|---|---|---|
| B1 ✅ | `agua-poster-{640,1024,1600,1920}.{avif,webp,jpg}` | Quadro do laço de água | **Entregue.** Nativo 1920 × 1080. |
| B2 🔴 | `galeria/ws25-01…08` | **Fotos da Waves 2025** — confirmadas por decisão (D6), **arquivos ainda não localizados** ([P3](10-PENDENCIAS.md)) | 8 imagens curadas. 1200 px no lado maior. AVIF + WebP. ≤ 75 KB cada. |
| B3 | `mapa-mant.webp` | Captura do Google Maps do endereço | 800 × 500. Imagem estática clicável — **não** embutir iframe do Maps. |
| ~~B4~~ | ~~`preletores/*.webp`~~ | ❌ **Cancelado (D3)** — preletores não serão divulgados | — |
| B5 | `story-convite.png` | Nova arte | 1080 × 1920. Arte para o visitante baixar e postar no story. Com o endereço do site. |

### 2.1 Critério de curadoria das fotos da 2025 (B2)

Decisão D6: a galeria usa **apenas fotos de 2025**. Quando os arquivos aparecerem, escolha por este critério, nesta ordem:

1. **Multidão vista de trás/de cima**, com braços levantados — mostra volume sem expor rosto identificável
2. **Rostos de adolescentes** em momento genuíno (não posado)
3. Palco / louvor com iluminação forte
4. Detalhe (pulseira, camiseta, Bíblia aberta)

⚠️ Foto de menor de idade identificável exige autorização de imagem do responsável. Ver [08 · LGPD § 4](08-LGPD-E-MENORES.md). Fotos de multidão de costas resolvem esse problema e são visualmente mais fortes.

### 2.2 Comando de conversão (referência)

```bash
# AVIF
ffmpeg -i entrada.jpg -vf "scale=1200:-2" -c:v libaom-av1 -crf 32 -b:v 0 -cpu-used 4 saida.avif
# WebP
ffmpeg -i entrada.jpg -vf "scale=1200:-2" -c:v libwebp -quality 78 saida.webp
# JPG de fallback
ffmpeg -i entrada.jpg -vf "scale=1200:-2" -q:v 4 saida.jpg
```

---

## 3. Ordem de serviço — vídeo

| # | Entregar | Origem | Especificação |
|---|---|---|---|
| C1 | `hero.mp4` | `PREMIERE/CHAMADA REELS WS26.mp4` | Recorte de **8 a 12 s** em laço perfeito, **sem áudio**, 1080 × 1920. H.264, CRF 26. **≤ 2,5 MB.** |
| C2 | `hero.webm` | idem | VP9, mesmo recorte. ≤ 1,8 MB. |
| C3 | Vídeo "O que é a Waves" | `PREMIERE/OQ É A CONFERENCIA WAVES ATHOS.mp4` | Manter os 45 s. **Legenda embutida obrigatória.** Publicar no YouTube da igreja e incorporar por *facade* (imagem clicável), não por iframe direto — protege o LCP. |

```bash
# C1 — recorte mudo, otimizado para web
ffmpeg -ss 00:00:06 -i "CHAMADA REELS WS26.mp4" -t 10 -an \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart hero.mp4

# C2
ffmpeg -ss 00:00:06 -i "CHAMADA REELS WS26.mp4" -t 10 -an \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 hero.webm
```

`-movflags +faststart` é obrigatório: coloca os metadados no início do arquivo para o vídeo começar antes de baixar tudo.

### 3.1 Decupagem da captação bruta (opcional, alto retorno)

`CANON - PREPAIR/` (17 clipes, ~1,7 GB) e `DJI/` (7 clipes aéreos, ~1,4 GB) ainda não foram usados. Vale uma passada procurando:

- Aérea de Paraíso do Tocantins → fundo do CTA final ("comece por sua cidade")
- Aérea da igreja → seção `#local`
- Água / rio / movimento → laço do hero, alinhado ao conceito de ondas

---

## 4. Fontes

| # | Entregar | Origem | Especificação |
|---|---|---|---|
| D1 ✅ | `sora-latin.woff2` (33 KB) · `sora-latin-ext.woff2` (15 KB) | [Sora no Google Fonts](https://fonts.google.com/specimen/Sora) (SIL OFL) | **Entregues.** Subsets oficiais do Google em fonte **variável**: um arquivo cobre os pesos 200 a 800. O `unicode-range` faz o `latin-ext` só baixar quando necessário — em português, quase nunca. |

**Não** exportar nem hospedar Rushland, OC Grind, Mariglen ou Kaway como webfont — ver [01 · Auditoria § 4](01-AUDITORIA.md). Elas entram no site como SVG (itens A1, A4).

```bash
pip install fonttools brotli
pyftsubset Sora-Bold.ttf --output-file=sora-700.woff2 --flavor=woff2 \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+2000-206F,U+20AC,U+2122"
```

---

## 5. Nomenclatura e organização

Seguindo o Documento de Marca § 6, adaptado para web:

```
minúsculas, sem acento, sem espaço, separado por hífen
<tipo>-<descricao>-<variacao>.<ext>

logo-waves26.svg
logo-waves26-dark.svg
og-waves26.jpg
galeria/ws25-01.webp
preletores/nome-sobrenome.webp
```

**Sugestão à equipe (fora do escopo do site):** as pastas `ARTES/FEED` e `ARTES/STORYS` estão vazias enquanto as peças ficam soltas em `PREMIERE/`. Adotar a nomenclatura do documento de marca (`waves-2026-inscricoes-stories-03.png`) e guardar cada peça na pasta certa faria a próxima edição começar muito mais rápido.

---

## 6. Checklist de entrega dos assets

```
LOGOS E MARCA
[x] A1  logo-waves26.svg                 vetor, 5 KB
[x] A2  logo-waves26.png              1620x807, margem 4% uniforme
[x] A3  logo-waves26-escuro.svg          versão escura
[x] A4  lema-ondas-poder-gloria.png   (versao SVG ainda pendente)
[ ] A5  logo-mant-pso.svg
[ ] A6  favicon.svg                      só o "26", legível a 16px
[x] A7  favicon-32/192/512 + apple-touch-icon   disco indigo + lockup dourado
[x] A8  og-waves26.jpg                1200x630, 152 KB   [ ] testar no WhatsApp
[ ] A9  grain.png                        tile 256px sem emenda

IMAGENS
[x] B1  agua-poster  (avif + webp + jpg, 4 larguras)
[ ] B2  galeria/ws25-01..08              🔴 arquivos a localizar (P3)
[ ] B3  mapa-mant.webp
[ ] B5  story-convite.png                1080x1920

VÍDEO
[ ] C1  hero.mp4    ≤ 2,5 MB, mudo, laço
[ ] C2  hero.webm   ≤ 1,8 MB
[ ] C3  vídeo "O que é a Waves" com legenda, publicado no YouTube

FONTES
[x] D1  sora-latin.woff2 (33 KB) + sora-latin-ext.woff2 (15 KB)  variavel 200-800

VERIFICAÇÃO FINAL
[ ] Nenhum asset com fonte comercial embutida como webfont
[ ] Nenhum áudio/vídeo de terceiro sem licença verificada
[ ] Nenhuma foto de menor identificável sem autorização
[ ] Peso total da primeira tela ≤ 350 KB
```
