import { NgModule } from '@angular/core';

import { SharedModule } from '~shared/shared.module';
import { ViewsRoutingModule } from './views.routing';

import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    LoginComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ViewsRoutingModule
  ]
})
export class ViewsModule { }
