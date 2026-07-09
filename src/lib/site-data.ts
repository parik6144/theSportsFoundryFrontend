import {
  Dumbbell,
  Users,
  GraduationCap,
  Handshake,
  Building2,
  Trophy,
  Heart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ServiceId =
  | "athletes"
  | "teams"
  | "academies"
  | "brands"
  | "corporate"
  | "events"
  | "community"
  | "underprivileged";

export type PageId =
  | "home"
  | "about"
  | "services"
  | ServiceId
  | "athletes-hub"
  | "teams-hub"
  | "academies-hub"
  | "brands-hub"
  | "corporate-hub"
  | "events-hub"
  | "community-hub"
  | "underprivileged-hub"
  | "blog"
  | "success-stories"
  | "contact"
  | "terms"
  | "privacy"
  | "cookies"
  | "auth";

const SERVICE_PAGE_IDS: ServiceId[] = [
  "underprivileged",
  "athletes",
  "teams",
  "academies",
  "brands",
  "corporate",
  "events",
  "community",
];

export const HUB_PAGE_IDS = [
  "underprivileged-hub",
  "athletes-hub",
  "teams-hub",
  "academies-hub",
  "brands-hub",
  "corporate-hub",
  "events-hub",
  "community-hub",
] as const satisfies readonly PageId[];

/** Pages available from the public site navigation. */
export const OPEN_PAGES: readonly PageId[] = [
  "home",
  "about",
  "contact",
  "terms",
  "privacy",
  "cookies",
  "services",
  ...SERVICE_PAGE_IDS,
  ...HUB_PAGE_IDS,
] as const;

export function isHubPage(page: PageId): page is (typeof HUB_PAGE_IDS)[number] {
  return (HUB_PAGE_IDS as readonly string[]).includes(page);
}

export function isServicePage(page: PageId): page is ServiceId {
  return SERVICE_PAGE_IDS.includes(page as ServiceId);
}

export function isPageOpen(page: PageId): boolean {
  return (OPEN_PAGES as readonly string[]).includes(page);
}


export interface Service {
  id: ServiceId;
  index: number;
  title: string;
  tagline: string;
  icon: LucideIcon;
  short: string;
  overview: string;
  forWhom: { title: string; body: string };
  bullets: { title: string; body: string }[];
  howItWorks: string[];
  cta: string;
  hubId: PageId;
}

export const SERVICES: Service[] = [
  {
    id: "underprivileged",
    index: 1,
    title: "Promotes Sports Among the Underprivileged",
    tagline: "Using sport to inspire and build brighter futures.",
    icon: Sparkles,
    short:
      "We create opportunities for underprivileged children by improving access to coaching, equipment, competitions, and mentorship.",
    overview:
      "The Sports Foundry creates opportunities for underprivileged children by improving access to coaching, equipment, competitions, and mentorship. Through partnerships and community initiatives, we use sport as a tool to inspire, develop talent, and create brighter futures.",
    forWhom: {
      title: "For the Next Generation",
      body: "Every child deserves a fair shot at sport. We work with NGOs, schools, and volunteers to make access a reality, not a privilege.",
    },
    bullets: [
      {
        title: "Coaching Access",
        body: "Free and subsidised coaching camps in underserved communities, run by verified coaches.",
      },
      {
        title: "Equipment Support",
        body: "Equipment banks that lend, donate, and recycle kit — so cost never blocks a child's path.",
      },
      {
        title: "Competition Exposure",
        body: "Pathway tournaments that identify talent and route it into structured academies.",
      },
      {
        title: "Mentorship",
        body: "Each supported child is paired with a mentor — an athlete, coach, or community leader.",
      },
    ],
    howItWorks: [
      "Send an enquiry",
      "Tell us how you want to partner, volunteer, or support",
      "We connect by email with clear next steps",
    ],
    cta: "Send an Enquiry",
    hubId: "underprivileged-hub",
  },
  {
    id: "athletes",
    index: 2,
    title: "Connects Athletes",
    tagline: "Discover opportunities. Build a career.",
    icon: Dumbbell,
    short:
      "We help athletes discover opportunities with teams, brands, academies, coaches, and tournaments.",
    overview:
      "The Sports Foundry helps athletes discover opportunities with teams, brands, academies, coaches, and tournaments. Whether you're a rising amateur or a seasoned pro, we put your talent in front of the people who matter and give you the tools to manage your career.",
    forWhom: {
      title: "For Athletes",
      body: "Create a verified profile, showcase stats & highlights, and get discovered by scouts, teams, and brands looking for talent exactly like you.",
    },
    bullets: [
      {
        title: "Verified Profiles",
        body: "Build a verified, multimedia-rich athlete profile with stats, video highlights, achievements, and career history.",
      },
      {
        title: "Opportunity Types",
        body: "Team trials, academy scholarships, brand endorsements, tournament invites, coaching access — all in one feed.",
      },
      {
        title: "Direct Messaging",
        body: "Connect directly with teams, brands, and academies who shortlist you. No middlemen, no waiting.",
      },
    ],
    howItWorks: [
      "Send an athlete enquiry",
      "Share your sport, level & goals",
      "We connect you with trials, academies & opportunities",
    ],
    cta: "Enquire as an Athlete",
    hubId: "athletes-hub",
  },
  {
    id: "teams",
    index: 3,
    title: "Onboards Teams",
    tagline: "Recruit, manage, and grow — all in one place.",
    icon: Users,
    short:
      "We enable teams to recruit players, manage registrations, build their digital presence, and streamline operations.",
    overview:
      "From grassroots clubs to professional franchises, The Sports Foundry gives teams the tools to recruit, register, and operate — while building a digital presence that fans and sponsors can engage with.",
    forWhom: {
      title: "For Teams",
      body: "From grassroots clubs to professional franchises — our tools scale with your team size, so you only pay attention to what matters: performance.",
    },
    bullets: [
      {
        title: "Player Recruitment",
        body: "Post open trials, browse verified athlete profiles, shortlist candidates, and manage applications in one dashboard.",
      },
      {
        title: "Registration Management",
        body: "Handle player registrations, contracts, and compliance paperwork with templated workflows.",
      },
      {
        title: "Digital Team Profile",
        body: "A polished, fan-facing team page with roster, fixtures, results, sponsors, and merchandise links.",
      },
      {
        title: "Operations Dashboard",
        body: "Roster, schedule, attendance, travel, and budget — all in one operations cockpit for managers.",
      },
    ],
    howItWorks: [
      "Send a team enquiry",
      "Share your sport, city & roster needs",
      "We connect you for recruitment & registrations",
    ],
    cta: "Enquire About Your Team",
    hubId: "teams-hub",
  },
  {
    id: "academies",
    index: 4,
    title: "Partners with Academies",
    tagline: "Wider reach. Real talent. New opportunities.",
    icon: GraduationCap,
    short:
      "We collaborate with sports academies to increase their reach, attract talent, and promote their programs.",
    overview:
      "The Sports Foundry partners with academies to widen their reach, attract talent, and promote their programs — while opening new commercial and event-partnership opportunities for them.",
    forWhom: {
      title: "For Academies",
      body: "Academies gain access to athletes, events, and commercial opportunities — all routed through a single partnership with The Sports Foundry.",
    },
    bullets: [
      {
        title: "Program Promotion",
        body: "List your camps, scholarships, and coaching programs to a network of athletes looking for the next step.",
      },
      {
        title: "Talent Pipeline",
        body: "Get matched with athletes based on sport, level, and location — building a sustainable talent pipeline.",
      },
      {
        title: "Event Partnerships",
        body: "Co-host tournaments, leagues, and showcase events with The Sports Foundry and partner brands.",
      },
      {
        title: "Commercial Tie-ups",
        body: "Connect with brands and corporates for sponsorships, equipment deals, and infrastructure investments.",
      },
    ],
    howItWorks: [
      "Partner with us",
      "List your programs",
      "Attract talent & opportunities",
    ],
    cta: "Become a Partner Academy",
    hubId: "academies-hub",
  },
  {
    id: "brands",
    index: 5,
    title: "Connects Brands",
    tagline: "Strategic partnerships. Measurable returns.",
    icon: Handshake,
    short:
      "We connect brands with athletes, teams, leagues, and sporting events through strategic partnerships.",
    overview:
      "The Sports Foundry connects brands with athletes, teams, leagues, and sporting events through strategic partnerships designed to maximise engagement and measurable returns.",
    forWhom: {
      title: "For Brands",
      body: "Every collaboration is designed to maximise engagement and measurable returns — from awareness to conversion.",
    },
    bullets: [
      {
        title: "Athlete Endorsements",
        body: "Discover and partner with verified athletes whose audience and values align with your brand.",
      },
      {
        title: "Team & League Sponsorships",
        body: "Sponsor teams, leagues, and tournaments with package templates, audience analytics, and ROI tracking.",
      },
      {
        title: "Event Title Partnerships",
        body: "Become the title partner of marquee events with full branding, hospitality, and content rights.",
      },
      {
        title: "Content Collaborations",
        body: "Co-create content with athletes and teams — from social-first campaigns to long-form storytelling.",
      },
    ],
    howItWorks: [
      "Share your objectives",
      "Get matched with partners",
      "Launch campaign & track results",
    ],
    cta: "Explore Brand Partnerships",
    hubId: "brands-hub",
  },
  {
    id: "corporate",
    index: 6,
    title: "Manages Corporate Sports",
    tagline: "Build culture through sport.",
    icon: Building2,
    short:
      "We design and execute corporate sports leagues, wellness programs, and employee engagement initiatives.",
    overview:
      "The Sports Foundry designs and executes corporate sports leagues, wellness programs, and employee engagement initiatives — professionally managed sporting experiences that build culture and teamwork.",
    forWhom: {
      title: "For Companies",
      body: "Professionally managed sporting experiences that build culture, teamwork, and employee wellbeing — without lifting internal bandwidth.",
    },
    bullets: [
      {
        title: "Inter-Company Leagues",
        body: "Multi-sport leagues across departments or companies — fully scheduled, officiated, and broadcast-ready.",
      },
      {
        title: "Wellness Challenges",
        body: "Step, fitness, and wellbeing challenges with leaderboards, milestones, and rewards.",
      },
      {
        title: "Team-Building Sports Days",
        body: "Off-site sports days designed to break silos and build cross-functional trust.",
      },
      {
        title: "Employee Engagement",
        body: "Year-round engagement calendar with live events, content, and recognition programs.",
      },
    ],
    howItWorks: [
      "Consultation",
      "Custom program design",
      "End-to-end execution",
    ],
    cta: "Plan a Corporate Sports Program",
    hubId: "corporate-hub",
  },
  {
    id: "events",
    index: 7,
    title: "Organizes Events",
    tagline: "Tournaments, leagues, and competitions — seamlessly delivered.",
    icon: Trophy,
    short:
      "We plan and deliver end-to-end sporting events, from tournaments and leagues to pro-ams and corporate competitions.",
    overview:
      "The Sports Foundry plans and delivers end-to-end sporting events — tournaments, leagues, pro-ams, and corporate competitions. Our team manages every aspect, ensuring a seamless experience for participants, sponsors, and fans.",
    forWhom: {
      title: "For Event Owners",
      body: "Whether you're a federation, brand, corporate, or community — we deliver events that look premium on broadcast and feel smooth on the ground.",
    },
    bullets: [
      {
        title: "Tournaments",
        body: "Single-day to multi-week tournaments with draws, scheduling, officiating, and live scoring.",
      },
      {
        title: "Leagues",
        body: "League formats with regular season, playoffs, and finals — complete with stats and standings.",
      },
      {
        title: "Pro-Ams",
        body: "Pro-am formats that pair professionals with amateurs for high-engagement, brand-friendly events.",
      },
      {
        title: "Corporate Competitions",
        body: "Custom-branded corporate competitions with hospitality, awards, and content capture.",
      },
    ],
    howItWorks: ["Plan", "Organise", "Execute", "Report"],
    cta: "Host an Event With Us",
    hubId: "events-hub",
  },
  {
    id: "community",
    index: 8,
    title: "Builds a Community",
    tagline: "One platform. Every stakeholder.",
    icon: Heart,
    short:
      "We bring together athletes, fans, coaches, academies, and brands on one platform.",
    overview:
      "The Sports Foundry brings together athletes, fans, coaches, academies, and brands on one platform. Through networking, content, and shared experiences, we create a thriving sports community.",
    forWhom: {
      title: "For Everyone",
      body: "Whether you live and breathe sport or just want to follow your favourite athletes — there's a place for you here.",
    },
    bullets: [
      {
        title: "Discussion Feed",
        body: "Sport-specific discussions, fan reactions, coach Q&As, and behind-the-scenes content.",
      },
      {
        title: "Athlete Spotlights",
        body: "Weekly spotlights on rising and proven athletes across sports — discover new favourites.",
      },
      {
        title: "Event Highlights",
        body: "Short-form and long-form highlights from events across the platform.",
      },
      {
        title: "Direct Networking",
        body: "Connect directly with athletes, coaches, academies, and brands that share your interests.",
      },
    ],
    howItWorks: [
      "Send an enquiry",
      "Tell us your sport & interests",
      "We connect you with the right people and updates",
    ],
    cta: "Send an Enquiry",
    hubId: "community-hub",
  },
];

export interface NavItem {
  id: PageId;
  label: string;
}

export const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Company",
    items: [
      { id: "home", label: "Home" },
      { id: "about", label: "About Us" },
      { id: "contact", label: "Contact" },
    ],
  },
  {
    label: "What We Do",
    items: [
      { id: "services", label: "All Services" },
      ...SERVICES.map((s) => ({ id: s.id, label: s.title })),
    ],
  },
  {
    label: "Hubs",
    items: [
      { id: "underprivileged-hub", label: "Underprivileged Initiative" },
      { id: "athletes-hub", label: "Athletes Hub" },
      { id: "teams-hub", label: "Teams Hub" },
      { id: "academies-hub", label: "Academies Hub" },
      { id: "brands-hub", label: "Brands & Partners" },
      { id: "corporate-hub", label: "Corporate Sports" },
      { id: "events-hub", label: "Events & Tournaments" },
      { id: "community-hub", label: "Community" },
    ],
  },
];

