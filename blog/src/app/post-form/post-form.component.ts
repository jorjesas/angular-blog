import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../_models/post.model';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = new Post();

  message = {type: 'success', 'msg': 'Post successfully created.'};

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.post);

    this.postService.createPost(this.post).subscribe(res => {
      console.log(res.id);

      this.router.navigate(['/blog', res.id]);

    }, err => {
      console.log(err);
      this.message.type = 'error';
      this.message.msg = 'Error saving blog post';
    });
  }

}
