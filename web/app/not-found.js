import Link from 'next/link';
import Calma from '@/components/Calma';
import { Topo, Rodape } from '@/components/Moldura';

export const metadata = { title: 'Página não encontrada', robots: { index: false, follow: true } };

export default function NaoEncontrada() {
  return (
    <>
      {/* página curta: a coluna d'água fica parada, como nas de leitura */}
      <Calma />
      <Topo acao={false} />
      <main className="env" style={{ minHeight: '70svh', display: 'grid', placeItems: 'center', padding: 'var(--margem)' }}>
        <div className="pilha" style={{ textAlign: 'center', justifyItems: 'center' }}>
          <h1 className="display display--l">Essa onda passou</h1>
          <p className="prosa" style={{ maxWidth: '34ch' }}>
            A página que você procurou não existe. A conferência, sim.
          </p>
          <Link href="/" className="botao">Voltar para o início</Link>
        </div>
      </main>
      <Rodape />
    </>
  );
}
