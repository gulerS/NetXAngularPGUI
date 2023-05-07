import { User } from './../../../entities/user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }


  frm: FormGroup;


  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      confirmPassword: ["",
        [
          Validators.required
        ]],
    },
      {
        validators: (group: AbstractControl): ValidationErrors | null => {
          let password = group.get("password").value;
          let confirmPassword = group.get("confirmPassword").value;
          return password === confirmPassword ? null : { notSame: true };
        }
      }

    )



  }

  // prop get
  get component() {
    return this.frm.controls;
   }

  submitted: boolean =false;
  onSubmit(data: User) {
    this.submitted = true;
    var x = this.component;
    debugger;
    if (this.frm.invalid) {
      return;
     }
    debugger;
   }
}
