import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet, AlertController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './fcm.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
      title: 'تسجيل خروج',
      icon: 'log-out'
    },
    {
      title: 'حول التطبيق',
      url: '/info',
      icon: 'information-circle-outline'
    }
  ];

  settingsList: Observable<any[]>;
  logo: any;
  university: any;
  collage: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController,
    private firestoreService: FirebaseService,
    private storage: NativeStorage,
    public alrt: AlertController,
    public navCtrl: NavController,
    public auth: AngularFireAuth,
    public router: Router,
  ) {

    platform.backButton.subscribe(() => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url == "/") {
        navigator['app'].exitApp();
      } else if (this.router.url == "/home") {
        navigator['app'].exitApp();
      }
    })

    this.auth.authState.subscribe(user => {
      if (user != null) {
        this.navCtrl.navigateRoot("/home")
      }
      if (user == null) {
        this.navCtrl.navigateRoot("/")
      }
    })

    statusBar.backgroundColorByHexString("#ffffff");
    this.initializeApp();
    this.settingsList = this.firestoreService.getSettings();
    this.settingsList.subscribe(data => {
      if (data[0] == undefined || data[0] == null) {
        this.logo = "assets/imgs/uni-logo.png";
        this.university = "لا توجد بيانات مضافة";
        this.collage = "لا توجد بيانات مضافة";
      }
      else {
        this.logo = data[0].logo;
        this.university = data[0].university;
        this.collage = data[0].collage;
      }
      this.storage.setItem('logo', this.logo);
      this.storage.setItem('university', this.university);
      this.storage.setItem('collage', this.collage);
    });
  }


  ngOnInit() {
    this.storage.getItem('userIn')
      .then(
        data => {
          if (data != null || data != undefined) {
            this.navCtrl.navigateRoot("/home")
          }
        },
        error => console.error(error)
      );
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
      this.statusBar.styleBlackTranslucent()
      this.splashScreen.hide();
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;
	  this.notificationSetup();
    });
  }


  async logout() {
    var alert = await this.alrt.create({
      subHeader: "هل تريد الخروج من الحساب؟",
      buttons: [
        {
          text: "خروج", handler: () => {
            this.auth.auth.signOut();
            this.navCtrl.navigateRoot("/")
            this.storage.remove("userIn");
          }
        }
        , "الغاء"],
      cssClass: "alertdire"
    });
    await alert.present();
  }
}