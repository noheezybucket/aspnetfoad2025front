import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ErrorMessageComponent} from '../../components/error-message/error-message.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ErrorMessageComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  errorMessage: string = "";
  loading = false;


  constructor(
    private authService : AuthService,
    private router:Router
  ) {}

  onSubmit() {
    this.loading = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          console.log(data);
          const user = {
            ...data,
            username: this.loginForm.value.username,
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.errorMessage="";
          this.router.navigate(['/dashboard']);
        },

        error => {
          console.log(error);
          this.errorMessage = "Une erreur s'est produite";
        }
      )

      this.loading = false;
    } else {
      this.errorMessage = "Vérifiez vos entrées";
      this.loading = false;
    }
  }

}
