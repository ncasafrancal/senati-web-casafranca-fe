import { Component } from '@angular/core';
import { UserList } from "./user-list/user-list";

@Component({
  selector: 'app-user',
  imports: [UserList],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {

}