export const IMPACT_STATS = [
  { value: 12500, suffix: "+", label: "Athletes Connected" },
  { value: 850, suffix: "+", label: "Teams Supported" },
  { value: 320, suffix: "+", label: "Events Organised" },
  { value: 140, suffix: "+", label: "Academies Partnered" },
];

export interface Partner {
  name: string;
  tag: string;
}

export const PARTNERS: Partner[] = [
  { name: "Bengal Tigers FC", tag: "Football" },
  { name: "Apex Cricket Academy", tag: "Cricket" },
  { name: "Velocity Sports", tag: "Brand" },
  { name: "Mumbai Pro League", tag: "League" },
  { name: "Phoenix Hoops", tag: "Basketball" },
  { name: "IronBody Nutrition", tag: "Brand" },
  { name: "Riverside Hockey Club", tag: "Hockey" },
  { name: "Zenith Wear", tag: "Brand" },
  { name: "Coastal Volley Academy", tag: "Volleyball" },
  { name: "Strive Wellness", tag: "Corporate" },
];

export interface FeaturedEvent {
  id: string;
  title: string;
  sport: string;
  location: string;
  date: string;
  registrationOpen: boolean;
  accent: string;
}

export const FEATURED_EVENTS: FeaturedEvent[] = [
  {
    id: "evt-1",
    title: "Metro Premier Football Cup 2026",
    sport: "Football",
    location: "Mumbai, IN",
    date: "Aug 14 – Aug 28, 2026",
    registrationOpen: true,
    accent: "from-emerald-400/30 to-emerald-700/10",
  },
  {
    id: "evt-2",
    title: "All-India Junior Badminton Open",
    sport: "Badminton",
    location: "Bengaluru, IN",
    date: "Sep 02 – Sep 05, 2026",
    registrationOpen: true,
    accent: "from-amber-400/30 to-amber-700/10",
  },
  {
    id: "evt-3",
    title: "Corporate Cricket Premier League",
    sport: "Cricket",
    location: "Delhi NCR, IN",
    date: "Sep 18 – Oct 09, 2026",
    registrationOpen: true,
    accent: "from-rose-400/30 to-rose-700/10",
  },
  {
    id: "evt-4",
    title: "Coastal Open Beach Volleyball",
    sport: "Volleyball",
    location: "Goa, IN",
    date: "Oct 12 – Oct 14, 2026",
    registrationOpen: false,
    accent: "from-sky-400/30 to-sky-700/10",
  },
  {
    id: "evt-5",
    title: "National Pro-Am Golf Classic",
    sport: "Golf",
    location: "Pune, IN",
    date: "Nov 06 – Nov 08, 2026",
    registrationOpen: true,
    accent: "from-violet-400/30 to-violet-700/10",
  },
];

