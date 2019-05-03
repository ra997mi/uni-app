import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as $ from 'jquery'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  show: boolean = false;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private firestoreService: FirebaseService,
    public toast: ToastController,
    private storage: NativeStorage,
    public alert: AlertController,
    public load: LoadingController) {

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

  ngOnInit() {
    setTimeout(() => {
      $('.signin').show();
    }, 2000);
  }

  password() {
    this.show = !this.show;
  }

  async showalert(message) {
    var alert = await this.alert.create({
      subHeader: message,
      buttons: ['حسنا'],
      cssClass: "alertdire",

    });
    await alert.present();
  }

  async showToast(message) {
    var toast = await this.toast.create({
      duration: 3000,
      message: message,
      cssClass: "alertdire"
    });
    await toast.present();
  }

  async showLoad(message) {
    var load = await this.load.create({
      message: message,
      cssClass: "loaddire"
    });

    return await load.present();
  }

  async hideLoad() {
    return await this.load.dismiss().then(() => console.log("dismsiees"));
  }

  signIn(f) {
    if (f.value.email == "admin@jamiate.com") {
      this.showalert("دخول غير مصرح بة");
    }
    else {
      this.showLoad("جاري تسجيل الدخول");
      this.firestoreService.login(f.value.email, f.value.password).then((user) => {
        this.hideLoad();
        this.storage.setItem("userIn", this.afAuth.auth.currentUser.email);
        this.navCtrl.navigateRoot("/home")
      }, (err) => {
        this.hideLoad();
        if (err.message == "The password is invalid or the user does not have a password.") {
          this.showalert("كلمة مرور غير صحيحة")
        }

        if (err.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
          this.showalert("بريد الكتروني غير موجود")
        }

        if (err.message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.") {
          this.showalert("يرجى التحقق من الاتصال بلشبكة")
        }
        this.storage.remove("userIn");
      });
    }
  }
}
