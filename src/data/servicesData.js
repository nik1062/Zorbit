import {
  FiCpu, FiZap, FiShoppingCart, FiCloud, FiShield, FiGlobe,
  FiPenTool, FiRepeat, FiLink, FiCode, FiSmartphone, FiSearch,
  FiLayout, FiBox, FiDatabase, FiServer, FiTool
} from 'react-icons/fi'

export const servicesData = [
  // --- ROW 1: HIGH-IMPACT LEADS ---
  {
    id: 'ai-saas',
    icon: FiCpu,
    title: 'AI & SaaS Development',
    category: 'AI & Data',
    desc: 'Custom AI tools, chatbots, and SaaS products built for startups — from idea to deployed product.',
    tags: ['OpenAI/Claude API', 'RAG', 'LangChain', 'Vector DB'],
  },
  {
    id: 'mvp-sprint',
    icon: FiZap,
    title: 'Landing Page & MVP Sprint',
    category: 'Development',
    desc: 'Rapid-turnaround landing pages and minimum viable products designed to validate ideas fast — shipped in days, not months.',
    tags: ['Rapid Prototyping', 'Conversion Opt', 'A/B Testing', 'Fast Delivery'],
  },
  {
    id: 'ecommerce',
    icon: FiShoppingCart,
    title: 'E-commerce Development',
    category: 'Development',
    desc: 'Full-stack e-commerce platforms with payment gateway integration, inventory, and order tracking.',
    tags: ['Razorpay/Stripe', 'Inventory Mgmt', 'Order Tracking', 'Next.js'],
  },

  // --- ROW 2: ENTERPRISE & SCALING ---
  {
    id: 'cloud-devops',
    icon: FiCloud,
    title: 'Cloud, DevOps & Platform Management',
    category: 'Infrastructure',
    desc: 'Cloud migration, CI/CD pipeline setup, containerized service monitoring, and infrastructure cost optimization — with zero-downtime automation.',
    tags: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Telemetry'],
  },
  {
    id: 'ml-security',
    icon: FiShield,
    title: 'ML & Security Systems',
    category: 'AI & Data',
    desc: 'Custom machine learning models for threat detection, anomaly monitoring, and security automation.',
    tags: ['Python', 'TensorFlow', 'Anomaly Detection', 'Real-time Monitoring'],
  },
  {
    id: 'pwa',
    icon: FiGlobe,
    title: 'Progressive Web App (PWA)',
    category: 'Development',
    desc: 'Installable, offline-first progressive web applications with push notifications, service workers, and native-like performance on any device.',
    tags: ['Service Workers', 'Offline-First', 'Push Notifications', 'Installable'],
  },

  // --- ROW 3: DESIGN & AUTOMATION ---
  {
    id: 'ui-ux-design',
    icon: FiPenTool,
    title: 'UI/UX Design',
    category: 'Design & Strategy',
    desc: 'Research-driven interface design with interactive Figma prototypes, design systems, and user journey mapping — from wireframe to pixel-perfect handoff.',
    tags: ['Figma', 'Wireframing', 'Design Systems', 'User Research'],
  },
  {
    id: 'automation-workflows',
    icon: FiRepeat,
    title: 'Automation & Workflow Systems',
    category: 'Infrastructure',
    desc: 'End-to-end business process automation — from CRM triggers and email sequences to custom webhook pipelines and scheduled task runners.',
    tags: ['Zapier/n8n', 'Webhooks', 'Cron Jobs', 'Process Automation'],
  },
  {
    id: 'api-integration',
    icon: FiLink,
    title: 'API Development & Integration',
    category: 'Development',
    desc: 'RESTful and GraphQL API design, third-party service integrations, and microservice architectures with comprehensive documentation.',
    tags: ['REST', 'GraphQL', 'Microservices', 'API Docs'],
  },

  // --- ROW 4: CORE DEVELOPMENT ---
  {
    id: 'website-building',
    icon: FiCode,
    title: 'Website Building',
    category: 'Development',
    desc: 'High-performance, pixel-perfect frontend websites and web applications built with rapid execution speed and premium aesthetic standards.',
    tags: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'SEO Opt'],
  },
  {
    id: 'mobile-app',
    icon: FiSmartphone,
    title: 'Mobile Application',
    category: 'Development',
    desc: 'Cross-platform iOS and Android mobile apps crafted with near-native performance, fluid gesture controls, and responsive UI components.',
    tags: ['React Native', 'Flutter', 'Mobile UI', 'Expo', 'State Sync'],
  },
  {
    id: 'seo-audits',
    icon: FiSearch,
    title: 'Technical SEO Audits',
    category: 'Design & Strategy',
    desc: 'In-depth site audits covering Core Web Vitals, crawlability, schema markup, and indexation — with actionable fix reports and ranking strategies.',
    tags: ['Core Web Vitals', 'Schema Markup', 'Lighthouse', 'Indexation Fixes'],
  },

  // --- ROW 5: DATA & PLATFORMS ---
  {
    id: 'analytics-db',
    icon: FiDatabase,
    title: 'Database, Analytics & Optimization',
    category: 'AI & Data',
    desc: 'Custom analytics dashboards, schema architecture, query optimization, and data pipelines — engineered for speed and real-time reporting at scale.',
    tags: ['PostgreSQL', 'MongoDB', 'Schema Design', 'Query Optimization', 'Dashboards'],
  },
  {
    id: 'cms-migration',
    icon: FiLayout,
    title: 'Third-Party CMS & Platform Migration',
    category: 'Development',
    desc: 'Custom integrations, migrations, and theme development for WordPress, Shopify, Webflow, and other CMS platforms — with zero-downtime transitions.',
    tags: ['WordPress', 'Shopify', 'Webflow', 'CMS Migration'],
  },
  {
    id: 'chrome-extension',
    icon: FiBox,
    title: 'Chrome Extension & Browser Tools',
    category: 'Development',
    desc: 'Custom Chrome extensions and browser-based developer tools — from productivity boosters to data scrapers and internal workflow utilities.',
    tags: ['Manifest V3', 'Content Scripts', 'Browser APIs', 'Dev Tools'],
  },

  // --- ROW 6: INFRASTRUCTURE ---
  {
    id: 'server-pos',
    icon: FiServer,
    title: 'Server Management & POS System Development',
    category: 'Infrastructure',
    desc: 'Deploying robust backend server infrastructures alongside offline-first Point of Sale billing systems with WebSockets and ultra-low database latency.',
    tags: ['Server Admin', 'POS Engines', 'WebSockets', 'FastAPI', 'SQLite'],
  },

  // --- LAST: RETAINER ---
  {
    id: 'maintenance-support',
    icon: FiTool,
    title: 'Maintenance & Support Retainer',
    category: 'Support',
    desc: 'Ongoing website/app maintenance, bug fixes, feature updates, and monthly performance reports.',
    tags: ['Bug Fixes', 'Updates', 'Monitoring', 'SLA Support'],
  },
]




