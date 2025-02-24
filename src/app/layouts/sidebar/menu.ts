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
    id: 3,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    subItems: [
   
      {
        id: 5,
        label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
        link: '/',
        parentId: 3
      },
      
    ]
  },
  {
    id: 8,
    label: 'MENUITEMS.APPS.TEXT',
    icon: 'ri-apps-2-line',
    isCollapsed: true,
    subItems: [



      {
        id: 12,
        label: 'MENUITEMS.APPS.LIST.ECOMMERCE',
        parentId: 8,
        isCollapsed: true,
        subItems: [

          {
            id: 14,
            label: 'MENUITEMS.APPS.LIST.PRODUCTDETAILS',
            link: '/ecommerce/product-detail',
            parentId: 12
          },
          {
            id: 17,
            label: 'MENUITEMS.APPS.LIST.ORDERDETAILS',
            link: '/ecommerce/order-details',
            parentId: 12
          },
         
          {
            id: 19,
            label: 'MENUITEMS.APPS.LIST.SHOPPINGCART',
            link: '/ecommerce/cart',
            parentId: 12
          },
          {
            id: 20,
            label: 'MENUITEMS.APPS.LIST.CHECKOUT',
            link: '/ecommerce/checkout',
            parentId: 12
          },
          {
            id: 21,
            label: 'MENUITEMS.APPS.LIST.SELLERS',
            link: '/ecommerce/sellers',
            parentId: 12
          },
          {
            id: 22,
            label: 'MENUITEMS.APPS.LIST.SELLERDETAILS',
            link: '/ecommerce/seller-details',
            parentId: 12
          }
        ]
      },

      {
        id: 42,
        label: 'MENUITEMS.APPS.LIST.INVOICES',
        parentId: 8,
        isCollapsed: true,
        subItems: [
          {
            id: 43,
            label: 'MENUITEMS.APPS.LIST.LISTVIEW',
            link: '/invoices/list',
            parentId: 42
          },
          {
            id: 44,
            label: 'MENUITEMS.APPS.LIST.DETAILS',
            link: '/invoices/details',
            parentId: 42
          },
          {
            id: 45,
            label: 'MENUITEMS.APPS.LIST.CREATEINVOICE',
            link: '/invoices/create',
            parentId: 42
          }
        ]
      },

    ]
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
