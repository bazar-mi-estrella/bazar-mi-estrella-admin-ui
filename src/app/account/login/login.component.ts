import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { ToastService } from './toast-service';
import { WorkerService } from 'src/app/core/services/worker.service';
import { FirebaseError } from 'firebase/app';
import { SweetAlertUtil } from 'src/app/core/utils/sweet-alert.util';
// Sweet Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  toast!: false;

  isLoaderSubmit: boolean = false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private readonly workerService: WorkerService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly authFackservice: AuthfakeauthenticationService,
    private readonly route: ActivatedRoute,
    public toastService: ToastService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */

  initLogin(): void {

    this.isLoaderSubmit = false;
    this.workerService.findByEmail(this.email.value).subscribe({
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

        this.router.navigate(['/']);

      },
      error: () => {
        let config = SweetAlertUtil.getAlertConfig("3", "Error desconocido en Autenticación")
        Swal.fire(config).then(() => this.isLoaderSubmit = false);
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    this.isLoaderSubmit = true;
    this.workerService.login(this.email.value, this.password.value)
      .then(() => this.initLogin())
      .catch(x => this.verifErrorFirebase(x))
    // Login Api
    //this.store.dispatch(login({ email: this.f['email'].value, password: this.f['password'].value }));
    // this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe((data:any) => { 
    //   if(data.status == 'success'){
    //     sessionStorage.setItem('toast', 'true');
    //     sessionStorage.setItem('currentUser', JSON.stringify(data.data));
    //     sessionStorage.setItem('token', data.token);
    //     this.router.navigate(['/']);
    //   } else {
    //     this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
    //   }
    // });

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }



  verifErrorFirebase(error: FirebaseError): void {
    let config = SweetAlertUtil.getAlertConfig("3", "Error desconocido en proveedor de Autenticación")
    switch (error.code) {
      case "auth/user-not-found":
        config = SweetAlertUtil.getAlertConfig("3", "El correo no está registrado")
        break;
      case "auth/wrong-password":
        console.error("Contraseña incorrecta.");
        config = SweetAlertUtil.getAlertConfig("3", "Contraseña incorrecta")

        break;
      case "auth/invalid-email":
        console.error("El correo no es válido.");
        config = SweetAlertUtil.getAlertConfig("3", "El correo no es válido")
        break;
      case "auth/invalid-credential":
        config = SweetAlertUtil.getAlertConfig("3", "Usuario o contraseña incorrecto")
        break;
      default:
        console.error("Error al iniciar sesión:", error.message);
    }

    Swal.fire(config).then(() => this.isLoaderSubmit = false);


  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  get email(): AbstractControl {
    return this.loginForm.controls["email"]
  }

  get password(): AbstractControl {
    return this.loginForm.controls["password"]
  }

}