export interface Athlete {
  id: string;
  name: string;
  sport: string;
  level: string;
  location: string;
  age: number;
  initials: string;
  accent: string;
  stats: { label: string; value: string }[];
}

export const ATHLETES: Athlete[] = [
  {
    id: "a1",
    name: "Aarav Mehta",
    sport: "Football",
    level: "Semi-Pro",
    location: "Mumbai, IN",
    age: 21,
    initials: "AM",
    accent: "from-emerald-400 to-emerald-700",
    stats: [
      { label: "Goals", value: "42" },
      { label: "Assists", value: "18" },
      { label: "Matches", value: "67" },
    ],
  },
  {
    id: "a2",
    name: "Diya Sharma",
    sport: "Badminton",
    level: "National",
    location: "Hyderabad, IN",
    age: 19,
    initials: "DS",
    accent: "from-amber-400 to-amber-700",
    stats: [
      { label: "Wins", value: "84" },
      { label: "Rank", value: "#23" },
      { label: "Titles", value: "7" },
    ],
  },
  {
    id: "a3",
    name: "Kabir Singh",
    sport: "Cricket",
    level: "U-23 State",
    location: "Delhi, IN",
    age: 22,
    initials: "KS",
    accent: "from-rose-400 to-rose-700",
    stats: [
      { label: "Runs", value: "1,420" },
      { label: "Avg", value: "48.6" },
      { label: "100s", value: "4" },
    ],
  },
  {
    id: "a4",
    name: "Ananya Iyer",
    sport: "Athletics",
    level: "National",
    location: "Bengaluru, IN",
    age: 24,
    initials: "AI",
    accent: "from-sky-400 to-sky-700",
    stats: [
      { label: "100m PB", value: "11.42s" },
      { label: "200m PB", value: "23.81s" },
      { label: "Medals", value: "11" },
    ],
  },
  {
    id: "a5",
    name: "Rohan Pillai",
    sport: "Basketball",
    level: "Pro League",
    location: "Chennai, IN",
    age: 25,
    initials: "RP",
    accent: "from-violet-400 to-violet-700",
    stats: [
      { label: "PPG", value: "21.4" },
      { label: "RPG", value: "8.2" },
      { label: "APG", value: "5.1" },
    ],
  },
  {
    id: "a6",
    name: "Meera Nair",
    sport: "Tennis",
    level: "ITF Circuit",
    location: "Kochi, IN",
    age: 20,
    initials: "MN",
    accent: "from-teal-400 to-teal-700",
    stats: [
      { label: "W-L", value: "54-29" },
      { label: "Rank", value: "#348" },
      { label: "Titles", value: "3" },
    ],
  },
];

