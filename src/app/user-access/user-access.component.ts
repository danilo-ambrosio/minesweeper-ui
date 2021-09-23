import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PasswordConfirmation } from '../helpers/password-confirmation.validator';
import { LoaderState } from '../loader/loader-state';
import { User } from '../model/User';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {

  userCredentials: FormGroup;
  userRegistration: FormGroup;
  subscription: Subscription;
  processing: Boolean;
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService, 
              private toastrService: ToastrService, 
              private loaderService: LoaderService,
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

    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.processing = state.show;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  shouldDisableAuthentication() {
    return this.processing;
  }

  shouldDisableRegistration() {
    return this.processing || this.userRegistration.controls.passwordConfirmation.errors;
  }

  isPasswordConfirmed() {
    return !this.userRegistration.controls.passwordConfirmation.errors;
  }
}
