import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    User
  ],
  exports: [
    User
  ]
})
export class UserModule { }
