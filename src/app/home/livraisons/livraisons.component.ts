import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ColisService} from '../../services/colis.service';
import {LivreursService} from '../../services/livreurs.service';
import {ErrorMessageComponent} from '../../components/error-message/error-message.component';
import {NgIf} from '@angular/common';
import {LivraisonsService} from '../../services/livraisons.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-livraisons',
  imports: [
    PageHeaderComponent,
    RouterOutlet,

  ],
  templateUrl: './livraisons.component.html',
})
export class LivraisonsComponent {


}
