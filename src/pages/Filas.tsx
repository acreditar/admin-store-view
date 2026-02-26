import { useState } from "react";
import { Trash2, RefreshCw, Eye, CheckCircle2 } from "lucide-react";

type FilaItem = {
  id: string;
  tipo: "pagamento" | "venda";
  status: string;
  cliente: string;
  valor: number;
  data: string;
  idade: number;
};

const MOCK_FILA: FilaItem[] = [
  { id: "F-001", tipo: "pagamento", status: "EXPIRED", cliente: "Pedro Costa", valor: 35.0, data: "2026-01-15", idade: 42 },
  { id: "F-002", tipo: "pagamento", status: "EXPIRED", cliente: "Lucas Lima", valor: 12.0, data: "2026-01-18", idade: 39 },
  { id: "F-003", tipo: "venda", status: "PENDING", cliente: "Fernanda Dias", valor: 8.5, data: "2026-01-20", idade: 37 },
  { id: "F-004", tipo: "pagamento", status: "REJECTED", cliente: "Anônimo", valor: 25.0, data: "2026-01-22", idade: 35 },
  { id: "F-005", tipo: "venda", status: "FAILED", cliente: "Lucas Lima", valor: 12.0, data: "2026-01-23", idade: 34 },
  { id: "F-006", tipo: "pagamento", status: "EXPIRED", cliente: "Anônimo", valor: 18.9, data: "2026-01-25", idade: 32 },
  { id: "F-007", tipo: "venda", status: "PENDING", cliente: "Anônimo", valor: 15.0, data: "2026-01-26", idade: 31 },
];

const Filas = () => {
  const [idadeMin, setIdadeMin] = useState(30);
  const [limite, setLimite] = useState(100);
  const [previa, setPrevia] = useState<FilaItem[] | null>(null);
  const [limpando, setLimpando] = useState(false);
  const [limpo, setLimpo] = useState(false);

  const filtered = MOCK_FILA.filter((f) => f.idade >= idadeMin).slice(0, limite);

  const rodarPrevia = () => setPrevia(filtered);

  const executarLimpeza = () => {
    setLimpando(true);
    setTimeout(() => {
      setLimpando(false);
      setLimpo(true);
      setPrevia(null);
      setTimeout(() => setLimpo(false), 3000);
    }, 1500);
  };

  const tipoColor = { pagamento: "text-warning bg-warning/10", venda: "text-info bg-info/10" };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Filas</h1>
          <p className="text-sm text-muted-foreground">Configure e execute a limpeza de registros antigos</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 rounded-full px-3 py-1 self-start">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          {MOCK_FILA.length} registros na fila
        </span>
      </div>

      {/* Config */}
      <div className="bg-card rounded-xl border p-6 mb-6">
        <h2 className="text-sm font-semibold mb-4">Configuração de Limpeza</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Idade Mínima (Dias)</label>
            <input type="number" value={idadeMin} onChange={(e) => setIdadeMin(+e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm bg-secondary text-foreground focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Limite da Prévia</label>
            <input type="number" value={limite} onChange={(e) => setLimite(+e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm bg-secondary text-foreground focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status de Pagamento</label>
            <div className="w-full border rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground truncate">EXPIRED, REJECTED, REFUNDED</div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status de Venda</label>
            <div className="w-full border rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground truncate">PENDING, FAILED, REFUNDED</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={rodarPrevia} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            <Eye size={16} />
            Rodar Prévia
          </button>
          <button onClick={() => setPrevia(null)} className="flex items-center gap-2 border border-border px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            <RefreshCw size={16} />
            Atualizar Filas
          </button>
        </div>
      </div>

      {/* Sucesso */}
      {limpo && (
        <div className="bg-success/10 border border-success/30 rounded-xl p-4 mb-6 flex items-center gap-3 text-success text-sm">
          <CheckCircle2 size={18} />
          Limpeza executada com sucesso!
        </div>
      )}

      {/* Prévia */}
      {previa && (
        <div className="bg-card rounded-xl border overflow-hidden mb-6">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Prévia de Limpeza</h2>
              <p className="text-xs text-muted-foreground">{previa.length} registros serão removidos</p>
            </div>
            <button onClick={executarLimpeza} disabled={limpando} className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
              <Trash2 size={14} />
              {limpando ? "Limpando..." : "Executar Limpeza"}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground text-left">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Cliente</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Valor</th>
                  <th className="px-4 py-3 font-medium">Idade</th>
                </tr>
              </thead>
              <tbody>
                {previa.map((f) => (
                  <tr key={f.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{f.id}</td>
                    <td className="px-4 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-md ${tipoColor[f.tipo]}`}>{f.tipo}</span></td>
                    <td className="px-4 py-3 text-xs font-medium text-destructive">{f.status}</td>
                    <td className="px-4 py-3 hidden md:table-cell">{f.cliente}</td>
                    <td className="px-4 py-3 hidden md:table-cell">R$ {f.valor.toFixed(2)}</td>
                    <td className="px-4 py-3 font-semibold">{f.idade}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resumo */}
      {!previa && (
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-sm font-semibold mb-4">Registros na Fila</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold">{MOCK_FILA.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Total</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold">{MOCK_FILA.filter((f) => f.tipo === "pagamento").length}</p>
              <p className="text-xs text-muted-foreground mt-1">Pagamentos</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold">{MOCK_FILA.filter((f) => f.tipo === "venda").length}</p>
              <p className="text-xs text-muted-foreground mt-1">Vendas</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold">{filtered.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Elegíveis ({">"}={idadeMin}d)</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filas;
