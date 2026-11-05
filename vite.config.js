import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { saveLead } from './server/saveLead.js'

const projectRoot = dirname(fileURLToPath(import.meta.url))

function readBody(req) {
  return new Promise((resolveBody, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function leadsApiPlugin(env) {
  const handler = async (req, res, next) => {
    const path = req.url?.split('?')[0]
    if (path !== '/api/leads') return next()
    if (req.method !== 'POST') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Method not allowed' }))
      return
    }
    try {
      const raw = await readBody(req)
      const body = raw ? JSON.parse(raw) : {}
      await saveLead(body, env)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true }))
    } catch (error) {
      const invalidJson = error instanceof SyntaxError
      const status = invalidJson ? 400 : error.status || 500
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: invalidJson ? 'Invalid form submission.' : error.message || 'Could not save your details. Please try again.' }))
    }
  }
  return {
    name: 'hommio-leads-api',
    configureServer(server) { server.middlewares.use(handler) },
    configurePreviewServer(server) { server.middlewares.use(handler) },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, '')
  return {
    plugins: [react(), tailwindcss(), leadsApiPlugin(env)],
    resolve: { alias: { '@': resolve(projectRoot) } },
  }
})
