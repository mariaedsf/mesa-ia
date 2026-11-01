"use client";

import { menuClassName } from "../../tailwind-styles";

import { type CSSProperties } from "react";

import { MenuItem } from "../menu.shared";

export function MenuItemThumbnail({ item }: { item: MenuItem }) {
  return <span className={menuClassName(`menu-dish-thumbnail ${item.tone}`)} style={{ backgroundPosition: item.position } as CSSProperties} aria-hidden="true" />;
}
