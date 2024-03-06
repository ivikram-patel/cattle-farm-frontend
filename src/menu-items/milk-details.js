/* eslint-disable prettier/prettier */
// assets
import { IconLamp } from '@tabler/icons';

// constant
const icons = {
    IconLamp
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const milk_details = {
    id: 'milk_detail_page',
    //   title: 'Pages',
    //   caption: 'Pages Caption',
    type: 'group',
    children: [
        {
            id: 'milk-details',
            title: 'Milk details',
            type: 'collapse',
            icon: icons.IconLamp,

            children: [
                {
                    id: 'milk_record',
                    title: 'Milk record',
                    type: 'item',
                    url: '/milk-records',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },
                {
                    id: 'single_payment',
                    title: 'Single Payment',
                    type: 'item',
                    url: '/single-payments',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },
                {
                    id: 'monthly_payment',
                    title: 'Monthly Payment',
                    type: 'item',
                    url: '/monthly-payments',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default milk_details;
