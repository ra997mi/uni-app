import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
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
export class ContactsPage implements OnInit, AfterViewInit {

  map: GoogleMap;
  contactList: Observable<any[]>;
  email: any;
  number: any;
  lat: any;
  lng: any;
  logo: any;

  constructor(public navCtrl: NavController,
    private firestoreService: FirebaseService,
    private platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private storage: NativeStorage) {
    this.contactList = this.firestoreService.getContact();
    this.storage.getItem('logo').then((val) => {
      this.logo = val;
    });
  }

  async ngOnInit() {
    await this.platform.ready();
  }

  ngAfterViewInit() {
    this.contactList.subscribe(data => {
      if (data[0] == undefined || data[0] == null) {
        this.email = 'لا توجد بيانات مضافة';
        this.number = 'لا توجد بيانات مضافة';
        this.lat = '';
        this.lng = '';
      }
      else {
        this.email = data[0].email;
        this.number = data[0].number;
        this.lat = data[0].lat;
        this.lng = data[0].lng;
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


  back() {
    this.navCtrl.navigateBack("/home");
  }
}
