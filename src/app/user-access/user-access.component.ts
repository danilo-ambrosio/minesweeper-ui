import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordConfirmation } from '../helpers/password-confirmation.validator';
import { User } from '../model/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {

  userCredentials: FormGroup;
  userRegistration: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService, 
              private toastrService: ToastrService, 
              private router: Router) {
    this.userCredentials = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.userRegistration = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['']
    }, {validator: PasswordConfirmation('password', 'passwordConfirmation')});
   }

  ngOnInit(): void {
  }

  signIn() {
    if(this.userCredentials.valid) {
      const self = this;
      const user = this.userCredentials.value as User;
      this.userService.authenticate(user).subscribe({
        error(error) { 
          self.handleUserAuthenticationError(error);
        }, complete() { 
          self.handleUserAuthentication();
        }
      });
    }
  }

  handleUserAuthentication() {
    this.router.navigate(['/board']);
  }

  handleUserAuthenticationError(error) {
    if(error.status == "401") {
      this.toastrService.warning("Incorrect username/password.");
    }
  }

  register() {
    const self = this;
    const user = this.userRegistration.value as User;
    this.userService.register(user).subscribe({
      error(error) { 
        self.handleUserRegistrationError(error);
      },
      complete() { 
        self.handleUserRegistration();
      }
    });
  }

  handleUserRegistration() {
    this.toastrService.success("User successfully registered!");
  }

  handleUserRegistrationError(error) {
    if(error.status == "400") {
      this.toastrService.warning("This username already exists.");
    }
  }

  isPasswordConfirmed() {
    return !this.userRegistration.controls.passwordConfirmation.errors;
  }

}
