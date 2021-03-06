import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: '',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'videos', loadChildren: './videos/videos.module#VideosPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'fullview', loadChildren: './fullview/fullview.module#FullviewPageModule' },
  { path: 'weekly', loadChildren: './weekly/weekly.module#WeeklyPageModule' },
  { path: 'lectures', loadChildren: './lectures/lectures.module#LecturesPageModule' },
  { path: 'view-lectures', loadChildren: './view-lectures/view-lectures.module#ViewLecturesPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
