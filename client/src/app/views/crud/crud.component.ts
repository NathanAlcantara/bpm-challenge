import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormComponent } from '~core/utils/base-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionService } from '~core/entities/requisition/requisition.service';
import { User } from '~core/entities/user/user';
import { finalize } from 'rxjs/operators';
import { toast, defaultCatch } from '~core/utils/helpers';
import { UserLevel } from '~core/enums';
import { UserService } from '~core/entities/user/user.service';
import { Requisition } from '~core/entities/requisition/requisition';


@Component({
  selector: 'n-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent extends BaseFormComponent implements OnInit {

  activeUser: User;
  formRequisiiton: FormGroup;
  entity: Requisition;
  isLoading: boolean;
  isAbdicator = false;

  constructor(
    protected _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private requisitionService: RequisitionService
  ) {
    super(_formBuilder);
  }

  ngOnInit() {
    this.formRequisiiton = this.createForm({
      name: [{ value: undefined, disabled: false }],
      description: [{ value: undefined, disabled: false }],
      price: [{ value: undefined, disabled: false }]
    });

    this.route.data
      .pipe(this.pipeUnsubscribe)
      .subscribe(data => this.dataRouteChange(data));
  }

  submitForm() {
    if (this.formRequisiiton.valid || this.route.snapshot.params.id) {
      this.isLoading = true;
      let service;

      if (this.isAbdicator) {
        service = this.requisitionService.accept(this.entity.id, this.entity.requester, this.entity.abdicator);
      } else {
        const body = {
          ...this.formRequisiiton.value,
          ...{
            requester: this.activeUser.id
          }
        };
        service = this.requisitionService.addOne(body);
      }

      service.pipe(
        this.pipeUnsubscribe,
        finalize(() => {
          this.isLoading = false;
          this.goBack();
        })
      )
        .subscribe(({ message }) => {
          toast.fire({
            type: 'success',
            title: message
          });
        });
    }
  }

  private goBack() {
    this.router.navigate(['../']);
  }

  private dataRouteChange(data): void {
    const { user, entity } = data;

    if (entity) {
      this.entity = entity;

      this.userService.findOne(entity.requester)
        .pipe(
          this.pipeUnsubscribe,
          defaultCatch()
        ).subscribe((user: User) => {
          entity['name'] = user.name;
          this.formRequisiiton.patchValue(entity);
        });
    }

    if (user) {
      this.activeUser = user;

      switch (user.level) {
        case UserLevel.REQUESTER:
          const nameControl = this.formRequisiiton.get('name');
          nameControl.patchValue(user.name);
          nameControl.disable();
          break;
        case UserLevel.ABDICATOR:
          this.isAbdicator = true;
          this.formRequisiiton.disable();
          break;
      }
    }
  }
}
