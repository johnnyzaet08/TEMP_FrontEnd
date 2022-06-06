import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root'
})


export class CommunicationService {

  private URL = "https://apistraviatec.azurewebsites.net/";

  constructor(private http: HttpClient) {} 
   // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO ATLETA
   public verifyUserAtl(username: string, password: string){
     console.log({"username": username, "password": password})
    return this.http.post<JSON>(this.URL + "api/athlete/login", {"username": username, "password": password, "birth_date":""});
   }
   // LOGIN - INICIO DE SESIÓN | VERIFICACIÓN DE USUARIO ORGANIZADOR
   public verifyUserOrg(username: string, password: string){
     console.log({"username": username, "password": password})
    return this.http.post<JSON>(this.URL + "api/organizer/login", {"username": username, "password": password, 
                                                                  "birth_date":"", "fname": "", "lname": "",
                                                                  "photo": "", "nationality": ""});
   }


  //GET ACTIVITIES LIST
  public getActivities(username){
    return this.http.post<JSON>(this.URL+"api/athlete/activity",{'username':username});
  }

  //GET FRIENDS ACTIVITIES LIST
  public getFriendsActivities(username){
   return this.http.post<JSON>(this.URL+"api/athlete/follows",{'username':username});
 }

  //GET RACES
  public getRaces(){
    return this.http.post<JSON>(this.URL+"api/athlete/race", {"username":localStorage.getItem("current_username")});
  }

  //GET CHALLENGES
  public getChallenges(){
    return this.http.post<JSON>(this.URL+"api/athlete/challenge", {"username":localStorage.getItem("current_username")});
  }

  //GET GROUPS
  public getGroups(){
    return this.http.post<JSON>(this.URL+"api/athlete/groups", {"username":localStorage.getItem("current_username")});
  }

  //GET ORGANIZER RACES
  public getOrgRaces(){
    return this.http.get<JSON>(this.URL+"api/Race");
    //return this.http.post<JSON>(this.URL+"api/Race",{'username':username});
  }

  //GET ORGANIZER GROUPS
  public getOrgGroups(){
    return this.http.get<JSON>(this.URL+"api/Group");
  }

  //GET ORGANIZER CHALLENGES
  public getOrgChallenges(){
    return this.http.get<JSON>(this.URL+"api/Challenge");
  }

  //GET ORGANIZER ENROLLMENTS
  public getOrgEnrollments(username){
    return this.http.post<JSON>(this.URL+"api/organizer/raceinscriptions",{'username':username});
  }

  //GET MY RACES
  public getMyRaces(username){
    return this.http.post<JSON>(this.URL+"api/athlete/raceandchallenge",{'username':username});
  }
 
  //CREATE REPORTS
  public createReports(){
    return this.http.post<JSON>(this.URL+"api/organizer/generatereports",{});
  }

  //GET ORGANIZER DATA
  public getOrgData(){
    return this.http.post<JSON>(this.URL+"api/Organizer/searchOrganizer",{"username":localStorage.getItem("current_username")});
  }

  //SEND REGISTER DATA
  public sendRegisterDataAtl(fname, lname, nationality, bDate, age, user, pass, url, category){
   return this.http.post<JSON>(this.URL+"api/Athlete",{
     "fname":fname,
     "lname":lname,
     "nationality":nationality,
     "birth_date":bDate,
     "current_age":age,
     "username":user,
     "password":pass,
     "photo":url,
     "category":category
      });
   }

   public sendRegisterDataOrg(fname, lname, nationality, bDate, age, user, pass, url){
    return this.http.post<JSON>(this.URL+"api/Organizer/register",{
      "fname":fname,
      "lname":lname,
      "nationality":nationality,
      "birth_date":bDate,
      "current_age":age,
      "username":user,
      "password":pass,
      "photo":url
       });
    }

  //SEND REGISTER DATA
  public sendDataToUpdate(fname, lname, nationality, bDate, age, user, pass, url){
    return this.http.post<JSON>(this.URL+"api/athlete/update",
    {
      "username":user,
      "f_name":fname,
      "l_name":lname,
      "b_date":bDate,
      "nationality":nationality,
      "age":age,
      "u_password":pass,
      "prof_img":url
    }
       );
    }

  //SEND REGISTER DATA
  public sendNewActivity(username, s_time,duration,a_type,date,URL, km){
    return this.http.post<JSON>(this.URL+"api/athlete/createactivity",{
    "username":username,
    "s_time":s_time,
    "duration":duration,
    "a_type":a_type,
    "date":date,
    "URL":URL,
    "km":km
    });
  }

