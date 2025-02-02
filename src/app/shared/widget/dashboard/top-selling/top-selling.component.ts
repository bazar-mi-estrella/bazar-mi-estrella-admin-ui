import { Component, OnInit, Input } from '@angular/core';
import { DashboardTopClient } from 'src/app/core/interfaces/dashboard-top-client.interface';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.scss']
})
export class TopSellingComponent implements OnInit {

  // Top Selling data
  @Input() TopSelling:DashboardTopClient[]=[]

  constructor() { }

  ngOnInit(): void {
  }

}
