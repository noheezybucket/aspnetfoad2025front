import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  imports: [
    PageHeaderComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private map!: L.Map

  markers: L.Marker[] = [
    L.marker([14.723712, -17.494233]),
];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }


  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private centerMap() {
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map into the boundary
    this.map.fitBounds(bounds);
  }
}
