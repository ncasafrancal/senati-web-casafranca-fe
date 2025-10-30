import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { AsyncPipe } from '@angular/common'; // 👈 importa aquí
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserInterface } from './UserInterface';

@Component({
  selector: 'app-user-list',
  imports: [ AsyncPipe ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})

export class UserList {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private usersSubject = new BehaviorSubject<UserInterface[]>([]);
  users:Observable<UserInterface[]> = this.usersSubject.asObservable();

  newUser: UserInterface = {
    id: 0,
    name: "",
    lastname: ""
  };

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  showAlert(status: SweetAlertIcon, message: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: status,
      title: message
    });
  }

  deleteUser(userId: Number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar?",
      text: `Si estás seguro eliminar el registro ${userId}, Acepta`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUserById(userId);
        Swal.fire({
          title: "Eliminado",
          text: "El Registro fue eliminado",
          icon: "success"
        });
      }
    });
  }

  addUser() {
    this.http.post("https://app-senati-ncasafrancal-bkg6hdd0hhb9htfd.chilecentral-01.azurewebsites.net/api/user", this.newUser).subscribe(resultado => {
      console.log(resultado);
    });
  }

  deleteUserById(id: Number) {
    this.http.delete(`https://app-senati-ncasafrancal-bkg6hdd0hhb9htfd.chilecentral-01.azurewebsites.net/api/user/${id}`).pipe(
      tap(() => {
        const current = this.usersSubject.getValue();
        this.usersSubject.next(current.filter(u => u.id !== id));
      })
    ).subscribe();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.http.get<UserInterface[]>("https://app-senati-ncasafrancal-bkg6hdd0hhb9htfd.chilecentral-01.azurewebsites.net/api/users").subscribe(users => {
      this.usersSubject.next(users);
    });
  }
}
