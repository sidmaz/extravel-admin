import React from 'react';
import { createRoot } from 'react-dom/client'
//import { BrowserRouter } from 'react-router-dom'; // or 'react-router'
import './index.css'
//import App from './App.tsx'
import CrudDashboard from './dashboard/CrudDashboard.tsx'; // Path to the copied file

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
      <CrudDashboard />
    
  </React.StrictMode>
)
