import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {NewAccountService} from './Services/new-account.service';


@Component({
  selector: 'app-new-account-form',
  templateUrl: './new-account-form.component.html',
  styleUrls: ['./new-account-form.component.css']
})
export class NewAccountFormComponent implements OnInit {
  type: FormGroup;
  constructor(private formBuilder: FormBuilder, private accounts: NewAccountService) { }

  ngOnInit() {
    this.type = this.formBuilder.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Email: [null, Validators.required]
    });
  }
  onSubmit() {
      this.accounts.getCustomerId()
        .subscribe(
          result => {
            this.accounts.addnewAccount(result['Customer_id'], this.type.value)
              .subscribe(res => {console.log('subscribe submit', res['result']);
                this.accounts.validateEmail(this.type.value['Email']).subscribe(res => {
                  console.log(res);
                });
                });
          });

      // console.log(this.accounts.addnewAccount(this.type.value));
      // console.log(this.type.value)
    // }
  console.log(this.type.value);
  }

}
