import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, AfterViewInit {

  aboutList: Observable<any[]>;
  vision;
  objectives;
  mission;
  departments;

  constructor(public navCtrl : NavController,
    private firestoreService: NewsService) {}

    ngOnInit() {
      this.aboutList = this.firestoreService.getAbout().valueChanges();
    }

    ngAfterViewInit(): void {
      this.aboutList.subscribe( data => {
        for(let i of data){
          this.vision = i.vision;
          this.objectives = i.objectives;
          this.mission = i.mission;
          this.departments = i.departments;
        }
      });
    }

  back(){
    this.navCtrl.navigateBack("/home");
  }
}
