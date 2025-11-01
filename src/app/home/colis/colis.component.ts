import {Component} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import { RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-colis',
  imports: [
    PageHeaderComponent,
    RouterOutlet
  ],
  templateUrl: './colis.component.html',
})
export class ColisComponent {

}
