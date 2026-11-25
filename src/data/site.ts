export const site = {
  name: "Manoj Kulkarni",
  firstName: "Manoj",
  url: "https://portfolio-web-ochre-psi.vercel.app", // change if you add a custom domain
  email: "manoj.kulkarni074@gmail.com",
  github: "https://github.com/manojkulkarni123",
  githubUser: "manojkulkarni123",
  // one-liner next to the green dot under your name
  status: "final year @ BMSCE · joining HPE Networking, Feb '27",
  linkedin: "https://www.linkedin.com/in/manoj-kulkarni-736423205",
  tagline: "I build AI agents, ML systems and the infra they run on.",
  // Set your birth date (YYYY-MM-DD) to show the live "Been here for 21.xxxxxxxxx years" counter under your name.
  born: "2005-09-30",
  // Put a photo at public/me.jpg and set avatar: "/me.jpg" to replace the initials.
  avatar: "/me.jpg",
  initials: "MJ",
};

export const about: { text: string; href?: string }[][] = [
  [{ text: "Tldr; final-year CS undergrad who likes building things that run on their own." }],
  [{ text: "Agents, ML systems, Kubernetes, and a homelab made out of an old laptop." }],
  [
    { text: "If you want to know more about me, " },
    { text: "here are some things I believe in", href: "/blog/things-i-believe" },
    { text: "." },
  ],
];

export type Role = {
  org: string;
  title: string;
  period: string;
  initials: string;
  description: string;
  logo?: string;
  href?: string;
  badges?: string[];
  /** longer bullets used on case-study pages */
  points?: string[];
};

export const experience: Role[] = [
  {
    org: "HPE Networking",
    title: "Software Engineer | Intern",
    period: "Feb 2027",
    initials: "H",
    logo: "/logos/hpe.png",
    href: "https://www.hpe.com/us/en/networking.html",
    badges: ["Incoming"],
    description: "Joining the networking team.",
  },
  {
    org: "Hewlett Packard Enterprise",
    title: "CPP Project Intern | AIOps for HPCM",
    period: "Feb 2026 - Jul 2026",
    initials: "H",
    logo: "/logos/hpe.png",
    href: "/projects/hpc-aiops",
    description: "Predicted HPC node failures ~2.5h ahead and built multimodal anomaly detection.",
  },
  {
    org: "HiDevs",
    title: "Applied AI | Intern",
    period: "Nov 2024 - May 2025",
    initials: "H",
    logo: "/logos/hidevs.png",
    href: "https://www.hidevs.xyz",
    description: "Shipped LangGraph agents to production: a GitHub repo evaluator, an AI interviewer and a blog pipeline.",
  },
  {
    org: "BMS College of Engineering",
    title: "Placement Coordinator",
    period: "Oct 2024 - Present",
    initials: "B",
    logo: "/logos/bmsce.png",
    href: "https://bmsce.ac.in",
    description: "Helping run campus placements.",
  },
  {
    org: "Finzie",
    title: "Founder's Office, Sales | Intern",
    period: "Apr 2024 - Jun 2024",
    initials: "F",
    logo: "/logos/finzie.png",
    description: "Outbound lead gen, market research and email campaigns (+15% open rates), working directly with the founder.",
  },
];

export const education = [
  {
    school: "BMS College of Engineering",
    degree: "B.Tech, Computer Science & Engineering | CGPA 8.66",
    period: "2023 - 2027",
    initials: "B",
    logo: "/logos/bmsce.png",
    href: "https://bmsce.ac.in",
  },
  {
    school: "BASE PU College",
    degree: "11th-12th Science | KCET rank 1566",
    period: "2021 - 2023",
    initials: "B",
    logo: "/logos/base.png",
    href: undefined as string | undefined,
  },
];

export type Project = {
  slug: string;
  name: string;
  /** shown on the right of the row, like a date */
  highlight: string;
  stack: string;
  oneLiner: string;
  logo: string;
  blurb: string;
  tags: string[];
  href?: string;
  repo?: string;
  caseStudy?: boolean;
};

const gh = "https://github.com/manojkulkarni123";

