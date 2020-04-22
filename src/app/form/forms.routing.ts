import { Routes } from '@angular/router';
import { UploadBillComponent } from './upload-bill/upload-bill.component';

import { BasicComponent } from './form-basic/basic.component';
import { FormvalComponent } from './form-validation/form-validation.component';
import { NewAccountFormComponent} from './new-account-form/new-account-form.component'
import { NewpasswordComponent} from './newpassword/newpassword.component'

export const FormsRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'basicform',
      component: BasicComponent,
      data: {
        title: 'Basic Form',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Basic Form'}]
      }
    },
      {
        path: 'uploadBill',
        component: UploadBillComponent,
        data: {
          title: 'Upload Bill',
          urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Upload Bill'}]
        }
      },
    {
      path: 'addnewaccount',
      component: NewAccountFormComponent,
      data: {
        title: 'add new account',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'add new account'}]
      }
    },

    {
      path: 'newpassword/:token',
      component: NewpasswordComponent,
      data: {
        title: 'add password',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'add password'}]
      }
    },
    {
      path: 'formvalidation',
      component: FormvalComponent,
      data: {
        title: 'Form Validation Page',
        urls: [{title: 'Dashboard',url: '/dashboard'},{title: 'Form Validation Page'}]
      }
    }]
  }
];
