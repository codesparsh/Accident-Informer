import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
// import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  // public mapElement = document.getElementById('map');
  public infoWindow = new google.maps.InfoWindow();
  map: google.maps.Map;
  constructor() { }

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    navigator.geolocation.getCurrentPosition((pos)=>{
      console.log(pos);
        var position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        this.infoWindow.setPosition(position);
        this.infoWindow.setContent('Location found.');
        this.infoWindow.open(this.map);
        this.map.setCenter(position);
      
    })
    
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    // console.log(this.infoWindow);
    
    // this.infoWindow = new google.maps.InfoWindow;
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     var pos = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };

    //     this.infoWindow.setPosition(pos);
    //     this.infoWindow.setContent('Location found.');
    //     this.infoWindow.open(this.map);
    //     this.map.setCenter(pos);
    //   }, function () {
    //     this.handleLocationError(true, this.infoWindow, this.map.getCenter());
    //   });
    // } else {
    //   // Browser doesn't support Geolocation
    //   this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    // }

  }
  
  // handleLocationError(browserHasGeolocation, infoWindow, pos) {
  //   infoWindow.setPosition(pos);
  //   infoWindow.setContent(browserHasGeolocation ?
  //     'Error: The Geolocation service failed.' :
  //     'Error: Your browser doesn\'t support geolocation.');
  //   this.infoWindow.open(this.map);
  // }
}
