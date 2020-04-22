import { Component, OnInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import { PostService } from './services/post.service';
import { Router } from '@angular/router';

@Component({
	templateUrl: './widgets.component.html'
})
export class WidgetsComponent implements OnInit{
	
	postList: Post[];

	constructor(private postService: PostService, private router: Router) {
	}

	getAllPosts() {
		this.postService.getAll().subscribe(resp => {
			this.postList = resp;
		});
	}

	goToDetails(_id: string) {
		this.router.navigate(['/widget/' + _id]);
	}

	onDelete(_id: string) {
		this.postService.delete(_id).subscribe(resp => {
			this.getAllPosts();
		});
	}

	ngOnInit() {
	 this.getAllPosts();
	}




	
}