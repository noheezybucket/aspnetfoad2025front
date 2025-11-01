import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../../services/clients.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list-clients',
  imports: [
    RouterLink
  ],
  templateUrl: './list-clients.component.html',
})
export class ListClientsComponent implements OnInit{
  clients: any;

  constructor(private clientsService:ClientsService) {}

  ngOnInit() {
    this.clientsService.listAllClients().subscribe(
      res => {
        console.log(res)
        this.clients = res.filter((user: any) => user.role === 'Client');

      },
      err => {
        console.log(err)
      }
    )
  }

}
