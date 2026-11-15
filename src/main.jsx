import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CoinCursor from './components/CoinCursor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoinCursor />
    <App />
  </StrictMode>,
)
