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
  medium: "https://medium.com/@manoj_k",
  // closing quote at the bottom of the home page
  quote: {
    text: "Things are not difficult to make; what is difficult is putting ourselves in the state of mind to make them.",
    by: "Constantin Brâncuși",
  },
  tagline: "I build AI agents, ML systems and the infra they run on.",
  // Set your birth date (YYYY-MM-DD) to show the live "Been here for 21.xxxxxxxxx years" counter under your name.
  born: "2005-09-30",
  // Put a photo at public/me.jpg and set avatar: "/me.jpg" to replace the initials.
  avatar: "/me.jpg",
  initials: "MJ",
};

export const about: { text: string; href?: string }[][] = [
  [
    { text: "I build software that keeps an eye on other software. At HPE I trained models that " },
    { text: "warn about 2.5 hours before an HPC node dies", href: "/projects/hpc-aiops" },
    { text: ". On my own time I built " },
    { text: "AgentK", href: "/projects/agentk" },
    { text: ", an agent that works out why your Kubernetes pods are crashing and asks before it touches anything." },
  ],
  [
    { text: "Before that I shipped LangGraph agents to production at HiDevs, including one that reads every submitted GitHub repo and checks whether the code actually does what the README claims. I took 2nd at the Omi hackathon out of 200+ builders, and I run a homelab on an old laptop with the lid closed." },
  ],
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
    highlight: "zero write access",
    stack: "LangGraph | kopf | Kubernetes",
    oneLiner:
      "When a pod crashes, AgentK investigates like an on-call engineer: it reads logs, events, configs and the workload spec, finds the root cause, and drafts the fix. It can't apply it. RBAC keeps it read-only, a human approves every diagnosis, and approved fixes become memory for the next incident.",
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
    highlight: "~2.5h early warning",
    stack: "PyTorch | LSTM-VAE | Transformers",
    oneLiner:
      "Nobody has labels for HPC node failures, so I taught a model what a healthy node looks like instead. On real Marconi-100 telemetry it caught 6 of 7 failures about 2.5 hours before they happened. Built at HPE, alongside a transformer that reads metrics and 25M+ log lines together.",
    logo: "/logos/hpe.png",
    blurb:
      "From my HPE internship: a dual LSTM-VAE that warns ~2.5h before node failures, and Pi-Transformer, which fuses metrics and logs to detect anomalies.",
    tags: ["PyTorch", "LSTM-VAE", "Transformers", "AIOps"],
    href: "/projects/hpc-aiops",
    caseStudy: true,
  },
  {
    slug: "eeg-neuromarketing",
    name: "Reading brains watching ads",
    highlight: "EEG neuromarketing",
    stack: "Python | MNE | LSL | PsychoPy",
    oneLiner:
      "We put a 19-channel EEG cap on people, play them real TV ads, and turn their brainwaves into a second-by-second engagement curve: where the ad hooks them, where it loses them, and whether wanting the product shows up in the brain before they say it out loud.",
    logo: "/logos/brain.svg",
    blurb:
      "A neuromarketing rig: a 19-channel dry-electrode EEG cap, real TV ads and our own Python pipeline, turning brainwaves into second-by-second engagement.",
    tags: ["Python", "MNE", "LSL", "ICA", "PsychoPy"],
    href: "/projects/eeg-neuromarketing",
    repo: `${gh}/Neuromarketing-EEG`,
    caseStudy: true,
  },
  {
    slug: "ki-lab",
    name: "Ki-lab",
    highlight: "10+ services",
    stack: "Ubuntu | Kubernetes | Tailscale",
    oneLiner:
      "My production environment is an old laptop with the lid closed. It runs a Kubernetes cluster, Pi-hole blocking ads for the whole network, Prometheus and Grafana watching all of it, and my own OpenClaw agent, reachable from anywhere over Tailscale.",
    logo: "/logos/homelab.svg",
    blurb: "Self-hosted homelab.",
    tags: ["Kubernetes", "Tailscale", "Prometheus"],
  },
];

export type Milestone = { date: string; title: string; detail?: string };

export const wins: {
  name: string;
  logo: string;
  initials: string;
  right: string;
  sub: string;
  description: string;
  href: string;
  timeline: Milestone[];
}[] = [
  {
    name: "Omi Hackathon Bangalore",
    logo: "/logos/omi.png",
    initials: "O",
    right: "2nd of 200+",
    sub: "Built Omi-Claw: say it out loud, an agent does it",
    description:
      "Built Omi-Claw: an LLM gate on live Omi transcripts that spots actionable intent and hands it to an OpenClaw agent to execute. Voice to action.",
    href: `${gh}/Omi-Claw`,
    timeline: [
      { date: "Feb '26", title: "2nd place", detail: "Out of 200+ builders, up against engineers from Apple, Microsoft, LinkedIn and Intuit." },
      {
        date: "Feb '26",
        title: "Built Omi-Claw",
        detail:
          "Omi listens to your conversations all day. Omi-Claw adds an LLM gate (Groq) that picks out the things you actually want done and hands them to an OpenClaw agent over Telegram to execute. Voice to action, with no app to open.",
      },
    ],
  },
  {
    name: "Moss",
    logo: "/logos/moss.png",
    initials: "M",
    right: "Merged",
    sub: "YC-backed semantic search · wrote their AutoGen integration",
    description: "An AutoGen integration cookbook using Moss as the retrieval layer for multi-agent workflows.",
    href: "https://github.com/usemoss/moss/pull/88",
    timeline: [
      { date: "Apr '26", title: "Merged #88", detail: "The AutoGen cookbook now ships in Moss's official repo, for anyone wiring Moss into a multi-agent system." },
      { date: "Mar '26", title: "Opened #88", detail: "Agents are only as good as the context they can find. The cookbook shows AutoGen agents using Moss to pull relevant knowledge mid-task instead of stuffing everything into the prompt." },
    ],
  },
  {
    name: "awesome-openclaw-usecases",
    logo: "/logos/openclaw.png",
    initials: "O",
    right: "Merged",
    sub: "Community collection of OpenClaw use cases",
    description: "A use case that streams live agent progress to Todoist for visibility into long-running tasks.",
    href: "https://github.com/hesamsheikh/awesome-openclaw-usecases/pull/2",
    timeline: [
      {
        date: "Feb '26",
        title: "Merged #2",
        detail: "An agent running for an hour is a black box. This streams an OpenClaw agent's progress into Todoist as it works, so you can see what it's doing without opening a terminal. Merged the next day.",
      },
    ],
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
