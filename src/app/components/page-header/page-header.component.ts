import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit {
  @Input() title: string = '';
  user!:any

  ngOnInit() {
    this.user = JSON.parse(<string>localStorage.getItem('user'))
  }

}
