import { useState } from "react";
import { Search, User } from "lucide-react";

type Cliente = {
  id: string;
  nome: string;
  email: string;
  totalCompras: number;
  totalGasto: number;
  ultimaCompra: string;
  status: "ativo" | "inativo";
};

const CLIENTES: Cliente[] = [
  { id: "C-001", nome: "João Silva", email: "joao@email.com", totalCompras: 5, totalGasto: 125.0, ultimaCompra: "2026-02-25", status: "ativo" },
  { id: "C-002", nome: "Maria Santos", email: "maria@email.com", totalCompras: 3, totalGasto: 68.9, ultimaCompra: "2026-02-20", status: "ativo" },
  { id: "C-003", nome: "Pedro Costa", email: "pedro@email.com", totalCompras: 1, totalGasto: 35.0, ultimaCompra: "2026-02-24", status: "inativo" },
  { id: "C-004", nome: "Ana Oliveira", email: "ana@email.com", totalCompras: 2, totalGasto: 50.0, ultimaCompra: "2026-02-24", status: "ativo" },
  { id: "C-005", nome: "Lucas Lima", email: "lucas@email.com", totalCompras: 1, totalGasto: 12.0, ultimaCompra: "2026-02-23", status: "inativo" },
  { id: "C-006", nome: "Carla Mendes", email: "carla@email.com", totalCompras: 2, totalGasto: 37.8, ultimaCompra: "2026-02-23", status: "ativo" },
  { id: "C-007", nome: "Fernanda Dias", email: "fernanda@email.com", totalCompras: 1, totalGasto: 8.5, ultimaCompra: "2026-02-22", status: "inativo" },
  { id: "C-008", nome: "Roberto Alves", email: "roberto@email.com", totalCompras: 2, totalGasto: 30.0, ultimaCompra: "2026-02-21", status: "ativo" },
];

const Clientes = () => {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<string>("ALL");

  const filtered = CLIENTES.filter((c) => {
    if (filtro !== "ALL" && c.status !== filtro) return false;
    if (busca && !c.nome.toLowerCase().includes(busca.toLowerCase()) && !c.email.toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">{CLIENTES.length} clientes cadastrados</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar cliente..." className="border rounded-lg pl-9 pr-3 py-2 text-sm bg-card text-foreground focus:ring-2 focus:ring-primary/20 outline-none w-48" />
          </div>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-card text-foreground outline-none">
            <option value="ALL">Todos</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="bg-card rounded-xl border p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <User size={18} className="text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{c.nome}</h3>
                <p className="text-xs text-muted-foreground truncate">{c.email}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ml-auto shrink-0 ${c.status === "ativo" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {c.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-lg font-bold">{c.totalCompras}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Compras</p>
              </div>
              <div>
                <p className="text-lg font-bold">R$ {c.totalGasto.toFixed(0)}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Gasto</p>
              </div>
              <div>
                <p className="text-xs font-medium mt-1">{c.ultimaCompra.slice(5)}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Última</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Clientes;
