export interface DashboardStat {
    title: string;
    value: number | null;
    icon: string;
    persantage: string;
    profit: 'up' | 'down' |'equal';
    link: string;
  }