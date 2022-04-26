import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {
  toastservice: any;
  UserId: any
  infos: {}
  public formationlist = [];
  constructor(
    
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}
  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  logout(){
    this.auth.signOut();
    
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  //enregistrer les informations de l'utilisateur dans la base de donnée
  saveDetails(data) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  getDetails(data) {
    this.UserId = data.uid
    this.firestore.collection("users").snapshotChanges().subscribe(res => {
      res.map(e => {
       if( e.payload.doc.id === this.UserId ){
         if(e.payload.doc.data()['formations']){
          this.infos ={
            formations: e.payload.doc.data()['formations'],
            
          }
         }
         
     }}) 
     
   },(err:any) => {
     console.log(err)
   })
    return this.firestore.collection("users").doc(data.uid).valueChanges();
  }
  getUserPersonalInfo(){
    return this.firestore.collection("users").snapshotChanges();
  }
  getUserId(){
    return this.UserId
  }
  getFromationsId(){
    return this.infos
  }
  getUserFormations(data){
    return this.firestore.collection("formations").doc(data)
  }
  getUserInfos(){
    return this.firestore.collection("users").snapshotChanges()
  }
  
  getFormationDetails(){
   return this.firestore.collection("formations").snapshotChanges();
    
  }


  getMarker() {
    return this.firestore.collection("formations").snapshotChanges()
    
}

AddtoUserChart(data){
  const user = this.firestore.collection("users").doc(this.UserId)
  user.update({
    formations: firebase.firestore.FieldValue.arrayUnion(data)
    })
}
  getUserformations(){
  // var infos : any
  this.firestore.collection("users").snapshotChanges().subscribe(res => {
    res.map(e => {
     if( e.payload.doc.id == this.UserId ){
       this.infos ={
     formations: e.payload.doc.data()['formations'],
     
   }
   }}) 
  
 },(err:any) => {
   console.log(err)
 })
 return this.infos
}

DeleteFormations(){

const user = this.firestore.collection("users").doc(this.UserId)
for (const prop of Object.getOwnPropertyNames(this.infos)) {
  for(var i=0 ; i <this.infos[prop].length; i++){
    user.update({
      formations: firebase.firestore.FieldValue.arrayRemove(this.infos[prop][i])
      })
  }

      //delete this.infos[prop];
    }
    this.infos = {}
console.log(this.infos)
 }

}