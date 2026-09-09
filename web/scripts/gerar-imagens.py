"""
Gera as variantes responsivas das imagens do site.

Cada imagem sai em AVIF, WebP e JPEG (retaguarda), em várias larguras, nunca
acima da resolução nativa da fonte — ampliar não cria detalhe, só peso.
"""
import os
import subprocess
import sys
from PIL import Image

ORIG = os.path.join(os.environ['TEMP'], 'wv-src')
DEST = r'D:\MANT PSO\MULTIMIDIA\ARTES\CONFERÊNCIA WAVES 26\SITE\web\public\media'

# nome: (larguras desejadas, qualidade jpeg)
ALVOS = {
    'templo':      ([640, 1024, 1600, 2400, 3200], 80),
    'paraiso':     ([640, 1024, 1600, 2400, 3200], 80),
    'serra':       ([640, 1024, 1600, 2400, 3200], 80),
    'terra':       ([640, 1024, 1600, 1920], 82),
    'agua-poster': ([640, 1024, 1600, 1920], 80),
    'chamada-poster': ([640, 1024, 1600, 1920], 80),
}

os.makedirs(DEST, exist_ok=True)


def roda(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print('  ! falhou:', ' '.join(cmd[:6]), r.stderr[-300:])
        return False
    return True


total = 0
for nome, (larguras, q) in ALVOS.items():
    fonte = os.path.join(ORIG, nome + '.png')
    if not os.path.exists(fonte):
        print('faltando:', fonte)
        continue

    nativa = Image.open(fonte).width
    usar = [w for w in larguras if w <= nativa]
    if nativa not in usar:
        usar.append(nativa)

    print(f'{nome}: nativa {nativa}px -> {usar}')

    for w in usar:
        base = os.path.join(DEST, f'{nome}-{w}')
        vf = f'scale={w}:-2:flags=lanczos'

        roda(['ffmpeg', '-v', 'error', '-y', '-i', fonte, '-vf', vf,
              '-c:v', 'libaom-av1', '-still-picture', '1',
              '-crf', '30', '-b:v', '0', '-cpu-used', '6',
              base + '.avif'])
        roda(['ffmpeg', '-v', 'error', '-y', '-i', fonte, '-vf', vf,
              '-c:v', 'libwebp', '-quality', '80', '-compression_level', '6',
              base + '.webp'])
        roda(['ffmpeg', '-v', 'error', '-y', '-i', fonte, '-vf', vf,
              '-q:v', '4', base + '.jpg'])

        tam = {e: os.path.getsize(base + e) // 1024
               for e in ('.avif', '.webp', '.jpg') if os.path.exists(base + e)}
        print(f'   {w:>5}px  ' + '  '.join(f'{k[1:]}:{v}KB' for k, v in tam.items()))
        total += len(tam)

print(f'\n{total} arquivos gerados')
