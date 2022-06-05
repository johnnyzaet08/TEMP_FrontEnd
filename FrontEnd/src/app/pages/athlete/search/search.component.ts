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

      var cont = 0;
      while(cont < res["length"]){

        var data = [];

        data.push(res[cont]["fname"] + " " + res[cont]["lname"]);
        data.push(res[cont]["username"]);
        data.push(res[cont]["nationality"]);
        data.push(res[cont]["activities"]);
        data.push(res[cont]["photo"]);

        this.athletesList.push(data);
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
  addFriend(athlete_username){
    this.CS.addFriend(athlete_username).subscribe(res => {
      alert("Se ha agregado como amigo a " + athlete_username)
      this.all = "";
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }



}
