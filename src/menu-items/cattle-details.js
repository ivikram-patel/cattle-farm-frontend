/* eslint-disable prettier/prettier */
import { IconDetails, IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';


// constant
const icons = {
    IconDetails,
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const cattle_details = {
    id: 'milk_detail_page',
    type: 'group',
    children: [
        {
            id: 'cattle-details',
            title: 'Cattle Details',
            type: 'collapse',
            icon: icons.IconDetails,

            children: [
                {
                    id: 'cattle_buy',
                    title: 'Buy',
                    type: 'item',
                    url: '/buy-cattles',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },
                {
                    id: 'cattle_sell',
                    title: 'Sell',
                    type: 'item',
                    url: '/sell-cattles',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },

                {
                    id: 'birth_time',
                    title: 'Birth Time',
                    type: 'item',
                    url: '/cattle-birth-time',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },

                {
                    id: 'insemination',
                    title: 'બિજદાન',
                    type: 'item',
                    url: '/bijdan-time',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },

                {
                    id: 'pregnancy',
                    title: 'Pregnancy',
                    type: 'item',
                    url: '/pregnancy-time',
                    icon: icons.IconPalette,
                    breadcrumbs: false
                },
            ]
        }
    ]
};

export default cattle_details;
