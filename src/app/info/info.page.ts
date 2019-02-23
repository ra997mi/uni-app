import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {

  logo: any;
  university:any;
  collage:any;

  constructor(public navCtrl : NavController, private storage: Storage) {
    this.storage.get('logo').then((val) => {
      this.logo = val;
    });
    this.storage.get('university').then((val) => {
      this.university = val;
    });
    this.storage.get('collage').then((val) => {
      this.collage = val;
    });
   }

  back(){
    this.navCtrl.navigateBack("/home");
  }


}
