import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ChangepasswordService} from './Services/changepassword.service';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';



@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {
  token: any;
  email: any;
  password: FormGroup ;
  constructor(private route: ActivatedRoute, private ChangePassword: ChangepasswordService,private formBuilder: FormBuilder) {

  }
  onSubmit()
  {
    this.ChangePassword.newPassword(this.email,this.password.value).subscribe( res => {
      if (res == 'done') {
        alert(res);
      }
      else {
        alert('Unmatched Password');
        this.password.reset();
      }

    });
    console.log(this.password.value);
  }
  ngOnInit() {
    this.route.params.subscribe( params => {
      this.token = params['token'] ;
      console.log(this.token);
    });
    this.ChangePassword.confirmMail(this.token).subscribe(res => {
      if (res != 'the token is expired') {
        this.email = res ;
        this.password = this.formBuilder.group({
          Password: [null, Validators.required],
          RepeatPassword: [null, Validators.required]
        });
      }
      console.log(res);
    })

  }
  login = {password: '', repeatpassword: ''};

}
