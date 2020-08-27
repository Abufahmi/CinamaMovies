import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  title: string;
  btnTitle: string;
  catForm: FormGroup;

  messageValidate = {
    catName: {
      required: 'اسم التصنيف مطلوب',
      max: 'الحد الأقصي لعدد الحروف هو 150',
    },
  };

  ngOnInit(): void {
    this.title = 'اضافة تصنيف جديد';
    this.btnTitle = 'اضافة';

    this.catForm = this.fb.group({
      catName: ['', Validators.required, Validators.maxLength(150)]
    })
  }

  AddCategory() {

  }

}
