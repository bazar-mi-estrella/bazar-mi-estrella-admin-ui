import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/core/interfaces/order.interface';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})

/**
 * OrdersDetails Component
 */
export class OrdersDetailsComponent implements OnInit {

  id: string = this.activatedRoute.snapshot.params["id"];
  order: Order = {} as Order
  isLoader: boolean = true

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;

  constructor(
    private readonly modalService: NgbModal,
    private readonly activatedRoute: ActivatedRoute,

    private readonly orderService: OrderService,
  ) {

  }

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Pedidos' },
      { label: 'Detalle', active: true }
    ];

    this.getById()
  }

  getById(): void {
    this.isLoader = true;
    this.orderService.getById(this.id).subscribe((res: Order) => {
      this.isLoader = false;
      this.order = res
    })
  }

  /**
    * Open modal
    * @param content modal content
    */

  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

}
