import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { newsdatatype } from '../services/newsdatatype';
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private dataSource = new BehaviorSubject("default message");
  serviceData = this.dataSource.asObservable();
  changeData(data: any) {
  this.dataSource.next(data); 
  }

  constructor(private firestore: AngularFirestore) {}

  getEvents() {
    return this.firestore.collection('eventList');
  }
  getAbout() {
    return this.firestore.collection('aboutList');
  }

  getCount(){
    return this.firestore.collection('NewsCount');
  }
  
  getContact() {
    return this.firestore.collection('contactList');
  }
  
  getVideos(){
    return this.firestore.collection('videosList');
  } 

  getNews(): AngularFirestoreCollection<newsdatatype> {
    return this.firestore.collection('newsList');
  }
}
