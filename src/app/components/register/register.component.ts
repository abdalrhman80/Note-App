import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,20}$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(100)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })
  unsubscribe!: Subscription
  isLoading: boolean = false
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router,
    private messageService: MessageService
  ) { }
  @ViewChild('passwordInput') passwordInput!: ElementRef
  showError(msgError: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msgError });
  }
  signUp(dataForm: FormGroup) {
    this.isLoading = true
    this.unsubscribe = this._AuthenticationService.signUp(dataForm.value).subscribe({
      next: (response) => {
        this.isLoading = false
        if (response.msg == 'done')
          this._Router.navigate(['/login'])
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
  ngOnDestroy(): void {
    // this.unsubscribe.unsubscribe()
  }
}
