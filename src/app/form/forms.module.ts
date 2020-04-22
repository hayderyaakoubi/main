import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FormsRoutes } from './forms.routing';
import { BasicComponent } from './form-basic/basic.component';
import { FormvalComponent } from './form-validation/form-validation.component';
import { UploadBillComponent } from './upload-bill/upload-bill.component';
import { NewAccountFormComponent } from './new-account-form/new-account-form.component';
import { NewpasswordComponent } from './newpassword/newpassword.component';
import {UploadService} from './upload-bill/Service/upload.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FormsRoutes),
    FormsModule, ReactiveFormsModule,
  ],
  declarations: [
    BasicComponent,
    FormvalComponent,
    UploadBillComponent,
    NewAccountFormComponent,
    NewpasswordComponent
  ],
  providers: [
    UploadService,
  ]
})

export class FormModule {}