export interface Team {
  id: string;
  name: string;
  sport: string;
  city: string;
  level: string;
  openTrials: boolean;
  initials: string;
  accent: string;
}

export const TEAMS: Team[] = [
  {
    id: "t1",
    name: "Bengal Tigers FC",
    sport: "Football",
    city: "Kolkata, IN",
    level: "Pro League",
    openTrials: true,
    initials: "BT",
    accent: "from-emerald-400 to-emerald-700",
  },
  {
    id: "t2",
    name: "Phoenix Hoops",
    sport: "Basketball",
    city: "Mumbai, IN",
    level: "National",
    openTrials: true,
    initials: "PH",
    accent: "from-violet-400 to-violet-700",
  },
  {
    id: "t3",
    name: "Riverside Hockey Club",
    sport: "Hockey",
    city: "Pune, IN",
    level: "State",
    openTrials: false,
    initials: "RH",
    accent: "from-sky-400 to-sky-700",
  },
  {
    id: "t4",
    name: "Strikers Cricket Club",
    sport: "Cricket",
    city: "Delhi, IN",
    level: "Pro League",
    openTrials: true,
    initials: "SC",
    accent: "from-rose-400 to-rose-700",
  },
  {
    id: "t5",
    name: "Coastal Spikers",
    sport: "Volleyball",
    city: "Goa, IN",
    level: "National",
    openTrials: true,
    initials: "CS",
    accent: "from-amber-400 to-amber-700",
  },
  {
    id: "t6",
    name: "Apex Athletics Club",
    sport: "Athletics",
    city: "Bengaluru, IN",
    level: "State",
    openTrials: false,
    initials: "AA",
    accent: "from-teal-400 to-teal-700",
  },
];

