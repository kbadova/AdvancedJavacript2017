import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {Todos} from './todos/todos.component';
import {CreateTodo} from './todos/create/createTodo.component';
import {TodosService} from './todos/todos.service';
import {NavComponent} from './nav/nav.component';

@NgModule({
  declarations: [AppComponent, Todos, CreateTodo, NavComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule {}
