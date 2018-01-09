import {Injectable} from '@angular/core';

@Injectable()
export class TodosService {
  data = [];

  constructor() {}

  list() {
    return this.data;
  }

  create(title) {
    this.data.push(title);
  }
}
