import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.page.html',
  styleUrls: ['./lectures.page.scss'],
})
export class LecturesPage implements OnInit {

  studentInfo: any;
  departments: any;
  stage: any;
  lectureNameList: any = [];
  email: any;

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
    });
  }

  showCourses() {
    if (this.departments != '' && this.stage != '') {
      this.lectureNameList = [];
      this.firestoreService.getLecturesListName(this.departments, this.stage).subscribe(data => {
        if (data != null || data != undefined) {
          var keyNames = Object.keys(data);
          this.lectureNameList = keyNames;
        }
        else {
          console.log("COURSE NOT FOUND");
        }
      });
    }
  }


  back() {
    this.navCtrl.navigateBack("/home");
  }

}
