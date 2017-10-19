import { Component, OnInit } from '@angular/core';
import { Post } from '../_models/post.model';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  title = 'Blog';
  posts: Post[] = [];

  constructor(private postService: PostService) {
    this.title = 'Blog';
  }

  ngOnInit() {
    this.postService.getPosts().subscribe(res => {
      this.posts = res as Post[];
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