export interface Academy {
  id: string;
  name: string;
  sport: string;
  city: string;
  programs: string[];
  initials: string;
  accent: string;
}

export const ACADEMIES: Academy[] = [
  {
    id: "ac1",
    name: "Apex Cricket Academy",
    sport: "Cricket",
    city: "Mumbai, IN",
    programs: ["Senior Pro", "U-19 Elite", "Weekend Warriors"],
    initials: "AC",
    accent: "from-rose-400 to-rose-700",
  },
  {
    id: "ac2",
    name: "Velocity Football School",
    sport: "Football",
    city: "Bengaluru, IN",
    programs: ["Youth Development", "Pro Pathway", "Goalkeeper Clinic"],
    initials: "VF",
    accent: "from-emerald-400 to-emerald-700",
  },
  {
    id: "ac3",
    name: "Smash Shuttle Academy",
    sport: "Badminton",
    city: "Hyderabad, IN",
    programs: ["Beginner", "Tournament Prep", "Doubles Specialist"],
    initials: "SS",
    accent: "from-amber-400 to-amber-700",
  },
  {
    id: "ac4",
    name: "Hoop Dreams Basketball",
    sport: "Basketball",
    city: "Chennai, IN",
    programs: ["Skills Lab", "Strength & Conditioning", "Scrimmage League"],
    initials: "HD",
    accent: "from-violet-400 to-violet-700",
  },
  {
    id: "ac5",
    name: "Track & Field Titans",
    sport: "Athletics",
    city: "Pune, IN",
    programs: ["Sprint Squad", "Endurance Group", "Jumps & Throws"],
    initials: "TT",
    accent: "from-sky-400 to-sky-700",
  },
  {
    id: "ac6",
    name: "Ace Tennis Ranch",
    sport: "Tennis",
    city: "Kochi, IN",
    programs: ["Junior ATP Path", "ITF Circuit Prep", "Adult Rec"],
    initials: "AT",
    accent: "from-teal-400 to-teal-700",
  },
];

export interface Brand {
  id: string;
  name: string;
  industry: string;
  initials: string;
  accent: string;
  partnership: string;
}

