"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Send,
  Pencil,
  CalendarClock,
  UserCheck,
  Flag,
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Quote,
  Wand2,
  History,
} from "lucide-react";
import { reviewById, REVIEWS } from "@/data/reviews";
import { reviewerById } from "@/data/reviewers";
import { LOCATIONS } from "@/data/locations";
import { DRAFTS, PLATFORM_LIMITS, type Tone } from "@/data/draft";
import { PlatformIcon, StarRow } from "./PlatformIcon";
import { Avatar } from "./Avatar";

const TONES: { key: Tone; label: string; sub: string }[] = [
  { key: "warm", label: "Warm", sub: "Personable, owner-signed, light apology" },
  { key: "professional", label: "Professional", sub: "Brand-voice, neutral, on-the-record" },
  { key: "apologetic", label: "Apologetic", sub: "Owner-led, accepts fault, concrete offer" },
];

const PILL_LABEL: Record<NonNullable<ReturnType<typeof reviewerById>["pill"]>, string> = {
  first: "First review",
  loyal: "Loyal customer",
  veteran: "Reviewer history · 25+",
};

export function ReviewDetail({ reviewId }: { reviewId: string }) {
  const review = useMemo(() => reviewById(reviewId), [reviewId]);
  const reviewer = reviewerById(review.reviewerId);
  const location = LOCATIONS.find((l) => l.id === review.locationId)!;

  const focal = review.id === "rv-001";
  const [tone, setTone] = useState<Tone>("apologetic");
  const [whyOpen, setWhyOpen] = useState(true);
  const [bodyOverride, setBodyOverride] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const draft = focal
    ? DRAFTS[tone]
    : ({
        ...DRAFTS[tone],
        body: `${reviewer.name.split(" ")[0]}, thank you for taking the time to write this. We'll route your feedback to the ${location.name} team and follow up if there's anything we can make right.\n\n— Maya, Aurora Coffee Co.`,
        charCount: 198,
        pulledPhrases: review.tagging,
      } as typeof DRAFTS.warm);

  const body = bodyOverride ?? draft.body;
  const charCount = body.length;
  const limit = PLATFORM_LIMITS[review.platform];
  const charPct = Math.min(100, (charCount / limit) * 100);

  const others = REVIEWS.filter((r) => r.id !== review.id).slice(0, 6);

  return (
    <div className="grid grid-cols-[260px_minmax(0,1fr)] h-full">
      {/* Left side: jump-back + recent */}
      <aside className="border-r border-border bg-bg-elev/40 overflow-y-auto">
        <div className="p-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[12.5px] text-text-mute hover:text-text hover:bg-bg-subtle"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to inbox
          </Link>
        </div>
        <div className="px-3">
          <div className="text-[10px] uppercase tracking-[0.12em] text-text-faint px-2 mb-1.5">
            Other reviews
          </div>
          <ul className="flex flex-col gap-1">
            {others.map((r) => {
              const rev = reviewerById(r.reviewerId);
              return (
                <li key={r.id}>
                  <Link
                    href={`/review/${r.id}`}
                    className="block px-2 py-1.5 rounded-md hover:bg-bg-subtle transition"
                  >
                    <div className="flex items-center gap-2">
                      <PlatformIcon platform={r.platform} className="w-3 h-3" />
                      <span className="text-[12px] font-medium truncate">{rev.name}</span>
                      <span className="ml-auto text-[10.5px] text-text-faint numeric">
                        {r.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StarRow stars={r.stars} size={10} />
                      <span className="text-[10.5px] text-text-faint">·</span>
                      <span className="text-[10.5px] text-text-faint truncate">
                        {LOCATIONS.find((l) => l.id === r.locationId)!.name.replace("Aurora ", "")}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-text-mute mt-1 line-clamp-2 leading-snug">
                      {r.snippet}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Center stack */}
      <section className="overflow-y-auto bg-bg">
        <div className="max-w-[820px] mx-auto px-6 py-6 flex flex-col gap-5">
          {/* Review card */}
          <motion.article
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
            className="rounded-lg border border-border bg-bg-elev p-5"
          >
            <header className="flex items-start gap-3">
              <Avatar src={reviewer.avatar} name={reviewer.name} size={40} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display text-[16px] font-semibold">
                    {reviewer.name}
                  </span>
                  {reviewer.pill && (
                    <span className="text-[10.5px] font-medium px-1.5 py-0.5 rounded border border-border bg-bg-subtle text-text-mute">
                      {PILL_LABEL[reviewer.pill]}
                    </span>
                  )}
                  {reviewer.isLocal && (
                    <span className="text-[10.5px] font-medium px-1.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-700 inline-flex items-center gap-1">
                      <UserCheck className="w-2.5 h-2.5" />
                      Local
                    </span>
                  )}
                  {review.flagged && (
                    <span className="text-[10.5px] font-medium px-1.5 py-0.5 rounded border border-accent/30 bg-accent-soft text-accent inline-flex items-center gap-1">
                      <Flag className="w-2.5 h-2.5" />
                      Flagged
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11.5px] text-text-mute">
                  <PlatformIcon platform={review.platform} className="w-3.5 h-3.5" />
                  <span className="capitalize">{review.platform}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {location.name}
                  </span>
                  <span>·</span>
                  <span className="numeric">
                    {new Date(review.postedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                  <span>·</span>
                  <span className="numeric">{reviewer.reviewerHistoryCount} prior reviews</span>
                </div>
              </div>
              <div className="text-right">
                <StarRow stars={review.stars} size={14} />
                <span className="block text-[10.5px] text-text-faint mt-1 numeric">
                  {review.stars}.0 / 5.0
                </span>
              </div>
            </header>

            <p className="mt-4 text-[14px] leading-relaxed text-text whitespace-pre-line">
              {review.text}
            </p>

            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {review.tagging.map((t) => (
                <span
                  key={t}
                  className="text-[10.5px] px-1.5 py-0.5 rounded border border-border bg-bg-subtle text-text-mute"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border text-[11.5px] text-text-mute">
              <span className="inline-flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    review.sentiment === "positive"
                      ? "bg-positive"
                      : review.sentiment === "mixed"
                      ? "bg-mixed"
                      : "bg-negative"
                  }`}
                />
                Sentiment: <span className="text-text capitalize">{review.sentiment}</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-accent" />
                Lane: <span className="text-text capitalize">{review.lane.replace("_", " ")}</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent" />
                Suggested: <span className="text-text">{review.suggestedAction}</span>
              </span>
            </div>
          </motion.article>

          {/* Drafted reply */}
          <motion.article
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.05 }}
            className="rounded-lg border border-border bg-bg-elev overflow-hidden"
          >
            <header className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-subtle/40">
              <Wand2 className="w-3.5 h-3.5 text-accent" />
              <span className="text-[12.5px] font-medium">AI-drafted reply</span>
              <span className="text-[11px] text-text-faint">·</span>
              <span className="text-[11px] text-text-mute">
                Trained on 1,247 of your past replies
              </span>
              <div className="ml-auto flex items-center gap-1.5 text-[11px] text-text-mute">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Brand voice locked
              </div>
            </header>

            {/* Tone selector */}
            <div className="px-4 pt-3 flex gap-2">
              {TONES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTone(t.key);
                    setBodyOverride(null);
                    setEditing(false);
                  }}
                  className={`group flex-1 text-left rounded-md border px-3 py-2 transition ${
                    tone === t.key
                      ? "border-accent bg-accent-soft/40"
                      : "border-border bg-bg-elev hover:bg-bg-subtle"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        tone === t.key ? "bg-accent" : "bg-text-faint"
                      }`}
                    />
                    <span
                      className={`text-[12.5px] font-medium ${
                        tone === t.key ? "text-accent-deep" : "text-text"
                      }`}
                    >
                      {t.label}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-text-mute mt-0.5 leading-snug">{t.sub}</p>
                </button>
              ))}
            </div>

            {/* Reply body */}
            <div className="px-4 py-3">
              {editing ? (
                <textarea
                  value={body}
                  onChange={(e) => setBodyOverride(e.target.value)}
                  rows={10}
                  className="w-full rounded-md border border-border bg-bg-subtle/30 p-3 text-[13px] leading-relaxed text-text resize-none focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              ) : (
                <div className="rounded-md border border-border bg-bg-subtle/30 p-3 text-[13px] leading-relaxed text-text whitespace-pre-line">
                  {body}
                </div>
              )}

              {/* Char counter + platform limit */}
              <div className="flex items-center gap-3 mt-2.5 text-[11px] text-text-mute">
                <span className="numeric">
                  {charCount} / {limit} chars
                </span>
                <div className="flex-1 h-1 rounded-full bg-bg-subtle overflow-hidden">
                  <div
                    className={`h-full ${
                      charPct < 50 ? "bg-emerald-500" : charPct < 80 ? "bg-amber-500" : "bg-accent"
                    }`}
                    style={{ width: `${Math.max(2, charPct)}%` }}
                  />
                </div>
                <span className="inline-flex items-center gap-1 text-[10.5px]">
                  <PlatformIcon platform={review.platform} className="w-3 h-3" />
                  {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)} limit
                </span>
              </div>

              {/* Pulled phrases */}
              <div className="mt-3 flex items-start gap-2 flex-wrap">
                <span className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint mt-1">
                  Pulled from review:
                </span>
                {draft.pulledPhrases.map((p) => (
                  <span
                    key={p}
                    className="text-[10.5px] px-1.5 py-0.5 rounded border border-accent/20 bg-accent-soft text-accent-deep"
                  >
                    “{p}”
                  </span>
                ))}
              </div>
            </div>

            {/* Why this reply */}
            <div className="border-t border-border">
              <button
                onClick={() => setWhyOpen((v) => !v)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-[12.5px] font-medium text-text hover:bg-bg-subtle transition"
              >
                <History className="w-3.5 h-3.5 text-accent" />
                Why this reply
                <span className="text-[10.5px] text-text-faint font-normal ml-1">
                  Cites {draft.citations.length} similar past reviews
                </span>
                {whyOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 ml-auto text-text-faint" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-text-faint" />
                )}
              </button>
              {whyOpen && (
                <div className="px-4 pb-4 flex flex-col gap-2.5">
                  {draft.citations.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-md border border-border bg-bg p-3"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Quote className="w-3 h-3 text-text-faint" />
                        <span className="text-[11.5px] font-medium">{c.reviewer}</span>
                        <span className="text-[10.5px] text-text-faint">·</span>
                        <span className="text-[10.5px] text-text-faint">{c.location}</span>
                        <span className="ml-auto text-[10px] font-mono text-text-faint">
                          {c.id}
                        </span>
                      </div>
                      <p className="text-[12px] text-text-mute italic leading-snug mb-2">
                        “{c.snippet}”
                      </p>
                      <div className="text-[11px] text-text leading-snug">
                        <span className="font-medium">Why this worked: </span>
                        {c.workedBecause}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action bar */}
            <div className="border-t border-border bg-bg-subtle/40 px-4 py-3 flex items-center gap-2">
              <button
                onClick={() => setEditing((v) => !v)}
                className="h-9 px-3 rounded-md border border-border bg-bg-elev text-[12.5px] font-medium text-text-mute hover:text-text hover:bg-bg-subtle inline-flex items-center gap-1.5 transition"
              >
                <Pencil className="w-3.5 h-3.5" />
                {editing ? "Done editing" : "Edit"}
              </button>
              <button className="h-9 px-3 rounded-md border border-border bg-bg-elev text-[12.5px] font-medium text-text-mute hover:text-text hover:bg-bg-subtle inline-flex items-center gap-1.5 transition">
                <CalendarClock className="w-3.5 h-3.5" />
                Schedule
              </button>
              <button className="h-9 px-3 rounded-md border border-border bg-bg-elev text-[12.5px] font-medium text-text-mute hover:text-text hover:bg-bg-subtle inline-flex items-center gap-1.5 transition">
                <UserCheck className="w-3.5 h-3.5" />
                Send to manager
              </button>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[11px] text-text-faint">Posts publicly to</span>
                <button className="h-9 px-4 rounded-md bg-accent hover:bg-accent-deep text-white text-[12.5px] font-medium inline-flex items-center gap-1.5 transition shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                  Post to {review.platform.charAt(0).toUpperCase() + review.platform.slice(1)}
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              </div>
            </div>
          </motion.article>

          {/* Footer hint */}
          <div className="text-[11px] text-text-faint text-center">
            Tone preset can be adjusted at any time before posting. Once posted, the reply is read-only on{" "}
            <span className="capitalize">{review.platform}</span>.
          </div>
        </div>
      </section>
    </div>
  );
}
</content>
