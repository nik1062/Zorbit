import { FiCode, FiSmartphone, FiSliders, FiServer } from 'react-icons/fi'

export const servicesData = [
  {
    id: 'website-building',
    icon: FiCode,
    title: 'Website Building',
    desc: 'High-performance, pixel-perfect frontend websites and web applications built with rapid execution speed and premium aesthetic standards.',
    tags: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'SEO Opt'],
  },
  {
    id: 'mobile-app',
    icon: FiSmartphone,
    title: 'Mobile Application',
    desc: 'Cross-platform iOS and Android mobile apps crafted with near-native performance, fluid gesture controls, and responsive UI components.',
    tags: ['React Native', 'Flutter', 'Mobile UI', 'Expo', 'State Sync'],
  },
  {
    id: 'platform-mgmt',
    icon: FiSliders,
    title: 'Platform Management',
    desc: 'Continuous administration of web ecosystems, secure database clusters, containerized service monitoring, and zero-downtime CI/CD automation.',
    tags: ['AWS / GCP', 'Docker', 'CI/CD Pipelines', 'Telemetry', 'Cloud SQL'],
  },
  {
    id: 'server-pos',
    icon: FiServer,
    title: 'Server Management & POS System Development',
    desc: 'Deploying robust backend server infrastructures alongside offline-first Point of Sale billing systems with WebSockets and ultra-low database latency.',
    tags: ['Server Admin', 'POS Engines', 'WebSockets', 'FastAPI', 'SQLite'],
  },
]
