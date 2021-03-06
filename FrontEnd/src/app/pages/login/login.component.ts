import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';

import { CommunicationService } from './../../communication/communication.service';

@Component({
    selector: 'login-cmp',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{
  constructor(private router: Router, private CS:CommunicationService) {}

  //SE NAVEGA HACIA EL COMPONENTE DE REGISTRO
  toRegister(){
    this.router.navigateByUrl('/register');
  }

  //SE NAVEGA HACIA EL COMPONENTE "DASHBOARD" DE DEPORTISTAS
  toAthleteLayout(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['dashboard']));
  }

  //SE NAVEGA HACIE EL COMPONENTE "RACE_MANAGEMENT" DE ORGANIZADORES
  toOrganizerLayout(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate(['race-management']));
  }

  //SE DEFINE UN LOCAL STORAGE PARA TENER ALCANCE EN TODO MOMENTO AL NOMBRE DE USUARIO Y SU CONTRASEÑA
  //RECIBE: NOMBRE DE USUARIO Y CONTRASEÑA, RESPECTIVAMENTE
  setLocalStorage(username, password, id){
    localStorage.clear();
    localStorage.setItem("current_username",username);
    localStorage.setItem("current_password",password);
    localStorage.setItem("current_id",id);
    this.router.navigateByUrl('/dashboard');
  }

  //VERIFICA QUE LOS DATOS INGRESADOS PERTENEZCAN A UN USUARIO REGISTRADO
  //POSTERIORMENTE SE ENVÍA AL COMPONENTE RESPECTIVO
  //RECIBE: NOMBRE DE USUARIO Y CONTRASEÑA, RESPECTIVAMENTE
  verifyLogin(username, password, user_type){
    if(user_type == "athlete"){
      this.CS.verifyUserAtl(username,password).subscribe(
        res => {
          console.log(res)
          this.setLocalStorage(username, password, res[0]["id"]); 
          //this.router.navigateByUrl('/dashboard');      
          },
        error => {
          console.log(error);
          alert("Nombre de usuario o contraseña incorrectos");
        })
    }else if(user_type == "organizer"){
      console.log(user_type);
      this.CS.verifyUserOrg(username,password).subscribe(
        res => {
          console.log(res)
          this.setLocalStorage(username, password, res[0]["id"]); 
          this.router.navigateByUrl('/race-management');      
          },
        error => {
          console.log(error);
          alert("Nombre de usuario o contraseña incorrectos #2");
        })
      //this.router.navigateByUrl('/race-management');
    }
    /*this.CS.verifyUser(username,password).subscribe(
      res => {
        if(res['userType'] == 'Athlete'){
          this.router.navigateByUrl('/dashboard');
        }
        else if(res['userType'] == 'Organizer'){
          this.CS.createReports().subscribe(res => {
            this.router.navigateByUrl('/race-management');
          });
        }
        else{
          alert(res);
        }

      },
      error => {
        alert("Nombre de usuario o contraseña incorrectos");
      }
      )*/;;
      //this.router.navigateByUrl('/dashboard');
  }
}
