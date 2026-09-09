# 08 · LGPD e dados de menores

> Este documento organiza o que a Lei 13.709/2018 (LGPD) exige neste projeto. **Não é parecer jurídico.** Antes de publicar, submeta o texto final à liderança e, se possível, a alguém com formação em Direito.

---

## 1. Por que isso importa aqui, especificamente

O público-alvo da Waves é **jovens e adolescentes** — a maior parte com menos de 18 anos. A LGPD dá tratamento especial a esses dados:

- **Criança:** até 12 anos incompletos
- **Adolescente:** de 12 a 18 anos

Coletar dado de menor de 18 anos exige **consentimento específico e destacado de pelo menos um dos pais ou responsável legal**, e o tratamento deve ser feito sempre no melhor interesse do menor.

Isso alcança três coisas neste projeto: a **inscrição**, a **fotografia/filmagem** do evento e o **analytics** do site.

---

## 2. A vantagem estrutural do site sem backend

Como o site **não recebe, não processa e não armazena nenhum dado pessoal** ([06 § 4](06-ESPECIFICACAO-TECNICA.md)), a exposição do site em si é quase nula. Os dados vão do dispositivo do visitante direto para o **WhatsApp da organização** — não passam por nenhum servidor nosso nem por serviço de terceiro.

Isso é uma escolha de arquitetura, não sorte — e vale registrar como argumento a favor da decisão de não ter backend.

**Regra que sustenta essa vantagem:** o site pode ter campos de formulário — e tem —, mas **nenhum valor digitado pode sair da página por rede**. Nada de `fetch`, nada de `<form action>` apontando para servidor, nada de `localStorage` com dado de pessoa. O único destino permitido é o link `wa.me`, disparado pelo próprio visitante. Se um dia isso mudar, este documento precisa ser refeito.

---

## 3. Inscrição — o modelo adotado e o que ele exige

**Decisão (D1):** não há plataforma de inscrição. O formulário de `/inscricao` monta uma mensagem e a entrega ao WhatsApp da organização; **quem envia é o próprio titular**, do número dele.

Isso é favorável do ponto de vista da LGPD — não há coleta pelo site, não há armazenamento em terceiro, não há transferência internacional de dados. Mas **não elimina** as obrigações: a partir do momento em que a organização recebe e usa os dados, ela é a controladora.

### 3.1 Campos implementados

| Campo | Obrigatório | Justificativa |
|---|---|---|
| Nome completo | sim | Identificação na lista |
| Data de nascimento | sim | Dispara o fluxo de menor de 18 anos |
| WhatsApp | sim | Canal de retorno |
| Cidade | sim | Logística |
| Igreja | não | Informativo |
| Nome e WhatsApp do responsável | se < 18 | Art. 14 da LGPD |
| Autorização do responsável | se < 18 | Art. 14 da LGPD |
| Concordância com o uso dos dados | sim | Base legal do tratamento |
| Autorização de imagem | **não** | Não pode condicionar a inscrição |

**Não são coletados**, por minimização: CPF, RG, endereço residencial, escola, e-mail, rede social, dado de saúde. Nenhum é necessário para uma conferência de três noites sem pernoite confirmado.

> Se a liderança confirmar pernoite ([P4](10-PENDENCIAS.md)), aí passa a fazer sentido pedir contato de emergência e informação de saúde relevante — que é **dado sensível** e exige cuidado redobrado.

### 3.2 Consentimentos — separados, nunca em um único aceite

A lei exige consentimento **destacado das demais cláusulas**. Implementado como caixas distintas e não pré-marcadas:

```
☐ Concordo com o uso dos meus dados para a organização da Conferência
  Waves 2026, conforme a Política de Privacidade.
  (obrigatório)

☐ Autorização do responsável. Confirmo que um responsável legal autorizou
  a participação na Conferência Waves 2026 e o envio destes dados.
  (obrigatório para menores de 18 — só aparece nesse caso)

☐ Autorizo o uso da minha imagem em fotos e vídeos da conferência para
  divulgação da MANT Paraíso.
  (opcional — a inscrição vale do mesmo jeito)
```

