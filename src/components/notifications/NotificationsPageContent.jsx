"use client";

import { useMemo, useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import {
  BellIcon,
  MailIcon,
  MessageCircleIcon,
  SearchIcon,
} from "@/components/Icons";
import { notifications } from "@/data/dummyData";

const CHANNEL_FILTERS = ["All", "Email", "WhatsApp"];
const TYPE_FILTERS = ["All", "Audit completion", "Report ready"];

export default function NotificationsPageContent() {
  const [search, setSearch] = useState("");
  const [channelFilter, setChannelFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const overview = useMemo(() => {
    return {
      total: notifications.length,
      email: notifications.filter((n) => n.channel === "Email").length,
      whatsapp: notifications.filter((n) => n.channel === "WhatsApp").length,
      delivered: notifications.filter((n) => n.status === "Delivered").length,
    };
  }, []);

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((item) => {
      const matchesChannel =
        channelFilter === "All" || item.channel === channelFilter;
      const matchesType =
        typeFilter === "All" || item.relatedTo === typeFilter;
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query);

      return matchesChannel && matchesType && matchesSearch;
    });
  }, [search, channelFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted">
          Review email and WhatsApp alerts for audit completions and ready
          reports.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-700">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted">Total notifications</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {overview.total}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <BellIcon className="h-5 w-5" />
            </span>
          </div>
        </article>
        <article className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-700">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted">Email</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {overview.email}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <MailIcon className="h-5 w-5" />
            </span>
          </div>
        </article>
        <article className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-700">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted">WhatsApp</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {overview.whatsapp}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <MessageCircleIcon className="h-5 w-5" />
            </span>
          </div>
        </article>
        <article className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-700">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted">Delivered</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {overview.delivered}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <BellIcon className="h-5 w-5" />
            </span>
          </div>
        </article>
      </section>

      <div className="flex flex-col gap-3">
        <div className="relative w-full lg:max-w-sm">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notifications..."
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CHANNEL_FILTERS.map((channel) => {
              const isActive = channelFilter === channel;
              return (
                <button
                  key={channel}
                  type="button"
                  onClick={() => setChannelFilter(channel)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "border border-border text-muted hover:border-zinc-600 hover:text-white"
                  }`}
                >
                  {channel === "All" ? "All channels" : channel}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map((type) => {
              const isActive = typeFilter === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeFilter(type)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "border border-border text-muted hover:border-zinc-600 hover:text-white"
                  }`}
                >
                  {type === "All" ? "All types" : type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <p className="text-base font-medium text-white">
            No notifications found
          </p>
          <p className="mt-1 text-sm text-muted">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <section className="space-y-3">
          {filteredNotifications.map((item) => {
            const Icon =
              item.channel === "WhatsApp" ? MessageCircleIcon : MailIcon;

            return (
              <article
                key={item.id}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-zinc-700"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <StatusBadge status={item.channel} />
                        <StatusBadge status={item.relatedTo} />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.message}
                      </p>
                      <p className="mt-3 text-xs text-zinc-500">{item.sentAt}</p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="mb-2 text-xs text-muted">Delivery status</p>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
