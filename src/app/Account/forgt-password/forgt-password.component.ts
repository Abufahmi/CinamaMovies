import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { CryptService } from 'src/app/services/crypt.service';

@Component({
  selector: 'app-forgt-password',
  templateUrl: './forgt-password.component.html',
  styleUrls: ['./forgt-password.component.css']
})
export class ForgtPasswordComponent implements OnInit {

  constructor(
    private service: RegisterService,
    private fb: FormBuilder,
    private encService: CryptService
  ) { }

  message: string;
  forgetForm: FormGroup;

  messageValidate = {
    email: {
      required: 'البريد الالكتروني مطلوب',
      patt: 'البريد الالكتروني المدخل غير صحيح'
    }
  };

  ngOnInit(): void {
    this.message = null;

    this.forgetForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  RequestPassword() {
    var email = this.forgetForm.value.email;
    if (email !== null || email !== '') {
      this.service.ForgetPassword(email).subscribe(x => {
        var i = 0;
        var exist = false;
        var token = Object.values(x).toString();
        while (localStorage.getItem('token' + i) !== null) {
          i++;
          if (localStorage.getItem('token' + i) === null) {
            localStorage.setItem('token' + i, this.encService.Encrypt(token));
            exist = true;
            break;
          }
        }
        if (!exist) {
          localStorage.setItem('token' + i, this.encService.Encrypt(token));
        }
        this.message = 'اذا كان الايميل المدخل صحيح فان رسالة التفعيل ارسلت اليه';
      }, ex => console.log(ex));
    }
  }

}
