import { LayoutDashboard, ShoppingCart, Users, BarChart3, ListFilter, LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const NAV = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: ShoppingCart, label: "Vendas", to: "/vendas" },
  { icon: Users, label: "Clientes", to: "/clientes" },
  { icon: BarChart3, label: "Relatórios", to: "/relatorios" },
  { icon: ListFilter, label: "Filas", to: "/filas" },
];

const Layout = () => (
  <div className="flex min-h-screen">
    {/* Sidebar */}
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
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? "bg-sidebar-active text-primary-foreground font-medium" : "hover:bg-white/5"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-white/5 opacity-60 hover:opacity-100 transition-opacity">
        <LogOut size={18} />
        Sair
      </button>
    </aside>

    {/* Mobile Header */}
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-sidebar-bg text-primary-foreground p-4 flex items-center gap-4 z-50 overflow-x-auto">
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <ShoppingCart size={16} />
        </div>
      </div>
      {NAV.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `text-xs shrink-0 px-3 py-1.5 rounded-full transition-colors ${
              isActive ? "bg-primary text-primary-foreground" : "text-sidebar-fg hover:text-primary-foreground"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>

    {/* Main */}
    <main className="flex-1 lg:ml-64 p-6 lg:p-8 mt-16 lg:mt-0">
      <Outlet />
    </main>
  </div>
);

export default Layout;
