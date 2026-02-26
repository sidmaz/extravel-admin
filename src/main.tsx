//import React from 'react';
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
//import { BrowserRouter } from 'react-router-dom'; // or 'react-router'
import { createBrowserRouter, RouterProvider , Navigate} from "react-router";
import NotificationsProvider from './dashboard/hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './dashboard/hooks/useDialogs/DialogsProvider';
import AppTheme from './shared-theme/AppTheme';

import './index.css'
//import App from './App.tsx'
import DashboardLayout from './dashboard/components/DashboardLayout';
import CrudDashboard from './dashboard/CrudDashboard.tsx'; // Path to the copied file
import SignIn from './sign-in/SignIn.tsx'; // Path to the copied file
import EmployeeShow from './dashboard/components/EmployeeShow';
import EmployeeCreate from './dashboard/components/EmployeeCreate';
import EmployeeEdit from './dashboard/components/EmployeeEdit';
import EmployeeList from './dashboard/components/EmployeeList';

import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './dashboard/theme/customizations';


const router = createBrowserRouter([
  // Public Route (No Sidebar/Header)
  {
    path: "/login",
    element: <SignIn />,
  },
  // Protected Dashboard Routes
  {
    path: "/employees",
    element: <DashboardLayout />, // This stays visible /employees/:employeeId
    children: [
      { index: true, element: <EmployeeList /> }, // Shows at /employees
      { path: "new", element: <EmployeeCreate /> }, 
      { path: ":employeeId", element: <EmployeeShow /> },
      { path: ":employeeId/edit", element: <EmployeeEdit /> }
    ],
  },
  // Fallback
  { path: "/", element: <Navigate to="/login" replace /> },
  
]);

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

createRoot(document.getElementById('root')!).render(
    <AppTheme themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider> 
      <DialogsProvider>
        <RouterProvider router={router} />
      </DialogsProvider>
    </NotificationsProvider>
    </AppTheme>  
  
)
