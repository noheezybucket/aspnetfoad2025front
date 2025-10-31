import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {ErrorMessageComponent} from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    ErrorMessageComponent
  ],
  templateUrl: './register.component.html',
})

export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
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

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        data => {
          console.log(data);
          this.errorMessage="";
          this.router.navigate(['/auth/login']);
        },

        error => {
          console.log(error);
          this.errorMessage = "Une erreur s'est produite";
          this.registerForm.reset();
        }
      )

      this.loading = false;
    } else {
      this.errorMessage = "Vérifiez vos entrées";
      this.loading = false;
    }
  }

  cleanErrorMessage() {
    this.errorMessage = "";
  }
}
