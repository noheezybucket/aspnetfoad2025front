import {Component, OnInit} from '@angular/core';
import {ErrorMessageComponent} from "../../../components/error-message/error-message.component";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClientsService} from '../../../services/clients.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-client',
    imports: [
        ErrorMessageComponent,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './edit-client.component.html',

})
export class EditClientComponent implements OnInit{
  clientForm!: FormGroup;
  clientId!: any;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private router: Router,
    private route:ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cni: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      statut: ['', Validators.required]
    });

    this.clientId = this.route.snapshot.paramMap.get('id');

    this.clientsService.getClientById(this.clientId).subscribe(
      (client) => {
        this.clientForm.patchValue(
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
    if (this.clientForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.clientsService.updateClient(this.clientId, this.clientForm.value).subscribe({
        next: (response) => {
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
