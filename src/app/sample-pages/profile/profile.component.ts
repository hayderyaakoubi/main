import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {RulesService} from '../Services/rules.service';

@Component({
	templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {
  upload: FormGroup ;
  update: FormGroup ;
  frequency: String ;
  Goal: any;
  companyName;
  AccountType: string;
  FirstNameInfo: string;
  LastNameInfo: string;
  EmailInfo: string;
  changePassword: FormGroup;
  private DoNotDisturbFrom: number;
  private DoNotDisturbTo: number;
  private Frequencyy: string;
  constructor(private formBuilder: FormBuilder , private rule: RulesService) { }

  ngOnInit() {
    this.update = this.formBuilder.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Email: [null, Validators.required]
    });
    this.upload = this.formBuilder.group({
      Goal: [null, Validators.required],
      DoNotDisturbFrom: [null, Validators.required],
      DoNotDisturbTo: [null, Validators.required]
    });
    this.changePassword = this.formBuilder.group({
      newPassword: [null, Validators.required],
      oldPassword: [null, Validators.required],
      repeatPassword: [null, Validators.required]
    });
    this.rule.getCustomerId()
      .subscribe(result => {
              console.log('info', result);
              // this.AccountType = result.AccountType.toUpperCase();
              this.FirstNameInfo = result['firstName'];
              this.LastNameInfo = result['lastName'];
              this.EmailInfo = result['email'];
              
              this.update.patchValue({
                  LastName: this.LastNameInfo,
                  FirstName: this.FirstNameInfo,
                  Email: this.EmailInfo
                }
              );
            });
  }
  UpdateSubmit() {
    if (this.update.valid) {
      console.log('Form Submitted!', this.update.value);
      this.rule.getCustomerId()
        .subscribe(
          result => {
            this.rule.updateAccount(this.update.value)
              .subscribe(res => console.log(res));
          });
      // this.myform.reset();
    }
    console.log(this.update.value);
  }
  UploadSubmit() {
    this.upload.value.Frequency = this.frequency ;
    this.rule.getCustomerId()
      .subscribe(
        result => {
          this.rule.updateRule(result['Customer_id'], result['Account_id'], this.upload.value)
            .subscribe(res => console.log(res));
        });
    alert('Updated');
    console.log(this.upload.value);
  }
  OnFrequency(Frequency) {
    this.frequency = Frequency ;

  }
  OnChangePassword() {
    if (this.changePassword.valid) {
      console.log(this.changePassword.value);
      if (this.changePassword.value.newPassword === this.changePassword.value.repeatPassword) {
        this.rule.changePassword(this.EmailInfo, this.changePassword.value).subscribe(
          result => {
            if (result == 'done') {
              alert('Password changed successfully');
              this.changePassword.reset();
            } else {
              if ( result == 'Invalid current password') {
                alert('Invalid current password');
                this.changePassword.reset();
              }
            }
          }
        );
      } else {
        alert('Please Confirm your new password');
        this.changePassword.reset();
      }
    }  }

}
