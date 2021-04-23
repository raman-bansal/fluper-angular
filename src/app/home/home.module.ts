import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { HomeService } from '../services/home.service';

const route: Routes = [
  {
    path: '', component: HomeComponent
  }]

@NgModule({
  declarations: [HomeComponent, ListViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  providers: [HomeService]
})
export class HomeModule { }
