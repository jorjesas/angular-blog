import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';

import { Post } from '../../../_models/post.model';
import { Category } from '../../../_models/category.model';
import { PostService } from '../../../_services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  title = 'Blog';
  posts: Post[] = [];
  lastPosts: Post[] = [];
  categories: Category[] = [];
  private searchTerm = new Subject<string>();
  pager = {
    limit: 2,
    current: 0,
    reachedEnd: false,
    isLoading: false
  };
  lastPostsCount = 5;

  query = {
    limit: this.pager.limit,
    skip: this.pager.limit * this.pager.current
  };

  constructor(private postService: PostService) {
    this.title = 'Blog';

    this.searchTerm.debounceTime(200).distinctUntilChanged().subscribe(searchTerm => {
      this.postService.search(searchTerm).subscribe(response => {
        this.posts = response as Post[];
      }, err => {
        console.log(err);
      });
    });
  }

  ngOnInit() {
    this.getPostsPerPage();
    this.getLastPosts();
    this.getCategories();
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

  getLastPosts() {
    this.postService.getLastPosts(this.lastPostsCount).subscribe(res => {
      this.lastPosts = res as Post[];
    }, err => {
      console.log(err);
    });
  }

  getCategories() {
    this.postService.getCategories().subscribe(res => {
      this.categories = res as Category[];
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

  onKeyup(searchText: string){
    
        if(searchText !== ''){
          this.searchTerm.next(searchText);
        }       
  }

}
