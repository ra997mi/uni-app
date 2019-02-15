import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { NewsService } from '../services/news.service';
import * as $ from 'jquery'

import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  Marker,
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit, AfterViewInit{

  map: GoogleMap;
  contactList: Observable<any[]>;
  email:any;
  number:any;
  lat:any;
  lng:any;

  constructor(public navCtrl : NavController,
    private firestoreService: NewsService,
    private platform:Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      this.contactList = this.firestoreService.getContact().valueChanges();
    }

    async ngOnInit() {
     await this.platform.ready();
    }

    ngAfterViewInit(){
      this.contactList.subscribe( data => {
        for(let i of data){
          this.lat = i.lat;
          this.lng = i.lng;
          this.email = i.email;
          this.number = i.number;
        }
      });
    }

    loadMap() {
	  $('.mapz').show();
      this.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
            lat: parseFloat(this.lat),
            lng: parseFloat(this.lng)
          },
          zoom: 18,
          tilt: 30
        }
      });
	  let marker: Marker = this.map.addMarkerSync({
      title: 'University',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: parseFloat(this.lat),
        lng: parseFloat(this.lng)
      }
    });
	}
	

  back(){
    this.navCtrl.navigateBack("/home");
  }
}
