import {Component, OnInit} from '@angular/core';
import {ErrorMessageComponent} from "../../../components/error-message/error-message.component";
import {LoadingSpinnerComponent} from "../../../components/loading-spinner/loading-spinner.component";
import {NgIf} from "@angular/common";
import {PageHeaderComponent} from "../../../components/page-header/page-header.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {ColisService} from '../../../services/colis.service';
import {LivreursService} from '../../../services/livreurs.service';
import {LivraisonsService} from '../../../services/livraisons.service';

@Component({
  selector: 'app-list-livraisons',
  imports: [
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './list-livraisons.component.html',
})
export class ListLivraisonsComponent implements OnInit {
  colisData!: any;
  livreursData!: any;
  filteredLivraisonData!: any;
  livraisonsData!: any;
  searchTerm: string = "";
  loading = true;
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
        this.filteredLivraisonData = this.livraisonsData;
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

  cancelDelivery(id:any) {
    this.livraisonsService.cancelLivraison(id).subscribe(
      res => {
        alert("Livraison annulé avec succès")
        this.loadLivraisons();
      },
      err => {
        alert("Une erreur est survenue lors de l'annulation de la livraison, réessayer")
      }
    )
  }

  undoDelivery(id:any) {
    this.livraisonsService.undoLivraison(id).subscribe(
      res => {
        alert("Livraison reprise avec succès")
        this.loadLivraisons();
      },
      err => {
        alert("Une erreur est survenue lors de la reprise de la livraison, réessayer")
      }
    )
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredLivraisonData = this.livraisonsData;
      return;
    }

    this.filteredLivraisonData = this.livraisonsData.filter((livraison:any) => {
      return (
        livraison.colis.codeColis?.toLowerCase().includes(term) ||
        livraison.client.nom?.toLowerCase().includes(term) ||
        livraison.client.prenom?.toLowerCase().includes(term) ||
        `${livraison.client.nom} ${livraison.client.prenom}`.toLowerCase().includes(term) ||
        livraison.client.telephone?.toLowerCase().includes(term) ||
        livraison.colis.adresseDepart?.toLowerCase().includes(term) ||
        livraison.statut?.toLowerCase().includes(term)
      );
    });
  }
}