O terceiro item **não pode ser obrigatório**: consentimento condicionado à prestação do serviço não é consentimento livre. O texto do site diz isso ao visitante, com todas as letras.

### 3.3 O ponto fraco do modelo — e como cobrir

A autorização do responsável é **declarada pelo próprio inscrito**, não assinada pelo responsável. É aceitável como primeira camada, mas frágil se houver questionamento.

**Cobertura recomendada, em três camadas:**

1. **No formulário** (já implementado): o menor declara a autorização e informa nome e WhatsApp do responsável.
2. **Na confirmação:** a Anna Beatriz **envia uma mensagem ao número do responsável** confirmando a inscrição. A resposta do responsável no WhatsApp é consentimento por meio que demonstra a manifestação de vontade — exatamente o que a lei pede, e fica registrado.
3. **Na portaria**, para quem se inscrever no local: termo impresso e assinado — modelo no § 7.

> A camada 2 é tarefa de atendimento, não de código. **Precisa entrar no procedimento de quem gerencia as inscrições.** É o item de conformidade mais importante deste projeto — e, de quebra, reduz o número de adolescente que aparece sem os pais saberem.

---

## 4. Fotografia e filmagem do evento

Este é o ponto mais frequentemente ignorado e o de maior risco prático, porque o material vai para o site e para o Instagram.

**O que fazer:**

1. **Aviso na entrada e na inscrição:** informar que o evento será fotografado e filmado, e para que as imagens serão usadas.
2. **Autorização no formulário** (§ 3.2, terceiro item), assinada pelo responsável quando o inscrito for menor.
3. **Sinalização física** no local: placa visível na entrada informando a gravação.
4. **Curadoria na publicação:** dar preferência a fotos de multidão, de costas, de longe ou com rosto não identificável — resolve o problema na origem e, como bônus, são as fotos que melhor comunicam volume.
5. **Canal de remoção:** deixar claro (no rodapé e na política) como pedir a retirada de uma foto.

Para o site especificamente, ver o critério de curadoria em [07 § 2.1](07-PIPELINE-DE-ASSETS.md).

---

## 5. Analytics

Decidido: analytics **sem cookie e sem identificação** — Cloudflare Web Analytics ([06 § 7](06-ESPECIFICACAO-TECNICA.md)).

**Consequências positivas:**
- Não há tratamento de dado pessoal → não é necessário banner de consentimento de cookies
- Não há perfilamento de menor de idade
- A página fica mais rápida e o CSP fica mais restrito

Se a liderança exigir Google Analytics 4 ou Meta Pixel, então passa a ser obrigatório: banner de consentimento com opção real de recusa, atualização da política de privacidade e avaliação do risco de perfilar menores de idade. **A recomendação é não usar.**

---

## 6. Política de Privacidade — ✅ publicada

A página está construída em [`SITE/web/app/privacidade/`](../web/app/privacidade/page.js) e linkada no rodapé e dentro do formulário de inscrição. Estrutura usada:

| Item | Conteúdo publicado |
|---|---|
| 1. Quem somos | MANT Paraíso, endereço completo, WhatsApp da Anna Beatriz e e-mail da igreja |
| 2. Este site não guarda seus dados | Explica o modelo: os dados ficam no dispositivo e é o visitante quem envia |
| 3. Que dados a organização recebe | Lista exata dos campos de § 3.1 |
| 4. Para que usamos | Confirmação, vagas, pagamento, avisos, emergência. Sem venda nem cessão. |
| 5. Base legal | Art. 7º, I e art. 14 da LGPD |
| 6. Dados de crianças e adolescentes | Idade livre; menores de 18 exigem responsável |
| 7. Imagem e voz | Fotografia, filmagem, transmissão ao vivo; autorização opcional e revogável |
| 8. Por quanto tempo guardamos | 12 meses após o evento |
| 9. Seus direitos | Acesso, correção, eliminação, revogação — pelos contatos do item 1 |
| 10. Medição de audiência | Sem cookie, sem identificação |

