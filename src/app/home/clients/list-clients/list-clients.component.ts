import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../../services/clients.service';
import {RouterLink} from '@angular/router';
import {LoadingSpinnerComponent} from '../../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-list-clients',
  imports: [
    RouterLink,
    LoadingSpinnerComponent
  ],
  templateUrl: './list-clients.component.html',
})
export class ListClientsComponent implements OnInit{
  clients: any;
  loading = false;

  constructor(private clientsService:ClientsService) {}

  ngOnInit() {
    this.loading = true;
    this.clientsService.listAllClients().subscribe(
      res => {
        console.log(res)
        this.clients = res.filter((user: any) => user.role === 'Client');
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
      }
    )
  }

}
