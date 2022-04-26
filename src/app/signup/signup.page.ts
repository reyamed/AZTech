import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public email:any;
  public password:any;
  public name:any;
  constructor(
    public router:Router,
    public fireService:FireserviceService,
    private alertCtrl: AlertController,
    
  ) { }

  signup(){ 
    this.fireService.signup({email:this.email,password:this.password}).then(res=>{
      if(res.user.uid){
        let data = {
          email:this.email,
          password:this.password,
          name:this.name,
          uid:res.user.uid,
          formaitons: []
        }
        this.fireService.saveDetails(data).then(async res=>{
          const alert = await this.alertCtrl.create({
            header: 'compte',
            message: 'votre compte a été crée avec succes',
          });
          alert.present();
         this.router.navigateByUrl('login');
        },err=>{
          console.log(err);
        })
      }
    },err=>{
      alert(err.message);

      console.log(err);
    })
  }
  ngOnInit() {
  }

}
