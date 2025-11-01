import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-livreurs',
  imports: [
    RouterOutlet,
    PageHeaderComponent
  ],
  templateUrl: './livreurs.component.html',
})
export class LivreursComponent {

}
