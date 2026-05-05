export type Location = {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviewCount: number;
  monthDelta: number;
  topComplaint: string;
  topCompliment: string;
  reviewsThisMonth: number;
};

export const LOCATIONS: Location[] = [
  {
    id: "mission",
    name: "Aurora Mission",
    address: "2418 Valencia St, San Francisco",
    rating: 4.7,
    reviewCount: 1284,
    monthDelta: 0.1,
    topComplaint: "Slow during weekend brunch rush",
    topCompliment: "Best oat milk lattes in the Mission",
    reviewsThisMonth: 84,
  },
  {
    id: "soma",
    name: "Aurora SoMa",
    address: "611 Folsom St, San Francisco",
    rating: 4.4,
    reviewCount: 962,
    monthDelta: -0.2,
    topComplaint: "Wi-Fi drops during peak hours",
    topCompliment: "Reliable for laptop work",
    reviewsThisMonth: 71,
  },
  {
    id: "hayes",
    name: "Aurora Hayes Valley",
    address: "551 Hayes St, San Francisco",
    rating: 4.8,
    reviewCount: 1547,
    monthDelta: 0.0,
    topComplaint: "Limited seating on weekends",
    topCompliment: "Pastries are exceptional",
    reviewsThisMonth: 102,
  },
  {
    id: "marina",
    name: "Aurora Marina",
    address: "2298 Chestnut St, San Francisco",
    rating: 4.5,
    reviewCount: 738,
    monthDelta: 0.1,
    topComplaint: "Parking is a nightmare",
    topCompliment: "Friendly staff and bright space",
    reviewsThisMonth: 56,
  },
  {
    id: "berkeley",
    name: "Aurora Berkeley",
    address: "2068 Shattuck Ave, Berkeley",
    rating: 4.6,
    reviewCount: 893,
    monthDelta: 0.2,
    topComplaint: "Music sometimes too loud",
    topCompliment: "Great cortado and chill atmosphere",
    reviewsThisMonth: 67,
  },
  {
    id: "oakland",
    name: "Aurora Oakland",
    address: "401 40th St, Oakland",
    rating: 4.3,
    reviewCount: 612,
    monthDelta: -0.1,
    topComplaint: "Order accuracy at mobile pickup",
    topCompliment: "Strong cold brew, fast service",
    reviewsThisMonth: 49,
  },
];
