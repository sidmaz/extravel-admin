import CssBaseline from '@mui/material/CssBaseline';
//import { createHashRouter, RouterProvider } from 'react-router';
import DashboardLayout from './components/DashboardLayout';
import EmployeeList from './components/EmployeeList';

import NotificationsProvider from './hooks/useNotifications/NotificationsProvider';
import DialogsProvider from './hooks/useDialogs/DialogsProvider';
import AppTheme from '../shared-theme/AppTheme';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  sidebarCustomizations,
  formInputCustomizations,
} from './theme/customizations';

/*
const router = createHashRouter([
  {
    Component: DashboardLayout,
    children: [
      {
        index: true, // ✅ This makes EmployeeList show up at the very start
        Component: EmployeeList,
      },
      {
        path: '/employees',
        Component: EmployeeList,
      },
      {
        path: '/employees/:employeeId',
        Component: EmployeeShow,
      },
      {
        path: '/employees/new',
        Component: EmployeeCreate,
      },
      {
        path: '/employees/:employeeId/edit',
        Component: EmployeeEdit,
      },
      // Fallback route for the example routes in dashboard sidebar items
      {
        path: '*',
        Component: EmployeeList,
      },
    ],
  },
]);*/

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function CrudDashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <EmployeeList />
        </DialogsProvider>
          
        
      </NotificationsProvider>
    </AppTheme>
  );
}
