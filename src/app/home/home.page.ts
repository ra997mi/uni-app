import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FcmService} from '../fcm.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  v:any;

  constructor(public navCtrl : NavController,    public fcm: FcmService) { }

  events(){
    this.navCtrl.navigateForward('/events');
  }

  about(){
    this.navCtrl.navigateForward('/about');
  }

  contact(){
    this.navCtrl.navigateForward('/contacts');
  }

  news(){
    this.navCtrl.navigateForward('/news');
  }

  videos(){
    this.navCtrl.navigateForward('/videos');
  }
}
