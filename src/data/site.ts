export const site = {
  name: "Manoj Kulkarni",
  firstName: "Manoj",
  url: "https://portfolio-web-ochre-psi.vercel.app", // change if you add a custom domain
  email: "manoj.kulkarni074@gmail.com",
  github: "https://github.com/manojkulkarni123",
  linkedin: "https://www.linkedin.com/in/manoj-kulkarni-736423205",
  tagline: "I build AI agents, ML systems and the infra they run on.",
  // Set your birth date (YYYY-MM-DD) to show the live "Been here for 21.xxxxxxxxx years" counter under your name.
  born: undefined as string | undefined,
  // Put a photo at public/me.jpg and set avatar: "/me.jpg" to replace the initials.
  avatar: undefined as string | undefined,
  initials: "MK",
};

export const about: { text: string; href?: string }[][] = [
  [{ text: "Tldr; final-year CS undergrad who likes building things that run on their own." }],
  [{ text: "Agents, ML systems, Kubernetes, and a homelab made out of an old laptop." }],
  [
    { text: "Want the long version? " },
    { text: "Here's what I've built", href: "/#projects" },
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
    href: "https://bmsce.ac.in",
    description: "Helping run campus placements.",
  },
  {
    org: "Finzie",
    title: "Founder's Office, Sales | Intern",
    period: "Apr 2024 - Jun 2024",
    initials: "F",
    description: "Outbound lead gen, market research and email campaigns (+15% open rates), working directly with the founder.",
  },
];

export const education = [
  {
    school: "BMS College of Engineering",
    degree: "B.Tech, Computer Science & Engineering | CGPA 8.66",
    period: "2023 - 2027",
    initials: "B",
    href: "https://bmsce.ac.in",
  },
  {
    school: "BASE PU College",
    degree: "11th-12th Science | KCET rank 1566",
    period: "2021 - 2023",
    initials: "B",
    href: undefined as string | undefined,
  },
];

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  stack: string;
  blurb: string;
  tags: string[];
  href?: string;
  caseStudy?: boolean;
};

export const projects: Project[] = [
  {
    slug: "agentk",
    name: "AgentK",
    oneLiner: "An agent that diagnoses broken Kubernetes pods and asks before it fixes anything.",
    stack: "LangGraph | Kubernetes",
    blurb:
      "Kubernetes incident-diagnosis agent on LangGraph. Detects pod failures, investigates with read-only tools, recalls similar incidents from Chroma, and proposes fixes behind a human approval gate.",
    tags: ["LangGraph", "Kubernetes", "Chroma", "RBAC"],
    href: "/projects/agentk",
    caseStudy: true,
  },
  {
    slug: "hpc-aiops",
    name: "AIOps for HPC clusters",
    oneLiner: "LSTM-VAE + Pi-Transformer for node-failure prediction and anomaly detection.",
    stack: "PyTorch | HPE",
    blurb:
      "From my HPE internship: a dual LSTM-VAE that warns ~2.5h before node failures, and Pi-Transformer, which fuses metrics and logs to detect anomalies.",
    tags: ["PyTorch", "LSTM-VAE", "Transformers", "AIOps"],
    href: "/projects/hpc-aiops",
    caseStudy: true,
  },
  {
    slug: "private-chat",
    name: "Private Chat",
    oneLiner: "End-to-end encrypted chat, deployed with zero open ports.",
    stack: "Next.js | Socket.IO",
    blurb: "Real-time chat with browser-side E2E encryption on AWS EC2 behind a Cloudflare Tunnel, with Redis for auto-expiring rooms.",
    tags: ["Next.js", "Socket.IO", "Redis", "AWS"],
    href: "https://github.com/manojkulkarni123", // TODO: exact repo URL
  },
  {
    slug: "ki-lab",
    name: "Ki-lab",
    oneLiner: "An old laptop running 10+ services and a Kubernetes cluster.",
    stack: "Homelab | Linux",
    blurb: "Headless Ubuntu server with Tailscale, Nginx, Pi-hole, Prometheus/Grafana and a self-hosted OpenClaw agent.",
    tags: ["Kubernetes", "Tailscale", "Prometheus"],
  },
];

export const wins = [
  {
    name: "Omi Hackathon Bangalore",
    initials: "O",
    right: "2nd place",
    sub: "200+ builders",
    description: "Voice-to-action: routed intent from live transcripts to OpenClaw.",
  },
  {
    name: "Moss",
    initials: "M",
    right: "PR #88",
    sub: "Open source | YC-backed",
    description: "Cookbook for Moss as a retrieval layer in AutoGen workflows.",
  },
  {
    name: "OpenClaw-usecases",
    initials: "O",
    right: "PR #2",
    sub: "Open source",
    description: "Streams live agent progress to Todoist.",
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
