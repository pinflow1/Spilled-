export const CATEGORIES = [
  "For You",
  "Early Signals",
  "Tech",
  "Creators",
  "Culture",
  "Business",
  "Sports",
  "Politics",
]

export const TOP_STORIES = [
  {
    id: 1, rank: 1, status: "ACCELERATING",
    headline: "People think GPT outputs became less creative overnight",
    growth: "740%", communities: 12, creators: 38,
    trend: [2,3,4,3,6,8,12,18,28,42],
    thread: [
      { id:1, content: "A wave of creators and writers noticed something strange: ChatGPT responses felt flatter, more templated. The observation spread fast.", source: "Reddit r/ChatGPT", time: "9:00 AM" },
      { id:2, content: "OpenAI has not responded publicly. But internal speculation on X is that a silent model update may have rolled out — with 'safety tuning' pulling creativity down.", source: "X / Twitter", time: "11:00 AM" },
      { id:3, content: "Side-by-side comparison threads are going viral. Same prompts, older vs newer outputs. The difference is visible enough to have 200k impressions in 6 hours.", source: "X / Twitter", time: "1:00 PM", isDeveloping: true },
    ]
  },
  {
    id: 2, rank: 2, status: "RISING",
    headline: "A startup founder got exposed for faking users",
    growth: "230%", communities: 8, creators: 15,
    trend: [1,2,2,3,4,5,7,9,11,14],
    thread: [
      { id:1, content: "A founder announced '50k active users' on X to celebrate a funding round. A dev noticed the site's public analytics told a very different story.", source: "Reddit r/startups", time: "8:00 AM" },
      { id:2, content: "The public Plausible dashboard (left accidentally public) showed 1,200 monthly visitors. The discrepancy triggered a full community investigation.", source: "Hacker News", time: "10:30 AM" },
      { id:3, content: "Founder deleted the original tweet. Investors are reportedly asking questions. This is now the top post on HN with 800+ comments.", source: "Hacker News RSS", time: "1:00 PM", isDeveloping: true },
    ]
  },
  {
    id: 3, rank: 3, status: "TRENDING",
    headline: "TikTok users are obsessed with obsolete digital cameras",
    growth: "120%", communities: 5, creators: 7,
    trend: [3,3,4,4,5,6,6,7,8,9],
    thread: [
      { id:1, content: "Y2K-era point-and-shoot cameras like the Canon IXUS and Olympus Stylus are selling out on eBay. Gen Z is driving the trend — they want the grainy, low-res aesthetic.", source: "Reddit r/analog", time: "7:00 AM" },
      { id:2, content: "TikTok's #digitalcamera tag has 2.1B views. New videos are being posted every minute. The filter trying to replicate the look has 400M uses.", source: "TikTok trending", time: "10:00 AM" },
    ]
  },
  {
    id: 4, rank: 4, status: "TRENDING",
    headline: "YouTube is testing a new layout inside its mobile app",
    growth: "68%", communities: 3, creators: 4,
    trend: [1,2,2,3,3,4,4,5,5,6],
    thread: [
      { id:1, content: "YouTube is A/B testing a redesigned mobile home feed — replacing the thumbnail grid with a fullscreen vertical scroll, closer to TikTok and Reels.", source: "Reddit r/youtube", time: "6:00 AM" },
      { id:2, content: "Creators are split. Some welcome the discoverability boost. Others worry it buries longer content in favor of shorts-style engagement.", source: "Reddit r/NewTubers", time: "9:00 AM" },
    ]
  },
]