export const BRANDS: Brand[] = [
  { id: "b1", name: "Velocity Sports", industry: "Apparel", initials: "VS", accent: "from-emerald-400 to-emerald-700", partnership: "Title Partner" },
  { id: "b2", name: "IronBody Nutrition", industry: "Nutrition", initials: "IB", accent: "from-rose-400 to-rose-700", partnership: "Endorsement Partner" },
  { id: "b3", name: "Zenith Wear", industry: "Footwear", initials: "ZW", accent: "from-sky-400 to-sky-700", partnership: "Team Sponsor" },
  { id: "b4", name: "Strive Wellness", industry: "Wellness", initials: "SW", accent: "from-violet-400 to-violet-700", partnership: "Corporate Partner" },
  { id: "b5", name: "Pulse Energy", industry: "Beverages", initials: "PE", accent: "from-amber-400 to-amber-700", partnership: "Event Partner" },
  { id: "b6", name: "Nova Sports Network", industry: "Media", initials: "NS", accent: "from-teal-400 to-teal-700", partnership: "Broadcast Partner" },
];

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tm1",
    quote:
      "I went from playing college football to a pro trial in 6 weeks. The profile tools and direct team messaging changed my career trajectory.",
    name: "Aarav Mehta",
    role: "Athlete, Football",
    initials: "AM",
    accent: "from-emerald-400 to-emerald-700",
  },
  {
    id: "tm2",
    quote:
      "We recruited 4 verified players in our last window without spending on scouts. The dashboard alone paid for itself.",
    name: "Reena Kapoor",
    role: "Owner, Bengal Tigers FC",
    initials: "RK",
    accent: "from-rose-400 to-rose-700",
  },
  {
    id: "tm3",
    quote:
      "Our academy's enrolment doubled in a single season. The athlete matching system sends us exactly the right kind of talent.",
    name: "Coach Vikram Rao",
    role: "Director, Apex Cricket Academy",
    initials: "VR",
    accent: "from-amber-400 to-amber-700",
  },
  {
    id: "tm4",
    quote:
      "The campaign analytics alone are worth it. We can see exactly which athlete drove which conversions — finally, sports marketing with real ROI.",
    name: "Sanjana Gupta",
    role: "Brand Lead, Velocity Sports",
    initials: "SG",
    accent: "from-violet-400 to-violet-700",
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  initials: string;
  accent: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "p1",
    title: "How AI Matching Is Quietly Reshaping Sports Recruitment",
    excerpt:
      "We dive into the recommendation layer behind The Sports Foundry — how it ranks athletes against team needs, and why it beats traditional scouting.",
    category: "Platform Updates",
    date: "Jun 28, 2026",
    readTime: "6 min read",
    initials: "AI",
    accent: "from-violet-400 to-violet-700",
  },
  {
    id: "p2",
    title: "Inside the Metro Premier Football Cup 2026 Draw",
    excerpt:
      "The full bracket is out. Here's how the 32 teams stack up, the dark horses, and the players to watch this season.",
    category: "Sports News",
    date: "Jun 22, 2026",
    readTime: "4 min read",
    initials: "MP",
    accent: "from-emerald-400 to-emerald-700",
  },
  {
    id: "p3",
    title: "Brand–Athlete Fit: 5 Principles We Live By",
    excerpt:
      "Endorsements work only when values align. Here's how we evaluate fit before we ever make a match.",
    category: "Insights",
    date: "Jun 15, 2026",
    readTime: "5 min read",
    initials: "BR",
    accent: "from-amber-400 to-amber-700",
  },
  {
    id: "p4",
    title: "Why 1,200 Children Got Their First Coaching Camp This Year",
    excerpt:
      "A look back at our underprivileged sports initiative's first year — the partnerships, the coaches, and the moments that made it real.",
    category: "CSR",
    date: "Jun 09, 2026",
    readTime: "7 min read",
    initials: "UI",
    accent: "from-rose-400 to-rose-700",
  },
  {
    id: "p5",
    title: "Corporate Sports Leagues: The Engagement Multiplier",
    excerpt:
      "Data from 40+ companies shows how a structured sports league boosts retention, cross-team collaboration, and even NPS.",
    category: "Insights",
    date: "Jun 02, 2026",
    readTime: "5 min read",
    initials: "CS",
    accent: "from-sky-400 to-sky-700",
  },
  {
    id: "p6",
    title: "The Sports Foundry Raises Series B to Expand Across South Asia",
    excerpt:
      "Our Series B will fund expansion into Sri Lanka, Bangladesh, and Nepal — and a deeper investment in our recommendation engine.",
    category: "Press Releases",
    date: "May 26, 2026",
    readTime: "3 min read",
    initials: "PR",
    accent: "from-teal-400 to-teal-700",
  },
];

