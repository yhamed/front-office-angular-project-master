import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {WelcomeComponent} from "./welcome/welcome.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ProductsComponent} from "./products/products.component";
import {AuthGuard} from "./guards/auth-guard.service";
import {CheckoutComponent} from "./checkout/checkout.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }, {
  path: '',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate:[AuthGuard]
  }
    ,
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
