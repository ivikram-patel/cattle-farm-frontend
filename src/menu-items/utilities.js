// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'cattle_details',
      title: 'ભેંસની વિગતો',
      type: 'item',
      url: 'cattle-details',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'milk_productions',
      title: 'દૂધ ઉત્પાદન',
      type: 'item',
      url: 'milk-productions',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'milk_rates',
      title: 'Milk Rates',
      type: 'item',
      url: 'milk-rates',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'cattle_food',
      title: 'ખોરાક',
      type: 'item',
      url: '/cattle-foods',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'add_details',
      title: 'વિગતો',
      type: 'item',
      url: '/add-details',
      icon: icons.IconShadow,
      breadcrumbs: false
    },
    {
      id: 'report',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: icons.IconShadow,
      breadcrumbs: false
    },

  ]
};

export default utilities;
