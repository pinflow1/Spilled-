export const CATEGORIES = [
  "For You",
  "Early Signals",
  "Tech",
  "Creators",
  "Culture",
  "Business",
  "Sports",
  "Politics",
];

export const TOP_STORIES = [
  {
    id: 1,
    rank: 1,
    status: "ACCELERATING",
    headline: "People think GPT outputs became less creative overnight",
    summary: "Creators and writers notice ChatGPT responses feel flatter, more templated.",
    timeAgo: "3h ago",
    growth: "740%",
    communities: 12,
    creators: 38,
    trend: [2,3,4,3,6,8,12,18,28,42],
    thread: [
      { id:1, content: "A wave of creators and writers noticed something strange...", source: "Reddit r/ChatGPT", time: "9:00 AM" },
      { id:2, content: "OpenAI has not responded publicly...", source: "X / Twitter", time: "11:00 AM" },
      { id:3, content: "Side-by-side comparison threads are going viral...", source: "X / Twitter", time: "1:00 PM", isDeveloping: true },
    ]
  },
  {
    id: 2,
    rank: 2,
    status: "RISING",
    headline: "A startup founder got exposed for faking users",
    summary: "A founder announced '50k active users' but public analytics showed only 1,200 visitors.",
    timeAgo: "4h ago",
    growth: "230%",
    communities: 8,
    creators: 15,
    trend: [1,2,2,3,4,5,7,9,11,14],
    thread: [
      { id:1, content: "A founder announced '50k active users' on X...", source: "Reddit r/startups", time: "8:00 AM" },
      { id:2, content: "The public Plausible dashboard...", source: "Hacker News", time: "10:30 AM" },
      { id:3, content: "Founder deleted the original tweet...", source: "Hacker News RSS", time: "1:00 PM", isDeveloping: true },
    ]
  },
  // ... add the rest of your top stories similarly
];

export const SPILL_FEED = [
  {
    id: 101,
    status: "RISING",
    timeAgo: "2h",
    headline: "People debate whether AI is making junior developers worse",
    summary: "Conversations are heating up on Reddit and X after a viral thread by a CTO.",
    growth: "180%",
    comments: 8,
    isPositive: true,
    thread: [ /* your thread data */ ]
  },
  // ... rest of spill feed
];
