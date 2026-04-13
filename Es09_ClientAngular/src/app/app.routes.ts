import { Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component';
import { MainComponent } from './main-component/main-component';
import { RegistrationComponent } from './registration-component/registration-component';

export const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "main", component: MainComponent },
    { path: "registration", component: RegistrationComponent }
];
