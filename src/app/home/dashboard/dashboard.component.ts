import {Component, OnInit} from '@angular/core';
import {PageHeaderComponent} from '../../components/page-header/page-header.component';
import * as L from 'leaflet';
import {StatsData, StatsService} from '../../services/stats.service';
import {LoadingSpinnerComponent} from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([14.723712, -17.494233]),
  ];

  statsData: StatsData | null = null;
  loading = false;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadStats();
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  loadStats() {
    this.loading = true;
    this.statsService.getStats().subscribe(
      (res) => {
        this.statsData = res;
        console.log('Stats:', this.statsData);
        this.loading = false;
      },
      (err) => {
        console.error('Erreur lors du chargement des stats:', err);
        this.loading = false;
      }
    );
  }

  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    this.map.fitBounds(bounds);
    this.map.setZoom(this.map.getZoom() - 5);
  }

  getPercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }
}
