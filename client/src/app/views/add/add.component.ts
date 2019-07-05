import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormComponent } from '~core/utils/base-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '~core/entities/user/user.service';
import { User } from '~core/entities/user/user';

@Component({
  selector: 'n-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent extends BaseFormComponent implements OnInit {


  formRequisiiton: FormGroup;
  isLoading: boolean;

  constructor(
    protected _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userSerive: UserService
  ) {
    super(_formBuilder);
  }

  ngOnInit() {
    this.formRequisiiton = this.createForm({
      name: [{ value: undefined, disabled: false }],
      description: [{ value: undefined, disabled: false }],
      price: [{ value: undefined, disabled: false }],
    });

    this.route.queryParams
      .subscribe(data => {
        if (data && data.id) {
          this.userSerive.getOne(data.id)
            .pipe(this.pipeUnsubscribe)
            .subscribe((user: User) => {
              this.formRequisiiton.get('name').patchValue(user.name);
            })
        }
      });
  }

  submitForm() {
    if (this.formRequisiiton.valid) {
      this.isLoading = true;

    }
  }
}
