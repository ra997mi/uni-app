import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit, AfterViewInit {

  newsList: Observable<any[]>;
  newsData:any;
  backup:any;

  constructor(public navCtrl : NavController,
    private firestoreService: FirebaseService) {}

  ngOnInit() {
    this.newsList = this.firestoreService.getNews();
  }

  ngAfterViewInit() {
    this.newsList.subscribe( data => {
      $('.spinner').hide();
      if(data.length == 0){
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else {
        $('#no-items-ava').hide();
        $('#SHOW').show();
        this.newsData = data.slice().reverse();
        this.backup = data.slice().reverse();
      }
    });
  }

  initializeItems() {
    this.newsData = this.backup;
   }
  
  getItems(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.newsData = this.newsData.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  saveSingle(title, description, date, image){
    this.firestoreService.changeData({
      title:title,
      description:description,
      date:date,
      image:image
    })
     this.navCtrl.navigateForward("/fullview")
   }

  back(){
    this.navCtrl.navigateBack("/home");
  }


	toHTML(input) : any {
		return new DOMParser().parseFromString(input, "text/html").documentElement.textContent.substring(0, 100) + '...';
	}
}
