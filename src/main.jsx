import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextAPI from './context/ContextAPI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ContextAPI>
    <App />
    </ContextAPI>
    </BrowserRouter>
  </StrictMode>,
)
