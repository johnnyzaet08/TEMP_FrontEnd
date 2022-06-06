import { Component } from '@angular/core';
import { fileURLToPath } from 'url';
import * as $ from "jquery";
import { Button } from 'bootstrap';
import { CommunicationService } from 'app/communication/communication.service';


@Component({
    selector: 'search-cmp',
    moduleId: module.id,
    templateUrl: 'search.component.html'
})

export class SearchComponent{
  constructor(private CS: CommunicationService) {}

  //SE POPULAN N CARTAS CON LOS USUARIOS QUE NO SE HAN SEGUIDO
  ngOnInit(): void{
    this.athletesList = [];

    this.CS.getUsers(this.all).subscribe(res => {
      console.log(res)
      var cont = 0;
      while(cont < res["length"]){

        var data = [];
        if(res[cont]["id"] != localStorage.getItem("current_id")){
          data.push(res[cont]["fname"] + " " + res[cont]["lname"]);
          data.push(res[cont]["username"]);
          data.push(res[cont]["nationality"]);
          data.push(res[cont]["activities"]);
          data.push(res[cont]["photo"]);
          data.push(res[cont]["id"]);

          this.athletesList.push(data);
        }
        
        cont++;

      }
    }, error => {
      alert("ERROR");
    });
  }

  all = "";
  athletesList =   [];

  //ENVÍA UN USERNAME AL SERVIDOR Y FILTRA COINCIDENCIAS
  search(data){
    this.all = data;
    this.ngOnInit();
  }

  //AÑADE COMO AMIGO A UN USUARIO SELECCIONADO
  addFriend(friend_id){
    this.CS.addFriend(friend_id, localStorage.getItem("current_id")).subscribe(res => {
      alert("Se ha agregado como amigo")
      this.all = "";
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }



}
