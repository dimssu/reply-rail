export type Tone = "warm" | "professional" | "apologetic";

export type DraftReply = {
  reviewId: string;
  body: string;
  charCount: number;
  pulledPhrases: string[];
  citations: {
    id: string;
    location: string;
    reviewer: string;
    snippet: string;
    workedBecause: string;
  }[];
};

// The focal review for /review/[id] is rv-001 (the 18-min wait, lukewarm drip)
export const DRAFTS: Record<Tone, DraftReply> = {
  warm: {
    reviewId: "rv-001",
    body: `Daniela — first off, thank you for putting this in writing. An eighteen-minute wait for drip is not the SoMa morning we want anyone to have, and "lukewarm with no oat milk" is just unacceptable on a meeting day.

I've already pulled this morning's drink-bar timestamps and shared them with our SoMa lead, Priya. We're tightening our par on oat milk for the 8–10am window starting tomorrow. I'd love to make today right — DM us your contact and the next round (and the one after that) is on the house at any Aurora location.

— Maya, Aurora Coffee Co.`,
    charCount: 612,
    pulledPhrases: [
      "wait was over 18 minutes",
      "lukewarm",
      "ran out of oat milk",
      "before a meeting",
    ],
    citations: [
      {
        id: "rv-2024-103",
        location: "Aurora Mission",
        reviewer: "K. Rivera (Mar 2026)",
        snippet: "Wait was unreal at 8:30, drink was cold by the time I got it.",
        workedBecause:
          "Warm, named-owner reply with a comp recovered the reviewer — they posted a 5★ follow-up two weeks later.",
      },
      {
        id: "rv-2024-244",
        location: "Aurora SoMa",
        reviewer: "T. Park (Feb 2026)",
        snippet: "Out of oat milk again. Third visit in a row.",
        workedBecause:
          "Acknowledging the par-stock issue specifically (not generically) led the reviewer to update to 4★.",
      },
      {
        id: "rv-2024-019",
        location: "Aurora Hayes Valley",
        reviewer: "S. Mehta (Jan 2026)",
        snippet: "Drink wasn't right and the staff didn't seem to notice.",
        workedBecause:
          "Personal sign-off (Maya, Owner) outperformed generic brand replies by 2.4× engagement on warm tone.",
      },
    ],
  },
  professional: {
    reviewId: "rv-001",
    body: `Daniela, thank you for the detailed feedback. An 18-minute wait for drip coffee, a beverage that was not at the correct temperature, and an out-of-stock oat milk all fall short of the standard we hold our SoMa team to.

Your note has been forwarded to our SoMa Location Lead. We are reviewing this morning's bar timing and adjusting oat milk par levels for peak windows. We would appreciate the chance to make this right — please reach us at care@auroracoffee.co with your order details.

Aurora Coffee Co.`,
    charCount: 568,
    pulledPhrases: [
      "wait was over 18 minutes",
      "lukewarm",
      "ran out of oat milk",
      "for $7.50",
    ],
    citations: [
      {
        id: "rv-2024-156",
        location: "Aurora SoMa",
        reviewer: "M. Foster (Mar 2026)",
        snippet: "Three baristas, no urgency, drink wrong.",
        workedBecause:
          "Brand-voice reply with a clear escalation path resolved the complaint without further public back-and-forth.",
      },
      {
        id: "rv-2024-201",
        location: "Aurora Marina",
        reviewer: "J. Lee (Feb 2026)",
        snippet: "$8 for a small drip, no apology when I flagged it.",
        workedBecause:
          "Professional tone with a named contact email gave the reviewer a private channel — they removed the negative review.",
      },
    ],
  },
  apologetic: {
    reviewId: "rv-001",
    body: `Daniela — I'm sorry. There is no version of this morning that should have happened to a paying customer with a meeting on the calendar. Eighteen minutes, a lukewarm drink, no oat milk, and a $7.50 receipt — that is on us, fully, and I want to fix it directly.

I've pulled the bar timing for the window you describe and I'll be at SoMa myself tomorrow morning to retrain the team on hand-off and milk par. Please email me at maya@auroracoffee.co — I'd like to refund today's order, comp your next two visits, and personally hand you a coffee at any of our six locations.

— Maya Kowalski, Owner`,
    charCount: 698,
    pulledPhrases: [
      "wait was over 18 minutes",
      "lukewarm",
      "ran out of oat milk",
      "$7.50",
      "before a meeting",
      "three baristas standing around chatting",
    ],
    citations: [
      {
        id: "rv-2024-077",
        location: "Aurora SoMa",
        reviewer: "B. Nguyen (Apr 2026)",
        snippet: "Worst service morning I've had at Aurora — not coming back.",
        workedBecause:
          "Owner-signed apology with a specific offer (refund + 2 comps) recovered the reviewer to 4★.",
      },
      {
        id: "rv-2024-114",
        location: "Aurora Mission",
        reviewer: "C. Watanabe (Mar 2026)",
        snippet: "Felt ignored at the bar. $9 down the drain.",
        workedBecause:
          "Apologetic tone outperformed warm tone by 1.7× on reviews mentioning specific dollar amounts.",
      },
      {
        id: "rv-2024-188",
        location: "Aurora Berkeley",
        reviewer: "R. Tanaka (Feb 2026)",
        snippet: "I'm done. The drink was cold and nobody cared.",
        workedBecause:
          "Naming the staffing issue specifically (not deflecting) is the strongest predictor of review-update behavior in our 18-month dataset.",
      },
    ],
  },
};

export const PLATFORM_LIMITS = {
  google: 4096,
  yelp: 5000,
  facebook: 8000,
};
</content>
