export const site = {
  name: "Manoj Kulkarni",
  url: "https://manojkulkarni.dev", // TODO: replace with your real domain
  email: "manoj.kulkarni074@gmail.com",
  github: "https://github.com/manojkulkarni123",
  linkedin: "https://www.linkedin.com/in/manoj-kulkarni-736423205",
  location: "Bengaluru, India",
  tagline: "I build AI agents, ML systems and the infrastructure they run on.",
  // Put a photo at public/me.jpg and set avatar: "/me.jpg" to replace the initials.
  avatar: undefined as string | undefined,
  initials: "MK",
  about: [
    "tldr; final-year CS undergrad at BMS College of Engineering who likes building things that run on their own: LangGraph agents, anomaly detection for HPC clusters, and a homelab made out of an old laptop.",
    "Most of my work sits where applied AI meets infrastructure: Python, LangGraph, FastAPI, Docker and Kubernetes. Previously at HPE and HiDevs; joining HPE Networking in Feb 2027.",
  ],
};

export type Role = {
  org: string;
  title: string;
  period: string;
  initials: string;
  logo?: string;
  href?: string;
  badges?: string[];
  points: string[];
};

export const experience: Role[] = [
  {
    org: "HPE Networking",
    title: "Software Engineer Intern",
    period: "Feb 2027",
    initials: "HN",
    href: "https://www.hpe.com/us/en/networking.html",
    badges: ["Incoming"],
    points: [],
  },
  {
    org: "Hewlett Packard Enterprise",
    title: "CPP Project Intern · HPCM AIOps",
    period: "Feb 2026 – Jul 2026",
    initials: "H",
    href: "https://www.hpe.com",
    points: [
      "Built a dual LSTM-VAE for unsupervised node-failure prediction on HPC clusters, with per-node adaptive thresholds. About 2.5 hours of advance warning on Marconi-100 telemetry, catching 6 of 7 failures (85.7% recall).",
      "Built Pi-Transformer, a multimodal anomaly detector fusing 40 metrics with logs (Drain templates + MiniLM) through cross-modal attention. 0.70 AUROC, ~73% of fault episodes caught, on GAIA-MicroSS (25M+ log lines).",
    ],
  },
  {
    org: "HiDevs",
    title: "Applied AI Intern",
    period: "Nov 2024 – May 2025",
    initials: "HD",
    points: [
      "Built a LangGraph GitHub Repository Evaluation Agent used in production: it checks project claims against source code and returns accept/reject decisions with detailed feedback in 5–7 minutes.",
      "Built an autonomous blog pipeline from Google Sheets topics to LLM-written posts published on Hashnode.",
      "Co-developed the core logic of an AI interviewer and designed the HiDevs scoring system.",
    ],
  },
  {
    org: "BMS College of Engineering",
    title: "Placement Coordinator",
    period: "Oct 2024 – Present",
    initials: "B",
    href: "https://bmsce.ac.in",
    points: [],
  },
];

export const education = [
  {
    school: "BMS College of Engineering",
    degree: "B.Tech, Computer Science & Engineering · CGPA 8.64",
    period: "2023 – 2027",
    initials: "B",
    href: "https://bmsce.ac.in",
  },
  {
    school: "BASE PU College, Hubli",
    degree: "PUC · 87% · KCET rank 1566",
    period: "2021 – 2023",
    initials: "BP",
  },
];

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  tags: string[];
  links: { label: string; href: string }[];
  caseStudy?: boolean;
};

export const projects: Project[] = [
  {
    slug: "agentk",
    name: "AgentK",
    blurb:
      "Kubernetes incident-diagnosis agent on LangGraph. Detects pod failures, investigates with read-only tools (logs, events, ConfigMaps, manifests), recalls similar incidents from Chroma, and proposes fixes behind a human approval gate, with access locked down by a scoped RBAC ClusterRole.",
    tags: ["LangGraph", "Kubernetes", "Chroma", "RBAC"],
    links: [{ label: "GitHub", href: "https://github.com/manojkulkarni123" }], // TODO: exact repo URL
    caseStudy: true,
  },
  {
    slug: "private-chat",
    name: "Private Chat",
    blurb:
      "Real-time chat with browser-side end-to-end encryption. Next.js + Socket.IO on AWS EC2 behind a Cloudflare Tunnel (zero open ports), with Redis for auto-expiring room metadata.",
    tags: ["Next.js", "Socket.IO", "Redis", "AWS"],
    links: [{ label: "GitHub", href: "https://github.com/manojkulkarni123" }], // TODO: repo + deployed URL
  },
  {
    slug: "ki-lab",
    name: "Ki-lab",
    blurb:
      "An old laptop turned headless Ubuntu server: 10+ containers, a local Kubernetes cluster, Tailscale access, Nginx reverse proxy, Pi-hole DNS filtering, Prometheus/Grafana, and a self-hosted OpenClaw agent.",
    tags: ["Kubernetes", "Tailscale", "Prometheus", "Linux"],
    links: [],
  },
  {
    slug: "hpc-aiops",
    name: "AIOps for HPC clusters",
    blurb:
      "From my HPE internship: a dual LSTM-VAE that warns ~2.5h before node failures, and Pi-Transformer, which fuses metrics and logs to detect anomalies.",
    tags: ["PyTorch", "LSTM-VAE", "Transformers", "AIOps"],
    links: [],
    caseStudy: true,
  },
];

export const openSource = [
  {
    name: "Moss",
    note: "YC-backed semantic search platform",
    detail:
      "Merged PR #88: an integration cookbook showing Moss as a semantic retrieval layer for AutoGen multi-agent workflows.",
  },
  {
    name: "OpenClaw-usecases",
    note: "Community use cases",
    detail:
      "Merged PR #2: streams live execution progress of long-running agent tasks to Todoist.",
  },
];

export const achievements = [
  {
    title: "2nd place, Omi Hackathon Bangalore",
    detail:
      "Out of 200+ builders, including engineers from Apple, Microsoft, LinkedIn and Intuit. Built an LLM routing layer that detects actionable intent in live voice transcripts and routes it to OpenClaw for tool execution: voice-to-action.",
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "C++", "C", "JavaScript"],
  "Agentic AI": ["LLMs", "LangGraph", "LangChain", "RAG"],
  "Frameworks": ["FastAPI", "Node.js", "Next.js", "PyTorch", "NumPy", "Pandas"],
  Databases: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "Chroma"],
  "DevOps & Cloud": ["Docker", "Kubernetes", "Linux", "Git", "AWS", "GitHub Actions"],
};
