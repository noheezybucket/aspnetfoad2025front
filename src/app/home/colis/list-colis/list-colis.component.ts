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

  constructor(
    private colisService:ColisService
  ) {}

  ngOnInit() {
    this.colisData = this.colisService.getAllColis()
    console.log(this.colisData)
  }
}
