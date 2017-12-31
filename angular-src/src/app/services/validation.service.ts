import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  // Validate Registration Form
  validateRegistration(user) {
    if (!user.name || !user.username || !user.email || !user.password) {
      return false;
    }
    return true;
  }

  // Validate Email
  validateEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

}
