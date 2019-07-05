import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseFormComponent } from '~core/utils/base-list.component';
import { AuthService } from '~core/auth/auth.service';
import { Router } from '@angular/router';
import { toast } from '~core/utils/helpers';
import { UserLevel } from '~core/enums';

@Component({
  selector: 'n-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  formLogin: FormGroup;
  hide = true;

  constructor(
    protected _formBuilder: FormBuilder,
    private router: Router,
    private authServive: AuthService
  ) {
    super(_formBuilder);
  }

  ngOnInit() {
    this.formLogin = this.createForm({
      email: [
        { value: undefined, disabled: false },
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        { value: undefined, disabled: false },
        Validators.compose([Validators.required])
      ]
    });
  }

  submitForm() {
    if (this.formLogin.valid) {
      const { email, password } = this.formLogin.value;
      this.authServive
        .login(email, password)
        .pipe(this.pipeUnsubscribe)
        .subscribe((data: any) => {
          const { id, level, success } = data;
          if (success) {
            let route: string;

            if (level === UserLevel.REQUESTER) {
              route = 'requisition/add';
            } else if (level === UserLevel.ABDICATOR) {
              route = 'requisition/view';
            } else {
              route = 'requisition/list';
            }

            this.router.navigate([route], { queryParams: { id } });
          } else {
            toast.fire({
              type: 'error',
              title: 'Login inválido'
            });
          }
        });
    }
  }
}
