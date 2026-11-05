"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, MenuIcon, SearchIcon } from "@/components/Icons";
import { clientProfile, getPageTitle } from "@/data/dummyData";

export default function Header({ onMenuClick }) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-white lg:hidden"
        aria-label="Open sidebar"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold text-white sm:text-xl">
          {title}
        </h1>
      </div>

      <div className="hidden items-center md:flex">
        <label htmlFor="global-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="global-search"
            type="search"
            placeholder="Search audits, reports..."
            className="w-56 rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent lg:w-72"
          />
        </div>
      </div>

      <Link
        href="/notifications"
        className="relative rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-white"
        aria-label="Notifications"
      >
        <BellIcon className="h-5 w-5" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
      </Link>

      <div className="flex items-center gap-3 border-l border-border pl-3 sm:pl-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-sm font-semibold text-accent">
          {clientProfile.initials}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-white">{clientProfile.name}</p>
          <p className="text-xs text-muted">{clientProfile.role}</p>
        </div>
      </div>
    </header>
  );
}
