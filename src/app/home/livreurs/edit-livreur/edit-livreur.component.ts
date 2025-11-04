import {Component, OnInit} from '@angular/core';
import {ErrorMessageComponent} from '../../../components/error-message/error-message.component';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LivreursService} from '../../../services/livreurs.service';

@Component({
  selector: 'app-edit-livreur',
  imports: [
    ErrorMessageComponent,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-livreur.component.html',
})
export class EditLivreurComponent implements OnInit{
  livreurForm!: FormGroup;
  livreurId!: any;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private livreurService: LivreursService,
    private router: Router,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.livreurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cni: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      statut: ['', Validators.required]
    });

    this.livreurId = this.route.snapshot.paramMap.get('id');

    this.livreurService.getLivreurById(this.livreurId).subscribe(
      (client) => {
        this.livreurForm.patchValue(
          {
            nom: client.nom,
            prenom: client.prenom,
            cni: client.cni,
            telephone: client.telephone,
            email: client.email,
            adresse: client.adresse,
            statut: client.statut
          }
        )
      }
    )
  }

  onSubmit(): void {
    if (this.livreurForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.livreurService.updateLivreur(this.livreurId, this.livreurForm.value).subscribe({
        next: (response) => {
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
