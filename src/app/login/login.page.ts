import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireserviceService } from '../fireservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email:any;
  public password:any;
  constructor(
    public router:Router,
    public fireService:FireserviceService,
    private alertCtrl: AlertController,
  ) { 
    
  }

  ngOnInit() {
  }
  // signOut() {
  //   this.auth.signOut().then(() => {
  //     location.reload
  //   });
  //}
  login(){
    this.fireService.loginWithEmail({email:this.email,password:this.password}).then( res=>{
      console.log(res);
      if(res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe( res=>{
          
        },err=>{
          console.log(err);
        });
        this.router.navigateByUrl('home')
      } 
    },err=>{
      alert(err.message)
      console.log('email ou mot de passe incorrect');
    })
  }


  signup(){
    this.router.navigateByUrl('signup');
  }
}
