import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule , NgModel } from '@angular/forms';
import { } from 'googlemaps';
import { RequestsService } from '../requests.service';

// import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  @ViewChild('map', { static: true }) mapElement: any;

  public infoWindow = new google.maps.InfoWindow();

  
  map: google.maps.Map;
  public directionsService = new google.maps.DirectionsService();
  public directionsRenderer = new google.maps.DirectionsRenderer();
  public to;
  public from;
  public request;

  constructor(private requestsService:RequestsService) { }

  ngOnInit(): void {
 
    const mapProperties = {
      center: new google.maps.LatLng(20.0123533,64.4487244),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.directionsRenderer.setMap(this.map);

  }

  getDirections(){
    this.getRoutes(this.directionsService,this.directionsRenderer);
  }

  getRoutes(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer
    ){
      this.request = {
        origin: this.from,
        destination: this.to,
        provideRouteAlternatives: true,
        travelMode: 'DRIVING'
      };
      directionsService.route(this.request, function(result, status) {
        if (status == 'OK') {
          console.log(result);
          
          directionsRenderer.setDirections(result);
        } else {
          console.log('Directions request failed due to ' + status)
        }
      });
    }

}
