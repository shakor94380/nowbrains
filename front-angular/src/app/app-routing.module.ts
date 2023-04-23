import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './core/product/product.component';
import { PageNotFoundComponentComponent } from './shared/page-not-found-component/page-not-found-component.component';
import { AccountComponent } from './core/account/account.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProductDetailComponent } from './core/product/product-detail/product-detail.component';
import { ProductListComponent } from './core/product/product-list/product-list.component';
import { RegisterComponent } from './core/account/register/register.component';
import { LoginComponent } from './core/account/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard], children: [
    { path: '', component: ProductListComponent}
  ]},
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
