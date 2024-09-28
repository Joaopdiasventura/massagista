import { Routes } from '@angular/router';
import { IndexComponent } from './components/screens/index/index.component';
import { LoginComponent } from './components/screens/user/login/login.component';
import { RegisterComponent } from './components/screens/user/register/register.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: IndexComponent },
];
