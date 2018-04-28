import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ReviewComponent } from './review/review.component';
const routes: Routes = [
  { path: 'add',component: AddComponent },
  { path: 'home',component: HomeComponent },
  { path: 'view/:id',component: ViewComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: 'review/:id',component: ReviewComponent },
  { path: '**',component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



