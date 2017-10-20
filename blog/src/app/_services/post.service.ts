import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Post } from '../_models/post.model';

@Injectable()
export class PostService {

    constructor(private http: Http) {}

    // headers = new Headers({
    //     'Content-Type': 'application/json'
    // });

    getPosts(): Observable<Post[]> {
        const url = 'http://localhost:3000/api/posts';

        const header = new Headers();
        header.append('Content-Type', 'application/json');

        const options = new RequestOptions();
        options.headers = header;

        return this.http.get(url, options).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    getPost(id: string): Observable<Post> {
        const url = 'http://localhost:3000/api/posts/' + id;

                const header = new Headers();
                header.append('Content-Type', 'application/json');

                const options = new RequestOptions();
                options.headers = header;

        return this.http.get(url, options).map(res => res.json()).catch(err => {
            return Observable.throw(err);
        });
    }

    createPost(post: Post): Observable<any> {
        const url = 'http://localhost:3000/api/posts/';

                        const header = new Headers();
                        header.append('Accept', 'application/json');

                        const options = new RequestOptions();
                        options.headers = header;

                return this.http.post(url, post, options).map(res => res.json()).catch(err => {
                    return Observable.throw(err);
                });
    }
}

export const postServiceInjectables: Array<any> = [PostService];
