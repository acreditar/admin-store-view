import { LayoutDashboard, ShoppingCart, Users, Settings, LogOut, BarChart3, AlertTriangle, ListFilter, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ShoppingCart, label: "Vendas" },
  { icon: Users, label: "Clientes" },
  { icon: BarChart3, label: "Relatórios" },
  { icon: ListFilter, label: "Filas" },
  { icon: Settings, label: "Configurações" },
];

const Sidebar = () => (
  <aside className="hidden lg:flex flex-col w-64 bg-sidebar-bg text-sidebar-fg min-h-screen p-5 fixed left-0 top-0">
    <div className="flex items-center gap-3 mb-10">
      <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
        <ShoppingCart size={18} className="text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-sm font-bold text-primary-foreground">SalesStore</h1>
        <p className="text-xs opacity-60">Admin Panel</p>
      </div>
    </div>
    <nav className="flex-1 space-y-1">
      {NAV.map((item) => (
        <button
          key={item.label}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            item.active
              ? "bg-sidebar-active text-primary-foreground font-medium"
              : "hover:bg-white/5"
          }`}
        >
          <item.icon size={18} />
          {item.label}
        </button>
      ))}
    </nav>
    <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 opacity-60 hover:opacity-100 transition-opacity">
      <LogOut size={18} />
      Sair
    </button>
  </aside>
);

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

const Index = () => {
  const [periodo, setPeriodo] = useState(periodos[0]);
  const [idadeMin, setIdadeMin] = useState(30);
  const [limitePrevia, setLimitePrevia] = useState(100);
  const totalPag = MOCK.pagamentos.reduce((s, p) => s + p.value, 0);
  const totalVendas = MOCK.vendas.reduce((s, v) => s + v.value, 0);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-sidebar-bg text-primary-foreground p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <ShoppingCart size={16} />
          </div>
          <span className="font-bold text-sm">SalesStore</span>
        </div>
        <button className="text-sidebar-fg hover:text-primary-foreground">
          <LogOut size={18} />
        </button>
      </div>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8 mt-16 lg:mt-0">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Visão geral das métricas operacionais</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            >
              {periodos.map((p) => <option key={p}>{p}</option>)}
            </select>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-card border rounded-lg px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Online
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {MOCK.stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Pagamentos */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-sm font-semibold mb-4">Pagamentos</h2>
            {MOCK.pagamentos.map((p) => (
              <ProgressRow key={p.label} {...p} max={totalPag} />
            ))}
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">Total: {totalPag} transações</div>
          </div>

          {/* Vendas */}
          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-sm font-semibold mb-4">Status de Vendas</h2>
            {MOCK.vendas.map((v) => (
              <ProgressRow key={v.label} {...v} max={totalVendas} />
            ))}
            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">Total: {totalVendas} vendas</div>
          </div>

          {/* Códigos */}
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

        {/* Gestão de Filas */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold">Gestão de Filas</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Configure e execute a limpeza de registros antigos</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success" />
              Filas carregadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Idade Mínima (Dias)</label>
              <input
                type="number"
                value={idadeMin}
                onChange={(e) => setIdadeMin(+e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Limite da Prévia</label>
              <input
                type="number"
                value={limitePrevia}
                onChange={(e) => setLimitePrevia(+e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status de Pagamento</label>
              <div className="w-full border rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground truncate">
                EXPIRED, REJECTED, REFUNDED
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status de Venda</label>
              <div className="w-full border rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground truncate">
                PENDING, FAILED, REFUNDED
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Atualizar Filas
            </button>
            <button className="border-2 border-destructive text-destructive px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Rodar Prévia de Limpeza
            </button>
          </div>

          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
            Corte: 27/01/2026, 00:29 · Pagamentos: 0 · Vendas: 0
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
