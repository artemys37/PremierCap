import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CandidBoost IA",
    template: "%s · CandidBoost IA",
  },
  description:
    "Application web de recherche d'emploi et d'accompagnement aux candidatures, avec matching explicable et automatisation encadrée.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
