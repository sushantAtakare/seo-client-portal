"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  FileTextIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SparklesIcon,
  XIcon,
} from "@/components/Icons";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/website", label: "My Website", icon: GlobeIcon },
  { href: "/audits", label: "SEO Audits", icon: SearchIcon },
  { href: "/reports", label: "Reports", icon: FileTextIcon },
  { href: "/notifications", label: "Notifications", icon: BellIcon },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5"
            onClick={onClose}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent">
              <SparklesIcon className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-wide text-white">
              EDGELINK SEO
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <p className="text-xs text-muted">Edgelink Client Portal</p>
          <p className="mt-0.5 text-xs text-zinc-600">v0.1.0 · Demo mode</p>
        </div>
      </aside>
    </>
  );
}
