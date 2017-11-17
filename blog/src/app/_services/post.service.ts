import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Post } from '../_models/post.model';
import { User } from '../_models/user.model';
import { Comment } from '../_models/comment.model';
import { Category } from '../_models/category.model';

import { AuthService } from './auth.service';
import { isNullOrEmpty } from '../_helpers/util';

@Injectable()
export class PostService {

    serverUrl = 'http://localhost:3000/api';

    constructor(private http: Http,
                private authService: AuthService) {}

    headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.authService.getToken()
    });

    getPosts(filter: string): Observable<Post[]> {
        let url = this.serverUrl + '/posts';

        const header = new Headers();
        header.append('Content-Type', 'application/json');

        const options = new RequestOptions();
        options.headers = header;

        if (filter !== null && filter !== '') {
            url = url + '?filter=' + filter;
        }
        return this.http.get(url, options).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    getPost(id: string): Observable<Post> {
        const url =  this.serverUrl + '/posts/' + id;

                const header = new Headers();
                header.append('Content-Type', 'application/json');

                const options = new RequestOptions();
                options.headers = header;

        return this.http.get(url, options).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    getUserPosts(userId: string, filter: string) {
        let url = this.serverUrl + '/accounts/' + userId + '/posts';

        if (!isNullOrEmpty(filter)) {
            url = url + '?filter=' + filter;
        }

        return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    createPost(post: Post): Observable<any> {

        this.updateHeaders();
        const user = this.authService.getCurrentUser() as User;
        const url = this.serverUrl + '/accounts/' + user.id + '/posts/';

        const options = new RequestOptions();
        options.headers = this.headers;

        return this.http.post(url, post, {headers: this.headers}).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    updatePost(post: Post): Observable<any> {
        const url = this.serverUrl + '/posts/' + post.id;

        const header = new Headers();
        header.append('Accept', 'application/json');

        const options = new RequestOptions();
        options.headers = header;

        return this.http.put(url, post, options).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    addComment(comment: Comment): Observable<any> {
        const url = this.serverUrl + '/posts/' + comment.postId + '/comments';

        return this.http.post(url, comment, {headers: this.headers}).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    getCategories(): Observable<Category[]> {
        const url = this.serverUrl + '/categories';

        return this.http.get(url, {headers: this.headers}).map(res => res.json() as Category[]).catch(err => {
            return Observable.throw(err);
        });
    }

    getCategoryById(id: string, filter?: string): Observable<Category> {
        const url = this.serverUrl + '/categories/' + id + '?filter=' + filter;

        return this.http.get(url, {headers: this.headers}).map(res => res.json() as Category).catch(err => Observable.throw(err));
    }

    getPostByCategoryId(id: string): Observable<Post[]> {
        const url = this.serverUrl + '/categories/' + id + '/posts';

        return this.http.get(url, {headers: this.headers}).map(res => res.json() as Post[]).catch(err => Observable.throw(err));
    }

    search(text: string): Observable<any> {
        const query = {
            where: {
                or: [{title: {like: text, options: 'i'}}]
            }
        };

        const filter = encodeURI(JSON.stringify(query));
        const url = this.serverUrl + '/posts?filter=' + filter;

        return this.http.get(url, {headers: this.headers}).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    updateHeaders() {
        this.headers.set('Authorization', this.authService.getToken());
    }
}

export const postServiceInjectables: Array<any> = [PostService];
