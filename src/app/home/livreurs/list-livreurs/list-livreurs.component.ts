import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../../services/clients.service';
import {LivreursService} from '../../../services/livreurs.service';
import {RouterLink} from '@angular/router';
import {LoadingSpinnerComponent} from '../../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-list-livreurs',
  imports: [
    RouterLink,
    LoadingSpinnerComponent
  ],
  templateUrl: './list-livreurs.component.html',
})
export class ListLivreursComponent implements OnInit{

  livreurs: any;
  loading = false;

  constructor(private livreursService:LivreursService) {}

  ngOnInit() {
    this.loading = true;
    this.livreursService.listAllLivreurs().subscribe(
      res => {
        console.log(res)
        this.livreurs = res.filter((user: any) => user.role === 'Livreur');
        this.loading = false;
      },
      err => {
        console.log(err)
        this.loading = false;
      }
    )
  }

}
