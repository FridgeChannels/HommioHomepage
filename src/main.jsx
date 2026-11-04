import React from 'react'
import { createRoot } from 'react-dom/client'
import Playground from './pages/Playground.jsx'
import Home from './pages/Home.jsx'
import Givingli from './pages/Givingli.jsx'
import './styles/tokens.css'
import './styles/global.css'

const route = window.location.pathname.replace(/\/$/, '')
const Page = route === '/playground' ? Playground : route === '/givingli' ? Givingli : Home

createRoot(document.getElementById('root')).render(<React.StrictMode><Page /></React.StrictMode>)
