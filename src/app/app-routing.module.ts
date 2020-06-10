import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { HomeComponent } from './home/home.component';
import { AddtenderComponent } from './addtender/addtender.component';
import { ViewcompaniesComponent } from './viewcompanies/viewcompanies.component';
import { EdittenderComponent } from './edittender/edittender.component';
import { EditcompanyComponent } from './editcompany/editcompany.component';
import { AwardedtenderComponent } from './awardedtender/awardedtender.component';
import { TenderlistComponent } from './tenderlist/tenderlist.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addcompany', component: AddcompanyComponent },
  { path: 'addtender', component: AddtenderComponent },
  { path: 'viewcompanies', component: ViewcompaniesComponent },
  { path: 'edittender', component: EdittenderComponent },
  { path: 'editcompany', component: EditcompanyComponent },
  { path: 'awardedtender', component: AwardedtenderComponent },
  { path: 'tenderlist', component: TenderlistComponent },


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