export const projects: Project[] = [
  {
    slug: "agentk",
    name: "AgentK",
    highlight: "human-in-the-loop",
    stack: "LangGraph | kopf | Kubernetes",
    oneLiner:
      "A Kubernetes remediation agent that learns from incidents. A read-only operator flags failures; a LangGraph agent investigates on a tool budget, proposes a fix behind an approval gate, and remembers every approved incident.",
    logo: "/logos/kubernetes.svg",
    blurb:
      "Kubernetes remediation agent that learns from incidents: read-only operator, agentic diagnosis loop, human approval gate, memory of approved fixes.",
    tags: ["LangGraph", "kopf", "Kubernetes", "Chroma", "RBAC"],
    href: "/projects/agentk",
    repo: `${gh}/Agentk`,
    caseStudy: true,
  },
  {
    slug: "hpc-aiops",
    name: "AIOps for HPC clusters",
    highlight: "6/7 failures caught",
    stack: "PyTorch | LSTM-VAE | Transformers",
    oneLiner:
      "From my HPE internship: unsupervised node-failure prediction with ~2.5h of warning on Marconi-100, and a Pi-Transformer that fuses metrics with 25M+ log lines.",
    logo: "/logos/hpe.png",
    blurb:
      "From my HPE internship: a dual LSTM-VAE that warns ~2.5h before node failures, and Pi-Transformer, which fuses metrics and logs to detect anomalies.",
    tags: ["PyTorch", "LSTM-VAE", "Transformers", "AIOps"],
    href: "/projects/hpc-aiops",
    caseStudy: true,
  },
  {
    slug: "eeg-neuromarketing",
    name: "EEG Neuromarketing",
    highlight: "major project",
    stack: "Python | EEG | Signal processing",
    oneLiner:
      "Second-by-second ad engagement from a 19-channel dry-electrode EEG cap while people watch real TV ads. Team project with industry hardware; we first rebuilt a published decision-decoding study (AUC 0.563 vs 0.558 in the paper).",
    logo: "/logos/brain.svg",
    blurb: "Measuring ad engagement from EEG while people watch real TV ads.",
    tags: ["Python", "EEG", "Signal processing"],
    href: `${gh}/Neuromarketing-EEG`,
  },
  {
    slug: "private-chat",
    name: "Private Chat",
    highlight: "live",
    stack: "Next.js | Socket.IO | Redis",
    oneLiner:
      "Real-time chat with browser-side end-to-end encryption, on AWS EC2 behind a Cloudflare Tunnel (zero open ports), with Redis for auto-expiring rooms.",
    logo: "/logos/lock-keyhole.svg",
    blurb: "End-to-end encrypted real-time chat.",
    tags: ["Next.js", "Socket.IO", "Redis", "AWS"],
    href: "https://private-chat-iota-pearl.vercel.app",
    repo: `${gh}/private_chat`,
  },
  {
    slug: "whatsapp-llm-alert-bot",
    name: "WhatsApp LLM Alert Bot",
    highlight: "local LLM",
    stack: "Ollama | FastAPI | whatsapp-web.js",
    oneLiner:
      "Watches noisy WhatsApp groups and pings me only about jobs, internships and gigs. Filtering runs on a local LLM, so no message leaves my machine.",
    logo: "/logos/whatsapp.svg",
    blurb: "Local-LLM filter for WhatsApp group opportunities.",
    tags: ["Ollama", "FastAPI", "Node.js"],
    href: `${gh}/whatsapp-llm-alert-bot`,
  },
  {
    slug: "ki-lab",
    name: "Ki-lab",
    highlight: "10+ services",
    stack: "Ubuntu | Kubernetes | Tailscale",
    oneLiner:
      "An old laptop turned headless server: a local Kubernetes cluster, Nginx, Pi-hole DNS filtering, Prometheus/Grafana and a self-hosted OpenClaw agent, all reachable over Tailscale.",
    logo: "/logos/ubuntu.svg",
    blurb: "Self-hosted homelab.",
    tags: ["Kubernetes", "Tailscale", "Prometheus"],
  },
];

export const wins = [
  {
    name: "Omi Hackathon Bangalore",
    logo: "/logos/omi.png",
    initials: "O",
    right: "2nd place",
    sub: "200+ builders",
    description:
      "Built Omi-Claw: an LLM gate on live Omi transcripts that spots actionable intent and hands it to an OpenClaw agent to execute. Voice to action.",
    href: `${gh}/Omi-Claw`,
  },
  {
    name: "Moss",
    logo: "/logos/moss.png",
    initials: "M",
    right: "PR #88",
    sub: "Open source | YC-backed",
    description: "Merged: an AutoGen integration cookbook using Moss as the retrieval layer for multi-agent workflows.",
    href: "https://github.com/usemoss/moss/pull/88",
  },
  {
    name: "awesome-openclaw-usecases",
    logo: "/logos/openclaw.png",
    initials: "O",
    right: "PR #2",
    sub: "Open source",
    description: "Merged: a use case that streams live agent progress to Todoist for visibility into long-running tasks.",
    href: "https://github.com/hesamsheikh/awesome-openclaw-usecases/pull/2",
  },
];

export const skills = [
  "python",
  "langgraph",
  "langchain",
  "rag",
  "pytorch",
  "fastapi",
  "next.js",
  "kubernetes",
  "docker",
  "aws",
  "postgres",
  "redis",
  "breaking my homelab",
];
