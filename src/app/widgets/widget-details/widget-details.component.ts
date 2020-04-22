import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.css']
})
export class WidgetDetailsComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService, private activetedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activetedRoute.params.subscribe(params => {
      this.postService.getById(params._id).subscribe(resp => {
        this.post = resp;
      });
    });  
  }

  onUpdate() {
    this.router.navigate(['/widgets/update/' + this.post._id]);
  }
}
