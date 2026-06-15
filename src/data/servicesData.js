import { FiCode, FiLayout, FiActivity } from 'react-icons/fi'

export const servicesData = [
  {
    id: 'web-engineering',
    icon: FiCode,
    title: 'Full-Stack Web Engineering',
    desc: 'High-performance frontends paired with robust, secure backend architectures. Built to handle heavy user traffic and deliver sub-second response times.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Vite', 'GraphQL'],
  },
  {
    id: 'uiux-design',
    icon: FiLayout,
    title: 'UI/UX & Identity Design',
    desc: 'From user journey mapping to custom vector branding assets. We construct aesthetic design systems that translate directly into high-converting interfaces.',
    tags: ['Figma', 'Vector Branding', 'Design Tokens', 'Prototyping'],
  },
  {
    id: 'enterprise-pos',
    icon: FiActivity,
    title: 'Custom POS & Enterprise Development',
    desc: 'Tailor-made, high-velocity Point of Sale engines built for offline-first resilience, quick inventory syncing, and ultra-low interface latency.',
    tags: ['Offline-First', 'SQLite', 'WebSockets', 'Tailwind', 'FastAPI'],
  },
]
