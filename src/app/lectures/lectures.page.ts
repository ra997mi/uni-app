import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.page.html',
  styleUrls: ['./lectures.page.scss'],
})
export class LecturesPage implements OnInit, AfterViewInit {

  studentInfo: any;
  departments: any;
  stage: any;
  email: any;
  lectureNameList: any = [];

  constructor(public navCtrl: NavController,
    private firestoreService: FirebaseService,
    private storage: NativeStorage) {
    this.storage.getItem('userIn').then((val) => {
      this.email = val;
    });
  }

  ngOnInit() {
    this.studentInfo = this.firestoreService.getStudentInfo(this.email);
  }

  ngAfterViewInit() {
    this.studentInfo.subscribe(data => {
      this.departments = data.departments;
      this.stage = data.stage;
    });
  }
  
    getData() {
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
