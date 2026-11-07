export const clientProfile = {
  id: 1,
  name: "Sarah Chen",
  email: "sarah@novacommerce.io",
  role: "Client",
  initials: "SC",
  company: "Nova Commerce",
};

export const website = {
  id: 1,
  url: "https://novacommerce.io",
  domain: "novacommerce.io",
  businessName: "Nova Commerce",
  businessType: "E-commerce",
  businessLocation: "San Francisco, CA, USA",
  contactPerson: "Sarah Chen",
  contactEmail: "sarah@novacommerce.io",
  status: "Active",
  lastAuditScore: 92,
  lastAuditDate: "Nov 4, 2026",
  pagesIndexed: 248,
  crawlStatus: "Healthy",
  platform: "Shopify",
  createdAt: "Mar 12, 2025",
  description:
    "Online retailer specializing in modern home essentials, lifestyle products, and curated seasonal collections.",
  performanceSummary: {
    technicalSeo: 94,
    contentQuality: 90,
    backlinks: 88,
    mobileUsability: 96,
    pageSpeed: 89,
  },
};

export const dashboardStats = [
  {
    id: "total-audits",
    label: "Total Audits",
    value: "12",
    change: "+2 this month",
    trend: "up",
    icon: "search",
  },
  {
    id: "latest-score",
    label: "Latest SEO Score",
    value: "92",
    change: "+6 vs previous",
    trend: "up",
    icon: "gauge",
  },
  {
    id: "completed",
    label: "Completed Audits",
    value: "9",
    change: "+1 this week",
    trend: "up",
    icon: "check",
  },
  {
    id: "pending",
    label: "Pending Audits",
    value: "2",
    change: "1 in progress",
    trend: "down",
    icon: "clock",
  },
];

