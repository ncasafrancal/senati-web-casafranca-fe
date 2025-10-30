import { Routes } from '@angular/router';
import { UserAdd } from './user/user-add/user-add';
import { User } from './user/user';
import { UserUpdate } from './user/user-update/user-update';

export const routes: Routes = [
    { path: 'user', component: User },
    { path: 'user/add', component: UserAdd },
    { path: 'user/update/:id', component: UserUpdate },
    { path: '', component: User }
];