"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Sparkles,
  Inbox as InboxIcon,
  Filter,
  Flag,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Flame,
  Trophy,
  Target,
  Zap,
  ChevronRight,
  ArrowDownToLine,
  ArrowUpRight,
  CalendarClock,
  CircleDashed,
} from "lucide-react";
import { REVIEWS, type Review, type Lane, type Sentiment } from "@/data/reviews";
import { reviewerById } from "@/data/reviewers";
import { LOCATIONS } from "@/data/locations";
import { PlatformIcon, StarRow } from "./PlatformIcon";
import { Avatar } from "./Avatar";

type FilterKey =
  | "all"
  | "unanswered"
  | "negative"
  | "positive"
  | "auto_thanked"
  | "flagged";

const FILTERS: { key: FilterKey; label: string; icon: React.ElementType; count: (rs: Review[]) => number }[] = [
  { key: "all", label: "All reviews", icon: InboxIcon, count: (rs) => rs.length },
  { key: "unanswered", label: "Unanswered", icon: CircleDashed, count: (rs) => rs.filter((r) => !r.answered).length },
  { key: "negative", label: "Negative ≤3★", icon: ThumbsDown, count: (rs) => rs.filter((r) => r.stars <= 3).length },
  { key: "positive", label: "Positive 4★+", icon: ThumbsUp, count: (rs) => rs.filter((r) => r.stars >= 4).length },
  { key: "auto_thanked", label: "Auto-thanked", icon: CheckCircle2, count: (rs) => rs.filter((r) => r.lane === "auto_thanked").length },
  { key: "flagged", label: "Flagged", icon: Flag, count: (rs) => rs.filter((r) => r.flagged).length },
];

const LANE_META: Record<Lane, { label: string; icon: React.ElementType; tone: string; sub: string }> = {
  urgent: {
    label: "Urgent",
    icon: AlertTriangle,
    tone: "text-accent",
    sub: "Reply within 2h to protect rating",
  },
  reply_soon: {
    label: "Reply soon",
    icon: Clock,
    tone: "text-amber-600",
    sub: "Worth a personal touch in the next 24h",
  },
  auto_thanked: {
    label: "Auto-thanked",
    icon: Sparkles,
    tone: "text-emerald-600",
    sub: "AI sent a brand-voice thank-you reply",
  },
  quiet: {
    label: "Quiet",
    icon: InboxIcon,
    tone: "text-stone-500",
    sub: "Lower urgency — review weekly",
  },
};

const SENTIMENT_CHIP: Record<Sentiment, string> = {
  positive: "text-positive bg-positive-soft border-positive/20",
  mixed: "text-mixed bg-mixed-soft border-mixed/20",
  negative: "text-negative bg-negative-soft border-negative/20",
};

const ACTION_TONE: Record<string, string> = {
  "Escalate to manager": "text-accent bg-accent-soft border-accent/20",
  "Reply apologetic + offer": "text-mixed bg-mixed-soft border-mixed/20",
  "Auto-thank": "text-positive bg-positive-soft border-positive/20",
  "Reply warm": "text-stone-700 bg-stone-100 border-stone-200",
  "Reply professional": "text-stone-700 bg-stone-100 border-stone-200",
};

function timeAgo(t: string) {
  return t;
}

