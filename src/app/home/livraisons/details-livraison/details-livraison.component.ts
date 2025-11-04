import {Component, OnInit} from '@angular/core';
import {LivraisonsService} from '../../../services/livraisons.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe, NgIf} from '@angular/common';
import {LoadingSpinnerComponent} from '../../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-details-livraison',
  imports: [
    NgIf,
    LoadingSpinnerComponent,
    DatePipe
  ],
  templateUrl: './details-livraison.component.html',
})
export class DetailsLivraisonComponent implements OnInit {
  idLivraison!:any;
  livraisonDetails:any;
  loading = true;

  constructor(private livraisonsService:LivraisonsService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.idLivraison = this.route.snapshot.paramMap.get('id');

    this.livraisonsService.getLivraisonById(this.idLivraison).subscribe(
      res=> {
        this.livraisonDetails = res;
        console.log(this.livraisonDetails);
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    )
  }
}
