import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit,AfterViewInit {

  videoList: Observable<any[]>;
  videoData :any;
  backup:any;

  constructor(public navCtrl : NavController,
    private firestoreService: FirebaseService) {}

  ngOnInit() {
    this.videoList = this.firestoreService.getVideos();
  }

  ngAfterViewInit() {
    this.videoList.subscribe( data => {
      $('.spinner').hide();
      if(data.length == 0){
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else {
        $('#no-items-ava').hide();
        $('#SHOW').show();
        this.videoData = data.slice().reverse();
        this.backup = data.slice().reverse();
      }
    });
  }

  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.videoData = this.videoData.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  initializeItems() {
    this.videoData = this.backup;
   }

  back(){
    this.navCtrl.navigateBack("/home");
  }

  youtube_parser(url){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  }
}