export interface SuccessStory {
  id: string;
  title: string;
  subject: string;
  outcome: string;
  sport: string;
  excerpt: string;
  initials: string;
  accent: string;
}

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "s1",
    title: "From College League to Pro Contract in One Window",
    subject: "Aarav Mehta",
    outcome: "Pro Contract with Bengal Tigers FC",
    sport: "Football",
    excerpt:
      "Aarav uploaded 3 match clips and updated his stats on The Sports Foundry. Within 6 weeks, he was trialling with three pro clubs — and signed his first pro deal.",
    initials: "AM",
    accent: "from-emerald-400 to-emerald-700",
  },
  {
    id: "s2",
    title: "Academy Enrolment Doubled in a Single Season",
    subject: "Apex Cricket Academy",
    outcome: "+104% Enrolment YoY",
    sport: "Cricket",
    excerpt:
      "By listing programs on The Sports Foundry and using the talent-match feed, Apex reached full capacity in 4 months and opened a second campus.",
    initials: "AC",
    accent: "from-rose-400 to-rose-700",
  },
  {
    id: "s3",
    title: "A 12-City Brand Activation in 8 Weeks",
    subject: "Velocity Sports × The Sports Foundry",
    outcome: "12 City Stops, 4.2M Impressions",
    sport: "Multi-sport",
    excerpt:
      "Velocity Sports wanted a pan-India athlete-driven launch. We matched them with 24 athletes across 12 cities — fully activated in 8 weeks.",
    initials: "VS",
    accent: "from-violet-400 to-violet-700",
  },
  {
    id: "s4",
    title: "An Inter-Company League That Cut Attrition by 18%",
    subject: "Strive Wellness League",
    outcome: "-18% Attrition, +22 NPS",
    sport: "Multi-sport",
    excerpt:
      "A 4-month multi-sport corporate league for Strive's 6,000 employees measurably improved retention and engagement scores.",
    initials: "SW",
    accent: "from-amber-400 to-amber-700",
  },
];

export interface Leader {
  name: string;
  role: string;
  bio: string;
  initials: string;
  accent: string;
}

export const LEADERS: Leader[] = [
  {
    name: "Rajat Malhotra",
    role: "Founder & CEO",
    bio: "Former national-level cricketer turned sports-tech founder. 15 years across athlete management, league operations, and brand partnerships.",
    initials: "RM",
    accent: "from-amber-400 to-amber-700",
  },
  {
    name: "Priya Deshpande",
    role: "Co-founder & COO",
    bio: "Ex-Olympic sports administrator. Built national coaching pathways before co-founding The Sports Foundry to scale access to sport.",
    initials: "PD",
    accent: "from-rose-400 to-rose-700",
  },
  {
    name: "Arjun Verma",
    role: "CTO",
    bio: "Built large-scale recommendation systems at two consumer platforms. Now applying the same playbook to athlete–team matching.",
    initials: "AV",
    accent: "from-emerald-400 to-emerald-700",
  },
  {
    name: "Sneha Krishnan",
    role: "Head of Partnerships",
    bio: "Brand-side marketer turned partnership builder. Has closed 200+ athlete, team, and event deals across cricket, football, and badminton.",
    initials: "SK",
    accent: "from-violet-400 to-violet-700",
  },
];

export interface Milestone {
  year: string;
  title: string;
  body: string;
}

export const MILESTONES: Milestone[] = [
  { year: "2022", title: "Founded", body: "The Sports Foundry launches with a single mission: one platform for every stakeholder in sport." },
  { year: "2023", title: "1,000 Athletes", body: "Crossed 1,000 verified athlete profiles in year one, with our first 50 team partners." },
  { year: "2024", title: "Academy Network", body: "Launched the academy partnership program with 40 academies across 8 cities." },
  { year: "2025", title: "CSR Initiative", body: "Launched the Underprivileged Sports Initiative — 1,200 children in our first year." },
  { year: "2026", title: "Series B", body: "Raised Series B to expand across South Asia and invest in the recommendation engine." },
];

export interface CommunityPost {
  id: string;
  author: string;
  handle: string;
  role: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  initials: string;
  accent: string;
  tag: string;
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "cp1",
    author: "Aarav Mehta",
    handle: "@aaravm",
    role: "Athlete",
    content: "Signed my first pro contract today. Grateful to everyone on this platform who made it happen. The grind continues. ⚽",
    time: "2h",
    likes: 248,
    comments: 36,
    initials: "AM",
    accent: "from-emerald-400 to-emerald-700",
    tag: "Athlete Spotlight",
  },
  {
    id: "cp2",
    author: "Coach Vikram Rao",
    handle: "@coachvikram",
    role: "Academy",
    content: "Our U-19 trials this weekend pulled 240 applicants from the The Sports Foundry feed. Quality was incredible. Sign of where recruitment is going.",
    time: "5h",
    likes: 132,
    comments: 21,
    initials: "VR",
    accent: "from-amber-400 to-amber-700",
    tag: "Academy News",
  },
  {
    id: "cp3",
    author: "Sanjana Gupta",
    handle: "@sanjanag",
    role: "Brand",
    content: "Looking for 3 female athletes for a wellness campaign shoot in August. DM if interested — sport-agnostic, story-led.",
    time: "8h",
    likes: 412,
    comments: 87,
    initials: "SG",
    accent: "from-violet-400 to-violet-700",
    tag: "Opportunity",
  },
  {
    id: "cp4",
    author: "Diya Sharma",
    handle: "@diyasmash",
    role: "Athlete",
    content: "Quarter-final week at the All-India Juniors. Thank you Apex Academy for the prep — and The Sports Foundry for the tournament invite.",
    time: "1d",
    likes: 596,
    comments: 64,
    initials: "DS",
    accent: "from-rose-400 to-rose-700",
    tag: "Athlete Spotlight",
  },
];

