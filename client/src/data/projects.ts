export interface Project {
  id: string;
  index: string;
  name: string;
  type: string;
  context: string;
  role: string;
  year: string;
  stack: string;
  tags: string[];
  summary: string;
  detail: string;
  challenge: string;
  solution: string;
  highlights: string[];
  metric: string;
  loomEmbedUrl: string;
  loomUrl: string;
  demoUrl: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "vulnerability-benchmark-system",
    index: "01",
    name: "Vulnerability Benchmark System",
    type: "Final Year Project",
    context: "AI Code Security & Evaluation Suite",
    role: "Lead Full-Stack & ML Engineer",
    year: "2024—2025",
    stack: "Next.js · FastAPI · Python · Hugging Face",
    tags: ["Next.js", "FastAPI", "Python", "Hugging Face", "LoRA", "CodeT5", "REST APIs", "Docker"],
    summary:
      "An AI-powered code security tool with a model evaluation layer designed to measure detection accuracy across vulnerability classes.",
    detail:
      "Owned the full development lifecycle: requirements, data preparation, LoRA-style CodeT5 fine-tuning, evaluation suites, and deployment via a Next.js frontend with a FastAPI inference backend.",
    challenge:
      "Modern code security tools often provide opaque confidence scores without empirical evaluation against standardized vulnerability distributions, making automated vulnerability detection prone to false positives.",
    solution:
      "Engineered an end-to-end benchmarking and detection platform combining fine-tuned CodeT5 transformer models with automated evaluation pipelines, delivering transparent class-by-class accuracy metrics via a high-throughput Next.js and FastAPI architecture.",
    highlights: [
      "Fine-tuned CodeT5 models with parameter-efficient LoRA adapters for specialized vulnerability identification",
      "Architected real-time inference microservices with FastAPI for asynchronous AST parsing and prediction",
      "Designed an interactive evaluation dashboard in Next.js displaying confusion matrices and recall metrics",
      "Built standardized benchmarking test suites across common CWE categories (SQLi, XSS, Buffer Overflows)",
      "Containerized backend inference workers using Docker for reproducible deployment pipelines"
    ],
    metric: "AI / Security",
    loomEmbedUrl: "https://www.loom.com/embed/b1f0111a3eb145488ef7e8e1c328ba92",
    loomUrl: "https://www.loom.com/share/b1f0111a3eb145488ef7e8e1c328ba92",
    demoUrl: "https://github.com/mustafatariq2304",
    githubUrl: "https://github.com/mustafatariq2304",
  },
  {
    id: "perks",
    index: "02",
    name: "Perks",
    type: "Lead Management SaaS",
    context: "High-Conversion Lead Pipeline & Billing Engine",
    role: "Full Stack Engineer",
    year: "2024",
    stack: "Next.js · FastAPI · Stripe · PostgreSQL",
    tags: ["Next.js", "FastAPI", "Stripe", "PostgreSQL", "JWT Auth", "TypeScript", "Tailwind CSS"],
    summary:
      "A multi-feature SaaS platform grounded in reusable frontend components, relational models, and payment infrastructure.",
    detail:
      "Designed REST API architecture and relational data models, then implemented end-to-end Stripe payments with reusable, documented frontend components.",
    challenge:
      "Businesses managing multi-stage outbound outreach struggled with scattered customer touchpoints, delayed lead qualification, and fragmented subscription payment flows.",
    solution:
      "Developed an integrated SaaS platform featuring reactive drag-and-drop pipeline stages, relational lead event logging in PostgreSQL, secure JWT authentication, and frictionless Stripe billing webhooks.",
    highlights: [
      "Designed relational database schemas in PostgreSQL with transactional consistency for billing and lead states",
      "Implemented Stripe subscription billing with automated webhook reconciliation and customer portal integration",
      "Constructed reusable, type-safe React UI components with responsive layouts and fluid state transitions",
      "Built resilient FastAPI endpoints with Pydantic validation and JWT role-based access control (RBAC)",
      "Optimized query response times and dashboard payload serialization for fast client hydration"
    ],
    metric: "SaaS / Payments",
    loomEmbedUrl: "https://www.loom.com/embed/cc44df2391d4483398d57377aa17ac03",
    loomUrl: "https://www.loom.com/share/cc44df2391d4483398d57377aa17ac03",
    demoUrl: "https://github.com/mustafatariq2304",
    githubUrl: "https://github.com/mustafatariq2304",
  },
  {
    id: "daniels-believe",
    index: "03",
    name: "Daniel's Believe",
    type: "eCommerce Platform · Germany",
    context: "Live High-Volume Fashion & Apparel Retail",
    role: "Full Stack Engineer",
    year: "2024",
    stack: "Next.js · FastAPI · PostgreSQL · Stripe",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Stripe", "Redis", "TypeScript", "Nginx"],
    summary:
      "A live full-stack commerce platform supporting 100+ product variations with a documented frontend and complete backend.",
    detail:
      "Delivered the product experience, FastAPI services, PostgreSQL data layer, and Stripe integration for a real-world platform serving live users.",
    challenge:
      "Serving high-conversion international retail requires instant product catalog browsing across 100+ SKUs with complex color/size variant matrices and zero payment abandonment.",
    solution:
      "Architected a headless commerce solution pairing a high-performance Next.js storefront with a normalized PostgreSQL catalog schema, automated inventory decrement locks, and localized multi-currency Stripe checkout.",
    highlights: [
      "Delivered live full-stack store serving international European buyers with high availability",
      "Modeled complex SKU variant matrices in PostgreSQL supporting 100+ active product permutations",
      "Engineered secure multi-currency Stripe checkout workflows with automated tax and order confirmation hooks",
      "Implemented documented, reusable React component architecture following design token standards",
      "Deployed on AWS EC2 behind Nginx reverse proxy with SSL termination and caching policies"
    ],
    metric: "Commerce / Scale",
    loomEmbedUrl: "https://www.loom.com/embed/1f11a62121e6454a991ed9eef0e9f082",
    loomUrl: "https://www.loom.com/share/1f11a62121e6454a991ed9eef0e9f082",
    demoUrl: "https://github.com/mustafatariq2304",
    githubUrl: "https://github.com/mustafatariq2304",
  },
  {
    id: "hr-fleet-management",
    index: "04",
    name: "HR & Fleet Management System",
    type: "Internal Operations · KSA",
    context: "Enterprise Logistics, Fleet Tracking & Payroll",
    role: "Full Stack Engineer",
    year: "2024",
    stack: "Next.js · FastAPI · Firebase · PostgreSQL",
    tags: ["Next.js", "FastAPI", "Firebase", "PostgreSQL", "Google Maps", "Audit Logging"],
    summary:
      "An integrated internal system spanning employee management, vehicle tracking, attendance, and salary operations.",
    detail:
      "Translated client requirements into technical specifications and delivered a connected internal operations system around people, vehicles, and payroll workflows.",
    challenge:
      "Logistics operations in KSA required real-time coordination between field vehicles, driver duty rosters, branch attendance registers, and monthly payroll calculations.",
    solution:
      "Built a unified operations command center connecting Firebase real-time status feeds with FastAPI business logic, providing instant vehicle telemetry, attendance verification, and automated payroll reporting.",
    highlights: [
      "Translated client requirements into unified system specifications for logistics and dispatch teams",
      "Engineered real-time vehicle and driver status monitoring integrated with Firebase real-time updates",
      "Designed attendance calculation modules factoring shift allowances, overtime, and leave balances",
      "Constructed strict role-based access management ensuring payroll confidentiality across branches",
      "Implemented comprehensive audit trails for vehicle maintenance schedules and trip logs"
    ],
    metric: "Operations / Systems",
    loomEmbedUrl: "",
    loomUrl: "",
    demoUrl: "https://github.com/mustafatariq2304",
    githubUrl: "https://github.com/mustafatariq2304",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id || p.index === id);
}

export function getLoomEmbedUrl(url?: string): string {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  if (url.includes("/share/")) {
    return url.replace("/share/", "/embed/");
  }
  return url;
}
