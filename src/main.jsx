import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProfilerReport from './components/ProfilerReport.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfilerReport id="app">
      <App />
    </ProfilerReport>
  </StrictMode>,
)
