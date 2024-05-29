import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllNotesComponent } from './components/all-notes/all-notes.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authenticationGuard } from './guard/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'All-notes', pathMatch: 'full' },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "register", component: RegisterComponent, title: "Register" },
  { path: "All-notes", canActivate: [authenticationGuard], component: AllNotesComponent, title: "Notes" },
  { path: "**", component: NotFoundComponent, title: "Not Found" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
