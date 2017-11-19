import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Post } from '../../../_models/post.model';
import { PostService } from '../../../_services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post = new Post();

  constructor(
    private route: ActivatedRoute,
    protected postService: PostService) {

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) => {
      const id = params['id'];
      return this.postService.getPost(id);
    }).subscribe(response => {
      this.post = response as Post;
      console.log(response);
    }, err => {
      console.log(err);
    });
  }

}
