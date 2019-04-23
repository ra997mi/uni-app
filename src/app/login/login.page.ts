import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


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
	public toastController: ToastController,
	private storage: Storage) { }

  ngOnInit() {
	this.storage.get('userIn').then((val) => {
		if(val != null){
			this.navCtrl.navigateForward("home");
		}
	});
  }

  password() {
    this.show = !this.show;
  }
  
    private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000
    });
    toast.present();
  }


  signIn(f) {
    this.firestoreService.login(f.value.email, f.value.password).then((user) => {
      if (this.afAuth.auth.currentUser.email == "admin@jamiate.com") {
        this.presentToast("دخول غير مصرح بة");
      } else {
        this.storage.set("userIn", this.afAuth.auth.currentUser);
        this.navCtrl.navigateForward("home");
      }
    }, (err) => {
		this.presentToast("يرجى التاكد من بيانات الدخول");
		this.storage.set("userIn", null);
    });
  }




}
