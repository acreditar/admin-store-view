import { useState } from "react";
import { Eye, Search, ChevronDown, ChevronUp } from "lucide-react";

type Venda = {
  id: string;
  cliente: string;
  produto: string;
  valor: number;
  lucro: number;
  status: "COMPLETED" | "PENDING" | "FAILED" | "REFUNDED";
  pagamento: "APPROVED" | "EXPIRED" | "REJECTED" | "REFUNDED";
  data: string;
};

const VENDAS: Venda[] = [
  { id: "V-001", cliente: "João Silva", produto: "Conta Premium LZT", valor: 25.0, lucro: 12.5, status: "COMPLETED", pagamento: "APPROVED", data: "2026-02-25" },
  { id: "V-002", cliente: "Maria Santos", produto: "Conta Gold Steam", valor: 18.9, lucro: 8.4, status: "COMPLETED", pagamento: "APPROVED", data: "2026-02-25" },
  { id: "V-003", cliente: "Pedro Costa", produto: "Licença Office 365", valor: 35.0, lucro: 15.0, status: "PENDING", pagamento: "EXPIRED", data: "2026-02-24" },
  { id: "V-004", cliente: "Ana Oliveira", produto: "Conta Premium LZT", valor: 25.0, lucro: 12.5, status: "COMPLETED", pagamento: "APPROVED", data: "2026-02-24" },
  { id: "V-005", cliente: "Lucas Lima", produto: "VPN 1 Ano", valor: 12.0, lucro: 5.0, status: "FAILED", pagamento: "REJECTED", data: "2026-02-23" },
  { id: "V-006", cliente: "Carla Mendes", produto: "Conta Gold Steam", valor: 18.9, lucro: 8.4, status: "COMPLETED", pagamento: "APPROVED", data: "2026-02-23" },
  { id: "V-007", cliente: "João Silva", produto: "VPN 1 Ano", valor: 12.0, lucro: 5.0, status: "COMPLETED", pagamento: "APPROVED", data: "2026-02-22" },
  { id: "V-008", cliente: "Fernanda Dias", produto: "Spotify Premium", valor: 8.5, lucro: 3.5, status: "PENDING", pagamento: "EXPIRED", data: "2026-02-22" },
  { id: "V-009", cliente: "Roberto Alves", produto: "Netflix 1 Mês", valor: 15.0, lucro: 6.0, status: "COMPLETED", pagamento: "APPROVED", data: "2026-02-21" },
  { id: "V-010", cliente: "Maria Santos", produto: "Conta Premium LZT", valor: 25.0, lucro: 12.5, status: "COMPLETED", pagamento: "APPROVED", data: "2026-02-20" },
];

const statusColor: Record<string, string> = {
  COMPLETED: "text-success bg-success/10",
  PENDING: "text-info bg-info/10",
  FAILED: "text-destructive bg-destructive/10",
  REFUNDED: "text-warning bg-warning/10",
};

const pagColor: Record<string, string> = {
  APPROVED: "text-success",
  EXPIRED: "text-destructive",
  REJECTED: "text-destructive",
  REFUNDED: "text-warning",
};

const Vendas = () => {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("ALL");
  const [sort, setSort] = useState<{ key: keyof Venda; asc: boolean }>({ key: "data", asc: false });
  const [detalhes, setDetalhes] = useState<string | null>(null);

  const filtered = VENDAS
    .filter((v) => {
      if (filtroStatus !== "ALL" && v.status !== filtroStatus) return false;
      if (busca && !v.cliente.toLowerCase().includes(busca.toLowerCase()) && !v.produto.toLowerCase().includes(busca.toLowerCase()) && !v.id.toLowerCase().includes(busca.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const va = a[sort.key], vb = b[sort.key];
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sort.asc ? cmp : -cmp;
    });

  const SortBtn = ({ col, children }: { col: keyof Venda; children: React.ReactNode }) => (
    <button className="flex items-center gap-1 hover:text-foreground" onClick={() => setSort({ key: col, asc: sort.key === col ? !sort.asc : true })}>
      {children}
      {sort.key === col && (sort.asc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
    </button>
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vendas</h1>
          <p className="text-sm text-muted-foreground">Histórico completo de transações</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar..."
              className="border rounded-lg pl-9 pr-3 py-2 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 outline-none w-48"
            />
          </div>
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none">
            <option value="ALL">Todos</option>
            <option value="COMPLETED">Concluído</option>
            <option value="PENDING">Pendente</option>
            <option value="FAILED">Falhou</option>
          </select>
        </div>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground text-left">
                <th className="px-4 py-3 font-medium"><SortBtn col="id">ID</SortBtn></th>
                <th className="px-4 py-3 font-medium"><SortBtn col="cliente">Cliente</SortBtn></th>
                <th className="px-4 py-3 font-medium hidden md:table-cell"><SortBtn col="produto">Produto</SortBtn></th>
                <th className="px-4 py-3 font-medium"><SortBtn col="valor">Valor</SortBtn></th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell"><SortBtn col="lucro">Lucro</SortBtn></th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell"><SortBtn col="data">Data</SortBtn></th>
                <th className="px-4 py-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <>
                  <tr key={v.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{v.id}</td>
                    <td className="px-4 py-3 font-medium">{v.cliente}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{v.produto}</td>
                    <td className="px-4 py-3 font-semibold">R$ {v.valor.toFixed(2)}</td>
                    <td className="px-4 py-3 hidden lg:table-cell text-success">R$ {v.lucro.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-md ${statusColor[v.status]}`}>{v.status}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{v.data}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setDetalhes(detalhes === v.id ? null : v.id)} className="text-muted-foreground hover:text-foreground">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                  {detalhes === v.id && (
                    <tr key={`${v.id}-det`} className="bg-muted/20">
                      <td colSpan={8} className="px-4 py-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div><span className="text-muted-foreground">Produto:</span> <span className="font-medium">{v.produto}</span></div>
                          <div><span className="text-muted-foreground">Pagamento:</span> <span className={`font-medium ${pagColor[v.pagamento]}`}>{v.pagamento}</span></div>
                          <div><span className="text-muted-foreground">Lucro:</span> <span className="font-medium text-success">R$ {v.lucro.toFixed(2)}</span></div>
                          <div><span className="text-muted-foreground">Data:</span> <span className="font-medium">{v.data}</span></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t text-xs text-muted-foreground flex justify-between">
          <span>{filtered.length} de {VENDAS.length} vendas</span>
          <span>Total: R$ {filtered.reduce((s, v) => s + v.valor, 0).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default Vendas;
