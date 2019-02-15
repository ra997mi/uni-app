import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { NewsService } from '../services/news.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-fullview',
  templateUrl: './fullview.page.html',
  styleUrls: ['./fullview.page.scss'],
})
export class FullviewPage implements OnInit {

  data: any;

  constructor(public navCtrl : NavController,
    private firestoreService: NewsService) {

  }

  ngOnInit() {
    this.firestoreService.serviceData.subscribe(data => {
     this.data = data;
    })
  }

  back(){
    this.navCtrl.navigateBack("/news");
  }
  
  toHTML(input) : any {
	  return new DOMParser().parseFromString(input, "text/html");
  }
}
