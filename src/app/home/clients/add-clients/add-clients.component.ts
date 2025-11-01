import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientsService} from '../../../services/clients.service';
import {NgIf} from '@angular/common';
import {ErrorMessageComponent} from '../../../components/error-message/error-message.component';

@Component({
  selector: 'app-add-clients',
  imports: [
    ReactiveFormsModule,
    NgIf,
    ErrorMessageComponent
  ],
  templateUrl: './add-clients.component.html',
})
export class AddClientsComponent implements OnInit {
  clientForm!: FormGroup;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cni: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.clientsService.createClient(this.clientForm.value).subscribe({
        next: (response) => {
          console.log('Client créé avec succès', response);
          this.router.navigate(['/clients']);
        },
        error: (error) => {
          console.error('Erreur lors de la création', error);
          this.errorMessage = 'Une erreur est survenue lors de la création du client';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Champs incorrects';

    }
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }
}
