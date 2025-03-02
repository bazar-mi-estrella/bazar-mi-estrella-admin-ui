import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.WORKERS.TEXT',
    icon: ' ri-team-line',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.WORKERS.LIST.TRAY',
        link: '/workers',
        parentId: 2
      },
      {
        id: 2,
        label: 'MENUITEMS.WORKERS.LIST.NEW',
        link: '/workers/new',
        parentId: 2
      },]
  },

 
  
  {
    id: 54,
    label: 'MENUITEMS.PAGES.TEXT',
    isTitle: true
  },

  {
    id: 131,
    label: 'MENUITEMS.PRODUCTS.TEXT',
    icon: 'ri-store-2-line',
    isCollapsed: true,
    subItems: [
      {
        id: 85,
        label: 'MENUITEMS.PRODUCTS.LIST.TRAY',
        link: '/ecommerce/products',
        parentId: 131
      },
      {
        id: 86,
        label: 'MENUITEMS.PRODUCTS.LIST.NEW',
        link: '/ecommerce/add-product',
        parentId: 131,
      },
      {
        id: 87,
        label: 'MENUITEMS.PRODUCTS.LIST.OFFERS',
        link: '/ecommerce/offers',
        parentId: 131,
      },

    ]
  },

  {
    id: 132,
    label: 'MENUITEMS.CUSTOMERS.TEXT',
    icon: 'ri-customer-service-2-fill',
    isCollapsed: true,
    subItems: [
      {
        id: 86,
        label: 'MENUITEMS.CUSTOMERS.LIST.TRAY',
        link: '/ecommerce/customers',
        parentId: 132
      },

    ]
  },

  {
    id: 133,
    label: 'MENUITEMS.ORDERS.TEXT',
    icon: ' ri-shopping-cart-line',
    isCollapsed: true,
    subItems: [
      {
        id: 86,
        label: 'MENUITEMS.ORDERS.LIST.TRAY',
        link: '/ecommerce/orders',
        parentId: 133
      },
      {
        id: 87,
        label: 'MENUITEMS.ORDERS.LIST.REFUND',
        link: '/ecommerce/refunds',
        parentId: 133
      },

    ]
  },


];
