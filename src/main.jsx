import React from 'react'
import { createRoot } from 'react-dom/client'
import Playground from './pages/Playground.jsx'
import Home from './pages/Home.jsx'
import Givingli from './pages/Givingli.jsx'
import GivingliHome from './pages/GivingliHome.jsx'
import DTCBrands from './pages/dtcbrands.jsx'
import AmazonBrands from './pages/amazonbrands.jsx'
import Philosophy from './pages/Philosophy.jsx'
import './styles/tokens.css'
import './styles/global.css'
import './styles/mobile-responsive.css'

const route = window.location.pathname.replace(/\/$/, '')
const Page = route === '/backup' ? Home : route === '/playground' ? Playground : route === '/givingli' ? Givingli : route === '/dtcbrands' ? DTCBrands : route === '/amazonbrands' ? AmazonBrands : route === '/philosophy' ? Philosophy : GivingliHome

if (window.parent !== window) {
  const parentOrigin = (() => {
    try {
      return document.referrer ? new URL(document.referrer).origin : '*'
    } catch {
      return '*'
    }
  })()
  let previousY = window.scrollY
  let accumulatedDelta = 0
  let lastDirection = ''

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY
    accumulatedDelta += currentY - previousY
    previousY = currentY

    const direction = currentY <= 0 ? 'up' : accumulatedDelta >= 8 ? 'down' : accumulatedDelta <= -8 ? 'up' : ''
    if (!direction || direction === lastDirection) return

    accumulatedDelta = 0
    lastDirection = direction
    window.parent.postMessage({ channel: 'hommio-embed', type: 'scroll-direction', direction }, parentOrigin)
  }, { passive: true })
}

createRoot(document.getElementById('root')).render(<React.StrictMode><Page /></React.StrictMode>)
