import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const vendasDiarias = [
  { dia: "19/02", vendas: 2, lucro: 18 },
  { dia: "20/02", vendas: 1, lucro: 12.5 },
  { dia: "21/02", vendas: 1, lucro: 6 },
  { dia: "22/02", vendas: 2, lucro: 13.4 },
  { dia: "23/02", vendas: 2, lucro: 13.4 },
  { dia: "24/02", vendas: 2, lucro: 27.5 },
  { dia: "25/02", vendas: 2, lucro: 20.9 },
];

const statusData = [
  { name: "COMPLETED", value: 8, color: "hsl(142, 71%, 45%)" },
  { name: "PENDING", value: 7, color: "hsl(217, 91%, 60%)" },
  { name: "FAILED", value: 1, color: "hsl(0, 72%, 51%)" },
];

const topProdutos = [
  { produto: "Conta Premium LZT", qtd: 4, receita: 100 },
  { produto: "Conta Gold Steam", qtd: 2, receita: 37.8 },
  { produto: "VPN 1 Ano", qtd: 2, receita: 24 },
  { produto: "Netflix 1 Mês", qtd: 1, receita: 15 },
  { produto: "Spotify Premium", qtd: 1, receita: 8.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-popover border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name === "lucro" ? `Lucro: R$ ${p.value}` : `Vendas: ${p.value}`}</p>
      ))}
    </div>
  );
};

const Relatorios = () => (
  <>
    <div className="mb-6">
      <h1 className="text-2xl font-bold">Relatórios</h1>
      <p className="text-sm text-muted-foreground">Análise de desempenho dos últimos 7 dias</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-card rounded-xl border p-6">
        <h2 className="text-sm font-semibold mb-4">Vendas por Dia</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={vendasDiarias}>
            <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "hsl(0 0% 55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(0 0% 55%)" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="vendas" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-xl border p-6">
        <h2 className="text-sm font-semibold mb-4">Distribuição de Status</h2>
        <div className="flex items-center justify-center gap-8">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie data={statusData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3}>
                {statusData.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-muted-foreground">{s.name}</span>
                <span className="font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="bg-card rounded-xl border p-6">
      <h2 className="text-sm font-semibold mb-4">Top Produtos</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground text-left">
              <th className="px-4 py-3 font-medium">Produto</th>
              <th className="px-4 py-3 font-medium text-center">Qtd</th>
              <th className="px-4 py-3 font-medium text-right">Receita</th>
            </tr>
          </thead>
          <tbody>
            {topProdutos.map((p, i) => (
              <tr key={p.produto} className="border-b border-border/50">
                <td className="px-4 py-3 font-medium">
                  <span className="text-muted-foreground mr-2">#{i + 1}</span>
                  {p.produto}
                </td>
                <td className="px-4 py-3 text-center">{p.qtd}</td>
                <td className="px-4 py-3 text-right font-semibold">R$ {p.receita.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

export default Relatorios;
