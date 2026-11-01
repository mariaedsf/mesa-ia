"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { navigation } from "@/features/dashboard/data";
import type { Restaurant } from "@server/domain/operational-records";
import { selectRestaurantAction } from "@server/actions";
import { Icon, type IconName } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const RestaurantContext = createContext("Nenhum restaurante selecionado");
export function useRestaurantName() { return useContext(RestaurantContext); }

export function MesaMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`mesa-mark${small ? " mesa-mark-small" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <b />
    </span>
  );
}

export function WorkspaceShell({ children, initialRestaurant, restaurants }: { children: React.ReactNode; initialRestaurant: Restaurant | null; restaurants: Restaurant[] }) {
  const pathname = usePathname();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(initialRestaurant?.id ?? null);
  const selectedRestaurant = restaurants.find((item) => item.id === selectedRestaurantId)
    ?? (selectedRestaurantId === null ? initialRestaurant : null);
  const restaurant = selectedRestaurant?.name ?? "Cadastre um restaurante";
  const [restaurantMenu, setRestaurantMenu] = useState(false);
  const [mobileRestaurantMenu, setMobileRestaurantMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [integrationOpen, setIntegrationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    function closeMobileMenu(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenu(false);
    }
    window.addEventListener("keydown", closeMobileMenu);
    return () => window.removeEventListener("keydown", closeMobileMenu);
  }, []);

  async function chooseRestaurant(id: string) {
    const nextRestaurant = restaurants.find((item) => item.id === id);
    if (!nextRestaurant) return;
    setSelectedRestaurantId(nextRestaurant.id);
    setRestaurantMenu(false);
    setMobileRestaurantMenu(false);
    await selectRestaurantAction(id);
  }

  return (
    <RestaurantContext.Provider value={restaurant}>
      <div className={`workspace${sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
        <aside id="workspace-sidebar" className="sidebar">
          <Link href="/" className="brand" aria-label="MESA, início">
            <MesaMark />
            <span>MESA</span>
          </Link>

          <Popover open={restaurantMenu} onOpenChange={setRestaurantMenu}>
            <div className="restaurant-switch-wrap">
              <PopoverTrigger
                render={<Button className="restaurant-switch" variant="outline" aria-label={`Restaurante: ${restaurant}`} />}
              >
                <span className="restaurant-thumb"><span /></span>
                <span className="restaurant-name">{restaurant}</span>
                <Icon name="chevron-down" size={18} />
              </PopoverTrigger>
              <PopoverContent align="start" sideOffset={8} className="popover restaurant-menu">
                <span className="popover-eyebrow">Seu espaço de trabalho</span>
                {restaurants.map(({ id, name }) => (
                  <Button
                    key={id}
                    className={`restaurant-option${selectedRestaurant?.id === id ? " selected" : ""}`}
                    variant="ghost"
                    onClick={() => chooseRestaurant(id)}
                  >
                    <span className="restaurant-option-dot" />
                    {name}
                    {selectedRestaurant?.id === id && <Icon name="check" size={15} />}
                  </Button>
                ))}
                {restaurants.length === 0 && <span className="popover-note">Cadastre seu primeiro restaurante na área Dados.</span>}
                <Link className="restaurant-option" href="/dados" onClick={() => setRestaurantMenu(false)}><Icon name="plus" size={16} /> Gerenciar restaurantes</Link>
              </PopoverContent>
            </div>
          </Popover>

          <nav className="sidebar-nav" aria-label="Navegação principal">
            <span className="nav-caption">Workspace</span>
            {navigation.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link${active ? " active" : ""}`}
                  aria-current={active ? "page" : undefined}
                  aria-label={sidebarCollapsed ? item.label : undefined}
                  title={item.label}
                >
                  <Icon name={item.icon as IconName} size={19} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-bottom">
            <Button className="profile-link" variant="ghost" onClick={() => setProfileOpen(true)}>
              <span className="avatar avatar-small">{selectedRestaurant?.name.slice(0, 1) ?? "R"}</span>
              <span className="profile-copy"><strong>{selectedRestaurant?.name ?? "Espaço de trabalho"}</strong><small>Dados do restaurante</small></span>
              <Icon name="more" size={18} />
            </Button>
          </div>
        </aside>

        <button
          type="button"
          className="sidebar-toggle-button"
          aria-label={sidebarCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
          aria-expanded={!sidebarCollapsed}
          aria-controls="workspace-sidebar"
          title={sidebarCollapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
          onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}
        >
          {sidebarCollapsed
            ? <ChevronRight size={20} strokeWidth={2.25} aria-hidden="true" />
            : <ChevronLeft size={20} strokeWidth={2.25} aria-hidden="true" />}
        </button>

        <div className="mobile-topbar">
          <Link href="/" className="brand" aria-label="MESA, início">
            <MesaMark small />
            <span>MESA</span>
          </Link>
          <Popover open={mobileRestaurantMenu} onOpenChange={setMobileRestaurantMenu}>
            <PopoverTrigger
              render={<Button className="mobile-restaurant" variant="ghost" aria-label={`Restaurante: ${restaurant}`} />}
            >
              {restaurant} <Icon name="chevron-down" size={16} />
            </PopoverTrigger>
            <PopoverContent align="center" sideOffset={8} className="popover mobile-restaurant-menu">
              {restaurants.map(({ id, name }) => (
                <Button
                  key={id}
                  className={`restaurant-option${selectedRestaurant?.id === id ? " selected" : ""}`}
                  variant="ghost"
                  onClick={() => chooseRestaurant(id)}
                >
                  {name}{selectedRestaurant?.id === id && <Icon name="check" size={15} />}
                </Button>
              ))}
              <Link className="restaurant-option" href="/dados" onClick={() => setMobileRestaurantMenu(false)}>Cadastrar restaurante</Link>
            </PopoverContent>
          </Popover>
          <Button
            className="icon-button mobile-menu-button"
            variant="ghost"
            size="icon"
            aria-label={mobileMenu ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={mobileMenu}
            onClick={() => setMobileMenu((open) => !open)}
          >
            <Icon name={mobileMenu ? "close" : "menu"} />
          </Button>
        </div>

        {mobileMenu && (
          <nav className="mobile-menu-panel" aria-label="Navegação mobile">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileMenu(false)} className={pathname === item.href ? "active" : ""}>
                <Icon name={item.icon as IconName} size={18} />{item.label}
              </Link>
            ))}
            <Link href="/dados" onClick={() => setMobileMenu(false)}><Icon name="layers" size={18} /> Gerenciar dados</Link>
          </nav>
        )}

        <main className="workspace-main">{children}</main>

        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="dialog-card" overlayClassName="modal-backdrop" showCloseButton={false}>
            <DialogClose render={<Button className="dialog-close icon-button" variant="ghost" size="icon" aria-label="Fechar" />}>
              <Icon name="close" />
            </DialogClose>
            <span className="avatar profile-modal-avatar">{selectedRestaurant?.name.slice(0, 1) ?? "R"}</span>
            <p className="eyebrow">Espaço de trabalho</p>
            <DialogTitle id="profile-title">{selectedRestaurant?.name ?? "Nenhum restaurante cadastrado"}</DialogTitle>
            <DialogDescription className="dialog-copy">Gerencie restaurantes e dados operacionais na área Dados.</DialogDescription>
            <Button className="button button-secondary dialog-action" onClick={() => setProfileOpen(false)}>Fechar</Button>
          </DialogContent>
        </Dialog>

        <Dialog open={integrationOpen} onOpenChange={setIntegrationOpen}>
          <DialogContent className="dialog-card" overlayClassName="modal-backdrop" showCloseButton={false}>
            <DialogClose render={<Button className="dialog-close icon-button" variant="ghost" size="icon" aria-label="Fechar" />}>
              <Icon name="close" />
            </DialogClose>
            <span className="dialog-mark"><Icon name="layers" size={21} /></span>
            <p className="eyebrow">Integrações</p>
            <DialogTitle id="integration-title">Seus dados, em um só lugar.</DialogTitle>
            <DialogDescription className="dialog-copy">Cadastre pedidos, itens do cardápio e avaliações para alimentar os indicadores do MESA.</DialogDescription>
            <div className="integration-list">
              <span><i className="integration-dot orange" /> Pedidos e vendas <small>Cadastro manual</small></span>
              <span><i className="integration-dot green" /> Avaliações de clientes <small>Cadastro manual</small></span>
              <span><i className="integration-dot slate" /> Cardápio e custos <small>Cadastro manual</small></span>
            </div>
            <Link className="button button-primary dialog-action" href="/dados" onClick={() => setIntegrationOpen(false)}>Gerenciar dados</Link>
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantContext.Provider>
  );
}
