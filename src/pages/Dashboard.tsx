import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { useState } from "react";

const StatCard = ({ label, value, desc, trend, trendUp }: { label: string; value: string; desc: string; trend: string; trendUp: boolean }) => (
  <div className="bg-card rounded-xl border p-5">
    <div className="flex justify-between items-start">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <span className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
        {trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {trend}
      </span>
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{desc}</p>
  </div>
);

const ProgressRow = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="text-sm w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-sm font-semibold w-16 text-right">{value} <span className="text-muted-foreground font-normal">({pct}%)</span></span>
    </div>
  );
};

const MOCK = {
  stats: [
    { label: "Vendas Concluídas", value: "8", desc: "Vendas fechadas no período", trend: "+12%", trendUp: true },
    { label: "Lucro Total", value: "R$ 72,30", desc: "Lucro total no período", trend: "+5%", trendUp: true },
    { label: "Clientes Únicos", value: "3", desc: "Compradores distintos", trend: "-2%", trendUp: false },
    { label: "Fila de Processamento", value: "0", desc: "Aguardando processamento", trend: "0%", trendUp: true },
  ],
  pagamentos: [
    { label: "APPROVED", value: 17, color: "hsl(142, 71%, 45%)" },
    { label: "EXPIRED", value: 11, color: "hsl(0, 72%, 51%)" },
  ],
  vendas: [
    { label: "COMPLETED", value: 8, color: "hsl(142, 71%, 45%)" },
    { label: "PENDING", value: 7, color: "hsl(217, 91%, 60%)" },
    { label: "FAILED", value: 1, color: "hsl(0, 72%, 51%)" },
  ],
  codigos: [
    { code: "PAYMENT_EXPIRED", count: 11, severity: "high" },
    { code: "SUCCESS", count: 8, severity: "low" },
    { code: "MANUAL_DELIVERY_PENDING", count: 7, severity: "medium" },
    { code: "LZT_BALANCE_LOW", count: 1, severity: "medium" },
    { code: "LZT_FORBIDDEN", count: 1, severity: "high" },
  ],
};

const severityColor: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-success/10 text-success",
};

const periodos = ["Últimos 7 dias", "Últimos 30 dias", "Últimos 90 dias"];

const Dashboard = () => {
  const [periodo, setPeriodo] = useState(periodos[0]);
  const totalPag = MOCK.pagamentos.reduce((s, p) => s + p.value, 0);
  const totalVendas = MOCK.vendas.reduce((s, v) => s + v.value, 0);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Visão geral das métricas operacionais</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            {periodos.map((p) => <option key={p}>{p}</option>)}
          </select>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-card border rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Online
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {MOCK.stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-sm font-semibold mb-4">Pagamentos</h2>
          {MOCK.pagamentos.map((p) => <ProgressRow key={p.label} {...p} max={totalPag} />)}
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">Total: {totalPag} transações</div>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-sm font-semibold mb-4">Status de Vendas</h2>
          {MOCK.vendas.map((v) => <ProgressRow key={v.label} {...v} max={totalVendas} />)}
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">Total: {totalVendas} vendas</div>
        </div>
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-muted-foreground" />
            <h2 className="text-sm font-semibold">Códigos de Status</h2>
          </div>
          <div className="space-y-2.5">
            {MOCK.codigos.map((c) => (
              <div key={c.code} className="flex items-center justify-between">
                <span className={`text-xs font-medium rounded-md px-2 py-1 ${severityColor[c.severity]}`}>{c.code}</span>
                <span className="text-sm font-bold">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
