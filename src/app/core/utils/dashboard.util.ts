import { DashboardStat } from "../interfaces/dashboard-stat.interface";
import { Dashboard } from "../interfaces/dashboard.interface";

export class DashboardUtil {

    static stat(
        data: Dashboard): DashboardStat[] {
        return [{
            title: 'Ganancias totales',
            value: data.totalprofits,
            icon: 'bx-dollar-circle',
            persantage: '16.24',
            profit: 'up',
            link: 'View net earnings'
        }, {
            title: 'Total Pedidos',
            value: data.totalorders,
            icon: 'bx-shopping-bag',
            persantage: '3.57',
            profit: 'down',
            link: 'View all orders'
        }, {
            title: 'Total de Clientes',
            value: data.totalclients,
            icon: 'bx-user-circle',
            persantage: '29.08',
            profit: 'up',
            link: 'See details'
        }, {
            title: 'Total Productos',
            value: data.totalproducts,
            icon: 'bx-wallet',
            persantage: '0.00',
            profit: 'equal',
            link: 'Withdraw money'
        }
        ];
    }

    static defect(): DashboardStat[] {
        return [{
            title: 'Ganancias totales',
            value: null,
            icon: 'bx-dollar-circle',
            persantage: '16.24',
            profit: 'up',
            link: 'View net earnings'
        }, {
            title: 'Total Pedidos',
            value: null,
            icon: 'bx-shopping-bag',
            persantage: '3.57',
            profit: 'down',
            link: 'View all orders'
        }, {
            title: 'Total de Clientes',
            value: null,
            icon: 'bx-user-circle',
            persantage: '29.08',
            profit: 'up',
            link: 'See details'
        }, {
            title: 'Total Productos',
            value: null,
            icon: 'bx-wallet',
            persantage: '0.00',
            profit: 'equal',
            link: 'Withdraw money'
        }
        ];
    }
}