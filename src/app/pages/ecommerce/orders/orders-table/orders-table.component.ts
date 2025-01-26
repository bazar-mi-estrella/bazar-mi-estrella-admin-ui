import { Component, Input } from '@angular/core';
import { Order } from 'src/app/core/interfaces/order.interface';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Constants } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent {
  Constants = Constants
  @Input() allorderes: Order[] = [];

  constructor(
    public service: PaginationService,
  ) { }

  onSort(column: string): void {
    this.allorderes = this.service.onSort(column, this.allorderes)
  }

  getPathNavigateView(id: string): string {
    return "/ecommerce/order-details/" + id
  }

  changePage() {
    this.allorderes = this.service.changePage(this.allorderes)
  }
}
