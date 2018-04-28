import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpService} from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AddComponent } from './add/add.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    HomeComponent,
    EditComponent,
    ViewComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
