import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormComponent } from '~core/utils/base-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RequisitionService } from '~core/entities/requisition/requisition.service';
import { User } from '~core/entities/user/user';
import { finalize } from 'rxjs/operators';
import { toast } from '~core/utils/helpers';
import { UserLevel } from '~core/enums';


@Component({
  selector: 'n-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent extends BaseFormComponent implements OnInit {

  activeUser: User;
  formRequisiiton: FormGroup;
  isLoading: boolean;
  isAbdicator: boolean;

  constructor(
    protected _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
    if (this.formRequisiiton.valid) {
      this.isLoading = true;
      if (this.isAbdicator) {
          // this.requisitionService.accept()
      } else {
        const body = {
          ...this.formRequisiiton.value,
          ...{
            requester: this.activeUser.id
          }
        };
        this.requisitionService.addOne(body)
          .pipe(
            this.pipeUnsubscribe,
            finalize(() => {
              this.isLoading = false;
              this.goBack();
            })
          )
          .subscribe(({ success }) => {
            toast.fire({
              type: 'success',
              title: success
            });
          });
      }
    }
  }

  private goBack() {
    this.router.navigate(['../']);
  }

  private dataRouteChange(data): void {
    const { user } = data;

    if (user) {
      this.activeUser = user;

      switch (user.level) {
        case UserLevel.REQUESTER:
          const nameControl = this.formRequisiiton.get('name');
          nameControl.patchValue(user.name);
          nameControl.disable();
          break;
        case UserLevel.ABDICATOR:
          this.formRequisiiton.disable();
          break;
      }
    }
  }
}
