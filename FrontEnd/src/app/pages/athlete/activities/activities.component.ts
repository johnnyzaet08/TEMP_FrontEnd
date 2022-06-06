import { Component } from '@angular/core';
import { fileURLToPath } from 'url';
import * as $ from "jquery";
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'notifications-cmp',
    moduleId: module.id,
    templateUrl: 'activities.component.html'
})

export class ActivitiesComponent{

  constructor(private CS: CommunicationService) {}

  public sendNewActivity(s_time, duration, a_type, date, URL, km, categoryId){

    var username = localStorage.getItem('current_username')
    s_time+=":00";
    duration+=":00";
    var activityId = 0;

    switch(a_type){
      case "Atletismo":
        activityId = 1;
        break;
      case "Natacion":
        activityId = 2;
        break;
      case "Ciclismo":
        activityId = 3;
        break;
      case "Senderismo":
        activityId = 4;
        break;
      case "Kayac":
        activityId = 5;
        break;
      case "Caminata":
        activityId = 6;
        break;
    }

    //ENVÍA ACTIVIDAD AL SERVIDOR
    this.CS.sendNewActivity(localStorage.getItem("current_id"), s_time, duration, a_type, date, URL, km, categoryId, activityId).subscribe(res => {
      alert("Se ha agregado correctamente");
    }, error => {
      console.log(error)
      alert(error);
    });
  }

}
