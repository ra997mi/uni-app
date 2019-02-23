import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-fullview',
  templateUrl: './fullview.page.html',
  styleUrls: ['./fullview.page.scss'],
})
export class FullviewPage implements OnInit {

  data: any;

  constructor(public navCtrl : NavController,
    private firestoreService: FirebaseService) {}

  ngOnInit() {
    this.firestoreService.serviceData.subscribe(data => {
     this.data = data;
    })
  }

  back(){
    this.navCtrl.navigateBack("/news");
  }
}
