"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Download,
  MapPin,
} from "lucide-react";
import { THEMES, TREND_12W, SPARKS } from "@/data/themes";
import { LOCATIONS } from "@/data/locations";
import { PlatformIcon } from "./PlatformIcon";

const PLATFORM_CARDS: {
  platform: "google" | "yelp" | "facebook";
  rating: number;
  delta: number;
  reviews: number;
  spark: number[];
}[] = [
  { platform: "google", rating: 4.7, delta: 0.05, reviews: 218, spark: SPARKS.google },
  { platform: "yelp", rating: 4.4, delta: -0.02, reviews: 134, spark: SPARKS.yelp },
  { platform: "facebook", rating: 4.6, delta: 0.03, reviews: 87, spark: SPARKS.facebook },
];

function Sparkline({
  values,
  color,
  width = 120,
  height = 36,
}: {
  values: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...values) - 0.05;
  const max = Math.max(...values) + 0.05;
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const pts = values
    .map((v, i) => `${i * step},${height - ((v - min) / range) * (height - 4) - 2}`)
    .join(" ");
  const lastY = height - ((values[values.length - 1] - min) / range) * (height - 4) - 2;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon
        points={`0,${height} ${pts} ${width},${height}`}
        fill={`url(#grad-${color.replace("#", "")})`}
      />
      <circle cx={width} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
}

