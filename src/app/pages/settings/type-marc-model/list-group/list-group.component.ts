import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypeMarcModel } from 'src/app/core/interfaces/typemarcmodel.interface';

@Component({
  selector: 'app-list-group',

  templateUrl: './list-group.component.html',
  styleUrl: './list-group.component.scss'
})
export class ListGroupComponent {

 @Input() data: TypeMarcModel[] = []
 @Input() format: 'type' | 'marca' | 'model' ='model';

 @Output() delete = new EventEmitter<TypeMarcModel>();


 deleteItem(item: TypeMarcModel): void {
   this.delete.emit(item);
 }
}
