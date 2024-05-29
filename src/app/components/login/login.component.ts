import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,20}$/)]),
  })
  isLoading: boolean = false
  @ViewChild('passwordInput') passwordInput!: ElementRef

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router,
    private messageService: MessageService
  ) { }

  showError(msgError: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msgError });
  }

  signIn(dataForm: FormGroup) {
    this.isLoading = true
    this._AuthenticationService.signIn(dataForm.value).subscribe({
      next: (response) => {
        this.isLoading = false
        this._AuthenticationService.setToken(response.token)
        this._AuthenticationService.decodeToken()
        this._Router.navigate(['/All-notes'])
      },
      error: (error) => {
        this.isLoading = false
        this.showError(error.error.msg)
      }
    })
  }

  togglePassword() {
    if (this.passwordInput.nativeElement.type == 'password') this.passwordInput.nativeElement.type = 'text'
    else this.passwordInput.nativeElement.type = 'password'
  }
}
