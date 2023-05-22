import { generateId } from 'src/app/shared/generateId';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {

  // Form ID
  signupForm: FormGroup;
  errorMsg: String;
  constructor(private formBuilder: FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    })
  }

  signup() {
    this.signupForm.value.role = "admin";
    this.userService.addUser(this.signupForm.value, null).subscribe((data)=>{
     console.log(data.message);
     
      if (data.message) {
        this.router.navigate(["signin"]);
      } else {
        this.errorMsg="Email Exists";
      }
    });
  }
  checkEmail(email, usersTab) {
    let exist = false;
    for (let i = 0; i < usersTab.length; i++) {
      if (usersTab[i].email == email) {
        exist = true;
        break;
      }
    }
    return exist;
  }

}