export function Inbox() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [hover, setHover] = useState<string | null>(null);

  const filtered = useMemo(() => {
    switch (filter) {
      case "unanswered":
        return REVIEWS.filter((r) => !r.answered);
      case "negative":
        return REVIEWS.filter((r) => r.stars <= 3);
      case "positive":
        return REVIEWS.filter((r) => r.stars >= 4);
      case "auto_thanked":
        return REVIEWS.filter((r) => r.lane === "auto_thanked");
      case "flagged":
        return REVIEWS.filter((r) => r.flagged);
      default:
        return REVIEWS;
    }
  }, [filter]);

  const grouped = useMemo(() => {
    const lanes: Lane[] = ["urgent", "reply_soon", "auto_thanked", "quiet"];
    return lanes
      .map((lane) => ({ lane, items: filtered.filter((r) => r.lane === lane) }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const stats = useMemo(() => {
    const unanswered = REVIEWS.filter((r) => !r.answered).length;
    const urgent = REVIEWS.filter((r) => r.lane === "urgent").length;
    return { unanswered, urgent };
  }, []);

  return (
    <div className="grid grid-cols-[224px_minmax(0,1fr)_320px] h-full">
      {/* Left filter rail */}
      <aside className="border-r border-border bg-bg-elev/40 overflow-y-auto">
        <div className="p-3">
          <div className="flex items-center gap-2 px-2 mb-1.5">
            <Filter className="w-3 h-3 text-text-faint" />
            <span className="text-[10px] uppercase tracking-[0.12em] text-text-faint">
              Filters
            </span>
          </div>
          <ul className="flex flex-col gap-0.5">
            {FILTERS.map((f) => {
              const Icon = f.icon;
              const active = filter === f.key;
              const c = f.count(REVIEWS);
              return (
                <li key={f.key}>
                  <button
                    onClick={() => setFilter(f.key)}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12.5px] transition ${
                      active
                        ? "bg-accent-soft text-accent-deep font-medium"
                        : "text-text-mute hover:text-text hover:bg-bg-subtle"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="flex-1 text-left">{f.label}</span>
                    <span
                      className={`text-[10.5px] numeric ${
                        active ? "text-accent-deep" : "text-text-faint"
                      }`}
                    >
                      {c}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="px-3 mt-2">
          <div className="text-[10px] uppercase tracking-[0.12em] text-text-faint px-2 mb-1.5">
            By location
          </div>
          <ul className="flex flex-col gap-0.5">
            {LOCATIONS.map((l) => (
              <li
                key={l.id}
                className="flex items-center gap-2 px-2 py-1 rounded-md text-[12px] text-text-mute hover:bg-bg-subtle hover:text-text cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="flex-1 truncate">{l.name.replace("Aurora ", "")}</span>
                <span className="numeric text-text-faint">
                  {l.reviewsThisMonth}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-3 mt-4 pb-4">
          <div className="text-[10px] uppercase tracking-[0.12em] text-text-faint px-2 mb-1.5">
            By platform
          </div>
          <ul className="flex flex-col gap-0.5">
            {[
              { p: "google", label: "Google", n: REVIEWS.filter((r) => r.platform === "google").length },
              { p: "yelp", label: "Yelp", n: REVIEWS.filter((r) => r.platform === "yelp").length },
              { p: "facebook", label: "Facebook", n: REVIEWS.filter((r) => r.platform === "facebook").length },
            ].map((row) => (
              <li
                key={row.p}
                className="flex items-center gap-2 px-2 py-1 rounded-md text-[12px] text-text-mute hover:bg-bg-subtle hover:text-text cursor-pointer"
              >
                <PlatformIcon platform={row.p as "google" | "yelp" | "facebook"} className="w-3 h-3" />
                <span className="flex-1">{row.label}</span>
                <span className="numeric text-text-faint">{row.n}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Center list */}
      <section className="overflow-y-auto bg-bg">
        <div className="sticky top-0 z-10 bg-bg/95 backdrop-blur border-b border-border px-5 h-12 flex items-center gap-3">
          <h1 className="font-display text-[15px] font-semibold tracking-tight">
            Reviews
          </h1>
          <span className="text-[12px] text-text-faint numeric">
            {filtered.length} of {REVIEWS.length}
          </span>
          <div className="ml-auto flex items-center gap-1.5 text-[11.5px] text-text-mute">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Lanes assigned by AI urgency model</span>
          </div>
        </div>

        <div className="px-5 py-4 flex flex-col gap-6">
          {grouped.map((g, gi) => {
            const meta = LANE_META[g.lane];
            const Icon = meta.icon;
            return (
              <div key={g.lane}>
                <div className="flex items-baseline gap-2 mb-2">
                  <Icon className={`w-3.5 h-3.5 ${meta.tone}`} />
                  <h2 className={`font-display text-[12px] uppercase tracking-[0.14em] font-semibold ${meta.tone}`}>
                    {meta.label}
                  </h2>
                  <span className="numeric text-[12px] text-text-faint">
                    {g.items.length}
                  </span>
                  <span className="text-[11.5px] text-text-faint">— {meta.sub}</span>
                </div>

                <ul className="rounded-lg border border-border bg-bg-elev overflow-hidden divide-line">
                  {g.items.map((r, ri) => {
                    const reviewer = reviewerById(r.reviewerId);
                    const location = LOCATIONS.find((l) => l.id === r.locationId)!;
                    const action = r.suggestedAction;
                    return (
                      <motion.li
                        key={r.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: gi * 0.04 + ri * 0.012, duration: 0.22 }}
                        onMouseEnter={() => setHover(r.id)}
                        onMouseLeave={() => setHover(null)}
                      >
                        <Link
                          href={`/review/${r.id}`}
                          className={`grid grid-cols-[24px_180px_minmax(0,1fr)_180px_50px] items-center gap-3 px-4 py-2.5 transition ${
                            hover === r.id ? "bg-bg-subtle" : ""
                          }`}
                        >
                          {/* Platform icon */}
                          <div className="flex items-center justify-center">
                            <PlatformIcon platform={r.platform} className="w-3.5 h-3.5" />
                          </div>

                          {/* Reviewer + location */}
                          <div className="flex items-center gap-2 min-w-0">
                            <Avatar src={reviewer.avatar} name={reviewer.name} size={26} />
                            <div className="flex flex-col min-w-0">
                              <span className="text-[12.5px] font-medium truncate">
                                {reviewer.name}
                              </span>
                              <span className="text-[11px] text-text-faint truncate inline-flex items-center gap-1">
                                <span className="inline-flex items-center gap-1 px-1 py-px rounded bg-bg-subtle border border-border text-[10px]">
                                  {location.name.replace("Aurora ", "")}
                                </span>
                              </span>
                            </div>
                          </div>

                          {/* Snippet */}
                          <div className="min-w-0 flex flex-col gap-0.5">
                            <div className="flex items-center gap-2">
                              <StarRow stars={r.stars} size={11} />
                              <span
                                className={`text-[10px] font-medium px-1.5 py-px rounded border ${SENTIMENT_CHIP[r.sentiment]} capitalize`}
                              >
                                {r.sentiment}
                              </span>
                              {r.flagged && (
                                <span className="text-[10px] font-medium px-1.5 py-px rounded border border-accent/30 text-accent bg-accent-soft inline-flex items-center gap-1">
                                  <Flag className="w-2.5 h-2.5" />
                                  Flagged
                                </span>
                              )}
                            </div>
                            <p className="text-[12.5px] text-text-mute line-clamp-2 leading-snug">
                              {r.snippet}
                            </p>
                          </div>

                          {/* Suggested action */}
                          <div className="flex items-center justify-end">
                            <span
                              className={`text-[10.5px] font-medium px-2 py-1 rounded-md border inline-flex items-center gap-1 ${
                                ACTION_TONE[action] ?? "text-stone-700 bg-stone-100 border-stone-200"
                              }`}
                            >
                              <Sparkles className="w-2.5 h-2.5" />
                              {action}
                            </span>
                          </div>

                          {/* Time */}
                          <div className="flex items-center justify-end gap-1.5">
                            <span className="text-[11px] text-text-faint numeric">
                              {timeAgo(r.time)}
                            </span>
                            <ChevronRight
                              className={`w-3 h-3 transition ${
                                hover === r.id ? "text-text-mute translate-x-0.5" : "text-text-faint"
                              }`}
                            />
                          </div>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Right rail */}
      <aside className="border-l border-border bg-bg-elev/40 overflow-y-auto p-4 flex flex-col gap-4">
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-[12px] uppercase tracking-[0.14em] font-semibold text-text-mute">
              Today&apos;s queue
            </h3>
            <span className="text-[10.5px] text-text-faint numeric">May 4</span>
          </div>
          <div className="rounded-lg border border-border bg-bg-elev p-3 flex flex-col gap-2.5">
            <Stat label="Unanswered" value={stats.unanswered} hint="reviews waiting" tone="default" />
            <Stat label="Urgent" value={stats.urgent} hint="≤2h SLA" tone="accent" icon={AlertTriangle} />
            <div className="grid grid-cols-2 gap-2">
              <Mini label="Rating" value="4.6" sub="target 4.7" tone="default" icon={Target} />
              <Mini label="Avg reply" value="2h 18m" sub="↓ 22m wk" tone="positive" icon={Zap} />
            </div>
          </div>
        </section>

        <section>
          <div className="rounded-lg border border-border bg-gradient-to-br from-orange-50 via-bg-elev to-bg-elev p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[12.5px] font-medium">Streak</span>
                <span className="text-[10.5px] text-text-mute">12 days at &lt;24h response</span>
              </div>
              <Trophy className="w-3.5 h-3.5 text-amber-500 ml-auto" />
            </div>
            <div className="grid grid-cols-14 gap-[3px] mt-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-4 rounded-sm ${
                    i < 12 ? "bg-accent/80" : i === 12 ? "bg-accent/30" : "bg-bg-subtle border border-border"
                  }`}
                />
              ))}
            </div>
            <p className="text-[10.5px] text-text-mute mt-2">
              Keep replying within 24h to lock in the &quot;Responsive Owner&quot; badge on Google.
            </p>
          </div>
        </section>

        <section>
          <h3 className="font-display text-[12px] uppercase tracking-[0.14em] font-semibold text-text-mute mb-2">
            Up next
          </h3>
          <ul className="rounded-lg border border-border bg-bg-elev divide-line text-[12px]">
            {[
              { label: "Manager review at SoMa", time: "Today, 4:00pm", icon: CalendarClock },
              { label: "Weekly sentiment digest", time: "Mon, 9:00am", icon: ArrowDownToLine },
              { label: "Auto-reply rules audit", time: "Wed, 11:00am", icon: ArrowUpRight },
            ].map((u) => {
              const I = u.icon;
              return (
                <li key={u.label} className="flex items-center gap-2 px-3 py-2">
                  <I className="w-3.5 h-3.5 text-text-faint" />
                  <span className="flex-1 truncate">{u.label}</span>
                  <span className="text-[10.5px] text-text-faint numeric">{u.time}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3 className="font-display text-[12px] uppercase tracking-[0.14em] font-semibold text-text-mute mb-2">
            AI brand voice
          </h3>
          <div className="rounded-lg border border-border bg-bg-elev p-3 text-[11.5px] text-text-mute leading-relaxed">
            <span className="text-text font-medium">Trained on</span>{" "}
            1,247 of your past replies. Voice: warm, direct, owner-signed. Avoids the words{" "}
            <span className="font-mono text-[10.5px] bg-bg-subtle px-1 rounded">unfortunately</span>,{" "}
            <span className="font-mono text-[10.5px] bg-bg-subtle px-1 rounded">we apologize</span>.
            Last calibrated 6 days ago.
          </div>
        </section>
      </aside>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  tone,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  hint: string;
  tone: "default" | "accent";
  icon?: React.ElementType;
}) {
  return (
    <div className="flex items-center gap-3">
      {Icon && (
        <div
          className={`w-7 h-7 rounded-md flex items-center justify-center border ${
            tone === "accent"
              ? "bg-accent-soft border-accent/20 text-accent"
              : "bg-bg-subtle border-border text-text-mute"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint">
          {label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className={`font-display text-[18px] font-semibold numeric ${tone === "accent" ? "text-accent" : "text-text"}`}>
            {value}
          </span>
          <span className="text-[10.5px] text-text-faint">{hint}</span>
        </div>
      </div>
    </div>
  );
}

function Mini({
  label,
  value,
  sub,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "default" | "positive";
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-md border border-border bg-bg-subtle/50 p-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.1em] text-text-faint">
        <Icon className="w-2.5 h-2.5" />
        {label}
      </div>
      <div className="font-display text-[14px] font-semibold numeric mt-0.5">{value}</div>
      <div className={`text-[10.5px] ${tone === "positive" ? "text-positive" : "text-text-mute"}`}>
        {sub}
      </div>
    </div>
  );
}
