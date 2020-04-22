import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup,FormBuilder, Validators} from '@angular/forms';
import { SignupService } from './signup.service'

@Component({
    selector: 'app-signup',
    templateUrl: './signup2.component.html',
    styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {

    constructor(public router: Router,private formBuilder: FormBuilder,private auth: SignupService) { }

    logiin: FormGroup;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
    validEmailLogin: boolean = false;
    validPasswordLogin: boolean = false;

    ngOnInit() {
        this.logiin = this.formBuilder.group({
            // To add a validator, we must first convert the string value into an array. The first item in the array is the default value if any, then the next item in the array is the validator. Here we are adding a required validator meaning that the firstName attribute must have a value in it.
            Email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
            // We can use more than one validator per field. If we want to use more than one validator we have to wrap our array of validators with a Validators.compose function. Here we are using a required, minimum length and maximum length validator.
            Password: ['', Validators.required]
        });
     }

    onSignup(){
        console.log(this.logiin.value);
    if (this.logiin.valid) {
      // console.log('form submitted');
      // console.log(this.login.value);
      this.auth.verifylogin(this.logiin.value)
        .subscribe(res => {
          if (res !== 'Incorrect Credentials') {
            console.log(res);
            //localStorage.setItem('token', res['access_token']);
        }
        this.router.navigate(['home/']);
        localStorage.setItem('token', res['token']);
          console.log(localStorage);
          //this.router.navigate(['home/']);
          //console.log(localStorage);
          // console.log('this.router.navigate');

          // console.log(res)
        })
    }
    }
}
