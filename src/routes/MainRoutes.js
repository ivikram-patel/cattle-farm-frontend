import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const MilkProductions = Loadable(lazy(() => import('views/milk-production/MilkProductions')));
const MilkProduction = Loadable(lazy(() => import('views/milk-production/MilkProduction')));
const CattleFood = Loadable(lazy(() => import('views/cattle-food/CattleFood')));
const CattleFoods = Loadable(lazy(() => import('views/cattle-food/CattleFoods')));
const Expenses = Loadable(lazy(() => import('views/expense/Expenses')));
const Expense = Loadable(lazy(() => import('views/expense/Expense')));
const Income = Loadable(lazy(() => import('views/income/Income')));
const IncomeList = Loadable(lazy(() => import('views/income/IncomeList')));
const Reports = Loadable(lazy(() => import('views/report/Reports')));
// const CustomersList = Loadable(lazy(() => import('views/list-details/CustomersList')));
const Customers = Loadable(lazy(() => import('views/customer/Customers')));
const Customer = Loadable(lazy(() => import('views/customer/Customer')));
const DoctorsList = Loadable(lazy(() => import('views/list-details/DoctorsList')));
const Doctor = Loadable(lazy(() => import('views/list-details/Doctor')));
const EmployeeList = Loadable(lazy(() => import('views/list-details/EmployeeList')));
const Employee = Loadable(lazy(() => import('views/list-details/Employee')));
const MilkRate = Loadable(lazy(() => import('views/milk-rate/MilkRate')));
const MilkRates = Loadable(lazy(() => import('views/milk-rate/MilkRates')));
const Transaction = Loadable(lazy(() => import('views/transactions/Transaction')));
const Transactions = Loadable(lazy(() => import('views/transactions/Transactions')));
// const MilkProduction = Loadable(lazy(() => import('views/milk-production/MilkProduction')));
const MilkRecords = Loadable(lazy(() => import('views/milk-records/milk-records/MilkRecords')));
const MilkRecord = Loadable(lazy(() => import('views/milk-records/milk-records/MilkRecord')));
const SinglePayment = Loadable(lazy(() => import('views/transactions/single-payment/SinglePayment')));
const SinglePayments = Loadable(lazy(() => import('views/transactions/single-payment/SinglePayments')));

const MonthlyPayment = Loadable(lazy(() => import('views/transactions/monthly-payment/MonthlyPayment')));
const MonthlyPayments = Loadable(lazy(() => import('views/transactions/monthly-payment/MonthlyPayments')));
const MonthlyHalfPayment = Loadable(lazy(() => import('views/transactions/monthly-payment/MonthlyHalfPayment')));


const BuyCattle = Loadable(lazy(() => import('views/cattle-details/buy/BuyCattle')));
const BuyCattles = Loadable(lazy(() => import('views/cattle-details/buy/BuyCattles')));

const SellCattle = Loadable(lazy(() => import('views/cattle-details/sell/SellCattle')));
const SellCattles = Loadable(lazy(() => import('views/cattle-details/sell/SellCattles')));

const CattleBirthTime = Loadable(lazy(() => import('views/cattle-details/reproduction/CattleBirthTime')));
const CattleInseminationTime = Loadable(lazy(() => import('views/cattle-details/reproduction/CattleInseminationTime')));
const CattlePregnancyTime = Loadable(lazy(() => import('views/cattle-details/reproduction/CattlePregnancyTime')));

const IncomeCategories = Loadable(lazy(() => import('views/income-expense-category/IncomeCategories')));
const ExpenseCategories = Loadable(lazy(() => import('views/income-expense-category/ExpenseCategories')));
const AddExpenseCategory = Loadable(lazy(() => import('views/income-expense-category/AddExpenseCategory')));
const AddIncomeCategory = Loadable(lazy(() => import('views/income-expense-category/AddIncomeCategory')));


// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const adminLogin = localStorage.getItem('adminLogin')
const isAdminLogin = adminLogin == 1;

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '/dashboard', element: isAdminLogin ? <DashboardDefault /> : <Navigate to={'/login'} /> },
    { path: 'milk-productions', element: isAdminLogin ? <MilkProductions /> : <Navigate to={'/login'} /> },
    { path: 'cattle-food', element: isAdminLogin ? <CattleFood /> : <Navigate to={'/login'} /> },
    { path: 'cattle-foods', element: isAdminLogin ? <CattleFoods /> : <Navigate to={'/login'} /> },
    { path: 'milk-production', element: isAdminLogin ? <MilkProduction /> : <Navigate to={'/login'} /> },
    { path: 'reports', element: isAdminLogin ? <Reports /> : <Navigate to={'/login'} /> },

    // { path: '/can add route name like /admin OR /user OR /client', children: [{ path: 'login', element: isAdminLogin ? <MilkProduction /> : <Navigate to={'/login'} /> }] },
    { path: '/milk-transactions', element: isAdminLogin ? <Transactions /> : <Navigate to={'/login'} /> },
    { path: '/milk-transaction', element: isAdminLogin ? <Transaction /> : <Navigate to={'/login'} /> },


    { path: '/milk-rates', element: isAdminLogin ? <MilkRates /> : <Navigate to={'/login'} /> },
    { path: '/milk-rate', element: isAdminLogin ? <MilkRate /> : <Navigate to={'/login'} /> },

    { path: '/customers', element: isAdminLogin ? <Customers /> : <Navigate to={'/login'} /> },
    { path: '/customer', element: isAdminLogin ? <Customer /> : <Navigate to={'/login'} /> },
    { path: '/customer/:id', element: isAdminLogin ? <Customer /> : <Navigate to={'/login'} /> },

    { path: '/doctors-list', element: isAdminLogin ? <DoctorsList /> : <Navigate to={'/login'} /> },
    { path: '/doctor', element: isAdminLogin ? <Doctor /> : <Navigate to={'/login'} /> },
    { path: '/doctor/:id', element: isAdminLogin ? <Doctor /> : <Navigate to={'/login'} /> },

    { path: '/employee-list', element: isAdminLogin ? <EmployeeList /> : <Navigate to={'/login'} /> },
    { path: '/employee', element: isAdminLogin ? <Employee /> : <Navigate to={'/login'} /> },
    { path: '/employee/:id', element: isAdminLogin ? <Employee /> : <Navigate to={'/login'} /> },

    { path: '/cattle-food/:id', element: isAdminLogin ? <CattleFood /> : <Navigate to={'/login'} /> },

    { path: '/milk-records', element: isAdminLogin ? <MilkRecords /> : <Navigate to={'/login'} /> },
    { path: '/milk-record', element: isAdminLogin ? <MilkRecord /> : <Navigate to={'/login'} /> },
    { path: '/milk-record/:id', element: isAdminLogin ? <MilkRecord /> : <Navigate to={'/login'} /> },

    { path: '/single-payments', element: isAdminLogin ? <SinglePayments /> : <Navigate to={'/login'} /> },
    { path: '/single-payment', element: isAdminLogin ? <SinglePayment /> : <Navigate to={'/login'} /> },
    { path: '/single-payment/:id', element: isAdminLogin ? <SinglePayment /> : <Navigate to={'/login'} /> },

    { path: '/monthly-payments', element: isAdminLogin ? <MonthlyPayments /> : <Navigate to={'/login'} /> },
    { path: '/monthly-payment', element: isAdminLogin ? <MonthlyPayment /> : <Navigate to={'/login'} /> },
    { path: '/monthly-payment/:id', element: isAdminLogin ? <MonthlyPayment /> : <Navigate to={'/login'} /> },
    { path: '/monthly-half-payment/:id/:customer_id', element: isAdminLogin ? <MonthlyHalfPayment /> : <Navigate to={'/login'} /> },

    { path: '/cattle-birth-time', element: isAdminLogin ? <CattleBirthTime /> : <Navigate to={'/login'} /> },
    { path: '/insemination-time', element: isAdminLogin ? <CattleInseminationTime /> : <Navigate to={'/login'} /> },
    { path: '/pregnancy-time', element: isAdminLogin ? <CattlePregnancyTime /> : <Navigate to={'/login'} /> },

    { path: '/buy-cattles', element: isAdminLogin ? <BuyCattles /> : <Navigate to={'/login'} /> },
    { path: '/buy-cattle', element: isAdminLogin ? <BuyCattle /> : <Navigate to={'/login'} /> },
    { path: '/buy-cattle/:id', element: isAdminLogin ? <BuyCattle /> : <Navigate to={'/login'} /> },

    { path: '/sell-cattles', element: isAdminLogin ? <SellCattles /> : <Navigate to={'/login'} /> },
    { path: '/sell-cattle', element: isAdminLogin ? <SellCattle /> : <Navigate to={'/login'} /> },
    { path: '/sell-cattle/:id', element: isAdminLogin ? <SellCattle /> : <Navigate to={'/login'} /> },

    { path: '/add-expense', element: isAdminLogin ? <AddExpenseCategory /> : <Navigate to={'/login'} /> },
    { path: '/add-expense/:id', element: isAdminLogin ? <AddExpenseCategory /> : <Navigate to={'/login'} /> },
    { path: '/income-categories', element: isAdminLogin ? <IncomeCategories /> : <Navigate to={'/login'} /> },

    { path: '/add-income', element: isAdminLogin ? <AddIncomeCategory /> : <Navigate to={'/login'} /> },
    { path: '/add-income/:id', element: isAdminLogin ? <AddIncomeCategory /> : <Navigate to={'/login'} /> },
    { path: '/expense-categories', element: isAdminLogin ? <ExpenseCategories /> : <Navigate to={'/login'} /> },

    { path: '/income', element: isAdminLogin ? <Income /> : <Navigate to={'/login'} /> },
    { path: '/income/:id', element: isAdminLogin ? <Income /> : <Navigate to={'/login'} /> },
    { path: '/income-list', element: isAdminLogin ? <IncomeList /> : <Navigate to={'/login'} /> },

    { path: '/expense', element: isAdminLogin ? <Expense /> : <Navigate to={'/login'} /> },
    { path: '/expense/:id', element: isAdminLogin ? <Expense /> : <Navigate to={'/login'} /> },
    { path: '/expense-list', element: isAdminLogin ? <Expenses /> : <Navigate to={'/login'} /> },
  ]
};

export default MainRoutes;
