// Sample data for admin panel demo

export const adminStats = [
  { label: "Total Users", value: "2,847", change: "+12%", icon: "users", color: "emerald" },
  { label: "Athletes", value: "1,453", change: "+8%", icon: "user-circle", color: "amber" },
  { label: "Teams", value: "127", change: "+3%", icon: "user-group", color: "rose" },
  { label: "Academies", value: "89", change: "+5%", icon: "academic-cap", color: "sky" },
  { label: "Upcoming Events", value: "14", change: "2 live", icon: "trophy", color: "violet" },
  { label: "New Enquiries", value: "23", change: "8 today", icon: "inbox", color: "red" },
  { label: "Blog Posts", value: "67", change: "54 published", icon: "document-text", color: "gray" },
  { label: "Brands", value: "34", change: "+2", icon: "building-office", color: "teal" },
];

export const recentEnquiries = [
  { id: 1, name: "Rajesh Kumar", email: "rajesh@acmecorp.in", type: "Corporate", subject: "Inter-company cricket league", status: "new", created: "2 min ago" },
  { id: 2, name: "Priya Sharma", email: "priya@gmail.com", type: "General", subject: "Athlete registration help", status: "new", created: "15 min ago" },
  { id: 3, name: "Velocity Sports", email: "partnerships@velocity.in", type: "Partnership", subject: "Athlete endorsement deal", status: "in_progress", created: "1 hour ago" },
  { id: 4, name: "Coach Vikram", email: "vikram@apexacademy.in", type: "Academy Partner", subject: "List our cricket programs", status: "in_progress", created: "3 hours ago" },
  { id: 5, name: "Strive Wellness", email: "events@strive.co", type: "Corporate", subject: "Wellness challenge for 5000 employees", status: "resolved", created: "Yesterday" },
  { id: 6, name: "Meera Nair", email: "meera@email.com", type: "CSR", subject: "Want to volunteer for coaching camps", status: "resolved", created: "2 days ago" },
  { id: 7, name: "Pulse Energy", email: "marketing@pulse.in", type: "Partnership", subject: "Event title sponsorship", status: "new", created: "2 days ago" },
  { id: 8, name: "Aarav Mehta", email: "aarav@email.com", type: "Support", subject: "Profile verification pending", status: "in_progress", created: "3 days ago" },
];

export const usersData = [
  { id: 1, name: "Rajat Malhotra", email: "admin@sportsphere.app", type: "admin", role: "Super Admin", status: "active", verified: true, joined: "Jan 2024" },
  { id: 2, name: "Aarav Mehta", email: "aarav@email.com", type: "athlete", role: "Athlete", status: "active", verified: true, joined: "Mar 2024" },
  { id: 3, name: "Reena Kapoor", email: "reena@bengaltigers.in", type: "team", role: "Team", status: "active", verified: true, joined: "Feb 2024" },
  { id: 4, name: "Coach Vikram Rao", email: "vikram@apexacademy.in", type: "academy", role: "Academy", status: "active", verified: true, joined: "Feb 2024" },
  { id: 5, name: "Sanjana Gupta", email: "sanjana@velocity.in", type: "brand", role: "Brand", status: "active", verified: true, joined: "Mar 2024" },
  { id: 6, name: "Diya Sharma", email: "diya@email.com", type: "athlete", role: "Athlete", status: "active", verified: false, joined: "Apr 2024" },
  { id: 7, name: "Rohan Pillai", email: "rohan@email.com", type: "athlete", role: "Athlete", status: "inactive", verified: true, joined: "Mar 2024" },
  { id: 8, name: "Strive Wellness", email: "events@strive.co", type: "corporate", role: "Corporate", status: "active", verified: true, joined: "May 2024" },
  { id: 9, name: "Kabir Singh", email: "kabir@email.com", type: "athlete", role: "Athlete", status: "active", verified: true, joined: "Apr 2024" },
  { id: 10, name: "Meera Nair", email: "meera@email.com", type: "fan", role: "Fan", status: "active", verified: false, joined: "May 2024" },
];

