import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { UserModel } from 'src/app/models/UserModel';
import { Users } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { EditUserModel } from 'src/app/models/EditUserModel';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private activateRoute: ActivatedRoute
  ) { }

  message: string;
  errorMsg: string;
  userForm: FormGroup;
  user: UserModel;
  users: Users[];
  userData: Users;
  regex: RegExp;
  isbusy: boolean;
  title: string;
  btnTitle: string;
  isEditMode: boolean;
  editUserData: EditUserModel;
  id: string;

  messageValidate = {
    userName: {
      required: 'اسم المستخدم مطلوب',
      matchUserName: 'اسم المستخدم مستعمل',
    },
    email: {
      required: 'البريد الالكتروني مطلوب',
      notValid: 'البريد الالكتورني المدخل غير صحيح',
      matchEmail: 'البريد الالكتروني مستعمل'
    },
    pass: {
      required: 'كلمة المرور مطلوبة',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      notMatch: 'كلمة المرور يجب ان تحتوي علي رقم - حرف كبير - حرف صغير - حرف ممبز',
    },
    passConfirm: {
      required: 'تأكيد كلمة المرور مطلوب',
      minLength: 'الحد الأدني لكلمة المرور هي 6 مقاطع',
      isMatch: 'كلمتا المرور غير متطابقتين'
    },
  };

  ngOnInit(): void {
    this.id = '';
    this.isbusy = false;
    this.users = null;
    this.message = '';
    this.errorMsg = null;
    this.title = 'اضافة مستخدم جديد';
    this.btnTitle = 'اضافة مستخدم';
    this.userData = null;
    this.isEditMode = false;
    this.user = {
      userName: '',
      email: '',
      password: '',
      emailConfirmed: false,
      phoneNumber: null,
      country: null
    };

    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      emailConfirmed: false,
      country: '',
      phone: ''
    });

    this.editUserData = {
      id: '',
      userName: '',
      email: '',
      emailConfirmed: false,
      password: '',
      phoneNumber: '',
      country: '',
    }

    this.userForm.valueChanges.subscribe(x => {
      if (this.userForm.status == 'VALID') {
        this.isbusy = true;
      }
    }, ex => console.log(ex))

    this.GetAllUsers();

    this.activateRoute.paramMap.subscribe(param => {
      var id = param.get('id');
      if (id) {
        this.service.GetUser(id).subscribe(x => {
          this.userData = x;
          this.title = 'تعديل بيانات مستخدم';
          this.btnTitle = 'تعديل وحفظ';
          this.isEditMode = true;
          this.AddUserData();
          this.id = id;
        }, ex => console.log(ex));
      }
    })
  }

  AddUserData() {
    if (this.userData !== null) {
      this.userForm.setValue({
        userName: this.userData.userName,
        email: this.userData.email,
        password: this.userData.passwordHash,
        passwordConfirm: this.userData.passwordHash,
        emailConfirmed: this.userData.emailConfirmed,
        country: this.userData.country,
        phone: this.userData.phoneNumber
      });
    }
  }

  AddUser() {
    if (this.userForm.valid) {
      if (!this.isEditMode) {
        this.user.country = this.userForm.value.country;
        this.user.emailConfirmed = this.userForm.value.emailConfirmed;
        this.user.phoneNumber = this.userForm.value.phone;
        this.user.password = this.userForm.value.password;
        this.user.userName = this.userForm.value.userName;
        this.user.email = this.userForm.value.email;

        this.service.AddUser(this.user).subscribe(s => {
          this.ngOnInit();
          this.message = 'تم اضافة المستخدم الجديد بنبجاح';
        }, ex => this.errorMsg = ex);
      } else {
        this.editUserData.id = this.id;
        this.editUserData.email = this.userForm.value.email;
        this.editUserData.emailConfirmed = this.userForm.value.emailConfirmed;
        this.editUserData.password = this.userForm.value.password;
        this.editUserData.country = this.userForm.value.country;
        this.editUserData.phoneNumber = this.userForm.value.phone;
        this.editUserData.userName = this.userForm.value.userName;

        this.service.EditUser(this.editUserData).subscribe(x => {
          this.message = 'تم تعديل البيانات بنجاح';
        }, ex => console.log(ex));
      }
    }
  }

  isUserNameExist() {
    var name = this.userForm.value.userName;
    if (name !== null && name !== '') {
      for (const user of this.users.values()) {
        if (user.userName === name && !this.isEditMode) {
          return true;
        }
        else if (this.isEditMode && user.userName === name && user.id !== this.userData.id) {
          return true;
        }
      }
    }
    return false;
  }

  isEmailExist() {
    var email = this.userForm.value.email;
    if (email !== null && email !== '') {
      for (const item of this.users.values()) {
        if (item.email === email && !this.isEditMode) {
          return true;
        }
        else if (this.isEditMode && item.email === email && item.id !== this.userData.id) {
          return true;
        }
      }
    }
    return false;
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

  GetAllUsers() {
    this.service.GetAllUsers().subscribe((list) => {
      this.users = list;
    }, ex => console.log(ex));
  }
}
