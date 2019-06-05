import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  studentInfo: any;
  departments: any;
  stage: any;
  email: any;
  fullName: any;
  gender: any;
  birthdate: any;
  address: any;
  mobile: any;
  picture: any;

  constructor(public navCtrl: NavController,
    private firestoreService: FirebaseService,
    private storage: Storage) { }

  ngOnInit() {
    this.getUserEmail();
  }

  async getUserEmail() {
    this.email = await this.storage.get('userIn');
    this.studentInfo = this.firestoreService.getStudentInfo(this.email);
    this.getStudentData();
  }

  async getStudentData() {
    await this.studentInfo.subscribe(data => {
      this.departments = data.departments;
      this.stage = data.stage;
      this.fullName = data.fullName;
      this.gender = data.gender;
      this.birthdate = data.birthdate.toDate();
      this.address = data.address;
      this.mobile = data.mobile;
      this.picture = data.picture;
    });
  }

  back() {
    this.navCtrl.navigateBack("/home");
  }

}
