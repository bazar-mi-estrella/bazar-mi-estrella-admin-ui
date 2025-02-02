import { DashboardBestSelling } from "./dashboard-best-selling.interface";
import { DashboardTopClient } from "./dashboard-top-client.interface";

export interface Dashboard{
    totalclients: number;
    totalorders: number;
    totalprofits: number;
    totalproducts: number;
    listproducts:DashboardBestSelling[];
    listclients:DashboardTopClient[]
}