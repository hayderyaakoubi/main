import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-widget-update',
  templateUrl: './widget-update.component.html',
  styleUrls: ['./widget-update.component.css']
})
export class WidgetUpdateComponent implements OnInit {
  updateForm: FormGroup;
  file: File;
  post: Post;
  constructor(private postService: PostService, private formBuilder: FormBuilder, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  initCreateForm() {
  
    this.activatedRoute.params.subscribe(params => {
      this.postService.getById(params._id).subscribe(resp => {

        this.post = resp;
        this.updateForm = this.formBuilder.group({
          title: [this.post.title, Validators.required],
          content: [this.post.content, Validators.required],
          imagePath: [this.post.imagePath, Validators.required]
        });
      });
    });
  }
  ngOnInit() {
    this.initCreateForm();
  }

  onSubmit() {
    if (this.updateForm.invalid) {
      return;
    }

    this.post.content = this.updateForm.controls.content.value;
    this.post.title = this.updateForm.controls.title.value;
    this.post.imagePath = this.updateForm.controls.imagePath.value;
    this.postService.update(this.post._id, this.post).subscribe(res => {
      this.router.navigate(['/wiget/' + res._id]);
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.get('imagePath').setValue(file);
    }
  }
}
