import { Component, ViewChild, Renderer2, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PasswordCheckerService } from '../password-checker.service';



@Component({
  selector: 'app-login-form2',
  templateUrl: './login-form2.component.html',
  styleUrls: ['./login-form2.component.css']
})
export class LoginForm2Component implements OnInit {
  passwordSuggestions: string[] = [];
  formSubmitted: boolean = false;
  passwordStrength: string | null = null;
  isPasswordInList: boolean =false;
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    email: '',
    password: '',
  
  }
  loginObj: any = {
    email: '',
    password: '',
  }/*
  */
  @ViewChild('loginRef', { static: true }) sliderContainer!: ElementRef;
  @ViewChild('titleRef', { static: true }) titleContainer!: ElementRef;
  constructor(private passwordCheckerService: PasswordCheckerService) { }
  ngOnInit(): void {
    
      const localData =localStorage.getItem('signUpUsers');
      if(localData != null){
        this.signupUsers = JSON.parse(localData);
      }
      console.log("After setting local data : " + this.signupUsers);
    
  }
  
onSubmit(form: NgForm){
    
      
    
}
onPasswordInput(): void {
  
 
  this.formSubmitted = false;
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  const mediumRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');
  
  if (strongRegex.test(this.signupObj.password)) {
    this.passwordStrength = 'strong';
  } else if (mediumRegex.test(this.signupObj.password)) {
    this.passwordStrength = 'medium';
   
  } else {
    this.passwordStrength = 'weak';
     
  }
}

checkPassword() {
  const txtFileUrl = '../../assets/rockyou.txt';

  this.passwordCheckerService.checkPassword(txtFileUrl, this.signupObj.password).subscribe(
    (isInList) => {
      this.isPasswordInList = isInList;
      this.formSubmitted = true; // Set the flag to true after form submission

    },
    (error) => {
      console.error('Error checking password:', error);
    }
  );
  this.formSubmitted = false;
  this.sugggestPwd();
}

sugggestPwd(){
  this.formSubmitted = false;

  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
  const mediumRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

  if (strongRegex.test(this.signupObj.password)) {
    this.passwordStrength = 'strong';
    // No suggestions needed for a strong password
    this.passwordSuggestions = [];
  } else if (mediumRegex.test(this.signupObj.password)) {
    this.passwordStrength = 'medium';
    // Suggestions for medium strength password
    this.passwordSuggestions = [
      'Consider adding special characters like !@#$%^&*',
      'Use at least 8 characters for better security'
    ];
  } else {
    this.passwordStrength = 'weak';
    // Suggestions for weak password
    this.passwordSuggestions = [
      'Include both uppercase and lowercase letters',
      'Use numbers (e.g., 0-9) for better complexity',
      'Consider adding special characters for more security'
    ];
  }
}
//////////////////////////////////////
checkPasswordEstimate = (): string => {
  const length: number = this.signupObj.password.length;

  let possibilities= this.checkPossibilities(this.signupObj.password);

  let timeToCrack= this.estimateTime(length, possibilities);
  
  let finalEstimate: string = this.convertSeconds(timeToCrack);
  
  return finalEstimate;
}

checkPossibilities = (pass: string): number => {
  let lower: boolean = false;
  let upper: boolean = false;
  let num: boolean = false;
  let special: boolean = false;

  for (const element of pass) {
      if (element >= "A" && element <= "Z") {
          upper = true;
      } else if (element >= "a" && element <= "z") {
          lower = true;
      } else if (element >= "0" && element <= "9") {
          num = true;
      } else {
          special = true;
      }
  }

  if (lower || upper) {
      return 26;
  } else if (lower && upper) {
      return 26;
  } else if (special) {
      return 33;
  } else if ((num && lower) || (num && upper)) {
      return 36;
  } else if (num && lower && upper) {
      return 56;
  } else if (num && lower && upper && special) {
      return 96;
  } else {
      return 96;
  }
}

estimateTime = (length: number, possibilities: number): number => {
  const out: number = Math.pow(possibilities, length) / 30000000;

  if (out < 0.0000005) {
      return -1; // Returning a negative value to represent an empty string or negative time
  } else {
      return out;
  }
}

convertSeconds = (n: number): string => {
  let year: number = n / (3.2 * (10 ** 7));
  if (year < 1) {
      year = 0;
  }

  let day: number = year % 365;
  if (day < 1) {
      day = 0;
  }

  n = n % (24 * 3600);
  let hour: number = n / 3600;
  if (hour < 1) {
      hour = 0;
  }

  n %= 3600;
  let min: number = n / 60;
  if (min < 1) {
      min = 0;
  }

  n %= 60;
  let sec: number = n;

  if (year < 10000) {
      return `${year.toFixed(0)} years ${parseInt(day.toString())} days ${parseInt(hour.toString())} hours ${parseInt(min.toString())} minutes ${sec.toFixed(6)} seconds`;
  } else {
      return `${(year / 1000).toFixed(0)} centuries`;
  }
}



  }

  
  
  
 
 