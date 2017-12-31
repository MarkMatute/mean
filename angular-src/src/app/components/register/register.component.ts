import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    ValidationService
  ]
})
export class RegisterComponent implements OnInit {

  // Properties
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validationService: ValidationService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(e) {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Validate All Fields
    if (!this.validationService.validateRegistration(user)) {
      this.flashMessagesService.show('Please fill up all fields.', {
        'cssClass': 'alert alert-danger'
      });
      return false;
    }

    // Validate Email
    if (!this.validationService.validateEmail(user.email)) {
      this.flashMessagesService.show('Invalid Email.', {
        'cssClass': 'alert alert-danger'
      });
      return false;
    }

    // Register User
    this.authService.registerUser(user)
      .subscribe((data) => {
        if (data.success) {
          this.flashMessagesService.show('User registered.', {
            'cssClass': 'alert alert-success'
          });
          this.router.navigate(['/login']);
        } else {
          this.flashMessagesService.show('User registration failed.', {
            'cssClass': 'alert alert-danger'
          });
        }
      });

  }

}
