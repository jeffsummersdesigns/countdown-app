import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { TimerService } from './timer.service';
import { ButtonsComponent } from './buttons/buttons.component';


@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ TimerService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
