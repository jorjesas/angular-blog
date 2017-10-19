import { uuid } from './../_helpers/uuid';

export class Post {
    id?: string;
    title?: string;
    body?: string;

    constructor(obj?: any) {
        this.id              = obj && obj.id              || uuid();
        this.title          = obj && obj.title          || false;
        this.body          = obj && obj.body          || new Date();
      }
}