export const athletesData = [
  { id: 1, name: "Aarav Mehta", sport: "Football", level: "Semi-Pro", city: "Mumbai", age: 21, verified: true, featured: true, status: "active" },
  { id: 2, name: "Diya Sharma", sport: "Badminton", level: "National", city: "Hyderabad", age: 19, verified: true, featured: true, status: "active" },
  { id: 3, name: "Kabir Singh", sport: "Cricket", level: "U-23 State", city: "Delhi", age: 22, verified: true, featured: false, status: "active" },
  { id: 4, name: "Ananya Iyer", sport: "Athletics", level: "National", city: "Bengaluru", age: 24, verified: true, featured: true, status: "active" },
  { id: 5, name: "Rohan Pillai", sport: "Basketball", level: "Pro League", city: "Chennai", age: 25, verified: true, featured: false, status: "active" },
  { id: 6, name: "Meera Nair", sport: "Tennis", level: "ITF Circuit", city: "Kochi", age: 20, verified: false, featured: false, status: "pending" },
  { id: 7, name: "Virat Desai", sport: "Cricket", level: "College", city: "Pune", age: 19, verified: false, featured: false, status: "pending" },
  { id: 8, name: "Sara Khan", sport: "Football", level: "Semi-Pro", city: "Goa", age: 23, verified: true, featured: false, status: "active" },
];

export const teamsData = [
  { id: 1, name: "Bengal Tigers FC", sport: "Football", city: "Kolkata", level: "Pro League", openTrials: true, verified: true },
  { id: 2, name: "Phoenix Hoops", sport: "Basketball", city: "Mumbai", level: "National", openTrials: true, verified: true },
  { id: 3, name: "Riverside Hockey Club", sport: "Hockey", city: "Pune", level: "State", openTrials: false, verified: true },
  { id: 4, name: "Strikers Cricket Club", sport: "Cricket", city: "Delhi", level: "Pro League", openTrials: true, verified: true },
  { id: 5, name: "Coastal Spikers", sport: "Volleyball", city: "Goa", level: "National", openTrials: true, verified: false },
  { id: 6, name: "Apex Athletics Club", sport: "Athletics", city: "Bengaluru", level: "State", openTrials: false, verified: true },
];

export const eventsData = [
  { id: 1, title: "Metro Premier Football Cup 2026", sport: "Football", type: "Tournament", city: "Mumbai", date: "Aug 14 - Aug 28", status: "upcoming", registration: "open", participants: 28, max: 32 },
  { id: 2, title: "All-India Junior Badminton Open", sport: "Badminton", type: "Tournament", city: "Bengaluru", date: "Sep 02 - Sep 05", status: "upcoming", registration: "open", participants: 48, max: 64 },
  { id: 3, title: "Corporate Cricket Premier League", sport: "Cricket", type: "Corporate", city: "Delhi NCR", date: "Sep 18 - Oct 09", status: "upcoming", registration: "open", participants: 18, max: 24 },
  { id: 4, title: "Coastal Open Beach Volleyball", sport: "Volleyball", type: "Tournament", city: "Goa", date: "Oct 12 - Oct 14", status: "upcoming", registration: "closed", participants: 32, max: 32 },
  { id: 5, title: "National Pro-Am Golf Classic", sport: "Golf", type: "Pro-Am", city: "Pune", date: "Nov 06 - Nov 08", status: "upcoming", registration: "open", participants: 24, max: 40 },
];

export const blogData = [
  { id: 1, title: "How AI Matching Is Quietly Reshaping Sports Recruitment", category: "Platform Updates", status: "published", author: "Rajat Malhotra", date: "Jun 28, 2026", featured: true },
  { id: 2, title: "Inside the Metro Premier Football Cup 2026 Draw", category: "Sports News", status: "published", author: "Editor Team", date: "Jun 22, 2026", featured: false },
  { id: 3, title: "Brand–Athlete Fit: 5 Principles We Live By", category: "Insights", status: "published", author: "Sanjana Gupta", date: "Jun 15, 2026", featured: false },
  { id: 4, title: "Why 1,200 Children Got Their First Coaching Camp This Year", category: "CSR", status: "published", author: "Rajat Malhotra", date: "Jun 09, 2026", featured: false },
  { id: 5, title: "Corporate Sports Leagues: The Engagement Multiplier", category: "Insights", status: "draft", author: "Editor Team", date: "—", featured: false },
  { id: 6, title: "SportSphere Raises Series B to Expand Across South Asia", category: "Press Releases", status: "published", author: "Rajat Malhotra", date: "May 26, 2026", featured: false },
];

