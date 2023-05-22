import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { generateId } from 'src/app/shared/generateId';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  imagePreview:any;
  // Form ID
  signupForm: FormGroup;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPwd: [""],
      tel: ["", [Validators.minLength(8), Validators.maxLength(8)]],
      img:[""]
    })
  }

  signup() {
    this.signupForm.value.role = "user";
    this.userService.addUser(this.signupForm.value, this.signupForm.value.img).subscribe((data)=>{
      console.log(data.message);
      if (data.message) {
        this.router.navigate(["signin"]);
      } else {
        this.errorMsg="Email Exists";
      }
    });
};
onImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  console.log("Here file", file);
  this.signupForm.patchValue({ img: file });
  this.signupForm.updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
  this.imagePreview = reader.result as string
  };
  reader.readAsDataURL(file);
}
}
