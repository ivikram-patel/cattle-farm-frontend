import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const MilkProductions = Loadable(lazy(() => import('views/milk-production/MilkProductions')));
const MilkProduction = Loadable(lazy(() => import('views/milk-production/MilkProduction')));
const CattleDetails = Loadable(lazy(() => import('views/cattle-details/CattleDetails')));
const CattleFood = Loadable(lazy(() => import('views/cattle-food/CattleFood')));
const Expenses = Loadable(lazy(() => import('views/expense/Expenses')));
const Reports = Loadable(lazy(() => import('views/report/Reports')));
const AddDetails = Loadable(lazy(() => import('views/add-details/AddDetails')));
// const MilkProduction = Loadable(lazy(() => import('views/milk-production/MilkProduction')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/default',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: '',
      children: [
        {
          path: 'milk-productions',
          element: <MilkProductions />
        }
      ]
    },
    {
      path: '',
      children: [
        {
          path: 'cattle-food',
          element: <CattleFood />
        }
      ]
    },
    {
      path: '',
      children: [
        {
          path: 'expense',
          element: <Expenses />
        }
      ]
    },
    {
      path: '',
      children: [{ path: 'add-details', element: <AddDetails /> }]
    },
    {
      path: '',
      children: [{ path: 'cattle-details', element: <CattleDetails /> }]
    },
    {
      path: '',
      children: [{ path: 'milk-production', element: <MilkProduction /> }]
    },
    {
      path: '',
      children: [{ path: 'reports', element: <Reports /> }]
    },
    {
      path: '',
      children: [{ path: 'details', element: <AddDetails /> }]
    },
    {
      path: 'icons',
      children: [{ path: 'material-icons', element: <UtilsMaterialIcons /> }]
    },
    {
      path: 'sample-page',
      element: <AddDetails />
    }
  ]
};

export default MainRoutes;
