# 00 · Sumário executivo

**Leitura: 3 minutos.** Para quem vai aprovar, não para quem vai executar.

---

## O que foi feito

Auditoria completa da pasta `CONFERÊNCIA WAVES 26` (artes, logos, vídeos, documento de marca), comparação com a 1ª edição (`CONFERÊNCIA WAVES 2025`), pesquisa web sobre landing pages de evento, tendências de design para público jovem, hospedagem estática, performance mobile no Brasil e obrigações de LGPD para dados de menores. Resultado: 11 documentos nesta pasta e, com as decisões da liderança fechadas em 03/09, a primeira parte do site já construída e testada.

## O diagnóstico em uma frase

> A marca Waves 2026 está pronta e é forte. A informação de conversão, que faltava na auditoria, **foi definida em 03/09**. O que resta é prova social — as fotos da 1ª edição — e a página inicial.

## Os 5 pontos que decidem o sucesso do site

1. **Um único objetivo.** O site existe para gerar inscrição. Tudo que não empurra para o botão de inscrição sai da página.
2. **Prova social é o maior gap que resta.** A Waves 2025 aconteceu e foi grande — mas não há **nenhuma foto do evento** arquivada neste drive. A liderança já decidiu que a galeria usa as fotos de 2025 (D6); falta localizá-las. Sem rosto de gente real, o site vira cartaz.
3. **Mobile é o site.** O público chega por link na bio do Instagram, em 4G, num celular intermediário. O site precisa abrir em menos de 2,5 s nessas condições ou perde a inscrição antes de existir.
4. **Sem backend ≠ sem inscrição.** O formulário de `/inscricao` monta a mensagem e a entrega ao WhatsApp da organização — quem envia é o próprio visitante, do número dele. Custo zero, armazenamento zero, e usa o canal que o público já tem aberto. Ver [Especificação técnica § 4](06-ESPECIFICACAO-TECNICA.md).
5. **LGPD é obrigação, não detalhe.** O público-alvo é majoritariamente menor de 18 anos. Coletar dado de adolescente exige consentimento de pai ou responsável, específico e destacado. Ver [LGPD](08-LGPD-E-MENORES.md).

## As decisões — todas fechadas em 03/09 ✅

| # | Decisão | Definido |
|---|---|---|
| D1 | Inscrições | **Anna Beatriz Veiga**, por WhatsApp (+55 63 98472-1648). Sem plataforma, sem pagamento online. |
| D2 | Valor | **R$ 50,00** simbólico, sem lotes, **nada incluso** |
| D3 | Preletores | **Não divulgar por enquanto** — seção removida do site |
| D4 | Programação | Só a abertura: **sexta, 19h30** |
| D5 | Endereço | **waves.mantparaiso.com.br** |
| D6 | Fotos | **Apenas as da Waves 2025** |
| D7 | Contatos | Anna Beatriz (inscrições) e Ev. Athos (adolescentes, +55 63 99914-0125) |
| D8 | Waves Store | **Um modelo de camisa** |
| D9 | Transmissão | **Sim**, ao vivo no mesmo canal do YouTube |
| D10 | Faixa etária | **Livre** |

Registro completo, com consequências e pendências residuais, em [10 · Decisões e pendências](10-PENDENCIAS.md).

## O que já foi construído

A página **`/inscricao`** está pronta e testada em navegador ([`SITE/web/`](../web/)):

- Formulário de 6 campos que monta a mensagem e a entrega ao WhatsApp da Anna — **sem backend, sem custo, sem armazenar dado nenhum**.
- Bloco do responsável legal que aparece sozinho quando a data de nascimento indica menos de 18 anos (exigência da LGPD).
- Três camadas de segurança contra o bloqueio de redirecionamento nos navegadores internos do Instagram e do WhatsApp.
- Página `/privacidade` completa.
- Identidade aplicada: paleta oficial sobre base escura, fonte Sora auto-hospedada, lockup da marca.
- **Imagem de compartilhamento (Open Graph)** e favicons gerados a partir das artes oficiais — resolvia a lacuna de maior impacto em cliques.

## O que ainda falta para publicar

| # | Falta | Responsável |
|---|---|---|
| P2 | Acesso ao DNS para criar `waves.mantparaiso.com.br` | Quem administra o domínio |
| P3 | As fotos da Waves 2025 (decisão tomada, arquivos não localizados) | Multimídia |
| — | A página inicial `/` | Multimídia |

## Recomendação de stack (resumo)

HTML + CSS + JavaScript puros, sem framework e sem build, hospedados em **Cloudflare Pages** (grátis, banda ilimitada, HTTPS e domínio próprio inclusos). Inscrição por link `wa.me`. Justificativa completa em [Especificação técnica](06-ESPECIFICACAO-TECNICA.md).

## Cronograma proposto

**Faltam 15 dias para o evento.** Com as decisões fechadas e `/inscricao` pronta, o caminho crítico agora é: **página inicial → fotos de 2025 → DNS → publicar**. A meta segue **10/09 no ar**, deixando 8 dias de divulgação com o link vivo. Detalhe dia a dia em [Plano de execução](09-PLANO-DE-EXECUCAO.md).

> **Atalho possível:** `/inscricao` já funciona sozinha. Se o DNS sair antes da página inicial, dá para divulgar o link da inscrição imediatamente e publicar a home em seguida.
