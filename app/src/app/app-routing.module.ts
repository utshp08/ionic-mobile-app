import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login-option', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'password-reset', loadChildren: './resetpassword/resetpass.module#ResetpassPageModule'},
  { path: 'login-option', loadChildren: './login-option/login-option.module#LoginOptionPageModule' },
  { path: 'register-mobile', loadChildren: './register-mobile/register-mobile.module#RegisterMobilePageModule' },
  { path: 'location', loadChildren: './location/location.module#LocationPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
