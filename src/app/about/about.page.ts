import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, AfterViewInit {

  aboutList: Observable<any[]>;
  vision;
  objectives;
  mission;
  logo:any;

  constructor(public navCtrl : NavController,
    private firestoreService: FirebaseService,
    private storage: Storage) {
      this.storage.get('logo').then((val) => {
        this.logo = val;
      });
    }

    ngOnInit() {
      this.aboutList = this.firestoreService.getAbout();
    }

    ngAfterViewInit(): void {
      this.aboutList.subscribe( data => {
        if(data[0] == undefined){
          this.vision = 'لا توجد بيانات مضافة';
          this.objectives = 'لا توجد بيانات مضافة';
          this.mission = 'لا توجد بيانات مضافة';
        }
        else{
          this.vision =  data[0].vision;
          this.objectives =  data[0].objectives;
          this.mission =  data[0].mission;
        }
      });
    }

  back(){
    this.navCtrl.navigateBack("/home");
  }
}
