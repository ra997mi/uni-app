import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {

  logo: any;
  university: any;
  collage: any;

  constructor(public navCtrl: NavController, private storage: NativeStorage) {
    this.storage.getItem('logo').then((val) => {
      this.logo = val;
    });
    this.storage.getItem('university').then((val) => {
      this.university = val;
    });
    this.storage.getItem('collage').then((val) => {
      this.collage = val;
    });
  }

  back() {
    this.navCtrl.navigateBack("/home");
  }


}
