import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ErrorMessageComponent} from '../../../components/error-message/error-message.component';
import {NgIf} from '@angular/common';
import {ColisService} from '../../../services/colis.service';
import {ClientsService} from '../../../services/clients.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-edit-colis',
  imports: [
    ReactiveFormsModule,
    ErrorMessageComponent,
    NgIf
  ],
  templateUrl: './add-edit-colis.component.html',
})
export class AddEditColisComponent implements OnInit {

  colisForm = new FormGroup({
    idClient: new FormControl(null, [Validators.required]),
    adresseDepart: new FormControl("", [Validators.required]),
    adresseArrivee: new FormControl("", [Validators.required]),
    poids: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  errorMessage = "";
  clients!:any
  loading = false;

  constructor(
    private colisService: ColisService,
    private clientsService:ClientsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loading = true;

    this.clientsService.listAllClients().subscribe(
      res => {
        this.clients = res.filter((user: any) => user.role === 'Client');
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
      }
    )
  }


  onColisAdd() {
this.loading = true;
    if(this.colisForm.valid) {
      this.colisService.createColis(this.colisForm.value).subscribe(
        () => {
          this.router.navigate(['/colis']);
        },
        err => {
          this.errorMessage = "Une erreur est survenue lors de la création du colis";
this.loading = false;
        }
      )
    } else {
      this.errorMessage = "Vérifier vos entrées";
    }
  }

}
