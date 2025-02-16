import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged, User } from 'firebase/auth';
import { WorkerService } from './core/services/worker.service';
// Sweet Alert
import Swal from 'sweetalert2';
import { SweetAlertUtil } from './core/utils/sweet-alert.util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cix Tech Mart';
  constructor(
    private readonly auth: Auth,
    private readonly workerService: WorkerService
  ) { }

  ngOnInit(): void {
    // Escuchar cambios en el estado del usuario
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this.initLogin(user.email!)
      } else {
        console.log('No user is signed in.');
        sessionStorage.clear();
        this.workerService.logout()
      }
    });
  }

  initLogin(email: string): void {
    this.workerService.findByEmail(email).subscribe({
      next: res => {
        sessionStorage.setItem('user_id', res.id)
        sessionStorage.setItem('email', res.email ?? "")
        sessionStorage.setItem('photo_url', res.photo ?? "")
        sessionStorage.setItem('auth_id', res.authid ?? "")
        sessionStorage.setItem('name', res.name ?? "")
        sessionStorage.setItem('firstname', res.firstname ?? "")
        sessionStorage.setItem('lastname', res.lastname ?? "")

        sessionStorage.setItem('typeName', res.typeName ?? "")
        sessionStorage.setItem('fullname', res.fullname ?? "")
        this.workerService.notifySessionUpdate(); // Emitir evento de actualización
      },
      error: () => {
        let config = SweetAlertUtil.getAlertConfig("3", "Error desconocido en Autenticación")
        Swal.fire(config).then(() => { });
      }
    })
  }

}
