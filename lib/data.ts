export const photos = {
  island: "photo-1514282401047-d79a71a590e8",
  villas: "photo-1439066615861-d1af74d74000",
  beach: "photo-1507525428034-b723cf961d3e",
  lagoon: "photo-1573843981267-be1999ff37cd",
  resort: "photo-1540202404-a2f29016b523",
  sea: "photo-1544551763-46a013bb70d5",
  sunset: "photo-1475924156734-496f6cac6ec1",
  tropical: "photo-1519046904884-53103b34b206",
};
export type Photo = keyof typeof photos;
export const imageUrl = (photo: Photo, width = 1400) =>
  `https://images.unsplash.com/${photos[photo]}?auto=format&fit=crop&w=${width}&q=85`;
export interface Base {
  id: string;
  slug: string;
  title: string;
  summary: string;
  photo: Photo;
  gallery: Photo[];
}
export interface Stay extends Base {
  propertyType: "Resort" | "Guesthouse" | "Hotel" | "Boutique Stay";
  destination: string;
  price: number;
  currency: string;
  priceUnit: string;
  priceDisclaimer: string;
  lastVerified: string | null;
  description: string;
  amenities: string[];
  rooms: { name: string; beds: string; occupancy: string; size: string }[];
  mealPlans: string[];
  transfer: string;
  policies: string[];
  checkIn: string;
  checkOut: string;
  featured: boolean;
}
export interface Experience extends Base {
  category: string;
  destinations: string[];
  price: number;
  duration: string;
  groupSize: string;
  difficulty: string;
  included: string[];
  excluded: string[];
  requirements: string[];
  safety: string;
  itinerary: string[];
  season: string;
  featured: boolean;
}
export interface Destination extends Base {
  atoll: string;
  kind: "Island" | "Atoll";
  interests: string[];
  description: string;
  travel: string;
  highlights: string[];
  tips: string[];
}
export interface Article extends Base {
  category: string;
  minutes: number;
  destinations: string[];
  relatedArticles: string[];
  content: { heading: string; paragraphs: string[] }[];
}
export const destinations: Destination[] = [
  [
    "maafushi",
    "Maafushi",
    "Kaafu Atoll",
    "Island",
    "A lively introduction to local island life, with beach days and adventures on the lagoon.",
    "beach",
    ["Local culture", "Water sports"],
  ],
  [
    "thoddoo",
    "Thoddoo",
    "Alif Alif Atoll",
    "Island",
    "Fruit gardens, generous beaches, and a slower island rhythm.",
    "tropical",
    ["Beaches", "Local culture"],
  ],
  [
    "fulidhoo",
    "Fulidhoo",
    "Vaavu Atoll",
    "Island",
    "A small island with a big heart, framed by bright sand and clear water.",
    "lagoon",
    ["Local culture", "Beaches"],
  ],
  [
    "dhigurah",
    "Dhigurah",
    "Alif Dhaal Atoll",
    "Island",
    "A long ribbon of sand beside the extraordinary waters of South Ari.",
    "island",
    ["Wildlife", "Beaches"],
  ],
  [
    "baa-atoll",
    "Baa Atoll",
    "Baa Atoll",
    "Atoll",
    "Discover reef-rich waters and islands scattered across a remarkable seascape.",
    "resort",
    ["Wildlife", "Diving"],
  ],
  [
    "ari-atoll",
    "Ari Atoll",
    "Ari Atoll",
    "Atoll",
    "An ocean playground for divers, reef explorers, and lovers of island escapes.",
    "sea",
    ["Diving", "Wildlife"],
  ],
].map(([slug, title, atoll, kind, summary, photo, interests]) => ({
  id: slug as string,
  slug: slug as string,
  title: title as string,
  atoll: atoll as string,
  kind: kind as Destination["kind"],
  summary: summary as string,
  photo: photo as Photo,
  interests: interests as string[],
  gallery: [photo as Photo, "beach", "lagoon"],
  description: `${summary} This destination guide is an introduction to the possibilities, rather than a verified itinerary. Tell us what you enjoy and we can help you explore a suitable route.`,
  travel:
    "Transfers depend on your arrival time, weather, and the island. Ask for current public ferry, scheduled speedboat, or domestic flight options before planning connections. Durations and schedules must be confirmed.",
  highlights: [
    "Time on the beach",
    "Discover the surrounding lagoon",
    "Explore island life with a local guide",
  ],
  tips: [
    "Respect local dress customs away from designated tourist beaches.",
    "Alcohol is not available on inhabited local islands.",
    "Confirm ferry schedules and leave time between connections.",
  ],
}));
const staySeeds: [
  string,
  string,
  Stay["propertyType"],
  string,
  number,
  Photo,
][] = [
  [
    "sunrise-water-villa",
    "Sunrise Water Villa",
    "Resort",
    "baa-atoll",
    680,
    "island",
  ],
  ["lagoon-house", "Lagoon House", "Boutique Stay", "fulidhoo", 180, "lagoon"],
  [
    "palm-garden-retreat",
    "Palm Garden Retreat",
    "Guesthouse",
    "thoddoo",
    85,
    "tropical",
  ],
  [
    "island-light-hotel",
    "Island Light Hotel",
    "Hotel",
    "maafushi",
    135,
    "beach",
  ],
  [
    "sand-and-sea",
    "Sand & Sea Hideaway",
    "Guesthouse",
    "dhigurah",
    110,
    "resort",
  ],
  [
    "blue-horizon-resort",
    "Blue Horizon Resort",
    "Resort",
    "ari-atoll",
    540,
    "villas",
  ],
];
export const stays: Stay[] = staySeeds.map(
  ([slug, title, propertyType, destination, price, photo], i) => ({
    id: slug,
    slug,
    title,
    propertyType,
    destination,
    price,
    photo,
    gallery: [photo, "beach", "lagoon", "sunset"],
    summary:
      i % 2
        ? "Barefoot comfort, thoughtful details, and the island at your doorstep."
        : "Wake up to an endless horizon and make room for a little wonder.",
    description:
      "A demonstration stay created to explore what your Maldives escape could feel like. Picture unhurried mornings, lagoon adventures, and time to reconnect. Our team can help you find real properties that suit your preferences; this sample is not a property available for reservation.",
    currency: "USD",
    priceUnit: "room / night",
    priceDisclaimer:
      "Demonstration indicative rate only. Taxes, transfers, meal plans, and seasonal supplements may be additional. Request a verified quote.",
    lastVerified: null,
    amenities:
      propertyType === "Resort"
        ? ["Wi-Fi", "Pool", "Spa", "Restaurant", "Beach access"]
        : ["Wi-Fi", "Restaurant", "Beach access", "Air conditioning"],
    rooms: [
      {
        name: propertyType === "Resort" ? "Water Villa" : "Island Room",
        beds: "1 king bed or 2 single beds, subject to confirmation",
        occupancy: "2 adults; child arrangements on request",
        size: "Illustrative layout · size to be confirmed",
      },
      {
        name: "Beach Suite",
        beds: "1 king bed and optional extra bed",
        occupancy: "Up to 3 guests, subject to property confirmation",
        size: "Illustrative layout · size to be confirmed",
      },
    ],
    mealPlans:
      propertyType === "Resort"
        ? ["Breakfast", "Half Board", "Full Board", "All Inclusive"]
        : ["Breakfast", "Half Board"],
    transfer:
      "Speedboat, seaplane, or domestic flight options depend on the selected real property. Routes, baggage allowances, cost, and operating times require confirmation.",
    policies: [
      "Sample property: actual terms must be supplied with a verified quote.",
      "Cancellation and amendment terms depend on the property and rate.",
      "Family arrangements, child ages, and extra beds must be confirmed.",
    ],
    checkIn: "To be confirmed with the property",
    checkOut: "To be confirmed with the property",
    featured: i < 3,
  }),
);
const experienceSeeds: [string, string, string, Photo, string[], number][] = [
  [
    "snorkeling",
    "A world beneath the surface",
    "Snorkeling",
    "sea",
    ["maafushi", "fulidhoo"],
    45,
  ],
  [
    "scuba-diving",
    "Dive into the extraordinary",
    "Scuba Diving",
    "lagoon",
    ["ari-atoll", "baa-atoll"],
    95,
  ],
  [
    "island-hopping",
    "One ocean. A thousand stories.",
    "Island Hopping",
    "island",
    ["maafushi", "thoddoo"],
    65,
  ],
  ["fishing", "Follow the evening tide", "Fishing", "sunset", ["fulidhoo"], 60],
  [
    "sandbank-visits",
    "Your own little piece of paradise",
    "Sandbank Visits",
    "beach",
    ["dhigurah", "maafushi"],
    75,
  ],
  [
    "dolphin-watching",
    "Meet the ocean’s free spirits",
    "Wildlife Encounters",
    "resort",
    ["baa-atoll", "dhigurah"],
    55,
  ],
  [
    "surfing",
    "Find your perfect wave",
    "Surfing",
    "tropical",
    ["maafushi"],
    85,
  ],
  [
    "private-excursions",
    "An ocean day, just for you",
    "Private Excursions",
    "villas",
    ["ari-atoll"],
    240,
  ],
];
export const experiences: Experience[] = experienceSeeds.map(
  ([slug, title, category, photo, destinations, price]) => ({
    id: slug,
    slug,
    title,
    category,
    photo,
    destinations,
    price,
    gallery: [photo, "sea", "sunset"],
    summary:
      "A different perspective on the Maldives, shaped around your sense of adventure.",
    duration: "Approximately 2–4 hours · illustrative",
    groupSize: "Small group or private · confirm with guide",
    difficulty:
      category === "Scuba Diving" || category === "Surfing"
        ? "Experience dependent"
        : "Suitable for a range of abilities",
    included: [
      "Local guide (sample inclusion)",
      "Activity equipment (confirm suitability)",
      "Drinking water",
    ],
    excluded: [
      "Island transfers unless specified",
      "Personal insurance",
      "Additional meals",
    ],
    requirements: [
      "Share swimming ability and relevant medical conditions with the operator.",
      "Confirm age limits, certification requirements, and equipment before travel.",
    ],
    safety:
      "Use a qualified operator, follow the guide’s briefing, and check weather and sea conditions. Diving requires appropriate medical clearance and training. Never touch or chase marine wildlife; sightings are never guaranteed.",
    itinerary: [
      "Meet your guide and discuss conditions.",
      "Equipment fitting and safety briefing.",
      "Explore at a comfortable pace with your guide.",
      "Return to the island and time to relax.",
    ],
    season:
      "Availability depends on conditions. Ask for advice for your travel dates; wildlife activity and sea conditions vary.",
    featured: true,
  }),
);
export const articles: Article[] = [
  {
    slug: "best-time-to-visit",
    title: "A season for every kind of escape",
    category: "Travel Essentials",
    photo: "island",
    summary:
      "Sunshine, sea conditions, and quieter months: find the season that suits you.",
    minutes: 5,
    content: [
      {
        heading: "Start with the experience you want",
        paragraphs: [
          "The Maldives is warm throughout the year, but the experience changes with the monsoon. There is no single perfect month for every island or every activity. Decide whether you care most about beach time, diving, surfing, or a quieter escape.",
        ],
      },
      {
        heading: "Understand the seasons",
        paragraphs: [
          "December to April is generally the drier season. May to November usually brings more rain and unsettled weather, though sunny periods are still common. These are broad patterns rather than a weather guarantee. Conditions vary between atolls.",
          "Rates often reflect demand around holidays and popular travel periods. Compare the full trip cost, including transfers and meals, rather than the room rate alone.",
        ],
      },
      {
        heading: "Leave room for the ocean",
        paragraphs: [
          "Marine sightings and snorkeling conditions cannot be promised. Ask an experienced local operator which sites suit your dates, and build flexibility into your plans. A calm day on a sheltered reef can be just as memorable as a famous excursion.",
        ],
      },
    ],
  },
  {
    slug: "island-transfers",
    title: "Your guide to getting between islands",
    category: "Planning Tips",
    photo: "lagoon",
    summary:
      "Speedboats, ferries, and flights — make the journey part of the adventure.",
    minutes: 6,
    content: [
      {
        heading: "Plan your arrival before choosing your stay",
        paragraphs: [
          "An island that looks close on a map may not have a convenient connection. Ask the property how its transfers align with your international arrival and departure.",
        ],
      },
      {
        heading: "Choose the right connection",
        paragraphs: [
          "Public ferries are often economical, but routes and operating days vary. Scheduled and private speedboats offer different flexibility and costs. More distant resorts may require a domestic flight or a seaplane, with separate baggage and daylight restrictions.",
          "Do not assume transfers between two resorts are direct. Some journeys require a return through the airport area. Obtain current written schedules and a full quote before committing.",
        ],
      },
      {
        heading: "Allow a little breathing space",
        paragraphs: [
          "Weather can disrupt connections. Leave a sensible buffer before an international flight and consider a final night near the airport when the route requires it.",
        ],
      },
    ],
  },
  {
    slug: "what-to-pack",
    title: "Pack light. Make room for memories.",
    category: "Travel Essentials",
    photo: "beach",
    summary: "A thoughtful packing list for easy island days.",
    minutes: 4,
    content: [
      {
        heading: "The everyday essentials",
        paragraphs: [
          "Bring light breathable clothes, swimwear, a sun hat, sunglasses, and suitable sun protection. A reusable water bottle and a small dry bag help on boat days.",
        ],
      },
      {
        heading: "Think beyond the beach",
        paragraphs: [
          "Pack modest clothing for inhabited islands and religious sites. A light layer helps in air-conditioned spaces, and footwear suitable for hot sand and boat decks is useful.",
          "Carry prescription medicines in their original packaging and check entry requirements for restricted items. Review baggage allowances if your transfer includes a small aircraft.",
        ],
      },
    ],
  },
  {
    slug: "resort-or-local-island",
    title: "Resort or local island? Find your rhythm.",
    category: "Island Guides",
    photo: "resort",
    summary:
      "Two beautiful ways to discover the Maldives, with very different everyday experiences.",
    minutes: 5,
    content: [
      {
        heading: "A resort escape",
        paragraphs: [
          "Resorts typically occupy their own islands and combine rooms, restaurants, and activities in one setting. Consider meal plans, transfer costs, and the facilities you will actually use.",
        ],
      },
      {
        heading: "A local island stay",
        paragraphs: [
          "Guesthouses on inhabited islands offer an opportunity to experience everyday life and visit local cafés. Tourist beaches have designated rules, local customs matter, and alcohol is not available.",
        ],
      },
      {
        heading: "You can combine both",
        paragraphs: [
          "A split stay can offer variety, but transfers need careful planning. Tell your travel specialist what you value and ask whether the additional travel time fits your trip.",
        ],
      },
    ],
  },
  {
    slug: "maldives-on-a-budget",
    title: "Extraordinary islands. A considered budget.",
    category: "Budget Travel",
    photo: "tropical",
    summary: "Spend thoughtfully without losing the magic of an island escape.",
    minutes: 4,
    content: [
      {
        heading: "Look at the whole trip",
        paragraphs: [
          "Start with accommodation, meals, taxes, and transfers. An attractive room rate is only one part of the cost. Ask for an itemized estimate and compare like for like.",
        ],
      },
      {
        heading: "Stay longer, move less",
        paragraphs: [
          "Choose one island with the experiences you want, share scheduled transfers where appropriate, and explore local food. Check what each excursion includes before comparing prices.",
        ],
      },
    ],
  },
  {
    slug: "best-experiences",
    title: "Six ways to fall in love with the ocean",
    category: "Activities",
    photo: "sea",
    summary: "From gentle lagoon swims to an evening on the water.",
    minutes: 5,
    content: [
      {
        heading: "Start slowly",
        paragraphs: [
          "A beach walk, a quiet swim, or watching the light change over the lagoon can be the beginning of a memorable day. Leave time for the island itself.",
        ],
      },
      {
        heading: "Explore responsibly",
        paragraphs: [
          "Try guided snorkeling, a sandbank picnic, a local island visit, or a sunset boat trip. Choose operators who respect wildlife and weather conditions. Never expect a guaranteed animal encounter.",
        ],
      },
    ],
  },
  {
    slug: "local-island-etiquette",
    title: "A warm welcome begins with respect",
    category: "Culture",
    photo: "sunset",
    summary: "A few thoughtful habits for visiting inhabited islands.",
    minutes: 4,
    content: [
      {
        heading: "Follow the island’s rhythm",
        paragraphs: [
          "Dress modestly away from designated tourist beaches and ask before photographing people. Be mindful around mosques and during prayer times.",
        ],
      },
      {
        heading: "Travel as a guest",
        paragraphs: [
          "Local islands are communities as well as destinations. Support local businesses, use refillable bottles where safe, and take care around fragile marine habitats. Ask your host if you are unsure about local customs.",
        ],
      },
    ],
  },
].map((a) => ({
  ...a,
  id: a.slug,
  photo: a.photo as Photo,
  gallery: [a.photo as Photo, "beach"],
  destinations: ["maafushi", "baa-atoll"],
  relatedArticles: [
    "best-time-to-visit",
    "island-transfers",
    "resort-or-local-island",
  ].filter((s) => s !== a.slug),
}));
export const destinationName = (slug: string) =>
  destinations.find((d) => d.slug === slug)?.title || slug;
export const demoNotice =
  "Demonstration collection · fictional stays and illustrative rates. Reference photography does not depict the named sample properties. Travel details require confirmation.";
