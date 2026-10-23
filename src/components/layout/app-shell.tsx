"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { NAV_GROUPS, NAV_ITEMS } from "./nav-items";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>

      <div className="mx-auto flex min-h-screen w-full max-w-7xl">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
          <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-xl bg-emerald-700 text-sm font-bold text-white"
            >
              CB
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">CandidBoost IA</p>
              <p className="text-xs text-slate-500">Espace candidat</p>
            </div>
          </div>

          <nav aria-label="Navigation principale" className="flex-1 space-y-6 px-3 py-5">
            {NAV_GROUPS.map((group) => (
              <div key={group}>
                <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {group}
                </p>
                <ul className="space-y-1">
                  {NAV_ITEMS.filter((item) => item.group === group).map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={[
                            "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                            active
                              ? "bg-emerald-50 font-semibold text-emerald-800"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                          ].join(" ")}
                        >
                          {item.label}
                          {active ? (
                            <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-600" />
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-sm font-medium">Camille Martin</p>
              <p className="text-xs text-slate-500">Développeuse web · Lyon</p>
              <p className="mt-2 inline-flex rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                Mode démonstration
              </p>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="grid size-8 place-items-center rounded-lg bg-emerald-700 text-xs font-bold text-white"
                >
                  CB
                </span>
                <span className="text-sm font-semibold">CandidBoost IA</span>
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                Démo
              </span>
            </div>
            <nav aria-label="Navigation principale mobile" className="overflow-x-auto px-2 pb-2">
              <ul className="flex gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "block whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium",
                          active
                            ? "bg-emerald-700 text-white"
                            : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                      >
                        {item.shortLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </header>

          <main id="contenu" className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>

          <footer className="border-t border-slate-200 px-4 py-4 text-xs text-slate-500 sm:px-6 lg:px-8">
            CandidBoost IA · Sprint 1 · Données fictives de démonstration. Aucune candidature
            réelle n&apos;est envoyée.
          </footer>
        </div>
      </div>
    </div>
  );
}
