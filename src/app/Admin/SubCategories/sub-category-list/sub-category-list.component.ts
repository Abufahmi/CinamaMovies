import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategory } from 'src/app/models/SubCatgory';
import { AdminService } from 'src/app/services/admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {

  constructor(
    private service: AdminService,
    private router: Router
  ) { }

  subCategories: SubCategory[];
  num: number;

  ngOnInit(): void {
    this.num = 0;
    this.subCategories = null;
    this.getSubCategories();
  }

  getSubCategories() {
    this.service.GetAllSubCategories().subscribe(list => {
      this.subCategories = list;
    }, ex => console.log(ex));
  }

  EditSubCategory(id: number, catName: string, catId: number) {
    if (id) {
      this.router.navigate(['/editsubcategory', id, catName, catId]);
    }
  }

  DeleteCount() {
    var count = $(".ckitem:checked").length;
    this.num = count;
  }

  AddSubCategory() {
    this.router.navigate(['subcategory']);
  }

  IsDelete() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          return true;
        }
      }
    }
    return false;
  }

  DeleteConfirm() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      var ids = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          var id = $(checkboxes[i]).val();
          ids.push(id);
        }
      }

      this.service.DeleteAllSubCategory(ids).subscribe(s => {
        this.getSubCategories();
        $("#btnClose").trigger("click");
      }, ex => console.log(ex));
    }
  }

  SelectAll() {
    var tbl = $('#tbl');
    var header = tbl.find('thead .ckheader');
    var item = tbl.find('tbody .ckitem');

    $(function () {
      item.on('change', function () {
        if ($(this).is(':checked')) {
          $(this).closest('tr').addClass('NewRowColor');
        }
        else {
          $(this).closest('tr').removeClass('NewRowColor');
        }
      });

      header.change(function () {
        var c = this.checked;
        item.prop("checked", c);
        item.trigger('check');
        if ($(this).is(':checked')) {
          $(item).closest('tr').addClass('NewRowColor');
        }
        else {
          $(item).closest('tr').removeClass('NewRowColor');
        }
      });
    });
  }

}
