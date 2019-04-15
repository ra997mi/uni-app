import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logo: any;

  constructor(private navCtrl: NavController, private storage: Storage) {
    this.storage.get('logo').then((val) => {
      this.logo = val;
    });
  }

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
  
  weekly(){
    this.navCtrl.navigateForward('/weekly');
  }
}
