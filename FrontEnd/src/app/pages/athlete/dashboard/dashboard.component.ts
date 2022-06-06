import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  constructor(private router: Router, private sanitizer:DomSanitizer, private CS:CommunicationService){}

  //SE OBTIENEN DATOS DE LAS ACTIVIDADES DE LOS USUARIOS SEGUIDOS POR EL USUARIO, Y SE PEGAN EN CARTAS DINÁMICAS
  ngOnInit(): void{
    this.CS.getFriendsActivities(localStorage.getItem('current_id')).subscribe(res => {
      var cont = 0

      while(cont < res["length"]){

        this.uploadAtlete(res[cont]["usernameId"],res[cont]["route"],res[cont]["type"],
        res[cont]["hour"], res[cont]["date"].slice(0,10), res[cont]["mileage"], res[cont]["duration"])

        cont++;
      }
      this.resultImage="";

      if(res["length"] == 0){
        this.resultMessage = "Tus amigos no tienen actividades todavía";
        this.resultImage = "../../assets/img/batmanrunning.gif";
      }

    }, error => {
      alert("ERROR")
    });
  };

  resultImage;
  resultMessage = "";
  cardsInfo = [];

  public addUrl(actual){
    return this.sanitizer.bypassSecurityTrustResourceUrl(actual);
  }

  //SE CALCULA EL TIEMPO DE FINALIZACIÓN, SUMANDO EL TIEMPO INICIAL Y LA DURACIÓN
  calculateEndTime(s_time, duration){

    var hTime = Number(s_time.slice(0,2)) + Number(duration.slice(0,2));
    var mTime = Number(s_time.slice(3,5)) + Number(duration.slice(3,5));

    if(mTime>60){
      hTime += 1;
      mTime -= 60;
    }

    var hEnd = hTime.toString();
    var mEnd = mTime.toString();

    if(hEnd.length == 1){
      hEnd = "0" + hEnd;
    }
    if(mEnd.length == 1){
      mEnd = "0" + mEnd;
    }

    var endTime = hEnd + ":" + mEnd + ":00";

    return endTime;
  }

  uploadAtlete(usernameId, urlP, typeP, startP, dateP, distanceP, timeP){
    this.CS.getAthlete(usernameId).subscribe(response =>{
      var data = [];

      var img = response["photo"];
      var name = response["fname"] + " " + response["lname"];

      var end = this.calculateEndTime(startP,timeP);

      data.push(img,name,urlP,typeP,startP,end,dateP,distanceP,timeP);
      this.cardsInfo.push(data);


      return response;
    })
  }

}
