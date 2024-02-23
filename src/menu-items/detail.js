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
      id: 'list',
      title: 'Lists',
      type: 'collapse',
      icon: icons.IconLamp,

      children: [
        {
          id: 'customer',
          title: 'Customers',
          type: 'item',
          url: '/customer-list',
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
