import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { Geist } from "next/font/google";
import { WorkspaceShell } from "@/components/workspace-shell";
import { DataLoadingState } from "@/components/data-loading-state";
import { TooltipProvider } from "@/components/ui/tooltip";
import { operationalDataService } from "@server/container";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MESA — Inteligência operacional",
  description: "Transforme dados da operação do seu restaurante em decisões melhores.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.variable} data-scroll-behavior="smooth">
      <head><meta name="color-scheme" content="light" /></head>
      <body>
        <TooltipProvider>
          <Suspense fallback={<DataLoadingState />}>
            <WorkspaceContent>{children}</WorkspaceContent>
          </Suspense>
        </TooltipProvider>
      </body>
    </html>
  );
}

async function WorkspaceContent({ children }: { children: React.ReactNode }) {
  await connection();
  const [restaurants, restaurant] = await Promise.all([
    operationalDataService.getRestaurants(),
    operationalDataService.getSelectedRestaurant(),
  ]);
  return <WorkspaceShell initialRestaurant={restaurant} restaurants={restaurants}>{children}</WorkspaceShell>;
}
