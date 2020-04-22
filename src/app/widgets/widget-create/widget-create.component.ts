import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-widget-create',
  templateUrl: './widget-create.component.html',
  styleUrls: ['./widget-create.component.css']
})
export class WidgetCreateComponent implements OnInit {

  createForm: FormGroup;
  file: File;
  constructor(private postService: PostService, private formBuilder: FormBuilder, private router: Router) { }

  initCreateForm() {
    this.createForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }
  ngOnInit() {
    this.initCreateForm();
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }
    const post: Post = new Post();
    post.content = this.createForm.controls.content.value;
    post.title = this.createForm.controls.title.value;
    post.imagePath = this.createForm.controls.imagePath.value;
    post.creator = localStorage.getItem('connectedUser');
    this.postService.create(post).subscribe(res => {
      this.router.navigate(['/wiget/' + res._id]);
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createForm.get('imagePath').setValue(file);
    }
  }
}
