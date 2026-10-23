import Link from "next/link";
import type { ReactNode } from "react";

const VARIANTS = {
  primary: "bg-emerald-700 text-white hover:bg-emerald-800",
  secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${VARIANTS[variant]}`}
    >
      {children}
    </Link>
  );
}
