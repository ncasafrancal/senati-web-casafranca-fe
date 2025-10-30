import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserModule } from './user/user-module';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, UserModule ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('senati-web-casafranca-fe');
}
