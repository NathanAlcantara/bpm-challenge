import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SweetAlert2Module.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    MaterialModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    EmptyStateComponent
  ],
  declarations: [
    HeaderComponent,
    EmptyStateComponent,
  ],
})
export class SharedModule { }
