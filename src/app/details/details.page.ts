import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FireserviceService } from '../fireservice.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data: string;
  formationDetails: any
  User: any
  disableB: any
  infos: any
  constructor(
    private activatedRoute: ActivatedRoute,
    public fireService:FireserviceService,
    public router:Router
  ) { 
    this.User = this.fireService.getUserId();
    this.disableB = new BehaviorSubject(false);
    this.disableB.subscribe({
      next: (value) => console.log("The value is: ", value)
  });
  this.infos = this.fireService.getFromationsId();

    // this.activatedRoute.paramMap.subscribe((data) => {console.log(data)})
    this.data = this.activatedRoute.snapshot.paramMap.get('xyz')
    this.fireService.getFormationDetails().subscribe(res => {
      res.map(e => {
        if( e.payload.doc.id === this.data ){

          this.formationDetails = {
            docid: e.payload.doc.id,
            Nom: e.payload.doc.data()["Nom"],
            Description: e.payload.doc.data()["Description"],
            Prix: e.payload.doc.data()["Prix"],
            Image: "assets/logos/" + e.payload.doc.data()["Image"],
            Date: e.payload.doc.data()["Date"]
  
          }
          if(this.User){
            this.disableB.next(true)
          }
        }
      
      }) 
      console.log(this.formationDetails);

    },(err:any) => {
      console.log(err)
    })
  }
  addToChart(data){

    alert("added to chart")
    this.fireService.AddtoUserChart(data)
    this.router.navigateByUrl('home');
  }

  ngOnInit() {

  }

}
