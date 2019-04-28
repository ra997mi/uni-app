import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import * as $ from 'jquery'
import * as _ from 'lodash';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit, AfterViewInit {

  department: any;
  stage: any;
  rule: any;

  /// Active filter rules
  filters = {}

  weeklyList: Observable<any[]>;
  weeklyData: any;
  filterData: any;

  departList: Observable<any[]>;
  departData: any;

  constructor(public navCtrl: NavController,
    private firestoreService: FirebaseService) { }

  ngOnInit() {
    this.departList = this.firestoreService.getDepart();
    this.weeklyList = this.firestoreService.getWeekly();
  }

  ngAfterViewInit() {
    this.departList.subscribe(data => {
      this.departData = data;
    });
    this.weeklyList.subscribe(data => {
      $('.spinner').hide();
      if (data.length == 0) {
        $('#no-items-ava').show();
        $('#SHOW').hide();
      }
      else {
        $('#no-items-ava').hide();
        $('#SHOW').show();
        this.weeklyData = data.slice().reverse();
      }
      this.applyFilters();
    });
  }

  private applyFilters() {
    this.filterData = _.filter(this.weeklyData, _.conforms(this.filters))
  }

  /// filter property by equality to rule
  filterExact(property: string) {
    this.rule = this.department + "_" + this.stage;
    this.filters[property] = val => val == this.rule
    this.applyFilters()
  }

  back() {
    this.navCtrl.navigateBack("/home");
  }
}
