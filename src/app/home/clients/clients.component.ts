import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-clients',
  imports: [
    RouterOutlet,
    PageHeaderComponent
  ],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {

}
