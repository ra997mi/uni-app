import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dataSource = new BehaviorSubject("default message");
  serviceData = this.dataSource.asObservable();
  changeData(data: any) {
    this.dataSource.next(data);
  }

  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth) { }

  async login(email, password) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  getDepartments() {
    return this.firestore.collection('departList').valueChanges();
  }

  getVideos() {
    return this.firestore.collection('videosList').valueChanges();
  }

  getEvents() {
    return this.firestore.collection('eventList').valueChanges();
  }

  getAbout() {
    return this.firestore.collection('aboutList').valueChanges();
  }

  getContact() {
    return this.firestore.collection('contactList').valueChanges();
  }

  getNews() {
    return this.firestore.collection('newsList').valueChanges();
  }

  getSettings() {
    return this.firestore.collection('settings').valueChanges();
  }

  getWeekly() {
    return this.firestore.collection('weeklyList').valueChanges();
  }

  getDepart() {
    return this.firestore.collection('departList').valueChanges();
  }
}