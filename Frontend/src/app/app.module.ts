import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputcomponentComponent } from './components/inputcomponent/inputcomponent.component';
import { Feature2Component } from './components/feature2/feature2.component';

@NgModule({
  declarations: [
    AppComponent,
    InputcomponentComponent,
    Feature2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }