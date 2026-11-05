import React from 'react'
import { createRoot } from 'react-dom/client'
import Playground from './pages/Playground.jsx'
import Home from './pages/Home.jsx'
import Givingli from './pages/Givingli.jsx'
import GivingliHome from './pages/GivingliHome.jsx'
import DTCBrands from './pages/dtcbrands.jsx'
import Philosophy from './pages/Philosophy.jsx'
import './styles/tokens.css'
import './styles/global.css'

const route = window.location.pathname.replace(/\/$/, '')
const Page = route === '/backup' ? Home : route === '/playground' ? Playground : route === '/givingli' ? Givingli : route === '/dtcbrands' ? DTCBrands : route === '/philosophy' ? Philosophy : GivingliHome

createRoot(document.getElementById('root')).render(<React.StrictMode><Page /></React.StrictMode>)
