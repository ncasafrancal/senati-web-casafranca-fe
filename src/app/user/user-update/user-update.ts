import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserInterface } from '../user-list/UserInterface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Component({
  selector: 'app-user-update',
  imports: [ ReactiveFormsModule ],
  templateUrl: './user-update.html',
  styleUrl: './user-update.css'
})
export class UserUpdate {
  
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

  private route = inject(ActivatedRoute); //INICIO

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.formulario.controls.id.setValue(params["id"]);
    });
  }
  //FIN
  updateUser() {
    let id = Number(this.formulario.controls.id.value);
    this.newUser.id = id;
    this.newUser.name = String(this.formulario.controls.name.value);
    this.newUser.lastname = String(this.formulario.controls.lastname.value);
  
    this.http.put(`https://app-senati-ncasafrancal-bkg6hdd0hhb9htfd.chilecentral-01.azurewebsites.net/api/user/${id}`, this.newUser).subscribe(resultado => {
      // console.log(resultado);
      this.showAlert("success", "Se actualizó correctamente");
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
