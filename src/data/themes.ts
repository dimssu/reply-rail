export type Theme = {
  name: string;
  mentionCount: number;
  sentimentScore: number; // -1 to 1
  trend: "up" | "down" | "flat";
  exampleQuotes: string[];
};

export const THEMES: Theme[] = [
  {
    name: "Staff friendliness",
    mentionCount: 142,
    sentimentScore: 0.78,
    trend: "up",
    exampleQuotes: [
      "Dani makes a flat white that ruins every other flat white in town.",
      "The staff knows my dog by name now.",
      "Slid me a cookie when she saw me crying over a problem set.",
    ],
  },
  {
    name: "Pastries",
    mentionCount: 118,
    sentimentScore: 0.71,
    trend: "up",
    exampleQuotes: [
      "Cardamom bun is unreal.",
      "Strawberry-rhubarb laminated croissant is dangerous.",
      "Canele had a glass-sharp crust I haven't tasted since Bordeaux.",
    ],
  },
  {
    name: "Wait time",
    mentionCount: 64,
    sentimentScore: -0.42,
    trend: "down",
    exampleQuotes: [
      "Wait was over 18 minutes for a single drip.",
      "Three baristas standing around chatting.",
      "Forty minutes later the manager admitted they'd handed it to someone else.",
    ],
  },
  {
    name: "Parking",
    mentionCount: 38,
    sentimentScore: -0.61,
    trend: "flat",
    exampleQuotes: [
      "Parking on Chestnut is a bloodsport on Saturdays.",
      "Circled the block four times before giving up.",
      "Would love a partnership with the lot up the block.",
    ],
  },
  {
    name: "Wi-Fi & power",
    mentionCount: 47,
    sentimentScore: 0.18,
    trend: "down",
    exampleQuotes: [
      "Wifi was fine until about 11am then crawled to a halt.",
      "Outlets at every seat — unofficial second office.",
      "Strong wifi at Mission, can't say the same for SoMa.",
    ],
  },
  {
    name: "Value & pricing",
    mentionCount: 56,
    sentimentScore: -0.24,
    trend: "down",
    exampleQuotes: [
      "Charged me $9 for a small drip coffee — unacceptable.",
      "For $7.50 I expected a lot more attention.",
      "$22 bag of beans I didn't intend to buy — worth every cent.",
    ],
  },
  {
    name: "Cleanliness",
    mentionCount: 22,
    sentimentScore: -0.15,
    trend: "flat",
    exampleQuotes: [
      "Bathroom had no soap, sticky floor, door wouldn't latch.",
      "Counters always wiped, glass case spotless.",
      "Patio could use a sweep more often.",
    ],
  },
  {
    name: "Ambiance & music",
    mentionCount: 89,
    sentimentScore: 0.51,
    trend: "up",
    exampleQuotes: [
      "Playlist is exactly the kind of mellow that makes a Tuesday feel like a Saturday.",
      "Music was way too loud at 9am on a Wednesday.",
      "Natural light in the afternoon is unreal.",
    ],
  },
  {
    name: "Mobile order accuracy",
    mentionCount: 31,
    sentimentScore: -0.38,
    trend: "down",
    exampleQuotes: [
      "Handed my mobile order to someone else.",
      "Order said ready at 8:42, picked it up at 9:30.",
      "Mobile order was missing the pastry every single time.",
    ],
  },
  {
    name: "Seasonal menu",
    mentionCount: 44,
    sentimentScore: 0.62,
    trend: "up",
    exampleQuotes: [
      "Spring menu is a banger.",
      "Out of seasonal cardamom syrup two weeks running.",
      "Yirgacheffe had blueberry like the bag promised.",
    ],
  },
];

export type RatingPoint = { week: string; google: number; yelp: number; facebook: number };

export const TREND_12W: RatingPoint[] = [
  { week: "W-12", google: 4.50, yelp: 4.20, facebook: 4.45 },
  { week: "W-11", google: 4.52, yelp: 4.22, facebook: 4.46 },
  { week: "W-10", google: 4.55, yelp: 4.25, facebook: 4.48 },
  { week: "W-09", google: 4.58, yelp: 4.30, facebook: 4.50 },
  { week: "W-08", google: 4.60, yelp: 4.28, facebook: 4.52 },
  { week: "W-07", google: 4.62, yelp: 4.32, facebook: 4.55 },
  { week: "W-06", google: 4.63, yelp: 4.35, facebook: 4.56 },
  { week: "W-05", google: 4.65, yelp: 4.38, facebook: 4.58 },
  { week: "W-04", google: 4.66, yelp: 4.40, facebook: 4.59 },
  { week: "W-03", google: 4.68, yelp: 4.42, facebook: 4.60 },
  { week: "W-02", google: 4.69, yelp: 4.41, facebook: 4.60 },
  { week: "W-01", google: 4.70, yelp: 4.40, facebook: 4.60 },
];

export type SparkPoint = number;
export const SPARKS = {
  google: [4.5, 4.52, 4.55, 4.58, 4.6, 4.62, 4.63, 4.65, 4.66, 4.68, 4.69, 4.70],
  yelp: [4.2, 4.22, 4.25, 4.3, 4.28, 4.32, 4.35, 4.38, 4.4, 4.42, 4.41, 4.40],
  facebook: [4.45, 4.46, 4.48, 4.5, 4.52, 4.55, 4.56, 4.58, 4.59, 4.6, 4.6, 4.60],
};
</content>
