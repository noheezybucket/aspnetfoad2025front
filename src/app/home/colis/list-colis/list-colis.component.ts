import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from "../../../components/page-header/page-header.component";
import {RouterLink} from "@angular/router";
import {ColisService} from '../../../services/colis.service';

@Component({
  selector: 'app-list-colis',
    imports: [
        RouterLink
    ],
  templateUrl: './list-colis.component.html',
})
export class ListColisComponent implements OnInit {
  colisData!: any;
  loading = false;

  constructor(
    private colisService:ColisService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.colisData = this.colisService.getAllColis().subscribe(
      res => {
        this.colisData = res
        console.log(this.colisData)
        this.loading = false;
      },
      err => {
        console.log(err)
        this.colisData=[];
        this.loading = false;
      }
    )
  }
}
