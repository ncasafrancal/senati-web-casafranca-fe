import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInterface } from '../user-list/UserInterface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Component({
  selector: 'app-user-add',
  imports: [ ReactiveFormsModule ],
  templateUrl: './user-add.html',
  styleUrl: './user-add.css'
})
export class UserAdd {

  formulario = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl('')
  });

  newUser: UserInterface = {
    id: 0,
    name: "",
    lastname: ""
  }

  private http = inject(HttpClient);
  private router = inject(Router);

  addNewUser() {
    this.newUser.id = Number(this.formulario.controls.id.value);
    this.newUser.name = String(this.formulario.controls.name.value);
    this.newUser.lastname = String(this.formulario.controls.lastname.value);

    this.http.post("https://app-senati-ncasafrancal-bkg6hdd0hhb9htfd.chilecentral-01.azurewebsites.net/api/user", this.newUser).subscribe(resultado => {
      // console.log(resultado);
      this.showAlert("success", "Se guardó correctamente");
    });
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
        },
        didClose: () => {
          this.router.navigate(["/"]);
        }
      });
      Toast.fire({
        icon: status,
        title: message
      });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
