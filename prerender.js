import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

async function run() {
  // 1. Read the index.html template from our client build
  const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')

  // 2. Import the server render function from our SSR build
  const { render } = await import('./dist/server/entry-server.js')

  // 3. Define the routes we want to pre-render
  const routesToPrerender = [
    '/',
    '/about',
    '/services',
    '/work',
    '/contact',
    '/admin',
    '/admin/messages',
    '/terms',
    '/demo/fast-laptop',
    '/demo/hotel-imperial-heights'
  ]

  console.log('[Zorbit SSG Engine] Initiating flat HTML pre-render script...')

  // 4. Pre-render each route
  for (const url of routesToPrerender) {
    const appHtml = render(url)

    // Replace the root element div placeholder with our pre-rendered HTML content
    const html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`)

    // Calculate file output path
    const filePath = url === '/' ? 'dist/index.html' : `dist${url}/index.html`
    const fileDir = path.dirname(filePath)

    // Ensure parent directories exist
    if (!fs.existsSync(toAbsolute(fileDir))) {
      fs.mkdirSync(toAbsolute(fileDir), { recursive: true })
    }

    fs.writeFileSync(toAbsolute(filePath), html)
    console.log(`[SSG] Pre-rendered flat page: ${filePath}`)
  }

  // 5. Clean up server build folder
  fs.rmSync(toAbsolute('dist/server'), { recursive: true, force: true })
  console.log('[Zorbit SSG Engine] Pre-rendering complete. Server bundles cleaned.')
}

run()
