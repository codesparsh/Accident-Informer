import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
 
  // public headers= new HttpHeaders()
  // .set('content-type', 'application/json')
  // .set('Access-Control-Allow-Origin', '*');
  public directionsURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?";
  public api_key = "AIzaSyA6ubquV2CEhAh7JocbOfKO8h6ziwaJe6c";
  constructor(private http:HttpClient) { }

  getDirections(to,from){



    return  this.http.get(this.directionsURL+'origin='+from+'&'+'destination='+to+'&'+'key='+this.api_key)
  }
}