function buildDemoAnalysis(score) {
  const clamp = (value) => Math.max(0, Math.min(100, value));
  const variance = (delta) => clamp(score + delta);

  return {
    categories: {
      technicalSeo: variance(2),
      onPageSeo: variance(-1),
      performance: variance(-4),
      mobileFriendliness: variance(3),
      contentQuality: variance(-2),
      schemaMarkup: variance(-6),
    },
    technicalIssues: [
      {
        id: "t1",
        title: "Missing canonical tags on paginated pages",
        description:
          "Paginated archive URLs do not declare a canonical target, which can dilute ranking signals.",
        severity: "Critical",
      },
      {
        id: "t2",
        title: "Blocked CSS resources in robots.txt",
        description:
          "Important stylesheet paths are disallowed, preventing accurate rendering for crawlers.",
        severity: "Critical",
      },
      {
        id: "t3",
        title: "Slow Time to First Byte on category pages",
        description:
          "Server response times average 1.4s on several category templates.",
        severity: "Important",
      },
    ],
    onPageIssues: [
      {
        id: "o1",
        title: "Thin content on category landing pages",
        description:
          "Several category pages have fewer than 200 words of unique copy and weak internal linking.",
        severity: "Important",
      },
      {
        id: "o2",
        title: "Inconsistent heading hierarchy",
        description:
          "Multiple templates skip from H1 directly to H3, reducing topical clarity for crawlers.",
        severity: "Important",
      },
      {
        id: "o3",
        title: "Image alt attributes incomplete",
        description:
          "About 18% of content images are missing descriptive alt text.",
        severity: "Warning",
      },
    ],
    issues: {
      critical: [
        {
          id: "c1",
          title: "Missing canonical tags on paginated pages",
          description:
            "Paginated archive URLs do not declare a canonical target, which can dilute ranking signals.",
          severity: "Critical",
        },
        {
          id: "c2",
          title: "Blocked CSS resources in robots.txt",
          description:
            "Important stylesheet paths are disallowed, preventing accurate rendering for crawlers.",
          severity: "Critical",
        },
      ],
      important: [
        {
          id: "i1",
          title: "Thin content on category landing pages",
          description:
            "Several category pages have fewer than 200 words of unique copy and weak internal linking.",
          severity: "Important",
        },
        {
          id: "i2",
          title: "Inconsistent heading hierarchy",
          description:
            "Multiple templates skip from H1 directly to H3, reducing topical clarity for crawlers.",
          severity: "Important",
        },
      ],
      warnings: [
        {
          id: "w1",
          title: "Image alt attributes incomplete",
          description:
            "About 18% of content images are missing descriptive alt text.",
          severity: "Warning",
        },
        {
          id: "w2",
          title: "Open Graph tags partially missing",
          description:
            "Blog posts share incomplete OG metadata, affecting social previews.",
          severity: "Warning",
        },
      ],
      passed: [
        {
          id: "p1",
          title: "HTTPS enabled site-wide",
          description: "All sampled URLs redirect securely over HTTPS.",
          severity: "Passed",
        },
        {
          id: "p2",
          title: "XML sitemap discoverable",
          description: "Sitemap is referenced in robots.txt and returns 200.",
          severity: "Passed",
        },
        {
          id: "p3",
          title: "Mobile viewport configured",
          description:
            "Responsive viewport meta tag is present on key templates.",
          severity: "Passed",
        },
      ],
    },
    quickWins: [
      "Add descriptive alt text to product gallery images on top 20 pages.",
      "Fix Open Graph titles and descriptions on the blog template.",
      "Compress hero images above the fold to improve LCP.",
    ],
    aiRecommendations: [
      "Prioritize canonical coverage on all paginated product and category URLs to consolidate ranking signals.",
      "Unblock critical CSS and JS assets in robots.txt, then re-run a rendering check for crawlers.",
      "Expand unique copy and internal links on thin category pages that currently underperform in search.",
      "Normalize heading hierarchy across templates so H1 → H2 → H3 reflects page structure clearly.",
    ],
    suggestedFixes: [
      {
        id: "f1",
        title: "Add self-referencing canonical tags",
        detail:
          "Inject canonical tags on indexable templates, including paginated archives.",
        priority: "Critical",
      },
      {
        id: "f2",
        title: "Update robots.txt allow rules",
        detail:
          "Allow /assets/css/ and /assets/js/ paths required for rendering.",
        priority: "Critical",
      },
      {
        id: "f3",
        title: "Enrich category page content",
        detail:
          "Add 300–500 words of unique copy plus contextual internal links.",
        priority: "Important",
      },
      {
        id: "f4",
        title: "Complete image alt attributes",
        detail: "Backfill missing alt text for product and editorial images.",
        priority: "Warning",
      },
    ],
    recommendations: [
      "Add self-referencing canonical tags to all indexable templates.",
      "Unblock critical CSS/JS paths in robots.txt and re-test rendering.",
      "Expand unique copy on category pages and strengthen internal links.",
      "Normalize heading hierarchy (H1 → H2 → H3) across templates.",
      "Complete alt text for product and editorial images.",
      "Standardize Open Graph and Twitter card metadata on content pages.",
    ],
  };
}