export const servicesData = [
  { id: 1, title: "Connects Athletes", tagline: "Discover opportunities. Build a career.", icon: "Dumbbell", order: 1, active: true },
  { id: 2, title: "Onboards Teams", tagline: "Recruit, manage, and grow.", icon: "Users", order: 2, active: true },
  { id: 3, title: "Partners with Academies", tagline: "Wider reach. Real talent.", icon: "GraduationCap", order: 3, active: true },
  { id: 4, title: "Connects Brands", tagline: "Strategic partnerships. Measurable returns.", icon: "Handshake", order: 4, active: true },
  { id: 5, title: "Manages Corporate Sports", tagline: "Build culture through sport.", icon: "Building2", order: 5, active: true },
  { id: 6, title: "Organizes Events", tagline: "Seamlessly delivered.", icon: "Trophy", order: 6, active: true },
  { id: 7, title: "Builds a Community", tagline: "One platform. Every stakeholder.", icon: "Heart", order: 7, active: true },
  { id: 8, title: "Promotes Sports Among Underprivileged", tagline: "Brighter futures.", icon: "Sparkles", order: 8, active: true },
];

export const rolesData = [
  { name: "admin", displayName: "Super Admin", users: 2, permissions: 40, description: "Full access to everything" },
  { name: "editor", displayName: "Editor", users: 1, permissions: 24, description: "Content management" },
  { name: "athlete", displayName: "Athlete", users: 1453, permissions: 6, description: "Manage own profile" },
  { name: "team", displayName: "Team", users: 127, permissions: 7, description: "Team profile & recruitment" },
  { name: "academy", displayName: "Academy", users: 89, permissions: 5, description: "Academy profile & programs" },
  { name: "brand", displayName: "Brand", users: 34, permissions: 5, description: "Brand profile & campaigns" },
  { name: "corporate", displayName: "Corporate", users: 18, permissions: 3, description: "Corporate programs" },
  { name: "fan", displayName: "Fan", users: 1123, permissions: 4, description: "View & engage" },
];

export const partnersData = [
  { id: 1, name: "Bengal Tigers FC", tag: "Football", order: 1, active: true },
  { id: 2, name: "Apex Cricket Academy", tag: "Cricket", order: 2, active: true },
  { id: 3, name: "Velocity Sports", tag: "Brand", order: 3, active: true },
  { id: 4, name: "Mumbai Pro League", tag: "League", order: 4, active: true },
  { id: 5, name: "Phoenix Hoops", tag: "Basketball", order: 5, active: true },
  { id: 6, name: "IronBody Nutrition", tag: "Brand", order: 6, active: true },
  { id: 7, name: "Riverside Hockey Club", tag: "Hockey", order: 7, active: true },
  { id: 8, name: "Zenith Wear", tag: "Brand", order: 8, active: true },
];

export const testimonialsData = [
  { id: 1, quote: "I went from playing college football to a pro trial in 6 weeks...", name: "Aarav Mehta", role: "Athlete, Football", order: 1, active: true },
  { id: 2, quote: "We recruited 4 verified players in our last window...", name: "Reena Kapoor", role: "Owner, Bengal Tigers FC", order: 2, active: true },
  { id: 3, quote: "Our academy's enrolment doubled in a single season...", name: "Coach Vikram Rao", role: "Director, Apex Cricket Academy", order: 3, active: true },
  { id: 4, quote: "The campaign analytics alone are worth it...", name: "Sanjana Gupta", role: "Brand Lead, Velocity Sports", order: 4, active: true },
];

export const communityPostsData = [
  { id: 1, author: "Aarav Mehta", handle: "@aaravm", role: "Athlete", content: "Signed my first pro contract today! ⚽", tag: "Athlete Spotlight", likes: 248, comments: 36, pinned: false, active: true, date: "2h ago" },
  { id: 2, author: "Coach Vikram Rao", handle: "@coachvikram", role: "Academy", content: "Our U-19 trials pulled 240 applicants from SportSphere feed.", tag: "Academy News", likes: 132, comments: 21, pinned: false, active: true, date: "5h ago" },
  { id: 3, author: "Sanjana Gupta", handle: "@sanjanag", role: "Brand", content: "Looking for 3 female athletes for wellness campaign in August.", tag: "Opportunity", likes: 412, comments: 87, pinned: true, active: true, date: "8h ago" },
  { id: 4, author: "Diya Sharma", handle: "@diyasmash", role: "Athlete", content: "Quarter-final week at the All-India Juniors!", tag: "Athlete Spotlight", likes: 596, comments: 64, pinned: false, active: true, date: "1d ago" },
];

