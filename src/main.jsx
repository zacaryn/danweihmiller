import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import './index.css'
import App from './App.jsx'
// Import AWS Amplify using named exports only
import { Amplify, Auth } from 'aws-amplify'
import awsConfig from './config/aws-config'

// Configure Amplify
Amplify.configure(awsConfig)

// Configure Auth to use the IAM credentials for all service calls
Auth.configure(awsConfig)

const theme = {
  colors: {
    primary: '#4A4036',
    secondary: '#8B7355',
    accent: '#D4C4B7',
    background: '#F5F5F5',
    text: '#2D2D2D',
    white: '#FFFFFF',
    lightGray: '#F8F8F8',
    darkGray: '#4A4A4A'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem'
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 6px 8px rgba(0,0,0,0.1)'
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.2s ease',
    slow: 'all 0.4s ease'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px'
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
