import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from "../../../components/page-header/page-header.component";
import {RouterLink} from "@angular/router";
import {ColisService} from '../../../services/colis.service';
import {LoadingSpinnerComponent} from '../../../components/loading-spinner/loading-spinner.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-colis',
  imports: [
    RouterLink,
    LoadingSpinnerComponent,
    FormsModule
  ],
  templateUrl: './list-colis.component.html',
})
export class ListColisComponent implements OnInit {
  colisData!: any;
  filteredColisData: any[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(
    private colisService:ColisService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.colisData = this.colisService.getAllColis().subscribe(
      res => {
        this.colisData = res
        this.filteredColisData = res;
        console.log(this.colisData)
        this.loading = false;
      },
      err => {
        console.log(err)
        this.colisData=[];
        this.filteredColisData = [];
        this.loading = false;
      }
    )
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredColisData = this.colisData;
      return;
    }

    this.filteredColisData = this.colisData.filter((colis:any) => {
      return (
        colis.codeColis?.toLowerCase().includes(term) ||
        colis.nomclient?.toLowerCase().includes(term) ||
        colis.prenomclient?.toLowerCase().includes(term) ||
        `${colis.prenomclient} ${colis.nomclient}`.toLowerCase().includes(term) ||
        colis.adresseDepart?.toLowerCase().includes(term) ||
        colis.adresseArrivee?.toLowerCase().includes(term) ||
        colis.description?.toLowerCase().includes(term) ||
        colis.statutLivraison?.toLowerCase().includes(term) ||
        colis.poids?.toString().includes(term)
      );
    });
  }
}