export function SentimentDashboard() {
  const [expandedTheme, setExpandedTheme] = useState<string | null>("Wait time");

  return (
    <div className="overflow-y-auto h-full bg-bg">
      <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col gap-6">
        {/* Header */}
        <header className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-[22px] font-semibold tracking-tight">
              Sentiment
            </h1>
            <p className="text-[12.5px] text-text-mute">
              How Aurora Coffee Co. is being talked about across Google, Yelp, and Facebook this month.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-border bg-bg-elev h-9 px-2.5 text-[12.5px] inline-flex items-center gap-2 text-text-mute">
              <span className="text-text-faint">Range</span>
              <span className="text-text font-medium">Last 30 days</span>
              <ChevronDown className="w-3.5 h-3.5 text-text-faint" />
            </div>
            <button className="h-9 px-3 rounded-md border border-border bg-bg-elev text-[12.5px] text-text-mute hover:text-text hover:bg-bg-subtle inline-flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </header>

        {/* Platform cards */}
        <section className="grid grid-cols-3 gap-3">
          {PLATFORM_CARDS.map((p, i) => {
            const color = p.platform === "google" ? "#4285F4" : p.platform === "yelp" ? "#D32323" : "#1877F2";
            const up = p.delta >= 0;
            return (
              <motion.div
                key={p.platform}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, delay: i * 0.05 }}
                className="rounded-lg border border-border bg-bg-elev p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={p.platform} className="w-4 h-4" />
                    <span className="text-[12.5px] font-medium capitalize">{p.platform}</span>
                  </div>
                  <span
                    className={`text-[11px] numeric inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border ${
                      up
                        ? "text-positive bg-positive-soft border-positive/20"
                        : "text-negative bg-negative-soft border-negative/20"
                    }`}
                  >
                    {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {up ? "+" : ""}
                    {p.delta.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <div className="font-display text-[28px] font-semibold numeric leading-none">
                      {p.rating.toFixed(1)}
                    </div>
                    <div className="text-[11px] text-text-mute mt-1">
                      <span className="numeric">{p.reviews}</span> reviews this month
                    </div>
                  </div>
                  <Sparkline values={p.spark} color={color} />
                </div>
                <div className="mt-3 pt-3 border-t border-border text-[11px] text-text-mute">
                  vs last month {up ? "·" : "·"}{" "}
                  <span className={up ? "text-positive" : "text-negative"}>
                    {up ? "trending up" : "down slightly"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Themes */}
        <section className="rounded-lg border border-border bg-bg-elev">
          <header className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <h2 className="font-display text-[13px] font-semibold">
              Themes from this month
            </h2>
            <span className="text-[11px] text-text-faint">
              · AI-extracted from {THEMES.reduce((a, b) => a + b.mentionCount, 0).toLocaleString()} mentions
            </span>
            <span className="ml-auto text-[11px] text-text-mute inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-positive" /> Positive
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-mixed" /> Mixed
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm bg-negative" /> Negative
              </span>
            </span>
          </header>
          <div className="p-4 grid grid-cols-2 gap-3">
            {THEMES.map((t) => {
              const isOpen = expandedTheme === t.name;
              const tone =
                t.sentimentScore > 0.2
                  ? "positive"
                  : t.sentimentScore < -0.15
                  ? "negative"
                  : "mixed";
              const barColor =
                tone === "positive"
                  ? "var(--positive)"
                  : tone === "negative"
                  ? "var(--negative)"
                  : "var(--mixed)";
              const TIcon = t.trend === "up" ? TrendingUp : t.trend === "down" ? TrendingDown : Minus;
              return (
                <button
                  key={t.name}
                  onClick={() => setExpandedTheme(isOpen ? null : t.name)}
                  className={`text-left rounded-md border p-3 transition ${
                    isOpen
                      ? "border-text bg-bg-subtle/50"
                      : "border-border bg-bg-elev hover:bg-bg-subtle/40"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[12.5px] font-medium flex-1 truncate">{t.name}</span>
                    <span className="text-[10.5px] text-text-faint numeric">{t.mentionCount}</span>
                    <TIcon
                      className={`w-3 h-3 ${
                        t.trend === "up"
                          ? "text-positive"
                          : t.trend === "down"
                          ? "text-negative"
                          : "text-text-faint"
                      }`}
                    />
                  </div>
                  <div className="h-1.5 mt-2 rounded-full bg-bg-subtle overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.abs(t.sentimentScore) * 100}%`,
                        background: barColor,
                      }}
                    />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10.5px]">
                    <span className="text-text-mute">
                      Sentiment{" "}
                      <span className="numeric text-text">
                        {t.sentimentScore > 0 ? "+" : ""}
                        {t.sentimentScore.toFixed(2)}
                      </span>
                    </span>
                    <span className="text-text-faint inline-flex items-center gap-0.5">
                      {isOpen ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                      Examples
                    </span>
                  </div>
                  {isOpen && (
                    <ul className="mt-2.5 flex flex-col gap-1.5">
                      {t.exampleQuotes.map((q) => (
                        <li
                          key={q}
                          className="text-[11.5px] text-text-mute italic leading-snug pl-2 border-l-2"
                          style={{ borderColor: barColor }}
                        >
                          “{q}”
                        </li>
                      ))}
                    </ul>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Trend chart */}
        <section className="rounded-lg border border-border bg-bg-elev">
          <header className="px-4 py-3 border-b border-border flex items-center gap-2">
            <h2 className="font-display text-[13px] font-semibold">
              12-week rating trend
            </h2>
            <span className="text-[11px] text-text-faint">
              · weekly average across all 6 locations
            </span>
            <div className="ml-auto flex items-center gap-3 text-[11px] text-text-mute">
              <Legend color="#4285F4" label="Google" />
              <Legend color="#D32323" label="Yelp" />
              <Legend color="#1877F2" label="Facebook" />
            </div>
          </header>
          <div className="p-4">
            <TrendChart />
          </div>
        </section>

        {/* Locations table */}
        <section className="rounded-lg border border-border bg-bg-elev">
          <header className="px-4 py-3 border-b border-border flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-text-mute" />
            <h2 className="font-display text-[13px] font-semibold">Locations</h2>
            <span className="text-[11px] text-text-faint">
              · {LOCATIONS.length} active
            </span>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead>
                <tr className="text-[10.5px] uppercase tracking-[0.1em] text-text-faint border-b border-border">
                  <th className="text-left font-medium px-4 py-2.5">Location</th>
                  <th className="text-right font-medium px-4 py-2.5">Rating</th>
                  <th className="text-right font-medium px-4 py-2.5">Reviews (mo)</th>
                  <th className="text-right font-medium px-4 py-2.5">Δ</th>
                  <th className="text-left font-medium px-4 py-2.5">Top compliment</th>
                  <th className="text-left font-medium px-4 py-2.5">Top complaint</th>
                </tr>
              </thead>
              <tbody className="divide-line">
                {LOCATIONS.map((l) => {
                  const up = l.monthDelta > 0;
                  const flat = l.monthDelta === 0;
                  return (
                    <tr key={l.id} className="hover:bg-bg-subtle/40">
                      <td className="px-4 py-2.5">
                        <div className="flex flex-col">
                          <span className="font-medium">{l.name}</span>
                          <span className="text-[10.5px] text-text-faint">{l.address}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-right numeric">{l.rating.toFixed(1)}</td>
                      <td className="px-4 py-2.5 text-right numeric">{l.reviewsThisMonth}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span
                          className={`numeric inline-flex items-center gap-0.5 ${
                            flat
                              ? "text-text-faint"
                              : up
                              ? "text-positive"
                              : "text-negative"
                          }`}
                        >
                          {flat ? (
                            <Minus className="w-3 h-3" />
                          ) : up ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {up ? "+" : ""}
                          {l.monthDelta.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-text-mute">
                        <span className="inline-block max-w-[260px] truncate">
                          {l.topCompliment}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-text-mute">
                        <span className="inline-block max-w-[260px] truncate">
                          {l.topComplaint}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2.5 h-0.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function TrendChart() {
  const W = 1180;
  const H = 220;
  const PAD_L = 36;
  const PAD_R = 16;
  const PAD_T = 14;
  const PAD_B = 26;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;

  const yMin = 4.1;
  const yMax = 4.8;
  const yTicks = [4.2, 4.4, 4.6, 4.8];

  const xStep = innerW / (TREND_12W.length - 1);
  const yScale = (v: number) => PAD_T + ((yMax - v) / (yMax - yMin)) * innerH;

  const seriesPath = (key: "google" | "yelp" | "facebook") =>
    TREND_12W.map((p, i) => `${i === 0 ? "M" : "L"} ${PAD_L + i * xStep} ${yScale(p[key])}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* Grid */}
      {yTicks.map((y) => (
        <g key={y}>
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={yScale(y)}
            y2={yScale(y)}
            stroke="var(--border)"
            strokeDasharray="2 4"
          />
          <text
            x={PAD_L - 6}
            y={yScale(y) + 3}
            textAnchor="end"
            fontSize="10"
            fill="var(--text-faint)"
            className="numeric"
          >
            {y.toFixed(1)}
          </text>
        </g>
      ))}
      {/* X labels */}
      {TREND_12W.map((p, i) => (
        <text
          key={p.week}
          x={PAD_L + i * xStep}
          y={H - 6}
          textAnchor="middle"
          fontSize="9.5"
          fill="var(--text-faint)"
          className="numeric"
        >
          {p.week}
        </text>
      ))}
      {/* Lines */}
      <path d={seriesPath("google")} fill="none" stroke="#4285F4" strokeWidth="1.75" />
      <path d={seriesPath("yelp")} fill="none" stroke="#D32323" strokeWidth="1.75" />
      <path d={seriesPath("facebook")} fill="none" stroke="#1877F2" strokeWidth="1.75" />
      {/* Endpoint dots */}
      {(["google", "yelp", "facebook"] as const).map((k, i) => {
        const last = TREND_12W[TREND_12W.length - 1][k];
        const color = i === 0 ? "#4285F4" : i === 1 ? "#D32323" : "#1877F2";
        return (
          <g key={k}>
            <circle cx={PAD_L + (TREND_12W.length - 1) * xStep} cy={yScale(last)} r="3" fill={color} />
            <text
              x={PAD_L + (TREND_12W.length - 1) * xStep + 8}
              y={yScale(last) + 3}
              fontSize="10"
              fill={color}
              className="numeric"
              fontWeight="600"
            >
              {last.toFixed(2)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
</content>