 //CREATE RACE
 public createRace(race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category){
  return this.http.post<JSON>(this.URL+"api/Race",
                             {"name": race_name, "date": race_date, "route": race_path,"type": activity_type,
                              "visibility": privacity, "cost": race_cost,"bank_account":bank_account,"cat_name": race_category, "username": localStorage.getItem("current_username")});
}

//UPDATE RACE
public updateRace(race_id ,race_name, race_date, race_path, activity_type, privacity,race_cost,bank_account,race_category){
  return this.http.put<JSON>(this.URL+"api/Race",
                             {"id":race_id, "name": race_name, "date": race_date, "route": race_path,"type": activity_type,
                              "visibility": privacity, "cost": race_cost,"bank_account":bank_account,"cat_name": race_category, "username":localStorage.getItem("current_username")});
}

//DELETE RACE
public deleteRace(race_id){ 
  let params = new HttpParams();
  params = params.append('id', race_id);
  return this.http.delete<JSON>(this.URL+"api/Race",{params: params});
}


//CREATE CHALLENGE
public createChallenge(challenge_name, challenge_period, activity_type, mileage, visibility){
  return this.http.post<JSON>(this.URL+"api/Challenge",
                             {"name": challenge_name, "period": challenge_period, "type": activity_type, "mileage":mileage, "visibility": visibility, "username":localStorage.getItem("current_username")});
}

//UPDATE CHALLENGE
public updateChallenge(challenge_id ,challenge_name, challenge_period, activity_type, mileage, visibility){
  return this.http.put<JSON>(this.URL+"api/Challenge",
                             {"id":challenge_id, "name": challenge_name, "period": challenge_period, "type": activity_type, "mileage":mileage, "visibility": visibility, "username":localStorage.getItem("current_username")});
}

//DELETE CHALLENGE
public deleteChallenge(challenge_id){
  let params = new HttpParams();
  params = params.append('id', challenge_id);
  return this.http.delete<JSON>(this.URL+"api/Challenge", {params: params});
}

//CREATE GROUP
public createGroup(group_name, group_admin){
  return this.http.post<JSON>(this.URL+"api/Group", {"name": group_name, "administrator": group_admin});
}

//UPDATE GROUP
public updateGroup(group_id, group_name, group_admin){
  return this.http.put<JSON>(this.URL+"api/Group", {"id": group_id, "name": group_name, "administrator": group_admin});
}

//DELETE GROUP
public deleteGroup(group_id){
  let params = new HttpParams();
  params = params.append('id', group_id);
  return this.http.delete<JSON>(this.URL+"api/Group",{params: params});
}

//GET USERS
// username1 : Atleta que se busca
// username2 : Atleta que busca (usuario)
public getUsers(username){
  return this.http.get<JSON>(this.URL+"api/athlete");
}

//CREAR UNA NUEVA SOLICITUD DE INSCRIPCIÓN A CARRERA
signupRace(id, file_route){
  return this.http.post<JSON>(this.URL+"api/athlete/raceregister",
                              {"race_id":id , "receipt":file_route, "username":localStorage.getItem("current_username")});

}

//ACEPTA UNA SOLICITUD DE INSCRIPCIÓN A CARRERA
acceptRaceEnrollment(race_name, athlete_username){
  return this.http.post<JSON>(this.URL+"api/organizer/update/raceinscription",
                              {"id": race_name, "username": athlete_username, "confirmation":"TRUE"});
}

//DENEGA UNA SOLICITUD DE INSCRIPCIÓN A CARRERA
denyRaceEnrollment(race_id, athlete_username){
  return this.http.post<JSON>(this.URL+"api/organizer/update/raceinscription",
                              {"id": race_id, "username": athlete_username, "confirmation":"FALSE"});
}

//CREAR UNA NUEVA SOLICITUD DE INSCRIPCIÓN A CARRERA
signupChallenge(id){
  return this.http.post<JSON>(this.URL+"api/athlete/challengeregister",
                              {"cha_id":id , "username":localStorage.getItem("current_username")});

}

//ACTUALIZA DATOS DE UN USUARIO DE TIPO DEPORTISTA
updateUserData(fname, lname, birth_date, nacionality, file, username, password){
  return this.http.post<JSON>(this.URL+"api/athlete/update/user",
                              {"fname": fname, "lname": lname,"birth_date":birth_date,"nacionality":nacionality,"file":file,"username":username,"password":password});
}

//CREAR UNA NUEVA SOLICITUD DE INSCRIPCIÓN A GRUPO
signupGroup(group_id){
  return this.http.post<JSON>(this.URL+"api/athlete/groupregister",
                              {"group_id": group_id, "username": localStorage.getItem("current_username")});
}

//ACEPTA UNA SOLICITUD DE INSCRIPCIÓN A GRUPO
acceptGroupEnrollment(group_name, athlete_username){
  return this.http.post<JSON>(this.URL+"api/organizer/accept/group/enrollment",
                              {"group_name": group_name, "athlete_username": athlete_username}).subscribe(res => {
                                alert("Aceptación de solicitud a grupo actualiada exitosamente");
                              }, error =>{
                                alert("Se produjo un error al denegar solicitud de inscripción al grupo. Intente más tarde.");
                              })
}

//DENEGA UNA SOLICITUD DE INSCRIPCIÓN A GRUPO
denyGroupEnrollment(group_name, athlete_username){
  return this.http.post<JSON>(this.URL+"api/organizer/deny/group/enrollment",
                              {"group_name": group_name, "athlete_username": athlete_username}).subscribe(res => {
                                alert("Denegación de solicitud a grupo actualiada exitosamente");
                              }, error =>{
                                alert("Se produjo un error al denegar solicitud de inscripción al grupo. Intente más tarde.");
                              })
}

//AÑADE UN USUARIO A LA LISTA DE MIS AMIGOS
addFriend(athlete_username){
  return this.http.post<JSON>(this.URL+"api/athlete/searchAthlete",{"athlete_username": athlete_username});
}

}
