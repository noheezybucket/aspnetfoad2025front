import {Component, OnInit} from '@angular/core';
import {ErrorMessageComponent} from "../../../components/error-message/error-message.component";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ColisService} from '../../../services/colis.service';
import {ClientsService} from '../../../services/clients.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-colis',
    imports: [
        ErrorMessageComponent,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './edit-colis.component.html',
})
export class EditColisComponent implements OnInit{
  colisForm = new FormGroup({
    idClient: new FormControl(null, [Validators.required]),
    adresseDepart: new FormControl("", [Validators.required]),
    adresseArrivee: new FormControl("", [Validators.required]),
    poids: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })
  errorMessage = "";
  clients!:any
  colisInfo!:any;
  colisId!:any;
  loading = false;

  constructor(
    private colisService: ColisService,
    private clientsService:ClientsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.colisId = this.route.snapshot.paramMap.get('id');

    this.colisService.getAllColisById(this.colisId).subscribe(
      data => {
        this.colisInfo = data;
        this.colisForm.patchValue({
          idClient:this.colisInfo.idClient,
          adresseDepart: this.colisInfo.adresseDepart,
          adresseArrivee: this.colisInfo.adresseArrivee,
          poids: this.colisInfo.poids,
          description: this.colisInfo.description,
        })
        console.log(this.colisInfo);
        this.loading = false;
      },
      error => {
        this.errorMessage = error.message;
        console.log(error);
        this.loading = false;
      }
    )

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

  onSubmit() {
    this.loading = true;
    if(this.colisForm.valid){
      this.colisService.updateColis(this.colisId, this.colisForm.value).subscribe(
        () => {
          this.router.navigate(["/colis"])
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
