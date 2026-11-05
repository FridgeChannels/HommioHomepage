import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, resolve, sep } from 'node:path'
import { saveLead } from './saveLead.js'

const root = resolve(process.cwd(), 'dist')
const port = Number(process.env.PORT || 8080)
const host = process.env.HOST || '0.0.0.0'

const types = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function fileInsideRoot(relativePath) {
  const filePath = resolve(root, relativePath)
  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) return null
  return filePath
}

async function handleLead(req, res) {
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed' })
    return
  }
  try {
    const raw = await readBody(req)
    const body = raw ? JSON.parse(raw) : {}
    await saveLead(body, process.env)
    sendJson(res, 200, { ok: true })
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { error: 'Invalid form submission.' })
      return
    }
    sendJson(res, error.status || 500, { error: error.message || 'Could not save your details. Please try again.' })
  }
}

function serveStatic(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405
    res.end('Method not allowed')
    return
  }
  const url = new URL(req.url || '/', 'http://localhost')
  const pathname = decodeURIComponent(url.pathname)
  const relative = pathname.replace(/^\/+/, '')
  let filePath = relative ? fileInsideRoot(relative) : join(root, 'index.html')
  const missing = !filePath || !existsSync(filePath) || statSync(filePath).isDirectory()
  if (missing) {
    if (extname(pathname)) {
      res.statusCode = 404
      res.end('Not found')
      return
    }
    filePath = join(root, 'index.html')
  }
  res.statusCode = 200
  res.setHeader('Content-Type', types[extname(filePath)] || 'application/octet-stream')
  if (req.method === 'HEAD') {
    res.end()
    return
  }
  createReadStream(filePath).pipe(res)
}

const server = createServer((req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname
  if (pathname === '/api/leads') {
    handleLead(req, res)
    return
  }
  serveStatic(req, res)
})

server.listen(port, host, () => {
  console.log(`Hommio listening on http://${host}:${port}`)
})
