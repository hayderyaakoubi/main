import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {UploadService} from './Service/upload.service';

@Component({
  selector: 'app-upload-bill',
  templateUrl: './upload-bill.component.html',
  styleUrls: ['./upload-bill.component.css']
})
export class UploadBillComponent implements OnInit {
  url: string;
  upload: FormGroup ;
  constructor(private formBuilder: FormBuilder, private billservice: UploadService) { }

  ngOnInit() {
    this.upload = this.formBuilder.group({
      Amount: [null, Validators.required],
      From: [null, Validators.required],
      To: [null, Validators.required],
      PaymentDate: [null, /*Validators.required*/],
      PaymentStatus: [null, Validators.required]
    });
  }
  readUrl(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  setPaymentDateNull() {
    this.upload.patchValue({PaymentDate: null});
    console.log('clicked');
  }
  onSubmit() {
    this.upload.value.File = this.url ;
    this.upload.value.CreatedAt = new Date();
    console.log(this.upload.value);

  }

}
