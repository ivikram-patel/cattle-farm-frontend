/* eslint-disable prettier/prettier */
import { IconLamp, IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';


// constant
const icons = {
    IconLamp,
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const milk_details = {
    id: 'cattle_detail_page',
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
