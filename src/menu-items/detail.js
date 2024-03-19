// assets
import { IconLamp } from '@tabler/icons';

// constant
const icons = {
  IconLamp
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const detail = {
  id: 'pages',
  //   title: 'Pages',
  //   caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'farm-setup',
      title: 'Farm Setup',
      type: 'collapse',
      icon: icons.IconLamp,

      children: [

        {
          id: 'income_category',
          title: 'Income Category',
          type: 'item',
          url: '/income-categories',
          icon: icons.IconPalette,
          breadcrumbs: false
        },
        // income-categories
        {
          id: 'expense_category',
          title: 'Expense Category',
          type: 'item',
          url: '/expense-categories',
          icon: icons.IconPalette,
          breadcrumbs: false
        },
         // {
        //   id: 'income',
        //   title: 'Income',
        //   type: 'item',
        //   url: '/income',
        //   icon: icons.IconPalette,
        //   breadcrumbs: false
        // },
        // {
        //   id: 'expenses',
        //   title: 'Expense',
        //   type: 'item',
        //   url: '/expenses',
        //   icon: icons.IconPalette,
        //   breadcrumbs: false
        // },
        {
          id: 'customer',
          title: 'Customers',
          type: 'item',
          url: '/customers',
          target: false // if it is true then page is open in new tab
        },
        {
          id: 'doctor',
          title: 'Doctors',
          type: 'item',
          url: '/doctors-list',
          target: false
        },
        {
          id: 'employee',
          title: 'Employee',
          type: 'item',
          url: '/employee-list',
          target: false
        }
      ]
    }
  ]
};

export default detail;
