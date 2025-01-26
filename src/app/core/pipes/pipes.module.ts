import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingPipe } from './greeting.pipe';

@NgModule({
  declarations: [GreetingPipe],
  exports: [GreetingPipe], // ¡Esto es importante para usar el pipe fuera!
  imports: [CommonModule],
})
export class PipesModule {}
