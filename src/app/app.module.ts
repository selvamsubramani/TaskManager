import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchPipe } from './utility/search.pipe';
import { DateValidatorDirective } from './utility/date-validator.directive';
import { StartdateValidatorDirective } from './utility/startdate-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    SearchPipe,
    DateValidatorDirective,
    StartdateValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
