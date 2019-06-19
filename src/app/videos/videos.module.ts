import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { VideosPage } from './videos.page';

const routes: Routes = [
  {
    path: '',
    component: VideosPage
  }
];

@NgModule({
  imports: [
    NgxYoutubePlayerModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideosPage]
})
export class VideosPageModule {}
