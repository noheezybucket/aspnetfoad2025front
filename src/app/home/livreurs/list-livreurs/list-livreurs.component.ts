import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../../services/clients.service';
import {LivreursService} from '../../../services/livreurs.service';
import {RouterLink} from '@angular/router';
import {LoadingSpinnerComponent} from '../../../components/loading-spinner/loading-spinner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-livreurs',
  imports: [
    RouterLink,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './list-livreurs.component.html',
})
export class ListLivreursComponent implements OnInit{

  livreurs: any;
  filteredLivreurs: any[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(private livreursService:LivreursService) {}

  ngOnInit() {
    this.loading = true;
    this.livreursService.listAllLivreurs().subscribe(
      res => {
        console.log(res)
        this.livreurs = res.filter((user: any) => user.role === 'Livreur');
        this.filteredLivreurs = this.livreurs
        this.loading = false;
      },
      err => {
        console.log(err)
        this.livreurs = [];
        this.filteredLivreurs = [];
        this.loading = false;
      }
    )
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredLivreurs = this.livreurs;
      return;
    }

    this.filteredLivreurs = this.livreurs.filter((client: any) => {
      return (
        client.idUsersColis?.toString().toLowerCase().includes(term) ||
        client.prenom?.toLowerCase().includes(term) ||
        client.nom?.toLowerCase().includes(term) ||
        `${client.prenom} ${client.nom}`.toLowerCase().includes(term) ||
        client.cni?.toLowerCase().includes(term) ||
        client.telephone?.toLowerCase().includes(term) ||
        client.email?.toLowerCase().includes(term) ||
        client.adresse?.toLowerCase().includes(term) ||
        client.statut?.toString().toLowerCase().includes(term)
      );
    });
  }

}
