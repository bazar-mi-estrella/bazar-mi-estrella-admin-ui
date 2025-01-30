import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 1,
    label: 'MENUITEMS.USERS.TEXT',
    icon: ' ri-team-line',
    subItems: [
      {
        id: 1,
        label: 'MENUITEMS.USERS.LIST.LIST',
        link: '/users',
        parentId: 1
      },
      {
        id: 2,
        label: 'MENUITEMS.USERS.LIST.NEW',
        link: '/users/new',
        parentId: 1
      },]
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
    id: 21332,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    subItems: [
      {
        id: 3,
        label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
        link: '/analytics',
        parentId: 2
      },
      {
        id: 4,
        label: 'MENUITEMS.DASHBOARD.LIST.CRM',
        link: '/crm',
        parentId: 2
      },
      {
        id: 5,
        label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
        link: '/',
        parentId: 2
      },
      {
        id: 6,
        label: 'MENUITEMS.DASHBOARD.LIST.CRYPTO',
        link: '/crypto',
        parentId: 2
      },
      {
        id: 7,
        label: 'MENUITEMS.DASHBOARD.LIST.PROJECTS',
        link: '/projects',
        parentId: 2
      },
      {
        id: 7,
        label: 'MENUITEMS.DASHBOARD.LIST.NFT',
        link: '/nft',
        parentId: 2,
      },
      {
        id: 8,
        label: 'MENUITEMS.DASHBOARD.LIST.JOB',
        link: '/job',
        parentId: 2,
      },
      {
        id: 9,
        label: 'MENUITEMS.PAGES.LIST.BLOG',
        link: '/dashboard-blog',
        parentId: 2,
      }
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
    id: 55,
    label: 'MENUITEMS.AUTHENTICATION.TEXT',
    icon: 'ri-account-circle-line',
    isCollapsed: true,
    subItems: [
      {
        id: 56,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNIN',
        parentId: 49,
        subItems: [
          {
            id: 57,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/signin/basic',
            parentId: 56
          },
          {
            id: 58,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/signin/cover',
            parentId: 56
          },
        ]
      },
      {
        id: 59,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SIGNUP',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 60,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/signup/basic',
            parentId: 59
          },
          {
            id: 61,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/signup/cover',
            parentId: 59
          },
        ]
      },
      {
        id: 62,
        label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDRESET',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 63,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/pass-reset/basic',
            parentId: 62
          },
          {
            id: 64,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/pass-reset/cover',
            parentId: 62
          },
        ]
      },
      {
        id: 62,
        label: 'MENUITEMS.AUTHENTICATION.LIST.PASSWORDCREATE',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 63,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/pass-create/basic',
            parentId: 62
          },
          {
            id: 64,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/pass-create/cover',
            parentId: 62
          },
        ]
      },
      {
        id: 65,
        label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 66,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/lockscreen/basic',
            parentId: 65
          },
          {
            id: 67,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/lockscreen/cover',
            parentId: 65
          },
        ]
      },
      {
        id: 68,
        label: 'MENUITEMS.AUTHENTICATION.LIST.LOGOUT',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 69,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/logout/basic',
            parentId: 68
          },
          {
            id: 70,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/logout/cover',
            parentId: 68
          },
        ]
      },
      {
        id: 71,
        label: 'MENUITEMS.AUTHENTICATION.LIST.SUCCESSMESSAGE',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 72,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/success-msg/basic',
            parentId: 71
          },
          {
            id: 73,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/success-msg/cover',
            parentId: 71
          },
        ]
      },
      {
        id: 74,
        label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 75,
            label: 'MENUITEMS.AUTHENTICATION.LIST.BASIC',
            link: '/auth/twostep/basic',
            parentId: 74
          },
          {
            id: 76,
            label: 'MENUITEMS.AUTHENTICATION.LIST.COVER',
            link: '/auth/twostep/cover',
            parentId: 74
          },
        ]
      },
      {
        id: 77,
        label: 'MENUITEMS.AUTHENTICATION.LIST.ERRORS',
        parentId: 49,
        isCollapsed: true,
        subItems: [
          {
            id: 78,
            label: 'MENUITEMS.AUTHENTICATION.LIST.404BASIC',
            link: '/auth/errors/404-basic',
            parentId: 77
          },
          {
            id: 79,
            label: 'MENUITEMS.AUTHENTICATION.LIST.404COVER',
            link: '/auth/errors/404-cover',
            parentId: 77
          },
          {
            id: 80,
            label: 'MENUITEMS.AUTHENTICATION.LIST.404ALT',
            link: '/auth/errors/404-alt',
            parentId: 77
          },
          {
            id: 81,
            label: 'MENUITEMS.AUTHENTICATION.LIST.500',
            link: '/auth/errors/page-500',
            parentId: 77
          },
          {
            id: 81,
            label: 'MENUITEMS.AUTHENTICATION.LIST.OFFLINE',
            link: '/auth/errors/offline',
            parentId: 77
          },
        ]
      },
    ]
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
    
    ]
  },


];
