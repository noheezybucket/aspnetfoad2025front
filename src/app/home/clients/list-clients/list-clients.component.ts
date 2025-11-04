import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../../services/clients.service';
import {RouterLink} from '@angular/router';
import {LoadingSpinnerComponent} from '../../../components/loading-spinner/loading-spinner.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-clients',
  imports: [
    RouterLink,
    LoadingSpinnerComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './list-clients.component.html',
})
export class ListClientsComponent implements OnInit{
  clients: any[] = []; // Initialisé comme tableau vide
  filteredClients: any[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(private clientsService:ClientsService) {}

  ngOnInit() {
    this.loading = true;
    this.clientsService.listAllClients().subscribe(
      res => {
        console.log(res)
        this.clients = res.filter((user: any) => user.role === 'Client');
        this.filteredClients = this.clients; // ⭐ AJOUT IMPORTANT : Initialiser filteredClients
        this.loading = false;
      },
      err => {
        console.log(err)
        this.clients = [];
        this.filteredClients = []; // ⭐ Aussi en cas d'erreur
        this.loading = false;
      }
    )
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredClients = this.clients;
      return;
    }

    this.filteredClients = this.clients.filter((client: any) => {
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
