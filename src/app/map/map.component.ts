import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() id!: string;
  
  private map!: L.Map;

  ngOnInit(): void {
    // Revisamos si lat y lng son números válidos antes de inicializar el mapa.
    if (!isNaN(this.lat) && !isNaN(this.lng) && this.id) {
      this.initMap();
    }
  }

  private initMap(): void {
    this.map = L.map(this.id, {
      center: [this.lat, this.lng],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.lat, this.lng]).addTo(this.map)
      .bindPopup('La ubicación de la propiedad.');
  }
}