**Pendências do texto publicado:**

- O contato para exercício de direitos usa `mantparaisosede@gmail.com`. Se houver e-mail dedicado da organização do evento, trocar ([P1](10-PENDENCIAS.md)).
- A data de "última atualização" precisa ser revista a cada alteração relevante.

---

## 7. Termo de autorização do responsável — modelo

Para uso no formulário (versão digital) e impresso na portaria (para quem se inscrever no local).

```
AUTORIZAÇÃO DE PARTICIPAÇÃO DE MENOR
Conferência Waves 2026 · 18, 19 e 20 de setembro de 2026
Igreja de Cristo — MANT Paraíso · Rua L10, 269, Interlagos,
Paraíso do Tocantins – TO

Eu, ______________________________________, CPF ________________,
telefone _________________, responsável legal por
______________________________________, nascido(a) em ____/____/______:

( ) AUTORIZO sua participação na Conferência Waves 2026, nas datas e no
    local acima.

( ) AUTORIZO o tratamento dos dados pessoais informados na inscrição para
    fins de organização do evento, nos termos da Política de Privacidade.

( ) Autorizo o uso de imagem e voz em fotos e vídeos do evento para
    divulgação institucional da MANT Paraíso.   ( ) Não autorizo.

Contato de emergência: _______________________  Tel: _______________
Informações de saúde relevantes: ____________________________________

Paraíso do Tocantins, ____ / ____ / 2026.

_______________________________________
Assinatura do responsável legal
```

---

## 8. Checklist de conformidade antes de publicar

```
JÁ FEITO
[x] Página /privacidade publicada e linkada no rodapé e no formulário
[x] Consentimentos SEPARADOS e não pré-marcados
[x] Autorização de imagem é OPCIONAL, e o texto diz isso ao visitante
[x] Data de nascimento dispara o fluxo de responsável para menores de 18
[x] Nenhum dado pessoal é armazenado pelo site
[x] Minimização aplicada: sem CPF, endereço, e-mail ou escola
[x] Analytics escolhido é sem cookie (Cloudflare Web Analytics)

FALTA
[ ] Procedimento de confirmação com o responsável pelo WhatsApp (§ 3.3)
    — o item mais importante desta lista
[ ] E-mail oficial para exercício de direitos (P1) — hoje consta o da igreja
[ ] Termo de autorização em PDF para inscrição presencial
[ ] Placa de aviso de filmagem preparada para a entrada do evento
[ ] Equipe de portaria orientada sobre inscrição presencial de menor
[ ] Nenhuma foto de menor identificável no site sem autorização
```

---

## Fontes de pesquisa

- [ANPD / MPCE — Guia orientativo: tratamento de dados pessoais de crianças e adolescentes](https://www.mpce.mp.br/wp-content/uploads/2023/10/Guia-orientativo-de-tratamento-de-dados-pessoais-de-criancas-e-adolescentes.pdf)
- [Confidata — Dados de crianças e adolescentes na LGPD: regras especiais](https://confidata.com.br/blog/dados-criancas-adolescentes-lgpd)
- [InternetLab — LGPD e a tutela dos dados pessoais de crianças e adolescentes](https://revista.internetlab.org.br/lei-geral-de-protecao-de-dados-e-a-tutela-dos-dados-pessoais-de-criancas-e-adolescentes-a-efetividade-do-consentimento-dos-pais-ou-responsaveis-legais/)
- [Adamy Gianinni — LGPD nas igrejas: gravações, transmissões e eventos](https://www.adamygianinni.com/artigo/2025/09/04/lgpd-nas-igrejas-o-que-pode-e-o-que-nao-pode-em-gravacoes-transmissoes-e-eventos/)
- [Instituto Jetro — Igrejas devem observar a LGPD](http://www.institutojetro.com/artigos/8/legislacao-e-direito/2301/igrejas-devem-observar-a-lei-geral-de-protecao-de-dados-lgpd)
