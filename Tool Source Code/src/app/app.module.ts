import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CQPattern1Component } from './cqpattern1/cqpattern1.component';
import { CQPattern2Component } from './cqpattern2/cqpattern2.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { CQPattern3Component } from './cqpattern3/cqpattern3.component';
import { CQPattern4Component } from './cqpattern4/cqpattern4.component';
import { RepositoryComponent } from './repository/repository.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatTooltipModule} from '@angular/material';



@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      CQPattern1Component,
      CQPattern2Component,
      CQPattern3Component,
      CQPattern4Component,
      RepositoryComponent,
      
      
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      SelectDropDownModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatTooltipModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
