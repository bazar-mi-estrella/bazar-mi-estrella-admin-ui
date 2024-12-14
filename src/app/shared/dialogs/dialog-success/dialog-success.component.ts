import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-success',
  standalone: true,
  imports: [],
  templateUrl: './dialog-success.component.html',
  styleUrl: './dialog-success.component.scss'
})
export class DialogSuccessComponent {
  
  @Input() message: string = '';          // Mensaje dinámico

  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}
