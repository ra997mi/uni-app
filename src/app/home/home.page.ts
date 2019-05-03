import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logo: any;

  constructor(private navCtrl: NavController, private storage: NativeStorage) {
    this.storage.getItem('logo').then((val) => {
      this.logo = val;
    });
  }

  events() {
    this.navCtrl.navigateForward('/events');
  }

  about() {
    this.navCtrl.navigateForward('/about');
  }

  contact() {
    this.navCtrl.navigateForward('/contacts');
  }

  news() {
    this.navCtrl.navigateForward('/news');
  }

  videos() {
    this.navCtrl.navigateForward('/videos');
  }

  weekly() {
    this.navCtrl.navigateForward('/weekly');
  }

    lectures() {
    this.navCtrl.navigateForward('/lectures');
  }
}
