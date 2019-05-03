import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-view-lectures',
  templateUrl: './view-lectures.page.html',
  styleUrls: ['./view-lectures.page.scss'],
})
export class ViewLecturesPage implements OnInit {

  department: any = '';
  stage: any = '';
  course: any = '';
  lectures: Array<any> = [];

  constructor(public navCtrl: NavController,
    private route: ActivatedRoute, private firestoreService: FirebaseService,
    private downloader: Downloader) {
    this.department = this.route.snapshot.queryParams["department"];
    this.stage = this.route.snapshot.queryParams["stage"];
    this.course = this.route.snapshot.queryParams["course"];
  }

  ngOnInit() {
    if (this.department != '' && this.stage != '' && this.course != '') {
      this.firestoreService.getLectures(this.department, this.stage, this.course).subscribe(data => {
        this.lectures = data;
      })
    }
  }

  downloadLecture(url, name) {
    var request: DownloadRequest = {
      uri: url,
      title: 'جاري تحميل المحاضرة',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: name
      }
    };

    this.downloader.download(request)
      .then((location: string) => console.log('File downloaded at:' + location))
      .catch((error: any) => console.error(error));
  }

  back() {
    this.navCtrl.navigateBack("/lectures");
  }

}
