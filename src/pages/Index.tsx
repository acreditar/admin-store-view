import { useState } from "react";
import StatCard from "@/components/StatCard";
import StatusBar from "@/components/StatusBar";

const MOCK = {
  vendas: 8,
  lucro: "R$ 72,30",
  clientes: 3,
  fila: 0,
  pagamentos: [
    { label: "EXPIRED", count: 11, color: "#ef4444" },
    { label: "APPROVED", count: 17, color: "#22c55e" },
  ],
  vendasStatus: [
    { label: "PENDING", count: 7, color: "#3b82f6" },
    { label: "FAILED", count: 1, color: "#ef4444" },
    { label: "COMPLETED", count: 8, color: "#22c55e" },
  ],
  codigos: [
    { code: "PAYMENT_EXPIRED", count: 11 },
    { code: "SUCCESS", count: 8 },
    { code: "MANUAL_DELIVERY_PENDING", count: 7 },
    { code: "LZT_BALANCE_LOW", count: 1 },
    { code: "LZT_FORBIDDEN", count: 1 },
  ],
};

const periodos = ["Últimos 7 dias", "Últimos 30 dias", "Todos"];

const Index = () => {
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [idadeMin, setIdadeMin] = useState(30);
  const [limitePrevia, setLimitePrevia] = useState(100);
  const totalPag = MOCK.pagamentos.reduce((s, p) => s + p.count, 0);
  const totalVendas = MOCK.vendasStatus.reduce((s, v) => s + v.count, 0);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold">Painel do Proprietário SalesStore</h1>
            <p className="text-sm opacity-80 mt-1">Métricas operacionais, visibilidade das filas e limpeza manual segura de registros antigos.</p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-primary-foreground/20 rounded px-2 py-1">Proprietário: sales</span>
              <span className="text-xs bg-primary-foreground/20 rounded px-2 py-1">Timezone: America/Sao_Paulo</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-80">Gerado em 26/02/2026, 00:29</span>
            <button className="bg-primary-foreground text-primary px-4 py-1.5 rounded text-sm font-medium hover:opacity-90">Sair</button>
          </div>
        </div>
      </div>

      {/* Visão Geral */}
      <div className="bg-card rounded-lg border p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Visão Geral</h2>
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="border rounded px-3 py-1.5 text-sm bg-card"
          >
            {periodos.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Vendas Concluídas" value={MOCK.vendas} description="Vendas fechadas no período" />
          <StatCard label="Lucro" value={MOCK.lucro} description="Lucro total no período" />
          <StatCard label="Clientes Únicos" value={MOCK.clientes} description="Compradores distintos" />
          <StatCard label="Fila de Processamento" value={MOCK.fila} description="Aguardando processamento" />
        </div>
      </div>

      {/* Status + Códigos */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Distribuição de Status</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Pagamentos</h3>
              {MOCK.pagamentos.map((p) => (
                <StatusBar key={p.label} {...p} total={totalPag} />
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-3">Vendas</h3>
              {MOCK.vendasStatus.map((v) => (
                <StatusBar key={v.label} {...v} total={totalVendas} />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-4">Principais Códigos de Falha</h2>
          <div className="space-y-3">
            {MOCK.codigos.map((c) => (
              <div key={c.code} className="flex justify-between items-center">
                <span className="text-xs font-mono bg-muted rounded px-2 py-1">{c.code}</span>
                <span className="font-semibold">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gestão de Filas */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-lg font-semibold mb-4">Gestão de Filas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Idade Mínima (Dias)</label>
            <input type="number" value={idadeMin} onChange={(e) => setIdadeMin(+e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm bg-card" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Limite da Prévia</label>
            <input type="number" value={limitePrevia} onChange={(e) => setLimitePrevia(+e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm bg-card" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Status de Pagamento</label>
            <input readOnly value="EXPIRED, REJECTED, REFUNDED, CHARGEBACK" className="mt-1 w-full border rounded px-3 py-2 text-sm bg-muted text-muted-foreground" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground">Status de Venda</label>
            <input readOnly value="PENDING, FAILED, REFUNDED" className="mt-1 w-full border rounded px-3 py-2 text-sm bg-muted text-muted-foreground" />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="border-2 border-primary text-primary px-4 py-2 rounded text-sm font-medium hover:bg-accent">Atualizar Filas</button>
          <button className="border-2 border-destructive text-destructive px-4 py-2 rounded text-sm font-medium hover:bg-accent">Rodar Prévia de Limpeza</button>
        </div>
        <p className="mt-3 text-sm text-success font-medium">Filas carregadas.</p>
        <p className="text-xs text-muted-foreground mt-1">Corte: 27/01/2026, 00:29 | Pagamentos: 0 | Vendas: 0</p>
      </div>
    </div>
  );
};

export default Index;
