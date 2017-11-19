import { Component, OnInit } from '@angular/core';

import { Post } from '../../../_models/post.model';;
import { PostService } from '../../../_services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  title = 'Blog';
  posts: Post[] = [];
  pager = {
    limit: 2,
    current: 0,
    reachedEnd: false,
    isLoading: false
  };

  query = {
    limit: this.pager.limit,
    skip: this.pager.limit * this.pager.current
  };

  constructor(private postService: PostService) {
    this.title = 'Blog';
  }

  ngOnInit() {
    this.getPostsPerPage();
  }

  getPostsPerPage() {
    this.query.limit = this.pager.limit;
    this.query.skip = this.pager.limit * this.pager.current;

    const filter = encodeURI(JSON.stringify(this.query));

    this.postService.getPosts(filter).subscribe(res => {
      //this.posts = res as Post[];
      console.log(res);
      this.pager.isLoading = false;

      if (res != null && res.length) {
        this.posts = this.posts.concat(res);
       } else {
        this.pager.reachedEnd = true;
      }

    }, err => {
      console.log(err);
    });
  }

  loadMore() {
    console.log('load more');
    this.pager.isLoading = true;
    this.pager.current = this.pager.current + 1;
    this.getPostsPerPage();
  }

}
