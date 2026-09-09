'use client';

import { useEffect, useRef, useState } from 'react';
import { EVENTO } from '@/lib/evento';

const MAIORIDADE = 18;
const so = (v) => (v || '').replace(/\D/g, '');

function mascaraTelefone(v) {
  const d = so(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  const corpo = d.slice(2);
  const corte = d.length > 10 ? 5 : 4;
  if (corpo.length <= corte) return `(${d.slice(0, 2)}) ${corpo}`;
  return `(${d.slice(0, 2)}) ${corpo.slice(0, corte)}-${corpo.slice(corte)}`;
}

function idadeEm(iso) {
  const [a, m, d] = (iso || '').split('-').map(Number);
  if (!a || !m || !d) return null;
  const nasc = new Date(a, m - 1, d);
  if (nasc.getFullYear() !== a || nasc.getMonth() !== m - 1 || nasc.getDate() !== d) return null;
  const hoje = new Date();
  let idade = hoje.getFullYear() - a;
  const dm = hoje.getMonth() - (m - 1);
  if (dm < 0 || (dm === 0 && hoje.getDate() < d)) idade -= 1;
  return idade;
}

const dataBR = (iso) => {
  const p = (iso || '').split('-');
  return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : iso;
};

const telefoneValido = (v) => [10, 11].includes(so(v).length);
const nomeValido = (v) => v.trim().length >= 3 && v.trim().includes(' ');

const CAMPOS = {
  nome: 'nome',
  nascimento: 'nascimento',
  telefone: 'telefone',
  cidade: 'cidade',
  respNome: 'resp-nome',
  respTelefone: 'resp-telefone',
  respAutoriza: 'resp-autoriza',
  privacidade: 'privacidade',
};

export default function Formulario() {
  const [dados, setDados] = useState({
    nome: '',
    nascimento: '',
    telefone: '',
    cidade: EVENTO.local.cidade,
    igreja: '',
    respNome: '',
    respTelefone: '',
    respAutoriza: false,
    privacidade: false,
    imagem: false,
  });
  const [erros, setErros] = useState([]);
  const [tentativas, setTentativas] = useState(0);
  const [envio, setEnvio] = useState(null);
  const [copiado, setCopiado] = useState(false);

  const avisosRef = useRef(null);
  const enviadoRef = useRef(null);
  const formaRef = useRef(null);
  const relogioCopia = useRef(0);

  useEffect(() => () => clearTimeout(relogioCopia.current), []);

  const [hojeISO, setHojeISO] = useState(undefined);
  useEffect(() => {
    const agora = new Date();
    const local = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000);
    setHojeISO(local.toISOString().slice(0, 10));
  }, []);

  const idade = idadeEm(dados.nascimento);
  const menor = idade !== null && idade < MAIORIDADE;

  useEffect(() => {
    if (!envio) return;
    enviadoRef.current?.focus();
    enviadoRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [envio]);

  useEffect(() => {
    if (!tentativas) return;
    avisosRef.current?.focus();
    avisosRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [tentativas]);

  function irPara(id) {
    const campo = formaRef.current?.querySelector(`#${CAMPOS[id]}`);
    if (!campo) return;
    campo.scrollIntoView({ block: 'center', behavior: 'smooth' });
    campo.focus({ preventScroll: true });
  }

  function muda(campo, valor) {
    setDados((d) => ({ ...d, [campo]: valor }));
    if (erros.length) setErros((e) => e.filter((x) => x.id !== campo));
  }

  function validar() {
    const lista = [];
    const falha = (id, msg) => lista.push({ id, msg });

    if (!nomeValido(dados.nome)) falha('nome', 'Nome completo (nome e sobrenome)');
    if (idade === null || idade < 0 || idade > 120) falha('nascimento', 'Data de nascimento válida');
    if (!telefoneValido(dados.telefone)) falha('telefone', 'Seu WhatsApp com DDD');
    if (dados.cidade.trim().length < 2) falha('cidade', 'Sua cidade');

    if (menor) {
      if (!nomeValido(dados.respNome)) falha('respNome', 'Nome do responsável legal');
      if (!telefoneValido(dados.respTelefone)) falha('respTelefone', 'WhatsApp do responsável legal');
      if (!dados.respAutoriza) falha('respAutoriza', 'Autorização do responsável legal');
    }

    if (!dados.privacidade) falha('privacidade', 'Concordância com o tratamento dos dados');

    return lista;
  }

  function montarMensagem() {
    const linhas = [
      '*🌊 INSCRIÇÃO — CONFERÊNCIA WAVES 2026*',
      '18, 19 e 20 de setembro · MANT Paraíso',
      '',
      `*Nome:* ${dados.nome.trim()}`,
      `*Nascimento:* ${dataBR(dados.nascimento)} (${idade} anos)`,
      `*WhatsApp:* ${dados.telefone.trim()}`,
      `*Cidade:* ${dados.cidade.trim()}`,
      `*Igreja:* ${dados.igreja.trim() || 'não informado'}`,
    ];

    if (menor) {
      linhas.push(
        '',
        '*RESPONSÁVEL LEGAL*',
        `*Nome:* ${dados.respNome.trim()}`,
        `*WhatsApp:* ${dados.respTelefone.trim()}`,
        '✅ _Autorização do responsável confirmada._'
      );
    }

    linhas.push(
      '',
      `*Uso de imagem:* ${dados.imagem ? 'Autorizado' : 'Não autorizado'}`,
      '*Política de privacidade:* Aceita',
      '',
      '_Enviado pelo site waves.mantparaiso.com.br_'
    );

    return linhas.join('\n');
  }

  function enviar(e) {
    e.preventDefault();
    const lista = validar();

    if (lista.length) {
      setErros(lista);
      setTentativas((n) => n + 1);
      return;
    }

    setErros([]);
    const mensagem = montarMensagem();
    const url = `https://wa.me/${EVENTO.inscricao.whatsapp}?text=${encodeURIComponent(mensagem)}`;
    setEnvio({ mensagem, url });

    try {
      window.location.href = url;
    } catch {
      /* o botão de fallback resolve */
    }
  }

  async function copiar() {
    if (!envio) return;
    try {
      await navigator.clipboard.writeText(envio.mensagem);
      setCopiado(true);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = envio.mensagem;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopiado(true);
      } catch {
        setCopiado(false);
      }
      document.body.removeChild(ta);
    }
    clearTimeout(relogioCopia.current);
    relogioCopia.current = setTimeout(() => setCopiado(false), 2600);
  }

  const invalido = (id) => (erros.some((e) => e.id === id) ? 'true' : undefined);

  const descreve = (id, extra) =>
    [extra, invalido(id) ? `erro-${CAMPOS[id]}` : null].filter(Boolean).join(' ') ||
    undefined;

  if (envio) {
    return (
      <div className="enviado" ref={enviadoRef} tabIndex={-1}>
        <div className="enviado__topo">
          <span className="enviado__icone" aria-hidden="true">✓</span>
          <h2 className="display display--m" style={{ margin: 0 }}>
            Quase lá! Abrindo o WhatsApp
          </h2>
        </div>
        <p className="prosa">
          Sua mensagem de inscrição já foi formatada. Basta tocar em <strong>enviar</strong> na conversa com a <strong>{EVENTO.inscricao.responsavel}</strong> para ela confirmar a sua vaga e acertar o PIX simbólico de {EVENTO.inscricao.valorTexto}.
        </p>

        <a className="botao botao--largo" href={envio.url} rel="noopener noreferrer">
          Abrir WhatsApp agora
        </a>

        <button type="button" className="botao botao--vazado botao--largo" onClick={copiar}>
          {copiado ? '✓ Mensagem copiada!' : 'Copiar mensagem de inscrição'}
        </button>

        <details className="enviado__detalhes">
          <summary style={{ cursor: 'pointer', fontSize: '.88rem', opacity: 0.75, padding: '.6rem 0' }}>
            Ver conteúdo da mensagem
          </summary>
          <pre className="enviado__previa">{envio.mensagem}</pre>
        </details>

        <button
          type="button"
          className="botao botao--vazado botao--largo"
          style={{ opacity: 0.7 }}
          onClick={() => {
            setEnvio(null);
            setCopiado(false);
          }}
        >
          ← Editar dados preenchidos
        </button>
      </div>
    );
  }

  return (
    <form className="forma" onSubmit={enviar} noValidate ref={formaRef}>
      <div
        className="avisos"
        data-visivel={erros.length ? 'true' : 'false'}
        ref={avisosRef}
        tabIndex={-1}
        role="alert"
      >
        <h2>Atenção: verifique os campos abaixo</h2>
        <ul>
          {erros.map((e) => (
            <li key={e.id}>
              <button type="button" className="avisos__ir" onClick={() => irPara(e.id)}>
                {e.msg}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="forma__grupo">
        <h3 className="forma__subtitulo">1. Seus dados pessoais</h3>

        <div className="campo" data-invalido={invalido('nome')}>
          <label className="campo__rot" htmlFor="nome">
            Nome completo
          </label>
          <input
            className="entrada"
            id="nome"
            name="nome"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Seu nome e sobrenome"
            value={dados.nome}
            onChange={(e) => muda('nome', e.target.value)}
            aria-invalid={invalido('nome')}
            aria-describedby={descreve('nome')}
            required
          />
          <p className="campo__erro" id="erro-nome">Escreva seu nome completo (nome e sobrenome).</p>
        </div>

        <div className="campo" data-invalido={invalido('nascimento')}>
          <div className="campo__linha-rotulo">
            <label className="campo__rot" htmlFor="nascimento">
              Data de nascimento
            </label>
            {idade !== null && idade >= 0 && (
              <span className={`badge-idade ${menor ? 'badge-idade--menor' : 'badge-idade--maior'}`}>
                {idade} anos {menor ? '(menor de 18)' : '(maior de idade)'}
              </span>
            )}
          </div>
          <input
            className="entrada"
            id="nascimento"
            name="nascimento"
            type="date"
            autoComplete="bday"
            min="1900-01-01"
            max={hojeISO}
            value={dados.nascimento}
            onChange={(e) => muda('nascimento', e.target.value)}
            aria-describedby={descreve('nascimento', 'dica-nasc')}
            aria-invalid={invalido('nascimento')}
            required
          />
          <p className="campo__dica" id="dica-nasc">
            {menor
              ? 'Menores de 18 anos precisam preencher os dados do responsável logo abaixo.'
              : 'Informe a data conforme documento oficial.'}
          </p>
          <p className="campo__erro" id="erro-nascimento">Informe uma data de nascimento válida.</p>
        </div>

        <div className="campo" data-invalido={invalido('telefone')}>
          <label className="campo__rot" htmlFor="telefone">
            Seu WhatsApp
          </label>
          <input
            className="entrada"
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(63) 99999-9999"
            maxLength={16}
            value={dados.telefone}
            onChange={(e) => muda('telefone', mascaraTelefone(e.target.value))}
            aria-invalid={invalido('telefone')}
            aria-describedby={descreve('telefone')}
            required
          />
          <p className="campo__erro" id="erro-telefone">Informe um número de WhatsApp válido com DDD.</p>
        </div>

        <div className="campo-duplo">
          <div className="campo" data-invalido={invalido('cidade')}>
            <label className="campo__rot" htmlFor="cidade">
              Cidade
            </label>
            <input
              className="entrada"
              id="cidade"
              name="cidade"
              type="text"
              autoComplete="address-level2"
              autoCapitalize="words"
              value={dados.cidade}
              onChange={(e) => muda('cidade', e.target.value)}
              aria-invalid={invalido('cidade')}
              aria-describedby={descreve('cidade')}
              required
            />
            <p className="campo__erro" id="erro-cidade">Informe sua cidade.</p>
          </div>

          <div className="campo">
            <label className="campo__rot" htmlFor="igreja">
              Igreja <em>(opcional)</em>
            </label>
            <input
              className="entrada"
              id="igreja"
              name="igreja"
              type="text"
              autoCapitalize="words"
              placeholder="Onde congrega (se congrega)"
              value={dados.igreja}
              onChange={(e) => muda('igreja', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Bloco condicional elegante para responsável legal */}
      <div className={`tutela-card ${menor ? 'tutela-card--visivel' : ''}`} hidden={!menor}>
        <div className="tutela-card__header">
          <span className="tutela-card__icone" aria-hidden="true">🛡️</span>
          <div>
            <p className="tutela__t">Responsável Legal (Menor de 18 anos)</p>
            <p className="tutela-card__sub">
              Por determinação legal, a inscrição de menores requer autorização e contato de um responsável.
            </p>
          </div>
        </div>

        <div className="campo" data-invalido={invalido('respNome')}>
          <label className="campo__rot" htmlFor="resp-nome">
            Nome do responsável
          </label>
          <input
            className="entrada"
            id="resp-nome"
            name="resp-nome"
            type="text"
            autoCapitalize="words"
            placeholder="Pai, mãe ou responsável legal"
            value={dados.respNome}
            onChange={(e) => muda('respNome', e.target.value)}
            aria-invalid={invalido('respNome')}
            aria-describedby={descreve('respNome')}
            required={menor}
          />
          <p className="campo__erro" id="erro-resp-nome">Informe o nome completo do responsável legal.</p>
        </div>

        <div className="campo" data-invalido={invalido('respTelefone')}>
          <label className="campo__rot" htmlFor="resp-telefone">
            WhatsApp do responsável
          </label>
          <input
            className="entrada"
            id="resp-telefone"
            name="resp-telefone"
            type="tel"
            inputMode="numeric"
            placeholder="(63) 99999-9999"
            maxLength={16}
            value={dados.respTelefone}
            onChange={(e) => muda('respTelefone', mascaraTelefone(e.target.value))}
            aria-invalid={invalido('respTelefone')}
            aria-describedby={descreve('respTelefone')}
            required={menor}
          />
          <p className="campo__erro" id="erro-resp-telefone">Informe o WhatsApp do responsável com DDD.</p>
        </div>

        <div className="campo" data-invalido={invalido('respAutoriza')}>
          <label className="marca-caixa">
            <input
              type="checkbox"
              id="resp-autoriza"
              checked={dados.respAutoriza}
              onChange={(e) => muda('respAutoriza', e.target.checked)}
              aria-invalid={invalido('respAutoriza')}
              aria-describedby={descreve('respAutoriza')}
            />
            <span>
              <strong>Autorização confirmada.</strong> Declaro que o responsável legal autorizou a participação na Conferência Waves 2026 e o envio destes dados para a organização.
            </span>
          </label>
          <p className="campo__erro" id="erro-resp-autoriza">
            A autorização do responsável legal é obrigatória para menores de 18 anos.
          </p>
        </div>
      </div>

      <div className="forma__grupo">
        <h3 className="forma__subtitulo">2. Termos e autorizações</h3>

        <div className="campo" data-invalido={invalido('privacidade')}>
          <label className="marca-caixa">
            <input
              type="checkbox"
              id="privacidade"
              checked={dados.privacidade}
              onChange={(e) => muda('privacidade', e.target.checked)}
              aria-invalid={invalido('privacidade')}
              aria-describedby={descreve('privacidade')}
              required
            />
            <span>
              <strong>Concordo com o uso dos meus dados</strong> exclusivamente para a organização da Conferência Waves 2026, conforme a <a href="/privacidade" target="_blank">Política de Privacidade</a>.
            </span>
          </label>
          <p className="campo__erro" id="erro-privacidade">É necessário aceitar os termos de privacidade para continuar.</p>
        </div>

        <div className="campo">
          <label className="marca-caixa">
            <input
              type="checkbox"
              id="imagem"
              checked={dados.imagem}
              onChange={(e) => muda('imagem', e.target.checked)}
            />
            <span>
              Autorizo o uso da minha imagem em fotos e vídeos da conferência para publicações da MANT Paraíso. <em>(Opcional — sua vaga é garantida com ou sem esta marcação)</em>.
            </span>
          </label>
        </div>
      </div>

      <div className="forma__envio">
        <button type="submit" className="botao botao--largo botao--envio">
          <span>Enviar Inscrição pelo WhatsApp</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
          </svg>
        </button>

        <p className="campo__dica" style={{ textAlign: 'center' }}>
          🔒 Seus dados não ficam gravados em servidor — eles são transmitidos diretamente do seu dispositivo para o WhatsApp oficial da organização.
        </p>
      </div>
    </form>
  );
}
