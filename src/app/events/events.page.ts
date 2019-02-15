import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { NewsService } from '../services/news.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit, AfterViewInit {

  eventList: Observable<any[]>;
  eventData :any;

  constructor(public navCtrl : NavController,
    private firestoreService: NewsService) {}

  ngOnInit() {
    this.eventList = this.firestoreService.getEvents().valueChanges();
  }

  ngAfterViewInit() {
    this.eventList.subscribe( data => {
      $('.spinner').hide();
      if(data.length == 0){
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else {
        $('#no-items-ava').hide();
        $('#SHOW').show();
        this.eventData = data.slice().reverse();
      }
    });
  }

  back(){
    this.navCtrl.navigateBack("/home");
  }

}
