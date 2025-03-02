import { Component, Input } from '@angular/core';
import { Order } from 'src/app/core/interfaces/order.interface';
import { OrderService } from 'src/app/core/services/order.service';
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
    private readonly orderService: OrderService
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
  loadingRows = new Set<string>();

  sendOrder(data: Order) {
    this.loadingRows.add(data.id); // Agrega la fila al conjunto de carga
    this.orderService.send(data.id).subscribe({
      next: () => {
        this.loadingRows.delete(data.id); // Quita la fila después de la operación
        data.stateId = Constants.STATE_ORDER_IN_TRANSIT; // Deshabilita el botón de envío
        data.stateName = "En Tránsito"
      },
      error: () => {
        this.loadingRows.delete(data.id); // Quita la fila en caso de error
      }
    })
    // Simulación de una petición asincrónica
    setTimeout(() => {
    }, 3000);
  }

  saveDelivery(data: Order) {
    this.loadingRows.add(data.id); // Agrega la fila al conjunto de carga
    this.orderService.delivered(data.id).subscribe({
      next: () => {
        this.loadingRows.delete(data.id); // Quita la fila después de la operación
        data.stateId = Constants.STATE_ORDER_DELIVERED; // Deshabilita el botón de envío
        data.stateName = "Entregado"
      },
      error: () => {
        this.loadingRows.delete(data.id); // Quita la fila en caso de error
      }
    })

  }


}
