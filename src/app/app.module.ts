import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { AddtenderComponent } from './addtender/addtender.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewcompaniesComponent } from './viewcompanies/viewcompanies.component';
import { EdittenderComponent } from './edittender/edittender.component';
import { EditcompanyComponent } from './editcompany/editcompany.component';
import { AwardedtenderComponent } from './awardedtender/awardedtender.component';
import { TenderlistComponent } from './tenderlist/tenderlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddcompanyComponent,
    AddtenderComponent,
    HomeComponent,
    ViewcompaniesComponent,
    EdittenderComponent,
    EditcompanyComponent,
    AwardedtenderComponent,
    TenderlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
