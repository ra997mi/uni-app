import { Component, ViewChild } from '@angular/core';
import { Platform, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from './fcm.service';
import { ToastController } from '@ionic/angular';

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
      title: 'عن التطبيق',
      url: '/info',
      icon: 'help'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController
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
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    toast.present();
  }

  private notificationSetup() {
	  
	//this.fmessage.subscribeToTopic('events');

/*this.fmessage.getToken().then(token => {
	  //backend.registerToken(token);
	  this.presentToast('we got token');
	});

	this.fmessage.onNotification().subscribe(data => {
	  if(data.wasTapped){
		console.log("Received in background");
	  } else {
		console.log("Received in foreground");
		this.presentToast('hello world');
	  };
	});

	this.fmessage.onTokenRefresh().subscribe(token => {
	  //backend.registerToken(token);
	  this.presentToast('token was refreshed');
	});

	//this.fcm.unsubscribeFromTopic('events');
*/	
  
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
}