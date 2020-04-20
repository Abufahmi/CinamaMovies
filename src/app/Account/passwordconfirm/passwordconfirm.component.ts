import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordModel } from 'src/app/models/resetPassword';
import { CryptService } from 'src/app/services/crypt.service';

@Component({
  selector: 'app-passwordconfirm',
  templateUrl: './passwordconfirm.component.html',
  styleUrls: ['./passwordconfirm.component.css']
})
export class PasswordconfirmComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: RegisterService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private encService: CryptService
  ) { }

  userForm: FormGroup;
  regex: RegExp;
  passModel: ResetPasswordModel

  messageValidate = {
    pass: {
      required: 'كلمة المرور مطلوبة',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      notMatch: 'كلمة المرور يجب ان تحتوي علي رقم - حرف كبير - حرف صغير - حرف ممبز',
    },
    passConfirm: {
      required: 'تأكيد كلمة المرور مطلوب',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      isMatch: 'كلمتا المرور غير متطابقتين'
    }
  };

  ngOnInit(): void {
    this.passModel = {
      Id: '',
      Token: '',
      Password: ''
    }

    this.activeRoute.queryParams.subscribe(param => {
      var exist = false;
      this.passModel.Id = param['ID'];
      this.passModel.Token = param['Token'];
      if (this.passModel.Id && this.passModel.Token) {
        var keys = Object.keys(localStorage);
        keys.forEach(element => {
          if (element !== null && element.includes('token')) {
            var item = localStorage.getItem(element);
            if (item !== null) {
              var token = this.encService.Decrypt(item);
              if (token === this.passModel.Token) {
                exist = true;
                return;
              }
            }
          }
        });
        if (!exist) {
          this.router.navigate(['home']).then(x => { window.location.reload(); })
        }
      } else {
        this.router.navigate(['home']).then(x => { window.location.reload(); })
      }
    }, ex => console.log(ex));

    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ResetPassword() {
    if (this.userForm.value.password !== null) {
      this.passModel.Password = this.userForm.value.password;
      this.service.ApiResetPassword(this.passModel).subscribe(x => {
        console.log('success');
        this.router.navigate(['login']);
      }, ex => console.log(ex))
    }
  }

  isPasswordValid() {
    const pass = this.userForm.value.password;
    if (pass !== '' && pass.length > 5) {
      this.regex = new RegExp('[a-z]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي حرف صغير علي الأقل';
        return false;
      }
      this.regex = new RegExp('[A-Z]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي حرف كبير علي الأقل';
        return false;
      }
      this.regex = new RegExp('[~!@#$%^&*()+<>{}]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي حرف مميز علي الأقل';
        return false;
      }
      this.regex = new RegExp('[0-9]');
      if (!this.regex.test(pass)) {
        this.messageValidate.pass.notMatch = 'كلمة المرور يجب ان تحتوي علي رقم واحد علي الأقل';
        return false;
      }
    }
    return true;
  }

  isPasswordMatch() {
    if (this.userForm.value.password !== '' && this.userForm.value.passwordConfirm !== '') {
      if ((this.userForm.value.password !== this.userForm.value.passwordConfirm) &&
        this.userForm.value.password.length > 5 && this.userForm.value.passwordConfirm.length > 5) {
        return true;
      }
    }
    return false;
  }

}
