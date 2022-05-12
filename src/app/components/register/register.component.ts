import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { confirmPasswordValidator } from 'src/app/Validators/confirmPassword.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  registerForm = this.fb.group({
    userName: ['',Validators.required],
    password:[''],
    confirmPassword:[''],
    email:[''],
    subscribe:[false],
    address:this.fb.group({
      city:[''],
      street:[''],
      postalCode: [''],
    })
  },{validator:[confirmPasswordValidator]})

  ngOnInit(): void {
  }

  loadData(){
    // this.registerationForm.setValue({
    //   userName:"ahmed",
    //   password:'123',
    //   confirmPassword:'123',
    //   address:{
    //     city:'mansoura',
    //     street:'talkha',
    //     postalCode:'5555'
    //   }
    // })
    this.registerForm.patchValue({
      userName:"ahmed",
      // password:'123',
      // confirmPassword:'123',
      address:{
        city:'mansoura',
        street:'talkha',
        postalCode:'5555'
      }
    })
  }

  setEmailValidator(){
    this.registerForm.get('subscribe')?.valueChanges.subscribe((checkedValue: any)=>{
      const email=this.registerForm.get('email');
      if(checkedValue){
        email?.setValidators(Validators.required)
      }
      else{
        email?.clearValidators();
      }
      email?.updateValueAndValidity();
    })
  }


}
