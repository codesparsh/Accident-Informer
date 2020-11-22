import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Subscriber } from 'rxjs';
import { RequestsService } from '../requests.service';
@Component({
  selector: 'app-report-accident',
  templateUrl: './report-accident.component.html',
  styleUrls: ['./report-accident.component.css']
})
export class ReportAccidentComponent implements OnInit {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  videoHeight =0;
  videoWidth =0;
  captures: Array<any>;
  public location;
  public photo;
  constraints = {
    video: {
      facingMode: "environment",
      width: {ideal:4096},
      height: {ideal:2160}
    }
  };
  constructor(private requestService:RequestsService,private renderer: Renderer2) {
    this.captures =[];
  }

  ngOnInit(): void {
    this.startCamera();
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
      this.location={
        "lat":position.coords.latitude,
        "long":position.coords.longitude
      }
    });
  }

  startCamera(){
    if(!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)){
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    }else{
      alert('Sorry, camera not available');
    }
  }

  handleError(error){
    console.log('Error: ',error);
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
        this.videoHeight = this.videoElement.nativeElement.videoHeight;
        this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  capture(){
    this.renderer.setProperty(this.canvas.nativeElement,'width',this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement,'height',this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement,0,0);
    this.photo = this.videoElement.nativeElement;
  }

  report(){
   this.requestService.postAccidents(this.photo,this.location).subscribe((data)=>{
    console.log(data);

   }) 
  }
}
