import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';

@Component({
    selector: 'race-management-cmp',
    moduleId: module.id,
    templateUrl: 'groups-management.component.html'
})

export class GroupsManagementComponent{
  constructor(private modal:NgbModal, private CS: CommunicationService) {}

  ngOnInit(): void {

    //SE POPULA LA TABLA DE GRUPOS, DE EL ORGANIZADOR
    this.CS.getOrgGroups().subscribe(res => {
      var cont = 0;
      this.groups_management_table_content = [];
      while(cont < res["length"]){

        var data = [];

        data.push(res[cont]["id"]);
        data.push(res[cont]["name"]);
        data.push(res[cont]["administrator"]);     

        this.groups_management_table_content.push(data);
        cont++;

      }
    }, error => {
      console.log(error);
      alert("ERROR");
    });
  }

  groups_management_table_titles = [
    ["id","Nombre del Grupo","Administrador"]
  ]

  groups_management_table_content = [];

    //SE INICIALIZA LA VENTANA EMERGENTE (pop-up)
    openModal(content){ this.modal.open(content,{size:'lg', centered:true});}

    //ENVÍ0 DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA CREAR GRUPO
    createGroup(group_name, group_admin){
      this.CS.createGroup(group_name, group_admin).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("ERROR");
      });
    }

    //ENVÍ0 DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA ACTUALIZAR GRUPO
    updateGroup(group_id, group_name, group_admin){
      this.CS.updateGroup(group_id, group_name, group_admin).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("ERROR");
      });
    }

    //ENVÍO DE DATOS DE GRUPO A "COMMUNICATION SERVICE" PARA ELIMINAR GRUPO
    deleteGroup(group_id){
       this.CS.deleteGroup(group_id).subscribe(res => {
        this.ngOnInit();
       }, error => {
         alert("ERROR");
       });
    }


}
