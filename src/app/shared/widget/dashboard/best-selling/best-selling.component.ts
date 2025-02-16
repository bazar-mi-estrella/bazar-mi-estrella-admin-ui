import { Component, Input } from '@angular/core';
import { DashboardBestSelling } from 'src/app/core/interfaces/dashboard-best-selling.interface';

@Component({
  selector: 'app-best-selling',
  templateUrl: './best-selling.component.html',
  styleUrls: ['./best-selling.component.scss']
})
export class BestSellingComponent {

  // Best Selling data
  @Input() BestSelling: DashboardBestSelling[] = []

}