export interface CSRStory {
  id: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
  initials: string;
  accent: string;
}

export const CSR_STORIES: CSRStory[] = [
  {
    id: "csr1",
    title: "Coaching Camps in 12 Underserved Districts",
    body: "In our first year we ran 48 coaching camps across 12 districts — bringing free, high-quality coaching to children who had never had access to a structured sports program.",
    stat: "1,200+",
    statLabel: "Children Coached",
    initials: "CC",
    accent: "from-emerald-400 to-emerald-700",
  },
  {
    id: "csr2",
    title: "Equipment Bank: 8,000 Pieces Donated",
    body: "Our equipment bank collects, refurbishes, and redistributes kit — keeping 8,000+ pieces of equipment in play and out of landfills in year one.",
    stat: "8,000+",
    statLabel: "Equipment Pieces Donated",
    initials: "EB",
    accent: "from-amber-400 to-amber-700",
  },
  {
    id: "csr3",
    title: "Mentor Pairings That Last",
    body: "Every supported child is paired with a mentor — an athlete, coach, or community leader. We track mentorship pairs for 18 months to make sure the bond holds.",
    stat: "320+",
    statLabel: "Active Mentor Pairs",
    initials: "MP",
    accent: "from-rose-400 to-rose-700",
  },
];

export const USER_ROLES = [
  { id: "athlete", label: "Athlete", desc: "Discover opportunities, build your career.", icon: Dumbbell },
  { id: "team", label: "Team / Club", desc: "Recruit, manage, and grow.", icon: Users },
  { id: "academy", label: "Academy", desc: "Widen reach, attract talent.", icon: GraduationCap },
  { id: "brand", label: "Brand", desc: "Strategic partnerships, measurable ROI.", icon: Handshake },
  { id: "corporate", label: "Corporate", desc: "Leagues, wellness, engagement.", icon: Building2 },
  { id: "fan", label: "Fan / Community", desc: "Follow, connect, and engage.", icon: Heart },
] as const;

export const AI_QUESTIONS: Record<string, { q: string; options: string[] }[]> = {
  athlete: [
    { q: "What are you primarily looking for?", options: ["Team trials", "Brand endorsements", "Academy scholarship", "Coaching access", "Tournament invites"] },
    { q: "What's your current level?", options: ["Amateur", "College / University", "Semi-Pro", "Professional", "National"] },
    { q: "How active do you want to be on the platform?", options: ["Daily", "Weekly", "Only when opportunities come up", "Just browsing"] },
  ],
  team: [
    { q: "What's your primary goal?", options: ["Recruit players", "Build digital presence", "Find sponsors", "Host tournaments", "Manage operations"] },
    { q: "What level does your team play at?", options: ["Grassroots", "Club", "State", "National", "Professional"] },
    { q: "How many players are you looking to recruit?", options: ["1-3", "4-10", "10+", "Not right now"] },
  ],
  academy: [
    { q: "What's your primary goal?", options: ["Promote programs", "Attract talent", "Event partnerships", "Commercial tie-ups", "Find coaches"] },
    { q: "How many programs do you run?", options: ["1-3", "4-8", "8+", "Just starting"] },
    { q: "Which sports do you focus on?", options: ["Single sport", "2-3 sports", "Multi-sport academy"] },
  ],
  brand: [
    { q: "What kind of partnership are you exploring?", options: ["Athlete endorsements", "Team sponsorship", "Event title partnership", "Content collaboration", "Not sure yet"] },
    { q: "What's your campaign objective?", options: ["Awareness", "Engagement", "Conversion", "Long-term brand building"] },
    { q: "Who's your target audience?", options: ["Gen Z", "Millennials", "Families", "Premium / Luxury", "Mass market"] },
  ],
  corporate: [
    { q: "What kind of program are you exploring?", options: ["Inter-company league", "Wellness challenge", "Team-building day", "Year-round engagement"] },
    { q: "How many employees do you have?", options: ["50-200", "200-1000", "1000-5000", "5000+"] },
    { q: "When are you looking to start?", options: ["Within 1 month", "1-3 months", "3-6 months", "Just exploring"] },
  ],
  fan: [
    { q: "Which sports do you follow?", options: ["Cricket", "Football", "Badminton", "Basketball", "Tennis", "Athletics"] },
    { q: "What brings you here?", options: ["Follow athletes", "Discover events", "Read news & insights", "Connect with the community"] },
    { q: "How often do you engage with sports content?", options: ["Daily", "Weekly", "Occasionally"] },
  ],
};
