import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs';
import {Post} from '../../models/post';
import {takeUntil} from 'rxjs/operators';
import {Employee} from '../../models/employee';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toastr: ToastrService) { }

  private get f() { return this.postForm.controls; }

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private allPosts: Post[];
  private unorderedPosts: Post[];
  private allEmployees: Employee[];
  private allEmployeesName: {id: number, name: string}[];
  private allEmployeesPhone: {id: number, phone: number}[];
  private submitted = false;
  private postForm = this.formBuilder.group({
    id: [''],
    who: ['', Validators.required],
    date: ['', Validators.required],
    post: ['', Validators.required]
  });
  filteredNames: [];
  filteredPhones: [];
  private suggestName: boolean;


  private static parseForm(fg: FormGroup): Post {
    return {
      id: fg.value.id,
      empId: PostsComponent.getEmployeeId(fg.value.who),
      date: fg.value.date,
      post: fg.value.post
    };
  }

  private static getEmployeeId(nameOrNumber: string): number {
    if (nameOrNumber[0] === '@') {

    }
    return 1;
  }

  ngOnInit() {
    this.getAllPosts();
    this.getAllEmployees();
  }

  ngOnDestroy(): void  {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private setNamesAndPhoneNumbers() {
    const employees = [];
    const phoneNumbers = [];
    this.allEmployees.map(emp => employees.push({id: emp.id, name: '@' + emp.name}));
    this.allEmployees.map(emp => phoneNumbers.push({id: emp.id, phone: '#' + emp.phone}));
    this.allEmployeesName = employees;
    this.allEmployeesPhone = phoneNumbers;
  }

  private getAllPosts(): void {
    this.apiService.getAllObjects<Post[]>('posts').subscribe(
      res => this.unorderedPosts = res,
      error => this.toastr.error(error.error.message, 'Error'),
      () => this.allPosts = _.sortBy(this.unorderedPosts, obj => new Date(obj.date)).reverse()
    );
    this.clearForm();
  }

  private getAllEmployees(): void {
    this.apiService.getAllObjects<Employee[]>('employees').subscribe(
      res => this.allEmployees = res,
      error => {},
      () => this.setNamesAndPhoneNumbers()
    );
  }

  private addPost(): void  {
    if (this.postForm.invalid) {
      this.toastr.warning('Form invalid', 'Warning');
      return;
    }
    if (!this.allEmployees) {
      return;
    }
    const post = new Post(this.postForm.value);
    try {
      if (this.postForm.value.who[0] === '@') {
        const name = this.postForm.value.who.substring(1);
        post.empId = this.allEmployees.find(x => x.name === name).id;
      } else {
        const phone = this.postForm.value.who.substring(1);
        post.empId = this.allEmployees.find(x => x.phone === phone).id;
      }
    } catch (e) {
      this.toastr.warning('Please define a valid user', 'Warning');
      return;
    }
    this.apiService.setNewObject<Post>('posts', post)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => this.toastr.success('New post added!!!', 'Success'),
        error => this.toastr.error(error.error.message, 'Error'),
        () => {
          this.postForm.reset();
          this.getAllPosts();
        }
      );
  }

  private updatePost(): void  {
    if (this.postForm.invalid) {
      this.toastr.warning('Form invalid', 'Warning');
      return;
    }
    const post = new Post(this.postForm.value);
    this.apiService.updateProperty<Post>('posts', post.id, post as Post).subscribe(
      res => this.toastr.success('Post updated!!!', 'Success'),
      error => this.toastr.error(error.error.message, 'Error'),
      () => {
        this.postForm.reset();
        this.getAllPosts();
      }
    );
  }

  private deletePost(post: Post): void  {
    this.apiService.deleteObject<Post>('posts', post.id).subscribe(
      res => this.toastr.success('Post deleted!!!', 'Success'),
      error => this.toastr.error(error.error.message, 'Error'),
      () => this.getAllPosts()
    );
  }

  private clearForm() {
    this.postForm.setValue({
      id: '',
      who: '',
      date: '',
      post: ''
    });
  }

  private filterEmployee(event) {
    if (event.query[0] === '@') {
      this.suggestName = true;
      this.filteredNames = [];
      for (const employee of this.allEmployeesName) {
        const name = employee.name;
        if (name.toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
          // @ts-ignore
          this.filteredNames.push(name);
        }
      }
    } else {
      this.suggestName = false;
      this.filteredPhones = [];
      for (const employee of this.allEmployeesPhone) {
        const phones = employee.phone.toString();
        if (phones.indexOf(event.query) === 0) {
          // @ts-ignore
          this.filteredPhones.push(phones);
        }
      }
    }
  }

  setFormValues(post: any) {
    this.postForm.setValue({
      id: post.id,
      who: this.getPostEmployeeName(post.empId),
      date: new Date(post.date),
      post: post.post
    });
  }

  private getPostEmployeeName(id: number) {
    if (!this.allEmployeesName) { return; }
    return this.allEmployeesName[id].name;
  }

  private tooltipData(post: Post) {
    if (!this.allEmployeesName) { return; }
    const employee: Employee = this.allEmployees[post.empId];
    return `Alias: ${employee.username} \n
            Name: ${employee.name} \n
            Role: ${employee.role} \n
            Phone: ${employee.phone} \n`;
  }
}
