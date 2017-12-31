import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.loginUser(user)
      .subscribe((data) => {
        if (!data.success) {
          this.flashMessagesService.show('Login Failed.', { cssClass: 'alert alert-danger' });
          return false;
        }
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/dashboard']);
      });
  }

}
