import {Component, OnInit} from '@angular/core';
import {TodosService} from '../todos.service';

@Component({
  selector: 'create-todo',
  templateUrl: './createTodo.component.html',
  styleUrls: ['./createTodo.component.css']
})
export class CreateTodo implements OnInit {
  constructor(private todosService: TodosService) {}

  submitInput(title) {
    this.todosService.create(title);
  }
  ngOnInit() {}
}