export const audits = [
  {
    id: 1,
    auditId: "AUD-2026-0112",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "Nov 4, 2026",
    auditDateISO: "2026-11-04",
    seoScore: 92,
    status: "Completed",
    progress: 100,
    duration: "4m 18s",
    summary: "Strong product schema and improved crawl coverage.",
    ...buildDemoAnalysis(92),
  },
  {
    id: 2,
    auditId: "AUD-2026-0109",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "Oct 12, 2026",
    auditDateISO: "2026-10-12",
    seoScore: 86,
    status: "Completed",
    progress: 100,
    duration: "4m 09s",
    summary: "Fixed duplicate meta titles across category pages.",
    ...buildDemoAnalysis(86),
  },
  {
    id: 3,
    auditId: "AUD-2026-0104",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "Sep 3, 2026",
    auditDateISO: "2026-09-03",
    seoScore: 81,
    status: "Completed",
    progress: 100,
    duration: "3m 52s",
    summary: "Baseline audit after site redesign.",
    ...buildDemoAnalysis(81),
  },
  {
    id: 4,
    auditId: "AUD-2026-0115",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "Nov 5, 2026",
    auditDateISO: "2026-11-05",
    seoScore: null,
    status: "In Progress",
    progress: 62,
    duration: "2m 11s",
    summary: "Crawling product pages and collecting PageSpeed metrics.",
    categories: {
      technicalSeo: 0,
      onPageSeo: 0,
      performance: 0,
      mobileFriendliness: 0,
      contentQuality: 0,
      schemaMarkup: 0,
    },
    technicalIssues: [],
    onPageIssues: [],
    issues: { critical: [], important: [], warnings: [], passed: [] },
    quickWins: [],
    aiRecommendations: [],
    suggestedFixes: [],
    recommendations: [],
  },
  {
    id: 5,
    auditId: "AUD-2026-0116",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "Nov 5, 2026",
    auditDateISO: "2026-11-05",
    seoScore: null,
    status: "Pending",
    progress: 0,
    duration: "—",
    summary: "Queued for background processing.",
    categories: {
      technicalSeo: 0,
      onPageSeo: 0,
      performance: 0,
      mobileFriendliness: 0,
      contentQuality: 0,
      schemaMarkup: 0,
    },
    technicalIssues: [],
    onPageIssues: [],
    issues: { critical: [], important: [], warnings: [], passed: [] },
    quickWins: [],
    aiRecommendations: [],
    suggestedFixes: [],
    recommendations: [],
  },
  {
    id: 6,
    auditId: "AUD-2026-0098",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "Aug 18, 2026",
    auditDateISO: "2026-08-18",
    seoScore: 74,
    status: "Failed",
    progress: 35,
    duration: "0m 48s",
    summary: "Crawl interrupted due to temporary site timeout.",
    ...buildDemoAnalysis(74),
  },
  {
    id: 7,
    auditId: "AUD-2026-0087",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "Jul 2, 2026",
    auditDateISO: "2026-07-02",
    seoScore: 79,
    status: "Completed",
    progress: 100,
    duration: "4m 01s",
    summary: "Improved internal linking on seasonal collections.",
    ...buildDemoAnalysis(79),
  },
  {
    id: 8,
    auditId: "AUD-2026-0075",
    website: "https://novacommerce.io",
    domain: "novacommerce.io",
    auditDate: "May 21, 2026",
    auditDateISO: "2026-05-21",
    seoScore: 76,
    status: "Completed",
    progress: 100,
    duration: "3m 44s",
    summary: "Mobile usability and Core Web Vitals review.",
    ...buildDemoAnalysis(76),
  },
];

export const recentAudits = audits.slice(0, 5);

export const reports = [
  {
    id: 1,
    reportId: "RPT-2026-0112",
    auditId: 1,
    domain: "novacommerce.io",
    website: "https://novacommerce.io",
    status: "Available",
    generatedDate: "Nov 4, 2026",
    generatedDateISO: "2026-11-04",
    seoScore: 92,
  },
  {
    id: 2,
    reportId: "RPT-2026-0109",
    auditId: 2,
    domain: "novacommerce.io",
    website: "https://novacommerce.io",
    status: "Available",
    generatedDate: "Oct 12, 2026",
    generatedDateISO: "2026-10-12",
    seoScore: 86,
  },
  {
    id: 3,
    reportId: "RPT-2026-0104",
    auditId: 3,
    domain: "novacommerce.io",
    website: "https://novacommerce.io",
    status: "Available",
    generatedDate: "Sep 3, 2026",
    generatedDateISO: "2026-09-03",
    seoScore: 81,
  },
  {
    id: 4,
    reportId: "RPT-2026-0115",
    auditId: 4,
    domain: "novacommerce.io",
    website: "https://novacommerce.io",
    status: "Processing",
    generatedDate: "—",
    generatedDateISO: "2026-11-05",
    seoScore: null,
  },
  {
    id: 5,
    reportId: "RPT-2026-0098",
    auditId: 6,
    domain: "novacommerce.io",
    website: "https://novacommerce.io",
    status: "Failed",
    generatedDate: "—",
    generatedDateISO: "2026-08-18",
    seoScore: 74,
  },
  {
    id: 6,
    reportId: "RPT-2026-0087",
    auditId: 7,
    domain: "novacommerce.io",
    website: "https://novacommerce.io",
    status: "Available",
    generatedDate: "Jul 2, 2026",
    generatedDateISO: "2026-07-02",
    seoScore: 79,
  },
];

