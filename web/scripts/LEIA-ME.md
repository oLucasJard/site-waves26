# Scripts de mídia

Não rodam no build. São ferramentas de uma vez só, para quando o material
de origem mudar.

## `gerar-imagens.py`

Gera as variantes responsivas (AVIF, WebP, JPEG em várias larguras) a partir
dos PNGs de origem em `%TEMP%/wv-src/`.

Precisa de `ffmpeg` no PATH e `Pillow` instalado.

```bash
python scripts/gerar-imagens.py
```

Depois de rodar, confira `lib/imagens.js`: as larguras declaradas lá precisam
bater com os arquivos gerados.

## De onde veio cada imagem

| Arquivo | Fonte | Nativo |
|---|---|---|
| `templo` | `DJI/DJI_0478.MP4` @ 16,0 s | 3840 × 2160 |
| `paraiso` | `DJI/DJI_0478.MP4` @ 1,6 s | 3840 × 2160 |
| `serra` | `DJI/DJI_0481.MP4` @ 6,0 s | 3840 × 2160 |
| `terra` | `PREMIERE/CHAMADA WAVES26.mp4` @ 33,2 s | 1920 × 1080 |
| `agua-poster` | quadro do laço de água | 1920 × 1080 |
| `agua.mp4` | `CHAMADA WAVES26.mp4` 85,45 s + 1,8 s | 1440 de largura |
| `agua-leve.mp4` | o mesmo laço | 960 de largura |

O laço de água é feito de 1,8 s de oceano, desacelerado para 0,42× e
concatenado com ele mesmo invertido — 8,6 s sem emenda:

```bash
ffmpeg -ss 85.45 -t 1.80 -i "CHAMADA WAVES26.mp4" -an \
  -vf "setpts=PTS/0.42,fps=24" -c:v libx264 -crf 14 fwd.mp4

ffmpeg -i fwd.mp4 -filter_complex \
  "[0:v]split[a][b];[b]reverse,trim=start_frame=1,setpts=PTS-STARTPTS[r];[a][r]concat=n=2:v=1[o]" \
  -map "[o]" -c:v libx264 -crf 14 loop.mp4
```

## Vetorização do lockup

`public/brand/logo-waves26.svg` e `lema-ondas-poder-gloria.svg` foram traçados
a partir dos PNGs do IDV: o canal alfa é ampliado 4×, binarizado, e os
contornos viram caminhos SVG com `fill-rule="evenodd"` (o que resolve os vazados
das letras). O resultado é independente de resolução — nítido no favicon e num
telão — com 5 KB e 32 KB.

**Cor fixa no arquivo, de propósito.** `currentColor` não resolve quando o SVG
é carregado por `<img>`: o documento é independente e herda a cor inicial, que
é preto. Por isso há duas variantes de cada um, `.svg` (branco) e
`-escuro.svg` (`#04101e`, para fundo claro).
