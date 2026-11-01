"use client";

import { createContext, useContext } from "react";
import type { MenuReadModel } from "@server/application/read-models";

const MenuDataContext = createContext<MenuReadModel | null>(null);

export function MenuDataProvider({ children, value }: { children: React.ReactNode; value: MenuReadModel }) {
  return <MenuDataContext.Provider value={value}>{children}</MenuDataContext.Provider>;
}

export function useMenuData() {
  const value = useContext(MenuDataContext);
  if (!value) throw new Error("MenuDataProvider ausente.");
  return value;
}
