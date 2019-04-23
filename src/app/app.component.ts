import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './fcm.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
  
  public appPages = [
    {
      title: 'الرئيسية',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'حول التطبيق',
      url: '/info',
      icon: 'information-circle-outline'
    }
  ];

  settingsList: Observable<any[]>;
  logo: any;
  university:any;
  collage:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController,
    private firestoreService: FirebaseService,
    private storage: Storage
  ) {

    platform.backButton.subscribe(()=> {
     if(this.routerOutlet && this.routerOutlet.canGoBack()){
       this.routerOutlet.pop();
     }else{
       navigator['app'].exitApp();
     }
    })

    statusBar.backgroundColorByHexString("#fff");
    this.initializeApp();
    this.settingsList = this.firestoreService.getSettings();
    this.settingsList.subscribe(data => {
      if(data[0] == undefined){
        this.logo = "assets/imgs/uni-logo.png";
        this.university = "لا توجد بيانات مضافة";
        this.collage =  "لا توجد بيانات مضافة";
      }
      else {
        this.logo = data[0].logo;
        this.university = data[0].university;
        this.collage =  data[0].collage;
      }
      this.storage.set('logo', this.logo);
      this.storage.set('university', this.university);
      this.storage.set('collage', this.collage);
    });
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    toast.present();
  }

  private notificationSetup() {	
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {
          this.presentToast(msg.aps.alert);
        } else {
          this.presentToast(msg.body);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
  
  
  logout(){
	this.storage.set("userIn", null);
	navigator['app'].exitApp();
  }
}