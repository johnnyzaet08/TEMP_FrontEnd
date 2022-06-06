import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'challenges-management.component.html'
})

export class ChallengesManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  ngOnInit(): void{

    this.challenge_management_table_content = [];

    //SE POPULA LA TABLA DE RETOS DEL ORGANIZADOR, RECIBE EL NOMBRE DE USUARIO DEL ORGANIZADOR
    this.CS.getOrgChallenges().subscribe(res => {
      var cont = 0;
      this.challenge_management_table_content = [];

      while(cont < res["length"]){
        var data = [];

        data.push(res[cont]["id"]);
        data.push(res[cont]["name"]);
        data.push(res[cont]["type"]); 
        data.push(res[cont]["period"]); 
        data.push(res[cont]["mileage"]);        
        data.push(res[cont]["visibility"]); 
        
        //data.push(this.getData(res[race]["bAccounts"], "account", "bank_account"));
        //data.push(this.getData(res[race]["categories"], "category", "cat_name"));

        this.challenge_management_table_content.push(data);
        cont++;
      }
    }, error=>{
      alert("ERROR");
    });
  }

  //FUNCIÓN AUXILIAR PARA OBTENER EL NOMBRE DE TODOS LOS PATROCINADORES
  //obj: JSON AL QUE SE LE EXTRAERÁN DATOS
  //type: KEY A CONCATENAR CON EL CONTADOR
  //key: KEY DEL DATO A EXTRAER
  public getData(obj, type, key){
    var cont = 1;
    var data = "";
    while(cont < obj["size"]){
      var dataType = type + cont.toString();
      if(cont+1<obj["size"]){
        data = data + obj[dataType][key] + ", ";
      }else{
        data += obj[dataType][key];
      }
      cont++;
    }
    return data;
}

  challenge_management_table_titles = [
    ["id", "Nombre","Tipo de Actividad", "Periodo Disponible", "Distancia (km)","Privacidad"]
  ]

  challenge_management_table_content = [];

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVI0 DE DATOS DE RETOS A "COMMUNICATION SERVICE" PARA CREAR RETO
  createChallenge(challenge_name, challenge_period, activity_type, mileage, visibility){
    this.CS.createChallenge(challenge_name, challenge_period, activity_type, mileage, visibility ).subscribe(res => {
      this.ngOnInit();
    });
  }

  //ENVÍ0 DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ACTUALIZAR CARRERA
  updateChallenge(challenge_id, challenge_name, challenge_period, activity_type, mileage, visibility){
    this.CS.updateChallenge(challenge_id, challenge_name, challenge_period, activity_type, mileage, visibility).subscribe(res => {
      this.ngOnInit();
    });
  }

  //ENVÍO DE DATOS DE CARRERA A "COMMUNICATION SERVICE" PARA ELIMINAR CARRERA
  deleteChallenge(challenge_id){
    this.CS.deleteChallenge(challenge_id).subscribe(res => {
      this.ngOnInit();
    });
  }

}
