import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientsService} from '../../../services/clients.service';
import {Router} from '@angular/router';
import {LivreursService} from '../../../services/livreurs.service';
import {ErrorMessageComponent} from '../../../components/error-message/error-message.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-livreurs',
  imports: [
    ErrorMessageComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-livreurs.component.html',
})
export class AddLivreursComponent {
  livreurForm!: FormGroup;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private livreursService: LivreursService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livreurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cni: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.livreurForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.livreursService.createLivreur(this.livreurForm.value).subscribe({
        next: (response) => {
          console.log('Client créé avec succès', response);
          this.router.navigate(['/livreurs']);
        },
        error: (error) => {
          console.error('Erreur lors de la création', error);
          this.errorMessage = 'Une erreur est survenue lors de la création du livreur';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Champs incorrects';

    }
  }

  onCancel(): void {
    this.router.navigate(['/livreurs']);
  }
}
