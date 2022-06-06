import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

//HOLAAAAAAAAAAAAAAAAAAA

@Component({
    selector: 'entollment-cmp',
    moduleId: module.id,
    templateUrl: 'enrollment.component.html'
})

export class EnrollmentComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  //SE POPULAN LAS TABLAS DE LA INTERFAZ CON LAS CARRERAS, RETOS Y GRUPOS DISPONIBLES
  ngOnInit(): void{

    this.races_table_content = [];
    this.challenges_table_content = [];
    this.groups_table_content = [];
    
    this.CS.getRaces().subscribe(res => {
      this.races_table_content = [];
      console.log(res);
      var cont = 0;
      while(cont < res["length"]){
        var data = [];

        data.push(res[cont]["id"]);
        data.push(res[cont]["name"]);
        data.push(res[cont]["date"]);
        data.push(res[cont]["type"]);
        data.push(res[cont]["visibility"]);
        data.push(res[cont]["cost"]);
        data.push(res[cont]["bank_account"]);
        data.push(res[cont]["cat_name"]);
        this.races_table_content.push(data);
        cont++;
      }
    }, error => {
      alert("ERROR");
    });

    this.CS.getChallenges().subscribe(res => {
      this.challenges_table_content = [];
      console.log(res);
      var cont = 0;
      while(cont < res["length"]){
        var data = [];

        data.push(res[cont]["id"]);
        data.push(res[cont]["name"]);
        data.push(res[cont]["period"].slice(0,10));
        data.push(res[cont]["type"]);
        data.push(res[cont]["visibility"]);
        this.challenges_table_content.push(data);
        cont++;
      }
      
    }, error => {
      alert("ERROR");
    });

    this.CS.getGroups().subscribe(res => {
      var cont = 0;
      this.groups_table_content = [];
      console.log(res)
      while(cont < res["length"]){

        var data = [];

        data.push(res[cont]["id"]);
        data.push(res[cont]["name"]);
        data.push(res[cont]["administrator"]);
        var cont2 = 1;
        var desc = "";
        if(res[cont]["organizers"] != null){
          while(cont2 < res[cont]["organizers"]["length"]){
            var athlete = "athlete" + cont2.toString();
            desc += res[cont]["athletes"][athlete]["username"];
            if(cont2+1 < res[cont]["athletes"]["length"]){
              desc += ", ";
            }
            cont2++;
          }
        }

        data.push(desc);

        this.groups_table_content.push(data);
        cont++;

      }
    }, error => {
      alert("ERROR");
    });
  }

  races_table_titles = [
    ["id","Nombre de la Carrera","Fecha de la Carrera","Tipo de Actividad","Privacidad","Costo de la Carrera","Cuenta Bancaria", "Categoría"]
  ]

  races_table_content = [];

  challenges_table_titles = [
    ["id",	"Nombre",	"Periodo Disponible",	"Tipo de Actividad",	"Modo",	"Privacidad"]
  ]

  challenges_table_content = [];

  groups_table_titles = [
    ["id",	"Nombre del Grupo", "Administrador",	"Deportistas"]
  ]

  groups_table_content = []

  public imagePath;
  imgURL: any;
  public message: string;

  //SE PEGAN LOS ÍCONOS
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
  openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

  //ENVÍO DE DATOS DE INSCRIPCIÓN DE CARRERA A "COMMUNICATION SERVICE"
  signupRace(id, file_route){
    var newRoute = "../../../../assets/img/faces/" + file_route.slice(12);
    this.CS.signupRace(id, newRoute).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  //ENVÍO DE DATOS DE INSCRIPCIÓN DE RETO A "COMMUNICATION SERVICE"
  signupChallenge(id){
    this.CS.signupChallenge(id).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

  //ENVÍO DE DATOS DE INSCRIPCIÓN DE GRUPO A "COMMUNICATION SERVICE"
  signupGroup(group_id){
    this.CS.signupGroup(group_id).subscribe(res => {
      this.ngOnInit();
    }, error => {
      alert("ERROR");
    });
  }

}
