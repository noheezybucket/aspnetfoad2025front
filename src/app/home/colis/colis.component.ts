import {Component, OnInit} from '@angular/core';
import {ColisService} from '../../services/colis.service';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-colis',
  imports: [
    PageHeaderComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './colis.component.html',
})
export class ColisComponent {

}
