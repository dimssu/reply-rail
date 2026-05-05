export type Reviewer = {
  id: string;
  name: string;
  avatar: string;
  reviewerHistoryCount: number;
  isLocal: boolean;
  pill?: "first" | "loyal" | "veteran";
};

const dice = (seed: string) =>
  `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=fef3c7,fee2e2,dcfce7,e0e7ff,fce7f3,fef9c3,e7e5e4`;

export const REVIEWERS: Reviewer[] = [
  { id: "r1", name: "Priya Raghavan", avatar: dice("Priya Raghavan"), reviewerHistoryCount: 47, isLocal: true, pill: "veteran" },
  { id: "r2", name: "Marcus Holloway", avatar: dice("Marcus Holloway"), reviewerHistoryCount: 12, isLocal: true, pill: "loyal" },
  { id: "r3", name: "Daniela Ortiz", avatar: dice("Daniela Ortiz"), reviewerHistoryCount: 1, isLocal: false, pill: "first" },
  { id: "r4", name: "Theo Nakamura", avatar: dice("Theo Nakamura"), reviewerHistoryCount: 28, isLocal: true, pill: "veteran" },
  { id: "r5", name: "Hannah Beaumont", avatar: dice("Hannah Beaumont"), reviewerHistoryCount: 8, isLocal: true, pill: "loyal" },
  { id: "r6", name: "Jordan Whitfield", avatar: dice("Jordan Whitfield"), reviewerHistoryCount: 1, isLocal: false, pill: "first" },
  { id: "r7", name: "Sasha Volkova", avatar: dice("Sasha Volkova"), reviewerHistoryCount: 34, isLocal: true, pill: "veteran" },
  { id: "r8", name: "Devon Mitchell", avatar: dice("Devon Mitchell"), reviewerHistoryCount: 4, isLocal: false },
  { id: "r9", name: "Aria Patel", avatar: dice("Aria Patel"), reviewerHistoryCount: 19, isLocal: true, pill: "loyal" },
  { id: "r10", name: "Owen Kessler", avatar: dice("Owen Kessler"), reviewerHistoryCount: 2, isLocal: false },
  { id: "r11", name: "Mei-Lin Chen", avatar: dice("Mei-Lin Chen"), reviewerHistoryCount: 22, isLocal: true, pill: "loyal" },
  { id: "r12", name: "Ethan Rosenthal", avatar: dice("Ethan Rosenthal"), reviewerHistoryCount: 1, isLocal: false, pill: "first" },
  { id: "r13", name: "Layla Abadi", avatar: dice("Layla Abadi"), reviewerHistoryCount: 11, isLocal: true, pill: "loyal" },
  { id: "r14", name: "Brendan O'Sullivan", avatar: dice("Brendan O Sullivan"), reviewerHistoryCount: 6, isLocal: true },
  { id: "r15", name: "Camila Souza", avatar: dice("Camila Souza"), reviewerHistoryCount: 3, isLocal: false },
  { id: "r16", name: "Nikolai Petrov", avatar: dice("Nikolai Petrov"), reviewerHistoryCount: 16, isLocal: true, pill: "loyal" },
  { id: "r17", name: "Yusuf Adeyemi", avatar: dice("Yusuf Adeyemi"), reviewerHistoryCount: 1, isLocal: false, pill: "first" },
  { id: "r18", name: "Riley Chen", avatar: dice("Riley Chen"), reviewerHistoryCount: 9, isLocal: true },
  { id: "r19", name: "Mira Johansson", avatar: dice("Mira Johansson"), reviewerHistoryCount: 41, isLocal: true, pill: "veteran" },
  { id: "r20", name: "Carlos Mendoza", avatar: dice("Carlos Mendoza"), reviewerHistoryCount: 5, isLocal: true },
  { id: "r21", name: "Saoirse Walsh", avatar: dice("Saoirse Walsh"), reviewerHistoryCount: 14, isLocal: true, pill: "loyal" },
  { id: "r22", name: "Jamal Carter", avatar: dice("Jamal Carter"), reviewerHistoryCount: 7, isLocal: true },
  { id: "r23", name: "Anika Bose", avatar: dice("Anika Bose"), reviewerHistoryCount: 25, isLocal: true, pill: "veteran" },
  { id: "r24", name: "Felix Hartmann", avatar: dice("Felix Hartmann"), reviewerHistoryCount: 2, isLocal: false },
  { id: "r25", name: "Tessa Lindgren", avatar: dice("Tessa Lindgren"), reviewerHistoryCount: 18, isLocal: true, pill: "loyal" },
  { id: "r26", name: "Ravi Krishnan", avatar: dice("Ravi Krishnan"), reviewerHistoryCount: 1, isLocal: false, pill: "first" },
  { id: "r27", name: "Elise Whitcomb", avatar: dice("Elise Whitcomb"), reviewerHistoryCount: 31, isLocal: true, pill: "veteran" },
  { id: "r28", name: "Hugo Marchetti", avatar: dice("Hugo Marchetti"), reviewerHistoryCount: 13, isLocal: true, pill: "loyal" },
  { id: "r29", name: "Zara Ahmed", avatar: dice("Zara Ahmed"), reviewerHistoryCount: 4, isLocal: true },
  { id: "r30", name: "Lukas Berger", avatar: dice("Lukas Berger"), reviewerHistoryCount: 1, isLocal: false, pill: "first" },
];

export const reviewerById = (id: string) =>
  REVIEWERS.find((r) => r.id === id) ?? REVIEWERS[0];
</content>
