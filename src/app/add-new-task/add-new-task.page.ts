import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { FireserviceService } from '../fireservice.service';
@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage implements OnInit {
  categories =['work', 'personal', 'home']
  categorySelectedCategory
User:any
  newTaskObj = {}
  itemName
  itemDueDate 
  itemPriority
  itemCategory
infos: any
lesFormations:any
disableB: any
  constructor(public modalCtlr: ModalController,
    public fireService:FireserviceService,
    public router:Router) {
      this.disableB = new BehaviorSubject(false);
      this.disableB.subscribe({
        next: (value) => console.log("The value is: ", value)
    });
    
      this.User = this.fireService.getUserId();
      this.infos = this.fireService.getFromationsId();

      this.lesFormations = []
      this.fireService.getFormationDetails().subscribe(res => {
        res.map(e => {
          if( this.infos === undefined ||  Object.keys(this.infos["formations"]).length === 0){
            this.disableB.next(false)
          } else {
            console.log(this.infos)
            this.disableB.next(true)
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
              }
            }
          }
         
          
        
        }) 
        console.log(this.lesFormations);
  
      },(err:any) => {
        console.log(err)
      })
      // this.fireService.getUserInfos().subscribe(res => {
      //    res.map(e => {
      //     if( e.payload.doc.id === this.User ){
      //       this.infos ={
      //     formations: e.payload.doc.data()['formations'],
          
      //   }
      //   }}) 
      //   console.log("2: " +this.infos);
      //   console.log(this.infos["formations"])
      //   for (var i = 0; i < this.infos["formations"].length; i++){
      //     // this.lesFormations = this.fireService.getUserFormations(this.infos["formations"][i])
      //     console.log(this.infos["formations"][i])
      //   }
      //   console.log("3: " +this.lesFormations);


      // },(err:any) => {
      //   console.log(err)
      // })
        console.log("1: " +  this.infos)

        // this.waitForElement()
      
        // this.fireService.getFormationDetails().subscribe(res => {
        //   res.map(e => {
        //     for(const property in this.infos){
        //       if( e.payload.doc.id !== this.infos[property] ){
        //         this.lesFormations = {
        //           docid: e.payload.doc.id,
        //           itemName: e.payload.doc.data()["itemName"],
        //           itemCategory: e.payload.doc.data()["itemCategory"],
        //           itemPriority: e.payload.doc.data()["itemPriority"],
        //           itemDueDate: e.payload.doc.data()["itemDueDate"]
        //         }
        //       }
        //     }
            
          
        //   }) 
        //   console.log(this.lesFormations);
    
        // },(err:any) => {
        //   console.log(err)
        // })
      //  console.log(this.waitForElement()) 
        
     }
  //    waitForElement(){
  //     if(typeof this.infos !== "undefined"){
  //         this.fireService.getFormationDetails().subscribe(res => {
  //         res.map(e => {
  //           for(const property of this.infos['formations']){
  //             if( e.payload.doc.id.localeCompare(this.infos[property])  ){
  //               this.lesFormations.push({
  //                 docid: e.payload.doc.id,
  //                 itemName: e.payload.doc.data()["itemName"],
  //                 itemCategory: e.payload.doc.data()["itemCategory"],
  //                 itemPriority: e.payload.doc.data()["itemPriority"],
  //                 itemDueDate: e.payload.doc.data()["itemDueDate"]
  //               })
  //             }
  //           }
            
          
  //         }) 
  //         console.log(this.lesFormations);
    
  //       },(err:any) => {
  //         console.log(err)
  //       })
  //       console.log(this.lesFormations)
  //       return this.lesFormations
  //     }
  //     else{
  //         setTimeout(this.waitForElement, 250);
  //     }
  //     return this.lesFormations
  // }

  ngOnInit() {
  
  }
  selectCategory(index){
    this.categorySelectedCategory = this.categories[index]
    console.log(this.categorySelectedCategory);
  }
  
  async add(){
    this.newTaskObj = ({itemName:this.itemName, itemDueDate:this.itemDueDate, itemPriority:this.itemPriority,itemCategory:this.categorySelectedCategory})
    this.dismis()
  }
  async dismis(){
    await this.modalCtlr.dismiss(this.newTaskObj)
  }
 Buy(){
  this.router.navigateByUrl('recap');
  this.dismis();
}
}
