import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapPage implements OnInit {
  User: any;
  infos: any;
  lesFormations: any[];
  PersonalInfos: any
  PrixTotal: any
  constructor(
    public fireService:FireserviceService,
    public router:Router) { 

      //prix total initialisation
      this.PrixTotal = 0
      //get user id
      this.User = this.fireService.getUserId();
      //get user personal infos
      this.fireService.getUserPersonalInfo().subscribe(res => {
        res.map(e => {
            if( e.payload.doc.id == this.User  ){
              this.PersonalInfos = {
                docid: e.payload.doc.id,
                name: e.payload.doc.data()["name"]
              }
            }
      
          
        
        }) 
       
      },(err:any) => {
        console.log(err)
      })

     
      this.infos = this.fireService.getFromationsId();
      this.lesFormations = []

      //restore the user's foramtions
      this.fireService.getFormationDetails().subscribe(res => {
        res.map(e => {
          for (var i = 0; i < this.infos["formations"].length; i++){
            if( e.payload.doc.id == this.infos["formations"][i]  ){
              this.lesFormations.push({
                docid: e.payload.doc.id,
                Nom: e.payload.doc.data()["Nom"],
                Description: e.payload.doc.data()["Description"],
                Prix: e.payload.doc.data()["Prix"],
                Image: "assets/logos/" + e.payload.doc.data()["Image"],
                Date: e.payload.doc.data()["Date"]
              })
              this.PrixTotal += Number(e.payload.doc.data()["Prix"])
            }
          }
          
        
        }) 
        
  
      },(err:any) => {
        console.log(err)
      })

      // for (const item of this.lesFormations){
      //   this.PrixTotal += Number(item.Prix)
      // }

  }

  confirm(){

    this.fireService.DeleteFormations()
    alert("achat effectué avec success")
    this.router.navigateByUrl('home');
  }
  ngOnInit() {
  }

}
