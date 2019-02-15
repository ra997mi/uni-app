import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage {

  constructor(public navCtrl : NavController) { }

  back(){
    this.navCtrl.navigateBack("/home");
  }


}
