import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ColisService} from '../../services/colis.service';
import {LivreursService} from '../../services/livreurs.service';
import {ErrorMessageComponent} from '../../components/error-message/error-message.component';
import {NgIf} from '@angular/common';
import {LivraisonsService} from '../../services/livraisons.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-livraisons',
  imports: [
    PageHeaderComponent,
    ReactiveFormsModule,
    ErrorMessageComponent,
    NgIf,
    LoadingSpinnerComponent,
    RouterLink
  ],
  templateUrl: './livraisons.component.html',
})
export class LivraisonsComponent implements OnInit{
  colisData!: any;
  livreursData!: any;
  livraisonsData!: any;
  loading = false;
  errorMessage = "";
  livraisonForm =  new FormGroup({
    idColis : new FormControl("", [Validators.required]),
    idLivreur : new FormControl("", [Validators.required]),
  });

  constructor(
    private colisService:ColisService,
    private livreursService: LivreursService,
    private livraisonsService: LivraisonsService,
  ) {}

  ngOnInit() {
    this.loading = true;
    this.colisService.getAllColis().subscribe(
      res => {
        this.colisData = res.filter((colis:any) => colis.statutLivraison === 'En attente')
        this.loading = false;
      },
      err => {
        console.log(err)
        this.colisData=[];
        this.loading = false;
      }
    )

    this.livreursService.listAllLivreurs().subscribe(
      res => {
        this.livreursData = res.filter((user: any) => user.role === 'Livreur')
        this.loading = false;
      },
      err => {
        console.log(err)
      }
    )

    this.loadLivraisons();

  }

  loadLivraisons() {
    this.livraisonsService.listAllLivraisons().subscribe(
      res => {
        this.livraisonsData = res;
        console.log(this.livraisonsData);
        this.loading = false
      },
      err => {
        console.log(err)
        this.loading = false

      }
    )
  }

  onSubmit(){
    if(this.livraisonForm.valid) {
      this.errorMessage="";
      this.livraisonsService.createLivraison(this.livraisonForm.value).subscribe(
        res => {
          this.loadLivraisons()
          alert("Livraison ajouter")
          this.livraisonForm.reset();
        }
      )
      console.log(this.livraisonForm.value);
    } else {
      this.errorMessage = "Veuillez vérifier vos entrées";
    }
  }

  finishDelivery(id:any) {
    this.livraisonsService.finishLivraison(id).subscribe(
      res => {
        alert("Livraison terminer avec succès")
        this.loadLivraisons();
      },
      err => {
        alert("Une erreur est survenue lors de la finalisation de la livraison, réessayer")
      }
    )
  }

}