export const SPILL_FEED = [
  {
    id: 101, status: "RISING", timeAgo: "2h",
    headline: "People debate whether AI is making junior developers worse",
    summary: "Conversations are heating up on Reddit and X after a viral thread by a CTO.",
    growth: "180%", comments: 8, isPositive: true,
    thread: [
      { id:1, content: "A CTO's tweet about AI making junior devs 'intellectually lazy' has sparked one of the biggest debates in tech communities this week. The original post has 47k likes and 12k reposts.", source: "X / Twitter", time: "10:00 AM" },
      { id:2, content: "Reddit's r/cscareerquestions is split. Top comment with 8k upvotes argues AI tools are just 'the new Stack Overflow.' Second top comment disagrees hard.", source: "Reddit r/cscareerquestions", time: "11:30 AM" },
      { id:3, content: "Three YC founders have now weighed in on both sides. One says they've stopped hiring juniors entirely. Another calls that 'lazy management.'", source: "X / Twitter", time: "1:00 PM" },
      { id:4, content: "The thread is still accelerating. Google Trends shows 'AI junior developer' up 340% in 24 hours.", source: "Google Trends", time: "3:00 PM", isDeveloping: true },
    ]
  },
  {
    id: 102, status: "EARLY SIGNAL", timeAgo: "3h",
    headline: "A niche productivity app suddenly gained 400k users",
    summary: "No ads, no influencers — just a Reddit post that blew up.",
    growth: "96%", comments: 3, isPositive: true,
    thread: [
      { id:1, content: "A productivity app called Structured quietly hit 400k new signups in 72 hours after a single Reddit post in r/productivity went viral.", source: "Reddit r/productivity", time: "8:00 AM" },
      { id:2, content: "The post described a workflow for ADHD users. 6.2k upvotes in 48 hours. Comments flooded with people saying it was 'the first app that actually works.'", source: "Reddit r/ADHD", time: "10:00 AM" },
      { id:3, content: "App Store ranking jumped from #842 to #12 in Productivity in under 48 hours. Developer confirmed servers are 'barely keeping up.'", source: "App Store RSS", time: "12:00 PM" },
    ]
  },
  {
    id: 103, status: "TRENDING", timeAgo: "4h",
    headline: "YouTube creators are copying a new editing style",
    summary: 'Shorts with "film burn + zoom" edits are going viral.',
    growth: "75%", comments: 6, isPositive: true,
    thread: [
      { id:1, content: "A specific editing style combining VHS film burn transitions with aggressive push-zoom cuts is dominating YouTube Shorts. Originated from one creator with 180k subs 3 weeks ago.", source: "Reddit r/NewTubers", time: "6:00 AM" },
      { id:2, content: "The original video has 14M views. At least 340 creators have posted identical edits. TikTok is starting to pick it up too.", source: "YouTube RSS", time: "8:00 AM" },
      { id:3, content: "CapCut already has a template for the exact edit — downloaded 800k times in 5 days. Brands will copy this within two weeks.", source: "Reddit r/videography", time: "10:00 AM" },
    ]
  },
  {
    id: 104, status: "EARLY SIGNAL", timeAgo: "5h",
    headline: "Indie hackers are switching to a new AI coding tool",
    summary: "Quiet launch but dev communities are loving it.",
    growth: "-32%", comments: 2, isPositive: false,
    thread: [
      { id:1, content: "A new AI coding assistant called Void launched quietly on GitHub with zero marketing. Within 48 hours it had 12k stars and was trending #1 on Hacker News.", source: "Hacker News RSS", time: "5:00 AM" },
      { id:2, content: "Key differentiator: runs fully locally, no data leaves your machine. In a week of AI privacy controversies, the timing could not be better.", source: "Reddit r/selfhosted", time: "7:00 AM" },
    ]
  },
  {
    id: 105, status: "COOLING DOWN", timeAgo: "6h",
    headline: 'The "5am club" trend is losing steam',
    summary: "Engagement on morning routine content down 40% vs last month.",
    growth: "-18%", comments: 12, isPositive: false,
    thread: [
      { id:1, content: "Data from multiple creator analytics tools shows morning routine content has seen a 40% drop in average engagement over the past 30 days.", source: "Google Trends", time: "4:00 AM" },
      { id:2, content: "The trend peaked in February. Top creators are quietly pivoting to 'realistic morning' content as a counter-trend.", source: "Reddit r/NewTubers", time: "6:00 AM" },
    ]
  },
]
