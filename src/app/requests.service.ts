import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  public backendURL = "http://localhost:3000/";
  public directionsURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?";
  public api_key = "AIzaSyA6ubquV2CEhAh7JocbOfKO8h6ziwaJe6c";
  constructor(private http:HttpClient) { }

  getDirections(to,from){
    return  this.http.get(this.directionsURL+'origin='+from+'&'+'destination='+to+'&'+'key='+this.api_key)
  }

  postAccidents(photo,location){
    return this.http.post(this.backendURL+'report-accident',{photo,location});
  }

  getAccidents(){
    return this.http.get(this.backendURL+'getAccidents');
  }


}
