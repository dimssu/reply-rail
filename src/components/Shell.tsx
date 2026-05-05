"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  LineChart,
  MapPin,
  FileText,
  Settings,
  Sparkles,
  ChevronDown,
  Search,
  Bell,
  CircleDot,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Inbox", icon: Inbox, badge: "14" },
  { href: "/sentiment", label: "Sentiment", icon: LineChart },
  { href: "#", label: "Locations", icon: MapPin, badge: "6" },
  { href: "#", label: "Templates", icon: FileText },
  { href: "#", label: "Settings", icon: Settings },
];

const LOCATIONS = [
  "All locations",
  "Aurora Mission",
  "Aurora SoMa",
  "Aurora Hayes Valley",
  "Aurora Marina",
  "Aurora Berkeley",
  "Aurora Oakland",
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [aiOn, setAiOn] = useState(true);
  const [loc, setLoc] = useState("All locations");
  const [openLoc, setOpenLoc] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[232px] shrink-0 flex-col border-r border-border bg-bg-elev/60">
        <div className="px-4 h-14 flex items-center gap-2 border-b border-border">
          <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-white">
            <CircleDot className="w-4 h-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-semibold tracking-tight">Reply Rail</span>
            <span className="text-[11px] text-text-mute">v0.4.2</span>
          </div>
        </div>

        <div className="px-3 py-3">
          <div className="text-[10px] uppercase tracking-[0.12em] text-text-faint px-2 mb-2">
            Workspace
          </div>
          <button
            onClick={() => setOpenLoc((v) => !v)}
            className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-bg-subtle transition group"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-200 to-orange-300 border border-amber-300/50 flex items-center justify-center text-[11px] font-semibold text-amber-900">
                AC
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[13px] font-medium leading-tight">Aurora Coffee Co.</span>
                <span className="text-[11px] text-text-mute leading-tight">{loc}</span>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-text-faint" />
          </button>
          {openLoc && (
            <div className="mt-1 rounded-md border border-border bg-bg-elev shadow-sm overflow-hidden">
              {LOCATIONS.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLoc(l);
                    setOpenLoc(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[12.5px] hover:bg-bg-subtle ${
                    l === loc ? "text-accent font-medium" : "text-text"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className="px-3 flex-1 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-[0.12em] text-text-faint px-2 mb-1">
            Workflow
          </div>
          <ul className="flex flex-col gap-0.5">
            {NAV.map((n) => {
              const active =
                (n.href === "/" && pathname === "/") ||
                (n.href !== "/" && n.href !== "#" && pathname.startsWith(n.href));
              const Icon = n.icon;
              return (
                <li key={n.label}>
                  <Link
                    href={n.href}
                    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition ${
                      active
                        ? "bg-accent-soft text-accent-deep font-medium"
                        : "text-text-mute hover:text-text hover:bg-bg-subtle"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{n.label}</span>
                    {n.badge && (
                      <span
                        className={`text-[10.5px] numeric px-1.5 h-4 rounded inline-flex items-center ${
                          active
                            ? "bg-white/70 text-accent-deep"
                            : "bg-bg-subtle text-text-mute"
                        }`}
                      >
                        {n.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 text-[10px] uppercase tracking-[0.12em] text-text-faint px-2 mb-1">
            Saved views
          </div>
          <ul className="flex flex-col gap-0.5 text-[12.5px]">
            {[
              { label: "Negative this week", count: 7 },
              { label: "VIP reviewers", count: 3 },
              { label: "Closed-loop pending", count: 12 },
              { label: "Manager escalations", count: 2 },
            ].map((v) => (
              <li
                key={v.label}
                className="flex items-center gap-2 px-2 py-1 rounded-md text-text-mute hover:bg-bg-subtle hover:text-text cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-text-faint" />
                <span className="flex-1 truncate">{v.label}</span>
                <span className="numeric text-text-faint">{v.count}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border p-3">
          <div className="rounded-lg border border-border bg-bg-elev p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[12px] font-medium">AI assist</span>
              <button
                onClick={() => setAiOn((v) => !v)}
                className={`ml-auto relative w-7 h-4 rounded-full transition ${
                  aiOn ? "bg-accent" : "bg-border-strong"
                }`}
              >
                <span
                  className={`absolute top-0.5 ${
                    aiOn ? "left-3.5" : "left-0.5"
                  } w-3 h-3 rounded-full bg-white transition-all`}
                />
              </button>
            </div>
            <p className="text-[11px] text-text-mute leading-snug">
              Drafts replies in your brand voice. {aiOn ? "Active." : "Paused."}
            </p>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 shrink-0 border-b border-border bg-bg-elev/80 backdrop-blur flex items-center px-4 gap-3">
          <div className="flex items-center gap-1.5 text-[12.5px] text-text-mute">
            <span className="text-text-faint">Aurora Coffee Co.</span>
            <span className="text-text-faint">/</span>
            <span className="text-text font-medium">
              {pathname.startsWith("/review")
                ? "Review"
                : pathname === "/sentiment"
                ? "Sentiment"
                : "Inbox"}
            </span>
          </div>

          <div className="ml-6 hidden lg:flex items-center gap-2 px-2.5 h-8 w-[320px] rounded-md border border-border bg-bg-subtle text-[12.5px] text-text-mute">
            <Search className="w-3.5 h-3.5" />
            <span className="flex-1">Search reviews, reviewers, themes…</span>
            <kbd className="font-mono text-[10px] px-1 py-0.5 rounded border border-border bg-bg-elev">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button className="h-8 px-2.5 rounded-md text-[12.5px] text-text-mute hover:bg-bg-subtle inline-flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" />
              <span className="numeric">4</span>
            </button>
            <div className="h-5 w-px bg-border" />
            <div className="flex items-center gap-2 pr-1">
              <div className="w-6 h-6 rounded-full bg-stone-200 border border-border text-[10px] font-medium flex items-center justify-center">
                MK
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-[12px] font-medium">Maya Kowalski</span>
                <span className="text-[10.5px] text-text-mute">Owner · 6 locations</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