export const brandsData = [
  { id: 1, name: "Velocity Sports", industry: "Apparel", partnership: "Title Partner", active: true },
  { id: 2, name: "IronBody Nutrition", industry: "Nutrition", partnership: "Endorsement Partner", active: true },
  { id: 3, name: "Zenith Wear", industry: "Footwear", partnership: "Team Sponsor", active: true },
  { id: 4, name: "Strive Wellness", industry: "Wellness", partnership: "Corporate Partner", active: true },
  { id: 5, name: "Pulse Energy", industry: "Beverages", partnership: "Event Partner", active: true },
  { id: 6, name: "Nova Sports Network", industry: "Media", partnership: "Broadcast Partner", active: true },
];

export const academiesData = [
  { id: 1, name: "Apex Cricket Academy", sport: "Cricket", city: "Mumbai", programs: 3, partner: true, featured: true },
  { id: 2, name: "Velocity Football School", sport: "Football", city: "Bengaluru", programs: 3, partner: true, featured: true },
  { id: 3, name: "Smash Shuttle Academy", sport: "Badminton", city: "Hyderabad", programs: 3, partner: true, featured: false },
  { id: 4, name: "Hoop Dreams Basketball", sport: "Basketball", city: "Chennai", programs: 3, partner: true, featured: false },
  { id: 5, name: "Track & Field Titans", sport: "Athletics", city: "Pune", programs: 3, partner: true, featured: false },
  { id: 6, name: "Ace Tennis Ranch", sport: "Tennis", city: "Kochi", programs: 3, partner: true, featured: false },
];

export const successStoriesData = [
  { id: 1, title: "From College League to Pro Contract in One Window", subject: "Aarav Mehta", outcome: "Pro Contract", featured: true, active: true },
  { id: 2, title: "Academy Enrolment Doubled in a Single Season", subject: "Apex Cricket Academy", outcome: "+104% Enrolment", featured: true, active: true },
  { id: 3, title: "A 12-City Brand Activation in 8 Weeks", subject: "Velocity Sports", outcome: "4.2M Impressions", featured: true, active: true },
  { id: 4, title: "An Inter-Company League That Cut Attrition by 18%", subject: "Strive Wellness", outcome: "-18% Attrition", featured: false, active: true },
];

export const adminNavGroups = [
  { label: "Dashboard", items: [{ id: "dashboard", label: "Overview", icon: "Home" }] },
  { label: "Content", items: [
    { id: "services", label: "Services", icon: "Squares2x2", count: 8 },
    { id: "blog", label: "Blog Posts", icon: "DocumentText", count: 67 },
    { id: "success-stories", label: "Success Stories", icon: "Star", count: 24 },
    { id: "testimonials", label: "Testimonials", icon: "ChatBubbleLeftRight", count: 18 },
    { id: "partners", label: "Partners", icon: "BuildingStorefront", count: 34 },
  ]},
  { label: "People & Organizations", items: [
    { id: "athletes", label: "Athletes", icon: "UserCircle", count: 1453 },
    { id: "teams", label: "Teams", icon: "UserGroup", count: 127 },
    { id: "academies", label: "Academies", icon: "AcademicCap", count: 89 },
    { id: "brands", label: "Brands", icon: "BuildingOffice2", count: 34 },
  ]},
  { label: "Events", items: [{ id: "events", label: "Events & Tournaments", icon: "Trophy", count: 14 }] },
  { label: "Community", items: [{ id: "community", label: "Community Posts", icon: "ChatBubbleEllipsis", count: 847 }] },
  { label: "Enquiries", items: [{ id: "enquiries", label: "Enquiries", icon: "Inbox", count: 23, badge: "new" }] },
  { label: "System", items: [
    { id: "users", label: "Users", icon: "Users", count: 2847 },
    { id: "roles", label: "Roles & Permissions", icon: "ShieldCheck" },
    { id: "branding", label: "Branding & Logo", icon: "Image" },
    { id: "settings-general", label: "General Settings", icon: "Cog6Tooth" },
    { id: "settings-home", label: "Home Page Settings", icon: "Home" },
    { id: "settings-seo", label: "SEO Settings", icon: "MagnifyingGlass" },
  ]},
];
