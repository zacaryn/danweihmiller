import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import './index.css'
import App from './App.jsx'
// Import AWS Amplify using named exports only
import { Amplify, Auth, Storage } from 'aws-amplify'
import awsConfig from './config/aws-config'

// Configure Amplify
Amplify.configure(awsConfig)

// Configure Auth to use the IAM credentials for all service calls
Auth.configure(awsConfig)

// Explicitly configure Storage with credentials
Storage.configure({
  ...awsConfig.Storage,
  credentials: awsConfig.credentials
})

const theme = {
  colors: {
    // Darker royal blue
    primary: '#0E1F45',
    // Adjusted complementary blue
    secondary: '#1B3366',
    // Sophisticated gray accent for b&w integration
    accent: '#E8E9ED',
    // Cool white background
    background: '#FCFCFD',
    // Deep blue-gray text
    text: '#1A2B45',
    white: '#FFFFFF',
    // Light cool gray for subtle backgrounds
    lightGray: '#F4F5F7',
    // Rich gray for secondary text
    darkGray: '#3E4B63'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem'
  },
  shadows: {
    small: '0 2px 4px rgba(23, 51, 107, 0.06)',
    medium: '0 4px 6px rgba(23, 51, 107, 0.1)',
    large: '0 6px 8px rgba(23, 51, 107, 0.14)'
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