export const notifications = [
  {
    id: 1,
    type: "Email",
    channel: "Email",
    title: "SEO audit completed",
    message:
      "Audit AUD-2026-0112 for novacommerce.io finished with an SEO score of 92.",
    relatedTo: "Audit completion",
    status: "Delivered",
    sentAt: "Nov 4, 2026 · 3:42 PM",
  },
  {
    id: 2,
    type: "WhatsApp",
    channel: "WhatsApp",
    title: "Report ready",
    message:
      "Your PDF report RPT-2026-0112 is ready to download in the client portal.",
    relatedTo: "Report ready",
    status: "Delivered",
    sentAt: "Nov 4, 2026 · 3:45 PM",
  },
  {
    id: 3,
    type: "Email",
    channel: "Email",
    title: "Report ready",
    message:
      "PDF report RPT-2026-0109 for novacommerce.io is available for download.",
    relatedTo: "Report ready",
    status: "Delivered",
    sentAt: "Oct 12, 2026 · 11:08 AM",
  },
  {
    id: 4,
    type: "WhatsApp",
    channel: "WhatsApp",
    title: "SEO audit completed",
    message:
      "Audit AUD-2026-0109 completed. Review findings and recommended fixes in the portal.",
    relatedTo: "Audit completion",
    status: "Delivered",
    sentAt: "Oct 12, 2026 · 11:05 AM",
  },
  {
    id: 5,
    type: "Email",
    channel: "Email",
    title: "Audit in progress",
    message:
      "Audit AUD-2026-0115 is currently processing. You will be notified when it completes.",
    relatedTo: "Audit completion",
    status: "Sent",
    sentAt: "Nov 5, 2026 · 9:14 AM",
  },
  {
    id: 6,
    type: "WhatsApp",
    channel: "WhatsApp",
    title: "Audit queued",
    message:
      "Your requested audit AUD-2026-0116 has been queued and will start shortly.",
    relatedTo: "Audit completion",
    status: "Pending",
    sentAt: "Nov 5, 2026 · 9:16 AM",
  },
  {
    id: 7,
    type: "Email",
    channel: "Email",
    title: "Report generation failed",
    message:
      "Report RPT-2026-0098 could not be generated because the related audit failed.",
    relatedTo: "Report ready",
    status: "Failed",
    sentAt: "Aug 18, 2026 · 2:21 PM",
  },
  {
    id: 8,
    type: "Email",
    channel: "Email",
    title: "SEO audit completed",
    message:
      "Audit AUD-2026-0087 finished with an SEO score of 79. Quick wins are available.",
    relatedTo: "Audit completion",
    status: "Delivered",
    sentAt: "Jul 2, 2026 · 4:03 PM",
  },
];

const pageTitles = {
  "/dashboard": "Dashboard",
  "/website": "My Website",
  "/audits": "SEO Audits",
  "/reports": "Reports",
  "/notifications": "Notifications",
};

export function getPageTitle(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/audits/")) return "Audit Details";
  return "Dashboard";
}

export function getAuditById(id) {
  return audits.find((audit) => String(audit.id) === String(id)) || null;
}

export function scoreColor(score) {
  if (score == null) return "text-muted";
  if (score >= 85) return "text-emerald-400";
  if (score >= 70) return "text-amber-400";
  return "text-rose-400";
}
