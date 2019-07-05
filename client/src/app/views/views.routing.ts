import { Component, NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrudComponent } from './crud/crud.component';
import { ListComponent } from './list/list.component';
import { UserService } from '~core/entities/user/user.service';
import { RequisitionService } from '~core/entities/requisition/requisition.service';

@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private userSerive: UserService) {
  }

  public resolve(route: ActivatedRouteSnapshot) {
    return this.userSerive.findOne(route.queryParams.id);
  }
}

@Injectable()
export class RequisitionEntityResolver implements Resolve<any> {
  constructor(private requisitionService: RequisitionService) {
  }

  public resolve(route: ActivatedRouteSnapshot) {
    return this.requisitionService.findOne(route.params.id);
  }
}

@Component({
  template: `<router-outlet></router-outlet>`
})
export class EmptyComponent {
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full'
  },
  {
    path: 'user',
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'requisition',
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'add',
        component: CrudComponent
      },
      {
        path: 'view:id',
        component: CrudComponent,
        resolve: {
          entity: RequisitionEntityResolver
        }
      }
    ],
    resolve: {
      user: UserResolver
    }
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    UserResolver,
    RequisitionEntityResolver
  ],
  declarations: [EmptyComponent]
})
export class ViewsRoutingModule {
}
