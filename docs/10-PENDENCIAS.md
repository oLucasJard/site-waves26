# 10 · Decisões e pendências

**Atualizado em 03/09/2026.** A liderança fechou D1 a D10. O que resta são verificações e três informações que ainda faltam.

---

## Decisões fechadas

| # | Decisão | Definido |
|---|---|---|
| **D1** | **Inscrições** | Geridas por **Anna Beatriz Veiga**. O site tem a página `/inscricao` com formulário que monta uma mensagem e a entrega ao WhatsApp dela: **+55 63 98472-1648**. Sem plataforma externa, sem pagamento online. |
| **D2** | **Valor** | **R$ 50,00**, valor simbólico. **Sem lotes**, sem alteração de preço. **Nada incluso** — o site não lista benefícios. |
| **D3** | **Preletores e louvor** | **Não serão divulgados por enquanto.** A seção `#quem` sai da arquitetura do site até haver decisão em contrário. |
| **D4** | **Programação** | Só a abertura está definida: **sexta-feira, 19h30**. O site publica apenas isso — nenhum outro horário até confirmação. |
| **D5** | **Endereço do site** | **`waves.mantparaiso.com.br`** (subdomínio, opção A). |
| **D6** | **Fotos** | Serão usadas **apenas as fotos da conferência do ano passado (Waves 2025)**. A seção `#2025` está confirmada. |
| **D7** | **Contatos oficiais** | **Anna Beatriz Veiga** — inscrições — +55 63 98472-1648.<br>**Ev. Athos** — líder de adolescentes — +55 63 99914-0125. |
| **D8** | **Waves Store** | **Um único modelo de camisa.** |
| **D9** | **Transmissão** | **Sim**, ao vivo, no mesmo canal do YouTube (@MANTPARAISO). |
| **D10** | **Faixa etária** | **Livre.** |

### Consequências já aplicadas

- `/inscricao` e `/privacidade` construídas e testadas ([`SITE/web/`](../web/)).
- Seção `#quem` removida da arquitetura ([03](03-ARQUITETURA-DE-INFORMACAO.md)).
- Seção `#2025` confirmada como obrigatória.
- Bloco "o que está incluso" removido da copy de inscrição ([05](05-CONTEUDO-E-COPY.md)).
- Modelo de inscrição sem backend reescrito para o fluxo de WhatsApp ([06 § 4](06-ESPECIFICACAO-TECNICA.md)).
- Bloco sobre transmissão e Waves Store entram na página inicial.

> **Nota interna — não publicar.** A liderança informou que o pagamento dos R$ 50,00 **não é obrigatório** para participar, e que isso **não deve ser divulgado**. O site diz apenas "valor simbólico" e encaminha o assunto para a Anna. Quem atende o WhatsApp precisa saber disso; o site, não.

---

## O que ainda falta

| # | Falta | Impacto | Responsável |
|---|---|---|---|
| **P1** | **E-mail da Anna Beatriz** (ou o e-mail oficial da organização do evento) | A Política de Privacidade está usando `mantparaisosede@gmail.com` como canal para exercício de direitos sob a LGPD. Se houver e-mail dedicado, trocar. | Liderança |
| **P2** | **Acesso ao DNS de `mantparaiso.com.br`** para criar o registro do subdomínio `waves` | Sem isso o site não sobe no endereço decidido | Quem administra o domínio |
| **P3** | **As fotos da Waves 2025 em si** | A decisão D6 está tomada, mas os arquivos ainda não foram localizados no drive ([Auditoria G1](01-AUDITORIA.md)). São necessárias 8 a 12 fotos. Ver critério de curadoria em [07 § 2.1](07-PIPELINE-DE-ASSETS.md). | Multimídia |
| **P4** | **Horário de encerramento de cada noite** | Aparece no bloco "Para pais e responsáveis". Enquanto não houver, o texto fala só do horário de abertura. | Liderança |
| **P5** | **Forma de pagamento** (Pix, dinheiro na entrada, ambos) e chave, se houver | Hoje o site diz "a Anna combina com você pelo WhatsApp". Se houver uma chave Pix oficial, o site pode exibi-la e reduzir o volume de mensagens. | Liderança |
| **P6** | **Preço e forma de venda da camisa** (D8) | Define se o bloco da Waves Store vai ao ar no lançamento ou depois | Liderança |
| **P7** | **Link do canal de transmissão** (D9) | Necessário para o estado "acontecendo agora" do site, em 18/09 | Multimídia |

---

## Verificações técnicas

| # | Item | Situação |
|---|---|---|
| V1 | Licença de webfont de Rushland, OC Grind, Mariglen e Kaway | **Mitigado.** O site usa apenas **Sora** (SIL OFL, auto-hospedada) e o lockup como imagem. Nenhuma fonte comercial é distribuída. |
| V2 | `FALTAM 5 DIAS JOAQUIM.mp4` renderizado em 02/09 para evento em 18/09 | ⏳ Confirmar se a contagem está correta antes de publicar |
| V3 | `APRESENTAÇÃO ID.psd` vs `APRESENTAÇÃO ID-Recuperado.psd` | ⏳ Definir o canônico e arquivar o outro |
| V4 | Datas exatas da Waves 2025 | ⏳ Confirmar para a seção histórica |
| V5 | Nº real de igrejas participantes em 2025 | ⏳ A auditoria encontrou 6 convites nominais. Confirmar antes de publicar o número |
| V6 | Licença do áudio do Envato e dos arquivos baixados do YouTube | ⏳ Não publicar no site sem verificar |
| V7 | ~~Vetorização dos logos (SVG)~~ | ✅ **Feito.** Lockup e lema traçados para SVG (5 KB e 32 KB), com variante escura. Resolve L1 e L2 da auditoria. |

---

## Resumo de uma tela

```
FECHADO ...................... D1 a D10  ✅

FALTA PARA O SITE SUBIR
  P2  Acesso ao DNS (waves.mantparaiso.com.br) ....... crítico
  P3  Fotos da Waves 2025 ........................... alto
  P1  E-mail oficial para a LGPD .................... médio

FALTA PARA ENRIQUECER
  P4  Horário de encerramento     P5  Forma de pagamento
  P6  Camisa: preço e venda       P7  Link da transmissão

VERIFICAR ..................... V2 a V6   (V1 e V7 resolvidos)
```
