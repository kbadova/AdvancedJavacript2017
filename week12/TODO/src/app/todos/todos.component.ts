import {Component, OnInit, Input} from '@angular/core';

import {TodosService} from './todos.service';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class Todos implements OnInit {
  todos = ['sad'];
  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos = this.todosService.list();
    console.log(this.todos);
  }
}
